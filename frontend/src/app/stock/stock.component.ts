import { Component } from '@angular/core';
import { StockService } from './service/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  titre="Listes des stocks"

  stocks: any [] = [];
  constructor(private stockService: StockService ){}

  ngOnInit(): void {
    this.stockService.getStock().subscribe(
      (data) => {
        this.stocks = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }

  ajoutStock(stock:any){
    this.stocks.push(stock);
  }

}
