import { Component, EventEmitter, Output } from '@angular/core';
import { UtilisateurService } from '../utilisateur.service';
import { AuthService } from '../../../auth/auth.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrl: './ajout-utilisateur.component.css'
})
export class AjoutUtilisateurComponent {

  myForm: FormGroup
  @Output()ajoutUti = new EventEmitter();

  role : string = "";
  email_ut : string = "";
  mdp_ut  : string = "";
  mdp : string = "";

  constructor(
    private ajoutService : UtilisateurService,
    private auhtService : AuthService,
    private fb: FormBuilder

  ){
    this.myForm = this.fb.group({
      role:[this.role, Validators.required],
      email_ut:[this.email_ut, Validators.required],
      mdp_ut:[this.mdp_ut, Validators.required],
      mdp:[this.mdp, Validators.required],

    })
  };

  ajouterUtilisateur(){
    const utilisateur = {
      email_ut : this.email_ut,
      mdp_ut : this.mdp_ut
    };

    console.log("les utilisateur",utilisateur);

    this.ajoutService.ajoutUtilisateur(utilisateur).subscribe(
      (response:any) => {
        // Message avec succéss
        this.valider();
        // Récupérer le dépôt ajouté et l'ajouter à la liste des dépôts
        this.ajoutUti.emit(response);
      },

      (erreur:any) => {
        // Message d'erreur
        this.error();
      }
    )
  }


  register():void{
    this.auhtService.register(this.role,this.email_ut ,this.mdp_ut).subscribe(
      response =>{

        this.valider();
        this.ajoutUti.emit(response);

      },

      erreur => {
        // Message d'erreur
        this.error();
      }
    );
  }
  
  valider(){
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2000,
    });
    Toast.fire({
      icon: "success",
      title: "Ajout avec succes"
    })
  }

  error(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please DOUBLON!",
    });
  }
}

