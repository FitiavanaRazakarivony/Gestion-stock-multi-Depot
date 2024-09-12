import { Component, EventEmitter, Output, output } from '@angular/core';
import { StockService } from '../stock.service';
import { ProduitService } from '../../../produit/service/produit.service';
import { DepotService } from '../../../depot/service/depot.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DepotResponse } from '../../../depot/depot.model';



@Component({
  selector: 'app-ajout-stock',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})
export class AjoutStockComponent {

  myForm:FormGroup

  @Output()estAjoutStock = new EventEmitter();

  qtt_st? : number;
  id_p? : number;
  id_dep? : number;
  emailLocalStorage = localStorage.getItem("email")

  produits: any[] = [];
  depots: any[] = [];

  page = 1;

  constructor(
    private produitsService: ProduitService,
    private depotService: DepotService,
    private stockService: StockService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      qtt_st:[this.qtt_st, Validators.required],
      id_p:[this.id_p, Validators.required],
      id_dep:[this.id_dep, Validators.required],

    })
  }

  ngOnInit(): void {

    this.produitsService.getProduit(this.page).subscribe(data => {
      this.produits = data;
    });
    this.listeDepots();
  }

  listeDepots(): void {
    this.depotService.getDepot(this.page).subscribe(
      (data: DepotResponse) => {
        this.depots = data.depots; // Utilisez la propriété "depots" de "DepotResponse"
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }
  ajoutStock() {
    const stock = {
      qtt_st: this.qtt_st,
      id_p: this.id_p,
      id_dep: this.id_dep
    };

    console.log("les stocks", stock);

    this.stockService.ajoutStock(stock).subscribe(

      (response: any) => {

        this.valider();
        response.stock.produit = response.produit;
        response.stock.depot = response.depot;
        this.estAjoutStock.emit(response.stock);

      },
      (erreur: any) => {
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
      text: "Please check your authentication!",
    });
  }
}
