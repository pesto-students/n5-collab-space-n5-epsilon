import Axios from 'axios';
// import axios from "axios";
export const urlBackEnd = process.env.REACT_APP_LOCAL_URL;
class AuthAPI {
    constructor() {
        this.API = Axios.create({
            baseURL: urlBackEnd,
        });
    }


    emailLogin(data) {
        return this.API.post(`/api/auth/signIn`, data);
    }

    emailSignUp(data) {
        return this.API.post(`/api/auth/signUp`, data);
    }

    forgotPassword(data) {
        return this.API.post(`/api/auth/forgotPassword`, data);
    }

    // updatePassword(data) {
    //     return this.API.post(`/api/auth/updatePassword`, data);
    // }

    resetPassword(data) {
        return this.API.post(`/api/auth/resetPassword`, data);
    }

    getAddedUsers(data){
        return this.API.post(`/api/users/inviteUser`, data);
    }

    sendInviteToUsers(data){
        return this.API.post(`/api/users/inviteMailer`, data);
    }



    // projectURLGet(url, params) {
    //     return this.API.get(`/api/projects${url}`, params);
    // }
    //
    // projectURLDelete(url, params) {
    //     return this.API.delete(`/api/projects${url}`, params);
    // }
    //
    // projectURLPost(url, params) {
    //     return this.API.post(`/api/projects${url}`, params);
    // }

}

export default AuthAPI;
