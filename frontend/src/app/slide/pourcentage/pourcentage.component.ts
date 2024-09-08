import { Component } from '@angular/core';
import { AjoutEmplacementComponent } from '../../emplacement/service/ajout/ajout.component';

@Component({
  selector: 'app-pourcentage',
  templateUrl: './pourcentage.component.html',
  styleUrl: './pourcentage.component.css',
  
})

export class PourcentageComponent extends AjoutEmplacementComponent{
  
  getClassByPercentage(pourcentage: number): string {
    if (pourcentage >= 100) {
      return 'alert-danger'; // Rouge pour 100% ou plus
    } else if (pourcentage >= 50) {
      return 'alert-warning blinking'; // Orange clignotant pour 50% ou plus
    } else if (pourcentage >= 20) {
      return 'alert-info'; // Bleu ou vert pour 20% ou plus
    } else {
      return 'alert-success'; // Vert pour en dessous de 20%
    }
  }
  
  
}
