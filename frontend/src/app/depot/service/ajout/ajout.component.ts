import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core'
import { DepotService } from '../depot.service'
import { Depot, DepotResponse } from '../../depot.model'
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})

export class AjoutDepotComponent implements OnInit {
  @Output()onAdd = new EventEmitter(); // envoyez le donnée qu'on ajout
  @Input() depots: any[] = [] // prende le donné apres l'ajout

  titre = " Dépot "
  myForm: FormGroup;
  sommes: number = 0;
  page = 1

  depot:Depot ={
    id_dep:0 ,
    nom_dep:'',
  };

  // id!:number
  nom_dep: string = 'Dépot'
  idDepot: any = null;

  // depots: Depot[] = [] // Déclarer la propriété depots
  emailLocalStorage = localStorage.getItem("email")
  
  constructor(
    public DepotService: DepotService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      nom_dep:[this.nom_dep, Validators.required],
    })
  }

  ngOnInit(): void {
    this.handlePageChange(this.page);
    this.DepotService.onRefreshList.subscribe(()=>
      this.listeDepots()
    )
  }

  // getNomDepot(){
  //   const id_dep = this.idDepot;
  //   const idDepotNom_dep = this.DepotService.getIdDepot(id_dep)
  //   console.log( idDepotNom_dep);

  // }

  listeDepots(): void {
    this.DepotService.getDepot(this.page).subscribe(
      (data: DepotResponse) => {
        this.depots = data.depots;  // Récupérer uniquement les dépôts
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }

  

  handlePageChange(page:any){
    this.page = page;
    this.listeDepots()
  }

  ajouterDepot() {
    const depot = new Depot(this.idDepot, this.nom_dep)

    this.DepotService.ajoutDepot(depot).subscribe(
      (response:any) => {
        // Message avec succéss

        this.valider();

        // Récupérer le dépôt ajouté et l'ajouter à la liste des dépôts
       console.log("response", response);

        // this.onAdd.emit(response)
        this.DepotService.onRefreshList.emit()

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

  getDepot(id:number){
    this.DepotService.getIdDepot(id)

    .subscribe(data =>{
    this.idDepot = data;

    this.idDepot = id
    console.log(this.idDepot);
    })

  };


  supprimerDep(id: number): void {
  
    this.DepotService.supprDepot(id).subscribe(
      (response: Depot) => {
        const index = this.depots.findIndex((dep: Depot) => dep.id_dep === id);
  
        if (index !== -1) {
          this.depots.splice(index, 1);
        } else {
        }
  
        this.validerSuppr();
        this.handlePageChange(this.page);
      },
      (error) => {
        console.error('Erreur lors de la suppression du dépôt', error);
      }
    );
  }
  
  


 modification(){

   let id = this.idDepot;

   console.log("id_mo", id);
   console.log("this.Depot", this.depot);

   this.DepotService.modification(id, this.depot).subscribe({
     next: (response) =>{
       console.log('update', response);

       const index = this.depots.findIndex((dep:Depot) =>dep.id_dep == id);

       const nom_dep =  this.depots[index] = response.depot;

       console.log("aaaa", nom_dep);

       this.valider();
       this.DepotService.onRefreshList.emit()
     },
     error:(err) =>{
       console.log("err", err);

       this.error();
     }
   })

 }


}
