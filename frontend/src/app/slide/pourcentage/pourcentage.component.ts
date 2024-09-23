import { Component } from '@angular/core';
import { AjoutEmplacementComponent } from '../../emplacement/service/ajout/ajout.component';

@Component({
  selector: 'app-pourcentage',
  templateUrl: './pourcentage.component.html',
  styleUrl: './pourcentage.component.css',
  
})

export class PourcentageComponent extends AjoutEmplacementComponent{
  
  emplacement:any;

  override ngOnInit(): void {
    this.listeEmplacements()
  }

  getClassByPercentage(pourcentage: number): string {
    if (pourcentage >= 100) {
      return 'alert-danger'; // Rouge pour 100% ou plus
    } else if (pourcentage >= 50) {
      return 'alert-warning blinking'; // Orange clignotant pour 50% ou plus
    } else if (pourcentage >= 1) {
      return 'alert-info'; // Bleu ou vert pour 20% ou plus
    } else {
      return 'alert-success'; // Vert pour en dessous de 20%
    }
  }
  
  voirLeDetail(id: number) {

    // Premier appel pour récupérer les détails du produit
    this.emplacementService.getIdEmplacement(id).subscribe(
      (data: any) => {
        // Stocker les informations du produit  
        this.emplacement= data;
        console.log('donne', data);     
        
      },
      (error) => {
        // Gérer les erreurs de l'appel
        console.error("Erreur lors de la récupération des détails de l'emplacement", error);
      }
    );
  }
  
  
}
