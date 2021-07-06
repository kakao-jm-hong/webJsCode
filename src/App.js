import {Image} from './components/Image.js';
import {Loading} from './components/Loading.js';
import {Node} from './components/Node.js';
import {Breadcrumb} from './components/Breadcrumb.js';

const template =`
    <nav id="breadcrumb" class="Breadcrumb"></nav>
    <div id="node" class="Nodes"></div>
`

export default class App {
    constructor(containerId, store) {
        const containerElement = document.getElementById(containerId);

        if(!containerElement){
            throw '최상위 컨테이너가 없습니다.';
        }
        this.store = store;
        this.template = template;
        this.renderTemplate = template;
        this.container = containerElement;
    }

    updateView() {
        this.container.innerHTML = this.renderTemplate;
        this.renderTemplate = this.template;
    }

    render() {
        this.updateView();

        // Image component
        this.image =  new Image("root");
        this.image.render();

        // Loadin component
        this.loading = new Loading("root");
        this.loading.render();

        // Breadcrumb
        this.breadcrumb = new Breadcrumb("breadcrumb",this.store);
        // this.breadcrumb.render();

        // Node component
        this.node = new Node("node",this.store, this.image, this.loading, this.breadcrumb);
        this.node.render();
    }
}