import { Component, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Auth } from '../auth/auth.model';
import { response } from 'express';
import { faTachometerAlt, faUser, faBox, faWarehouse, faExchangeAlt, faClipboardList, faLocation } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  /* icone */
  faTachometerAlt = faTachometerAlt;
  faUser = faUser;
  faBox = faBox;
  faLocation = faLocation;
  faWarehouse = faWarehouse;
  faExchangeAlt = faExchangeAlt;
  faClipboardList = faClipboardList;

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
