import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    constructor(private authSerice: AuthService, private router: Router){}

    canActivate():boolean{
        if (!this.authSerice.isAuthentication()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}