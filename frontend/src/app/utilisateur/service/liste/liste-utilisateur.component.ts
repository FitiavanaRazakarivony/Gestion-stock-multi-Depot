import { Component, Input, OnInit } from '@angular/core';
import { UtilisateurService } from '../utilisateur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrl: './liste-utilisateur.component.css'
})
export class ListeUtilisateurComponent{

  @Input()utilisateurs: any[] =[]

  utiliSuppr:boolean = false;
  ErreurSuppr:boolean = false
  idDelete?:number // id produit à supprimer 

  constructor(private utilisateurService: UtilisateurService){
  }

  supprimerUtili(id:number){
    this.utilisateurService.supprUtilisateur(id).subscribe(
      (response:any) =>{

        this.valider()
        const index = this.utilisateurs.findIndex((mvt:any)=>mvt.id_mvt == id)
        this.utilisateurs.splice(index,1) // firy no ho fafana amin ilaina tableaux "index"

      },
      (erreur:any) =>{
      this.error()
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
      title: "update succes"
    })
  }

  error(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error!",
    });
  }

  setIdDelete(id_p:number){
    this.idDelete = id_p
  }
}
