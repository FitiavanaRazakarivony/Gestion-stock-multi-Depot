import { Component, Input } from '@angular/core';
import { ProduitService } from '../produit.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-produit',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})
export class ListeProduitComponent {

  @Input() produits: any[] = [];

  constructor(private produitService: ProduitService){}

  supprimerProduit(id:number){

    this.produitService.supprProduit(id).subscribe(
      (response:any) => {

        this.valider();
        const index = this.produits.findIndex(
          (mvt:any) => mvt.id_mvt == id)
          this.produits.splice(index,1) // firy no ho fafana amin ilaina tableaux "index"

      },
      erreur =>{
        this.error();
      }
    );

  }

  valider(){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  }

  error(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please check your authentication!",
    });
  }
}
