export class Emplacement{
  id_em: number
  nom_em?: string
  volume_actuel?:number
  qtt_actuel?:number
  id_dep?:number
  longeur?: number;
  largeur?: number;
  hauteur?: number;


  constructor(
    id_em:number, 
    nom_em:string, 
    volume_actuel:number, 
    qtt_actuel:number, 
    id_dep:number,
    longeur: number,
    largeur: number,
    hauteur: number,
  
  ){
    this.id_em = id_em
    this.nom_em = nom_em
    this.volume_actuel = volume_actuel 
    this.qtt_actuel = qtt_actuel 
    this.id_dep = id_dep
    this.longeur = longeur
    this.largeur = largeur
    this.hauteur = hauteur
  }
}
