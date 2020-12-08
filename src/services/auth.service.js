import BaseService from './base.service';

class AuthService extends BaseService {
    constructor() {
        super();
    }

    login(userData) {
        return this.sendAPIRequest('/auth/login', 'POST', userData);
    }

    register(userData) {
        return this.sendAPIRequest('/auth/register', 'POST', userData);
    }

    logout() {
        return this.sendAPIRequest('/auth/logout', 'POST');
    }

    authenticate() {
        return this.sendAPIRequest('/auth/authenticate', 'GET');
    }

    editProfile(userData) {
        return this.sendAPIRequest('/user/edit_profile', 'PUT', userData);
    }

    editPassword(userData) {
        return this.sendAPIRequest('/user/edit_password', 'POST', userData)
    }
}

export default new AuthService();