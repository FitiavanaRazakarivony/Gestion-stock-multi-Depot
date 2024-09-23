import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core'
import { EmplacementService} from '../emplacement.service'
import { Emplacement } from '../../emplacement.model'
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { DepotService } from '../../../depot/service/depot.service';
import { DepotResponse } from '../../../depot/depot.model';


@Component({
  selector: 'app-ajout-emplacement',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})

export class AjoutEmplacementComponent implements OnInit {
  @Output()onAdd = new EventEmitter(); // envoyez le donnée qu'on ajout
  @Input() Emplacements: any[] = [] // prende le donné apres l'ajout

  depots:any [] = []; 
  titre = " Dépot "
  myForm: FormGroup;
  sommes: number = 0;
  page = 1

  Emplacement:Emplacement ={
    id_em : 0,
    nom_em:'',
    volume_actuel:0,
    id_dep:0,
    longeur: 0,
    largeur: 0,
    hauteur: 0,
  };

  // id!:number
  idEmplacement: any = null;
  nom_em: string = 'A1';
  volume_actuel:number = 0 ;
  id_dep!:number ;
  longeur!: number;
  largeur!: number;
  hauteur!: number;
  id_em!:number;
  
  // Emplacements: Emplacement[] = [] // Déclarer la propriété Emplacements
  emailLocalStorage = localStorage.getItem("email")

  constructor(
    public emplacementService: EmplacementService,
    private fb: FormBuilder,
    public depotService : DepotService
  ) {
    this.myForm = this.fb.group({
      nom_em:[this.nom_em, Validators.required],
      id_dep:[this.id_dep, Validators.required],
      longeur:[this.longeur, [Validators.required, this.invalidValueValidator]],
      largeur:[this.largeur,  [Validators.required, this.invalidValueValidator]],
      hauteur:[this.hauteur, [Validators.required, this.invalidValueValidator]],
    })
  }

  ngOnInit(): void {
    this.listeDepots();
  }

  // Validateur personnalisé pour vérifier si la quantité est inférieur égale à 0
  invalidValueValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return control.value <= 0 ? { zeroQuantity: true } : null;
  }
  
  // Validateur personnalisé pour vérifier si la quantité est égale à 0
  quantityValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return control.value <= 0 ? { zeroQuantity: true } : null;
  }

  countEmplacement():number{
    this.emplacementService.countEmplacement()
    .subscribe(data=>{
      this.sommes = data.total_emplacement;
    });
    console.log("somme",this.sommes);

    return this.sommes;
  }

  listeDepots(): void {
    this.depotService.getDepot(this.page).subscribe(
      (data) => {
        this.depots = data; // Utilisez la propriété "depots" de "DepotResponse"
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }
  
  listeEmplacements(){
    this.emplacementService.getEmplacement(this.page).subscribe(data =>{
      this.Emplacements = data;
      console.log("fsdfqf", data);
    })
  }

  handlePageChange(page:any){
    this.page = page;
    this.listeEmplacements()
  }

  ajouterEmplacement() {
    const emplacement = new Emplacement(
      this.idEmplacement, 
      this.nom_em,
      this.volume_actuel,
      this.id_dep,
      this.largeur,
      this.longeur,
      this.hauteur
    )

    this.emplacementService.ajoutEmplacement(emplacement).subscribe(
      (response:any) => {
        // Message avec succéss

        this.valider();

        // Récupérer le dépôt ajouté et l'ajouter à la liste des dépôts
        console.log("response", response);

        // this.onAdd.emit(response)
        this.emplacementService.onRefreshList.emit()

      },
      erro =>{
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
  validerSuppr(){
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2000,
    });
    Toast.fire({
      icon: "success",
      title: "Delete succefull"
    })
  }


  error(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please DOUBLON!",
    });
  }

  getEmplacement(id:number){
    this.emplacementService.getIdEmplacement(id)

    .subscribe(data =>{
    this.idEmplacement = data;

    this.idEmplacement = id
    console.log(this.idEmplacement);
    })

  };

 supprimerDep(id:number){
   const id_em = this.idEmplacement

   this.emplacementService.supprEmplacement(id_em).subscribe(

     (response:Emplacement) =>{

       const index = this.Emplacements.findIndex(
         (em:Emplacement) => em.id_em == id,
         console.log("id_em", (dep:Emplacement)=>dep.id_em == id)

        )
        this.Emplacements.splice(index,1) // firy no ho fafana amin ilaina tableaux "index"
        this.validerSuppr()
        this.handlePageChange(this.page)
     },

   )
 }


 modification(){

   let id = this.idEmplacement;

   console.log("id_em", id);
   console.log("this.Emplacement", this.Emplacement);

   this.emplacementService.modification(id, this.Emplacement).subscribe({
     next: (response) =>{
       console.log('update', response);

       const index = this.Emplacements.findIndex((em:Emplacement) =>em.id_em == id);

       const nom_em =  this.Emplacements[index] = response.Emplacement;

       console.log("aaaa", nom_em);
       this.emplacementService.onRefreshList.emit()
       this.valider();
     },
     error:(err) =>{
       console.log("err", err);

       this.error();
     }
   })

 }


}
