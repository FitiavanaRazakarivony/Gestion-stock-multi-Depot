import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Auth } from "./auth.model";
import { environment } from "../../environments/environments";

@Injectable({
    providedIn:'root'
})
export class AuthService{
    private apiUrl = environment.localhostUrl;

    constructor(private http: HttpClient){}

    register(role?:string,email_ut?: string, mdp_ut?: string): Observable<any>{
        return this.http.post(`${this.apiUrl}/register`, {role,email_ut, mdp_ut});
    }

    login(email_ut?: string, mdp_ut?: string): Observable<any>{
        return this.http.post(`${this.apiUrl}/login`, {email_ut, mdp_ut});
    }

    isAuthentication():boolean{
        return !!localStorage.getItem('token');
    }

    logout():void{

        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }

    protected():Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/protected`)
    }

}
