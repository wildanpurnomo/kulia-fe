import BaseService from './base.service';

class StoryService extends BaseService {
    constructor() {
        super();
    }

    discoverUsers(usernameQuery) {
        return this.sendAPIRequest(`/story/discover_users/?username=${usernameQuery}`, 'GET');
    }

    getPersonalStories() {
        return this.sendAPIRequest('/story/personal', 'GET');
    }

    getPersonalFollowing() {
        return this.sendAPIRequest('/story/following', 'GET');
    }

    followUser(followingData) {
        return this.sendAPIRequest('/story/follow', 'POST', followingData);
    }

    unfollowUser(unfollowingData) {
        return this.sendAPIRequest('/story/unfollow', 'POST', unfollowingData);
    }
}

export default new StoryService();