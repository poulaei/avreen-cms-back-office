export class AuthModel {

    result: string;
    description: string;

    setAuth(auth: AuthModel) {
        this.result = auth.result;
        this.description = auth.description;
    }
}
