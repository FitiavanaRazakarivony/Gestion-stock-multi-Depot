import { Component } from '@angular/core';
import { ListeMouvementomponent } from './service/liste/list.component';
import { MouvementService } from './service/mouvement.service';

@Component({
  selector: 'app-mouvement',
  templateUrl: './mouvement.component.html',
  styleUrl: './mouvement.component.css'
})
export class MouvementComponent {

  titre= "Listes des mouvements"
  // liste Mouvement

  mouvements: any[] = [];

  constructor(private MouvementService: MouvementService){}

  ngOnInit(): void {
    this.listeMouvement();
  }  // fin liste Mouvement

  addMouvement(mouvement:any){
    this.mouvements.push(mouvement);
  }

  listeMouvement(){
    this.MouvementService.getMouvement().subscribe(data =>{
      this.mouvements = data;
    })
  }

}
