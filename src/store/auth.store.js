import AuthService from '@/services/auth.service';
import UserModel from '@/models/user.model';

const initialAuthState = { userData: new UserModel() };

export const auth = {
    namespaced: true,
    state: initialAuthState,
    actions: {
        login({ commit }, userData) {
            return AuthService.login(userData)
                .then(
                    response => {
                        commit('authSuccess', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        register({ commit }, userData) {
            return AuthService.register(userData)
                .then(
                    response => {
                        commit('authSuccess', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        logout({ commit }) {
            return AuthService.logout()
                .then(
                    response => {
                        commit('logoutSuccess');
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );
        },
        authenticate({ commit }) {
            return AuthService.authenticate()
                .then(
                    response => {
                        commit('authSuccess', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => { return Promise.reject(error); }
                )
        },
        editProfile({ commit }, userData) {
            return AuthService.editProfile(userData)
                .then(
                    response => {
                        commit('authSuccess', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        editPassword({ commit }, userData) {
            return AuthService.editPassword(userData)
                .then(
                    response => {
                        commit('authSuccess', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        withGoogle({ commit }, userData) {
            return AuthService.withGoogle(userData)
                .then(
                    response => {
                        commit('authSuccess', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        }
    },
    mutations: {
        authSuccess(state, userData) {
            state.userData = userData;
        },
        logoutSuccess(state) {
            state.userData = initialAuthState.userData;
        },
    },
    getters: {
        userData: (state) => {
            return state.userData;
        }
    }
}