export default class PageModel {
    constructor(name = '', icon = '', routerTo = {}) {
        this.name = name;
        this.icon = icon;
        this.routerTo = routerTo;
    }
}