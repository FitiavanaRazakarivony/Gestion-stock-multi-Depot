import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core'
import { DepotService } from '../depot.service'
import { Depot} from '../../depot.model'
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { escape } from 'node:querystring';

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
  nom_dep: any = 'Depot'; 
  idDepot: any = null;
  nom_modifi:any = '';

  // depots: Depot[] = [] // Déclarer la propriété depots
  emailLocalStorage = localStorage.getItem("email")
  
  constructor(
    public depotService: DepotService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      nom_dep:[this.nom_dep, Validators.required],
    })
  }

  ngOnInit(): void {
    this.handlePageChange(this.page);
    this.depotService.onRefreshList.subscribe(()=>
      this.listeDepots(),
      this.handlePageChange(this.page)
    )

    this.countDepot(); 
  }

  countDepot():number{
    this.depotService.countDepot()
    .subscribe(data=>{
      this.sommes = data.total_depot;
    });
    console.log("somme",this.sommes);

    return this.sommes;
  }

  listeDepots(): void {
    this.depotService.getDepot(this.page).subscribe(
      (data) => {
        this.depots = data;  // Récupérer uniquement les dépôts
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }  

  handlePageChange(page:any){
    this.page = page;
    this.depotService.onRefreshList.emit()

    this.listeDepots()
  }

  ajouterDepot() {
    const depot = new Depot(this.idDepot, this.nom_dep)

    this.depotService.ajoutDepot(depot).subscribe(
      (response:any) => {
        // Message avec succéss

        this.valider();

        // Récupérer le dépôt ajouté et l'ajouter à la liste des dépôts
       console.log("response", response);

        // this.onAdd.emit(response)
        this.depotService.onRefreshList.emit()

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
    this.depotService.getIdDepot(id)

    .subscribe(data =>{
    this.idDepot = data;
    this.nom_modifi = data.nom_dep;

    this.nom_dep = data.nom_dep

    console.log("id_depot", data.nom_dep);
    
    this.idDepot = id
    console.log(this.idDepot);
    })

  };

  supprimerDep(id: number): void {
  
    this.depotService.supprDepot(id).subscribe(
      (response: Depot) => {
        const index = this.depots.findIndex((dep: Depot) => dep.id_dep === id);
  
        if (index !== -1) {
          this.depots.splice(index, 1);
        } else {
        }
  
        this.depotService.onRefreshList.emit()

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

    const a = this.depot.nom_dep = this.nom_dep; 
    console.log('aaaaaa',a );
    
    this.depotService.modification(id, this.depot).subscribe({
      next: (response) =>{
        console.log('update', response);

        const index = this.depots.findIndex((dep:Depot) =>dep.id_dep == id);

        const nom_dep =  this.depots[index] = response.depot;

        console.log("aaaa", nom_dep);

        this.valider();
        this.depotService.onRefreshList.emit()
      },
      error:(err) =>{
        console.log("err", err);

        this.error();
      }
    })

  }

}
