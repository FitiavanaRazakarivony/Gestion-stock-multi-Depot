import { HttpClient } from '@angular/common/http'
import { EventEmitter, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Emplacement } from '../emplacement.model'
import { environment } from '../../../environments/environments'

@Injectable({
  providedIn: 'root'
})
export class EmplacementService {

  private apiUrl = environment.localhostUrl+"/Emplacement"

  onRefreshList =  new EventEmitter
   
  constructor(private http: HttpClient) {}

  getEmplacement(page:number): Observable<Emplacement[]> {
    return this.http.get<Emplacement[]>(`${this.apiUrl}?page=${page}`);
  }
  
  ajoutEmplacement(Emplacement: Emplacement): Observable<Emplacement>{
    return this.http.post<Emplacement>(this.apiUrl, Emplacement)
  }

  supprEmplacement(id: number): Observable<Emplacement>{
    return this.http.delete<Emplacement>(`${this.apiUrl}/${id}`)
  }

  getIdEmplacement(id:number):Observable<Emplacement>{
    return this.http.get<Emplacement>(`${this.apiUrl}/${id}`)
  }

  modification(id:number, Emplacement:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,Emplacement);
  }
}

