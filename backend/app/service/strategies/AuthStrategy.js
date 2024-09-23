class AuthStrategy{
    async authenticate(token){
        throw new Error("Method not implemented")
    }
}
module.exports = AuthStrategy;