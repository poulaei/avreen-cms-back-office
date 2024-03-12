export class AuthModel {

    token: string;
    name: string;

    setAuth(auth: AuthModel) {
        this.token = auth.token;
        this.name = auth.name;
    }
}
