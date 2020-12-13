import StoryService from '@/services/story.service';

const initialStoryState = {
    personalStories: [],
    personalFollowingList: [],
    sampleUserList: [],
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
        shareContent({ commit }, sharingData) {
            return StoryService.shareContent(sharingData)
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
        updateAuthorPoints({ commit }, updateData) {
            return StoryService.updateAuthorPoints(updateData)
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
        getSampleUsers({ commit }) {
            return StoryService.getSampleUsers()
                .then(
                    response => {
                        commit('updateSampleUserList', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
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
        updateSampleUserList(state, sampleUserList) {
            state.sampleUserList = sampleUserList;
        },
        resetState(state) {
            state.personalFollowingList = [];
            state.personalStories = [];
            state.sampleUserList = [];
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
        },
        sampleUserList: (state) => {
            return state.sampleUserList;
        }
    }
}