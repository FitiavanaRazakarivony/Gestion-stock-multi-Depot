import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProduitService } from '../produit.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produit } from '../../produit.model';
import { MouvementService } from '../../../mouvement/service/mouvement.service';


@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css'],
})
export class AjoutProduitComponent implements OnInit{
  @Output()estAjout = new EventEmitter;
  @Input() produits: any[] = [];

  myForm:FormGroup
  sommes: number = 0;
  page = 1

  photo_p!: string |undefined;
  designation_p: string = "";
  categorie_p: string = "";
  prix_p: number | undefined;
  longeur: number | undefined;
  largeur: number | undefined;
  hauteur: number | undefined;

  currentFile?:File;
  message = '';
  preview = '';
  imageInfos?: Observable<any>;
  emailLocalStorage = localStorage.getItem("email");

  constructor(
    public produitService: ProduitService,
    public mouvementService: MouvementService,
    private fb: FormBuilder
  ){
    this.myForm = this.fb.group({
      designation_p:[this.designation_p, Validators.required],
      photo_p:[this.photo_p, Validators.required],
      categorie_p:[this.categorie_p, Validators.required],
      prix_p:[this.prix_p, [Validators.required, this.invalidValueValidator]],
      longeur:[this.longeur, [Validators.required, this.invalidValueValidator]],
      largeur:[this.largeur,  [Validators.required, this.invalidValueValidator]],
      hauteur:[this.hauteur, [Validators.required, this.invalidValueValidator]],
    })
  };

  // Validateur personnalisé pour vérifier si la quantité est inférieur égale à 0
  invalidValueValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return control.value <= 0 ? { zeroQuantity: true } : null;
  }

  ngOnInit(): void {
    this.imageInfos = this.produitService.getfiles();
    this.produitService.countProduit()
    .subscribe(data=>{
      this.sommes = data.total_p;
      console.log("total", data);
    });
    
    // this.countProd()
    // this.handlePageChange(this.page)
  }

  countProd():number{
    this.produitService.countProduit()
    .subscribe(data=>{
      this.sommes = data.total_p;
    });
    return this.sommes;
  }

  selectFile(event: any): void {
    this.message='';
    this.preview='';

    const selectedFiles = event.target.files;

    if(selectedFiles){
      const file: File | null = selectedFiles.item(0);

      this.photo_p = file?.name

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e:any) =>{
          // console.log(e.target.result);
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }

    }

  }

  ajoutProduit(){
    const produit = {
      designation_p:this.designation_p,
      categorie_p:this.categorie_p,
      prix_p:this.prix_p,
      file:this.preview,
      photo_p : this.photo_p,
      largeur : this.largeur,
      longeur : this.longeur,
      hauteur : this.hauteur
    };

    this.produitService.ajoutProduit(produit).subscribe(
      (response:any) =>
        {

          this.valider();
          this.estAjout.emit(response);        
          const a = this.countProd()
          console.log("aaaa", a);
          
        },
      (erreur:any) => {
        console.log("erreur", erreur)

        this.error()
      }

    );
  }

  valider(){
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2000,
    });
    Toast.fire({
      icon: "success",
      title: "Ajout avec succes"
    })
  }

  validerSuppr(){
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2000,
    });
    Toast.fire({
      icon: "success",
      title: "Suppression avec succes"
    })
  }

  error(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Vérifiez bien!",
    });
  }
  
  supprimerProduit(id:number){

    this.produitService.supprProduit(id).subscribe(
      (response:Produit) => {

          const index = this.produits.findIndex(
            (prd:Produit) => prd.id_p == id)
          this.produits.splice(index,1)
          this.validerSuppr();      

        },
      erreur =>{
        console.log("errrooor", erreur);

        this.error();
      }
    );
  }

  listeProduit(){
    this.produitService.getProduit(this.page).subscribe(data =>{
      this.produits = data;
      console.log("produits", data);
      
    })
  }

  handlePageChange(page:any){
    this.page = page;
    this.listeProduit()
  }

}
