export class Mouvement{
    id_mvt?: number
    type_mvt?: string 
    date_mvt?: Date
    qtt_mvt?: number
    id_ut?: number
    id_dep?: number
    id_p?: number
    
    constructor(
        id_mvt: number,
        type_mvt: string,
        date_mvt: Date,
        qtt_mvt: number,
        id_ut : number,
        id_dep : number,
        id_p : number
    ){
        this.id_mvt = id_mvt
        this.type_mvt = type_mvt
        this.date_mvt = date_mvt
        this.qtt_mvt = qtt_mvt
        this.id_ut = id_ut
        this.id_dep = id_dep
        this.id_p = id_p
    }
}