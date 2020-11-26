import BaseService from './base.service';

class ContentService extends BaseService {
    constructor() {
        super();
    }

    getContentById(contentId) {
        return this.sendAPIRequest(`/content/${contentId}`, 'GET');
    }

    getPersonalContent() {
        return this.sendAPIRequest('/content/personal/me', 'GET');
    }

    getContentByCreatorId(creatorId) {
        return this.sendAPIRequest(`/content/by_creator/${creatorId}`, 'GET');
    }

    createContent(contentData) {
        return this.sendAPIRequest('/content', 'POST', contentData);
    }

    editContent(contentData) {
        return this.sendAPIRequest(`/content/edit/${contentData._id}`, 'PUT', contentData);
    }

    deleteContent(contentId) {
        return this.sendAPIRequest(`/content/delete/${contentId}`, 'DELETE');
    }
}

export default new ContentService();