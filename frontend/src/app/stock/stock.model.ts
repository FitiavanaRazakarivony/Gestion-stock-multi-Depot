export class Stock{
    id_st? : number
    qtt_st?: number
    id_dep?: number
    id_p?: number
    
    constructor(   
        id_st : number,
        qtt_st: number,
        id_dep: number,
        id_p: number
    ){
        this.id_st = id_st
        this.qtt_st = qtt_st
        this.id_dep = id_dep
        this.id_p = id_p
    }
}
