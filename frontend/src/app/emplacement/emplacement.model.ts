export class Emplacement{
  id_em: number
  nom_em?: string
  qtt_max?:number
  qtt_actuel?:number
  id_dep?:number

  constructor(id_em:number, nom_em:string, qtt_max:number,qtt_actuel:number, id_dep:number ){
    this.id_em = id_em
    this.nom_em = nom_em
    this.qtt_max = qtt_max
    this.qtt_actuel = qtt_actuel 
    this.id_dep = id_dep
  }
}
