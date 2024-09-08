import { Component, Input, OnInit } from '@angular/core'
import { DepotService } from '../depot.service'
import { Depot } from '../../depot.model'
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AjoutDepotComponent } from '../ajout/ajout.component';

@Component({
  selector: 'app-liste-depot',
  templateUrl: './liste-depot.component.html',
  styleUrl: './liste-depot.component.css'

})
export class ListeDepotComponent  extends AjoutDepotComponent{

  // nomDep?:string;

  totalPage():number{

    const limitProduits:number = 5 ;
    const nbrProduits:any= this.sommes
    const totalPage = nbrProduits / limitProduits

    return Math.ceil(totalPage)

  }


}
