export interface DepotResponse {
  page: string;
  depots: Depot[];
}

export class Depot {
  id_dep: number;
  nom_dep?: string;
  emplacement?: string;

  constructor(id_dep: number, nom_dep?: string, emplacement?: string) {
    this.id_dep = id_dep;
    this.nom_dep = nom_dep;
    this.emplacement = emplacement;
  }
}
