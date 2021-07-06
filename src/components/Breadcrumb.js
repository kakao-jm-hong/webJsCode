import Base from '../core/BaseComponents.js';

const template = `
    <div>{{__name__}}</div>
`

export class Breadcrumb extends Base{
    constructor(containerId, store) {
        super(containerId, template);
        this.html = [];
        this.store = store;
    }

    addHtml(str) {
        this.html.push(str);
    }

    getHtml() {
        const ret = this.html.join('');
        this.html = [];
        return ret;
    }

    // override
    updateView() {
        this.container.innerHTML = this.getHtml();
    }

    getData(data) {
        var myTemplate = template;
        myTemplate = myTemplate.replace(`{{__name__}}`,data);
        return myTemplate;
    }

    render() {
        this.store.route.forEach(element => {
            this.addHtml(this.getData(element));
        });

        this.updateView();
    }
}