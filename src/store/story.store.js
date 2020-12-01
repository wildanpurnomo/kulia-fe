import StoryService from '@/services/story.service';

const initialStoryState = {
    personalStories: [],
    personalFollowingList: [],
};

export const story = {
    namespaced: true,
    state: initialStoryState,
    actions: {
        discoverUsers({ commit }, usernameQuery) {
            return StoryService.discoverUsers(usernameQuery)
                .then(
                    response => {
                        commit('doNothing');
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        getPersonalStories({ commit }) {
            return StoryService.getPersonalStories()
                .then(
                    response => {
                        commit('updatePersonalStories', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        getPersonalFollowing({ commit }) {
            return StoryService.getPersonalFollowing()
                .then(
                    response => {
                        commit('updateFollowingList', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );
        },
        followUser({ commit }, followingData) {
            return StoryService.followUser(followingData)
                .then(
                    response => {
                        commit('updateFollowingList', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => { return Promise.reject(error); }
                )
        },
        unfollowUser({ commit }, unfollowingData) {
            return StoryService.unfollowUser(unfollowingData)
                .then(
                    response => {
                        commit('updateFollowingList', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => { return Promise.reject(error); }
                )
        },
        resetState({ commit }) {
            commit('resetState');
        }
    },
    mutations: {
        updatePersonalStories(state, stories) {
            state.personalStories = stories;
        },
        updateFollowingList(state, followingList) {
            state.personalFollowingList = followingList;
        },
        resetState(state) {
            state.personalFollowingList = [],
            state.personalStories = []
        },
        doNothing() {
        }
    },
    getters: {
        personalStories: (state) => {
            return state.personalStories;
        },
        personalFollowingList: (state) => {
            return state.personalFollowingList;
        }
    }
}