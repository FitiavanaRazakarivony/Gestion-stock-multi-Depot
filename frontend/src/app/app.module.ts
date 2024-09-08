import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { ProduitComponent } from './produit/produit.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { DepotComponent } from './depot/depot.component';
import { AjoutDepotComponent } from './depot/service/ajout/ajout.component';
import { ListeUtilisateurComponent } from './utilisateur/service/liste/liste-utilisateur.component';
import { AjoutUtilisateurComponent } from './utilisateur/service/ajout/ajout-utilisateur.component';
import { ListeDepotComponent } from './depot/service/liste/liste-depot.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockComponent } from './stock/stock.component';
import { ListeStockComponent } from './stock/service/liste/list.component';
import { AjoutProduitComponent } from "./produit/service/ajout/ajout.component";
import { ListeProduitComponent } from "./produit/service/liste/liste.component";
import { AjoutStockComponent } from './stock/service/ajout/ajout.component';
import { MouvementComponent } from './mouvement/mouvement.component';
import { ListeMouvementomponent } from './mouvement/service/liste/list.component';
import { AjoutMouvementComponent } from './mouvement/service/ajout/ajout.component';
import { slideComponent } from './slide/slide.component';
import { AuthComponent } from './auth/auth.component';
import { ProtectedComponent } from './protected/protected.component';
import { JwtInterceptor } from './interceptor/JwtInterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BouttonUpdateComponent } from './boutton/miseajout/boutton.component';
import { BouttonDeleteComponent } from './boutton/supprimer/boutton.component';
import { SeDeconnecterComponent } from './navbar/seDeconnecter/seDeconnecter.component';
import { RechercheDepotComponent } from './depot/service/recherche/recherche-depot.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsComponent } from './icons/icons.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AjoutEmplacementComponent } from './emplacement/service/ajout/ajout.component';
import { EmplacementComponent } from './emplacement/emplacement.component';
import { ListeEmplacementComponent } from './emplacement/service/liste/liste-emplacement.component';
import { PourcentageComponent } from './slide/pourcentage/pourcentage.component';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule
  ],
  declarations: [
    //icone
    IconsComponent,

    AppComponent,
    NavbarComponent,

    // Boutton
    BouttonUpdateComponent,
    BouttonDeleteComponent,


    // slide
    slideComponent,
    PourcentageComponent,

    // les modules Produits
    ProduitComponent,
    ListeProduitComponent,
    AjoutProduitComponent,

    // les modules Utilisations
    UtilisateurComponent,
    ListeUtilisateurComponent,
    AjoutUtilisateurComponent,

    // les modules Depots
    DepotComponent,
    AjoutDepotComponent,
    ListeDepotComponent,
    RechercheDepotComponent,
        
    // les modules Stocks
    StockComponent,
    ListeStockComponent,
    AjoutStockComponent,

    // les modules Stocks
    MouvementComponent,
    ListeMouvementomponent,
    AjoutMouvementComponent,

    //Authentification
    AuthComponent,
    ProtectedComponent,

    //SeDeconnecter
    SeDeconnecterComponent,

    //emplacement
    EmplacementComponent,
    AjoutEmplacementComponent,   
    ListeEmplacementComponent 


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
