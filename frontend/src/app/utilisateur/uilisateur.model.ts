export class Utilisateur{
    id_ut?: number
    email_ut?: string
    mdp?:string
    mdp_ut?: string

    constructor(
        id_ut: number,
        email_ut: string,
        mdp: string,
    ){
        this.id_ut =  id_ut
        this.email_ut = email_ut
        this.mdp = mdp
    }

    // affectation(){
    //     return this.mdp = this.mdp_ut
    // }
}