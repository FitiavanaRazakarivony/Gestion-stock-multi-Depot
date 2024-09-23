import { Component, OnInit } from '@angular/core';
import { ProduitService } from "./service/produit.service";
import { Produit } from './produit.model';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css',
})
export class ProduitComponent implements OnInit{

  titre="Listes des produits"
  // ngOnInit(): void {
  //   AOS.init({disable:'mobile'});
  //   AOS.refresh();
  // }

  produits: Produit[] = [];
  page = 1;

  constructor(private produitService: ProduitService){}

  
  ngOnInit(): void {
    this.produitService.getProduit(this.page).subscribe(data =>{
      this.produits = data;   
      console.log('data', data);
         
    }, error => console.log(error)
    )
  }

  ajoutProduit(produit : Produit){
    this.produits.push(produit);
    // this.ngOnInit()
  }
  
}
