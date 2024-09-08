import { Component } from '@angular/core'
import { AjoutEmplacementComponent } from '../ajout/ajout.component';

@Component({
  selector: 'app-liste-emplacement',
  templateUrl: './liste-emplacement.component.html',
  styleUrl: './liste-emplacement.component.css'

})
export class ListeEmplacementComponent  extends AjoutEmplacementComponent{

  // nomDep?:string;

  totalPage():number{

    const limitProduits:number = 5 ;
    const nbrProduits:any= this.sommes
    const totalPage = nbrProduits / limitProduits

    return Math.ceil(totalPage)

  }


}
