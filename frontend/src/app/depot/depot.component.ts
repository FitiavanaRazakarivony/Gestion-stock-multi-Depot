import { Component, OnInit } from '@angular/core'
import { DepotService } from './service/depot.service'
import { Depot } from './depot.model'

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
    this.DepotService.getDepot(this.page).subscribe(data =>{
      this.depots = data
    })
  }
  // fin liste Depot

  addDepot(depot: Depot){
    this.depots.push(depot)
  }

}

