import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MouvementService } from '../mouvement.service'
import { ProduitService } from '../../../produit/service/produit.service';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepotService } from '../../../depot/service/depot.service';

@Component({
  selector: 'app-ajout-mouvement',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})
export class AjoutMouvementComponent {

  myForm:FormGroup
  @Output()onAdd = new EventEmitter();
  @Input()mouvements : any[] = [];

  type_mvt:string = '';
  date_mvt?:Date;
  qtt_mvt?:number=0;
  id_p!:number;
  id_dep?:number;
  id_ut?:number;

  produits:any[] = [];
  utilisateurs:any[] = [];
  depots:any[] = [];
  emailLocalStorage = localStorage.getItem("email");
  page = 1;
  constructor(
    public MouvementService : MouvementService,
    public produitService: ProduitService ,
    public depotService : DepotService,
    public fb :FormBuilder
  ){
    this.myForm = this.fb.group({
      type_mvt: ['', Validators.required],
      date_mvt: ['', Validators.required],
      qtt_mvt: ['', [Validators.required, this.quantityValidator]], 
      id_dep: ['', Validators.required],
      id_p: ['', Validators.required],
    });
  }

  // Validateur personnalisé pour vérifier si la quantité est égale à 0
  quantityValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return control.value <= 0 ? { zeroQuantity: true } : null;
  }

  ngOnInit(): void {
    this.produitService.getProduit(this.page).subscribe(data => {
      this.produits = data;
    });

    this.depotService.getDepot(this.page).subscribe(data => {
      this.depots = data;
    })
    
    this.onRefreshList(); 
  }

  onRefreshList(){
    this.MouvementService.onRefreshList.subscribe(()=>{
      this.listeMouvement();
    })
  }
  
  listeMouvement(){
    this.MouvementService.getMouvement().subscribe(data =>{
      this.mouvements = data;
    })
  }

  ajoutMouvement(){

    const mouvement = {
      type_mvt: this.type_mvt,
      date_mvt: this.date_mvt,
      qtt_mvt: this.qtt_mvt,
      id_p: this.id_p,
      id_dep: this.id_dep,
      id_ut: this.id_ut
    }
    this.MouvementService.ajoutMouvement(mouvement).subscribe(

      (response:any) =>{
        response.mouvement.utilisateur = response.utilisateur;
        // response.mouvement.nouvellDepot = response.nouvellDepot;
        response.mouvement.depot = response.depot;
        response.mouvement.produit = response.produit;

        this.valider();
        // this.onAdd.emit(response.mouvement)
        console.log("response---", response);
        this.MouvementService.onRefreshList.emit()

      },
      (erreur:any) =>{
        this.error(erreur.error.erreur);        
      }
    )
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

  error(message?: string ){
    if (message== null) {
      message = "Please check your add mouvement!" 
    }
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  }
}
