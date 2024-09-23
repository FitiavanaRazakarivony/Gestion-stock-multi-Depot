import { Component } from '@angular/core'
import { ListeDepotComponent } from '../liste/liste-depot.component'
import { DepotService } from '../depot.service';


@Component({
  selector: 'app-recherche-depot',
  templateUrl: './recherche-depot.component.html',
  styleUrl: './recherche-depot.component.css'

})
export class RechercheDepotComponent extends ListeDepotComponent{

  query: string ="";
  results: any [] = [];

  // constructor(private depotService: DepotService){}

  onSearch(){
      
      this.DepotService.onSearch(this.query).subscribe((data: any)=>{
                
        console.log("resultttt", this.results = data);
        
      })
  
  }
}
