import { HttpClient } from '@angular/common/http'
import { EventEmitter, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Depot, DepotResponse } from '../depot.model'
import { environment } from '../../../environments/environments'

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  private apiUrl = environment.localhostUrl+"/depot"

  onRefreshList =  new EventEmitter
   
  constructor(private http: HttpClient) {}

  getDepot(page: number): Observable<DepotResponse> {
    return this.http.get<DepotResponse>(`${this.apiUrl}?page=${page}`);
  }
  
  ajoutDepot(depot: Depot): Observable<Depot>{
    return this.http.post<Depot>(this.apiUrl, depot)
  }

  supprDepot(id: number): Observable<Depot>{
    return this.http.delete<Depot>(`${this.apiUrl}/${id}`)
  }

  getIdDepot(id:number):Observable<Depot>{
    return this.http.get<Depot>(`${this.apiUrl}/${id}`)
  }

  modification(id:number, depot:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,depot);
  }

  onSearch(query:string):Observable<any>{
    return this.http.get<Depot>(`${this.apiUrl}/recherche?q=${query}`)
  }
}

