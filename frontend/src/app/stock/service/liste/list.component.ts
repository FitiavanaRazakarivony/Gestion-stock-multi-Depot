import { Component, Input } from '@angular/core';
import { StockService } from '../stock.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-stock',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListeStockComponent {
  @Input()stocks: any[] =[]
  
  histoStock:any  = null
  modifSuccess:boolean = false
  idDelete?:number // id produit à supprimer 

  constructor(private stockService: StockService){}

  setIdDelete(id_p:number){
    this.idDelete = id_p
  }

  
  voirLeDetail(id: number){
    try {
      this.stockService.getByIdStock(id)
      .subscribe(data =>{
        this.histoStock = data;
        console.log("donné", data)
        }
      )
    } catch (error) {
      console.log("error", error);
    }
  }

  supprimer(id:number){
    this.stockService.supprStock(id).subscribe(
      
      (response:any) =>{
        
        this.validerSuprr()
        const index = this.stocks.findIndex((stok:any)=>stok.id_st == id)
        this.stocks.splice(index,1) // firy no ho fafana amin ilaina tableaux "index"

      },
      (erreur:any) =>{
        this.error()
      }

    );
  }
  
  
  validerSuprr(){
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2000,
    });
    Toast.fire({
      icon: "success",
      title: "Delete succes"
    })
  }

  error(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please DOUBLON!",
    });
  }
}
