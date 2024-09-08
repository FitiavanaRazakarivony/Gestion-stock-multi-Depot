export class Depot{
  id_dep: number
  nom_dep?: string

  constructor(id_dep:number, nom_dep:string ){
    this.id_dep = id_dep
    this.nom_dep = nom_dep
  }
}
