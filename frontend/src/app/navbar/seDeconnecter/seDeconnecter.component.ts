import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Auth } from '../../auth/auth.model';

@Component({
  selector: 'app-seDeconnecter',
  templateUrl: './seDeconnecter.component.html',
  styleUrl: './seDeconnecter.component.css'
})
export class SeDeconnecterComponent {
  
  btnvert: boolean = true;
  ifAdmin: boolean = true;
  navbar:boolean = true;

  emailStorage = localStorage.getItem("email");

  @Input() email_ut?: Auth;

  constructor(private authService:AuthService){}

  getEmail(){
    let email = this.emailStorage ;

    if (email) {
      this.btnvert;
    }else{
      this.btnvert=false;
    }
    return email;
  }

  se_deconnecter():void{
    this.authService.logout();
  }
}
