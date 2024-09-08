import { NgModule } from "@angular/core";
import { ProduitComponent } from "./produit/produit.component";
import { RouterModule, Routes } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { DepotComponent } from "./depot/depot.component";
import { UtilisateurComponent } from "./utilisateur/utilisateur.component";
import { MouvementComponent } from "./mouvement/mouvement.component";
import { StockComponent } from "./stock/stock.component";
import { slideComponent } from "./slide/slide.component";
import { AuthComponent } from "./auth/auth.component";
import { ProtectedComponent } from "./protected/protected.component";
import { IconsComponent } from "./icons/icons.component";
import { EmplacementComponent } from "./emplacement/emplacement.component";

const routes: Routes = [
    // {path:'', component:slideComponent},

    {path:'gestion_de_stock_multi-tâche', component:slideComponent},
    {path:'gestion_de_stock_multi-tâche/produit', component:ProduitComponent},
    {path:'gestion_de_stock_multi-tâche/depot', component:DepotComponent},
    {path:'gestion_de_stock_multi-tâche/utilisateur', component:UtilisateurComponent},
    {path:'gestion_de_stock_multi-tâche/mouvement', component:MouvementComponent},
    {path:'gestion_de_stock_multi-tâche/stock', component:StockComponent},
    {path:'gestion_de_stock_multi-tâche/emplacements', component:EmplacementComponent},

    {path:'login', component:AuthComponent},
    {path:'register', component:AuthComponent},
    {path:'protected', component:ProtectedComponent},
    {path:'', redirectTo:'/login',pathMatch:'full'},

]

@NgModule({
    declarations:[],
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
