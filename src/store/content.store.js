import ContentService from '@/services/content.service';
import ContentModel from '@/models/content.model';

const initialContentState = {
    personalContentList: [],
    detailContent: new ContentModel()
};

export const content = {
    namespaced: true,
    state: initialContentState,
    actions: {
        getContentById({ commit }, contentId) {
            return ContentService.getContentById(contentId)
                .then(
                    response => {
                        commit('updateDetailContent', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                )
        },
        getPersonalContent({ commit }) {
            return ContentService.getPersonalContent()
                .then(
                    response => {
                        commit('updatePersonalContentList', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );
        },
        getContentByCreatorId({ commit }, creatorId) {
            return ContentService.getContentByCreatorId(creatorId)
                .then(
                    response => {
                        commit('doNothing');
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );
        },
        createContent({ commit }, contentData) {
            return ContentService.createContent(contentData)
                .then(
                    response => {
                        commit('updatePersonalContentList', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );
        },
        editContent({ commit }, contentData) {
            return ContentService.editContent(contentData)
                .then(
                    response => {
                        commit('updatePersonalContentList', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );
        },
        deleteContent({ commit }, contentId) {
            return ContentService.deleteContent(contentId)
                .then(
                    response => {
                        commit('updatePersonalContentList', response.data.data);
                        return Promise.resolve(response);
                    },
                    error => {
                        return Promise.reject(error);
                    }
                );
        },
        resetState({ commit }) {
            commit('resetState');
        }
    },
    mutations: {
        updateDetailContent(state, contentData) {
            state.detailContent = contentData;
        },
        updatePersonalContentList(state, contentList) {
            state.personalContentList = contentList;
        },
        resetState(state) {
            state.personalContentList = [],
            state.detailContent = new ContentModel()
        },
        doNothing() { }
    },
    getters: {
        personalContentList: (state) => {
            return state.personalContentList;
        },
        detailContent: (state) => {
            return state.detailContent;
        }
    }
}