import api from './api'

class Auth {

    static isAuth = this.setIsAuth();

    static async setIsAuth() {
        const localEmail = localStorage.getItem("email");
        if (localEmail !== null) {
            try {
                const result = await api.post("/users/getTokenAndRole", { email: localEmail });
                if (!result) {
                    console.error("Email not found!");
                    this.isAuth = false;
                    return this.isAuth;
                }
                this.isAuth = (localStorage.getItem("token") === result.data.token) && (localStorage.getItem("role") === result.data.role);
                return this.isAuth;
            } catch (err) {
                console.error(err.result.data.message);
                this.isAuth = false;
                return this.isAuth;
            }
        } else {
            this.isAuth = false;
            return this.isAuth;
        };
    };


    static authenticate(token, role, email) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);
    }

    static deAuthenticate() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");

        this.isAuth = false;
    }
}


export default Auth;