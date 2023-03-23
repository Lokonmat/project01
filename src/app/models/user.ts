export class User {
    constructor (
        public name: string,
        public password: string,
        private _token: string,
        private _tokenExpirationDate: Date
    ) { }

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}
// const user = User()
// user.email;
// user.password;