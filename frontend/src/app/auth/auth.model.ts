export class Auth{
  role?: string
  email_ut?: string
  mdp_ut?: string

  constructor(email_ut:string, mdp_ut:string){
    this.email_ut = email_ut
    this.mdp_ut = mdp_ut
  }
}
