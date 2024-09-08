import { Component, OnInit } from '@angular/core'
import { EmplacementService } from './service/emplacement.service'
import { Emplacement } from './emplacement.model'

@Component({
  selector: 'app-emplacement',
  templateUrl: './emplacement.component.html',
  styleUrl: './emplacement.component.css'
})
export class EmplacementComponent implements OnInit{  
  titre = "Listes des emplacements"
  // liste emplacement
  emplacements: Emplacement[] = []
  emplacementSuppr = false
  page = 1;
  constructor(private emplacementService: EmplacementService){}

  ngOnInit(): void {
    this.emplacementService.getEmplacement(this.page).subscribe(data =>{
      this.emplacements = data
    })
  }

  // fin liste emplacement

  addemplacement(emplacement: Emplacement){
    this.emplacements.push(emplacement)
  }

}

