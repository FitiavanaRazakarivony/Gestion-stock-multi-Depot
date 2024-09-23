import { Component, OnInit } from '@angular/core'
import { DepotService } from './service/depot.service'
import { Depot, DepotResponse } from './depot.model'

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrl: './depot.component.css'
})
export class DepotComponent implements OnInit{  
  titre = "Listes des dépots"
  // liste Depot
  depots: Depot[] = []
  depotSuppr = false
  page = 1;
  constructor(private DepotService: DepotService){}

  ngOnInit(): void {
    this.listeDepots();
  }
  // fin liste Depot
  listeDepots(): void {
    this.DepotService.getDepot(this.page).subscribe(
      (data) => {
        this.depots = data; // Utilisez la propriété "depots" de "DepotResponse"
        console.log('depots', data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }
  addDepot(depot: Depot){
    this.depots.push(depot)
  }

}

