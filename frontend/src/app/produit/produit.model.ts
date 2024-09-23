export class Produit{
    id_p?: number
    designation_p?: string
    categorie_p?: string
    photo_p?: string
    poids_p?: number
    prix_p?: number

    constructor(
        id_p: number,
        designation_p: string,
        categorie_p: string,
        photo_p: string,
        poids_p: number,
        prix_p: number,
    ){
        this.id_p = id_p       
        this.designation_p = designation_p       
        this.categorie_p = categorie_p       
        this.photo_p = photo_p       
        this.poids_p = poids_p       
        this.prix_p = prix_p       
    }
}