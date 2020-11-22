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
}

export default new AuthService();