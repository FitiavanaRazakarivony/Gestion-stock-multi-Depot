import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../produit.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {


  private apiUrl =  environment.localhostUrl+"/produit";

  constructor(private http: HttpClient) { }

  getProduit( page:number ): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}?page=${page}`);
  }

  getByIdProduit(id: number): Observable<Produit>{
    console.log(`${this.apiUrl}/detailProduit/${id}`);
    
    return this.http.get<Produit>(`${this.apiUrl}/detailProduit/${id}`)
  }

  ajoutProduit(produit: Produit):Observable<Produit>{
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  getfiles():Observable<Produit>{
    return this.http.get<Produit>(`${this.apiUrl}`);
  }

  countProduit(): Observable<{total_p:number}> {
    return this.http.get<{total_p:number}>(`${this.apiUrl}/count`)
  }
  supprProduit(id: number): Observable<Produit>{
    return this.http.delete<Produit>(`${this.apiUrl}/${id}`)
  }
  searchProduits(designation: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?designation=${designation}`);
  }

}


