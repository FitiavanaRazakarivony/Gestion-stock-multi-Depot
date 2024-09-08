import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { UtilisateurService } from './service/utilisateur.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css',
})
export class UtilisateurComponent {
titre = "Listes des utilisateurs"

 // liste utilisateur

 utilisateurs: any[] = [];

 constructor(private utilisateurService: UtilisateurService){}

 ngOnInit(): void {
   this.utilisateurService.getUtilisateur().subscribe(data =>{
     this.utilisateurs = data;
   })
 }  // fin liste utilisateur

 ajoutUtilisateur(utilisateur:any){
  this.utilisateurs.push(utilisateur)
 }
}
