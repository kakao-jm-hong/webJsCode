import Base from '../core/BaseComponents.js';
import {NodeApi} from '../core/api.js';
import {NODE_URL} from '../config.js'; 

const template = `
    <div data-node-id="{{__id__}}" class="Node">
        <img src="{{__src__}}">
        {{__name__}}
    </div>
`

const PREV_IMAGE_SRC =  './assets/prev.png';
const FILE = './assets/file.png';
const DIRECTORY = './assets/directory.png';

export class Node extends Base{
    constructor(containerId, store, image, loading, breadcrumb) {
        super(containerId, template);
        this.html = [];
        this.store = store;
        this.nodeUrl = NODE_URL.replace('@id','');
        this.image= image;
        this.loading = loading;
        this.breadcrumb = breadcrumb;
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

    onClick(id) {
        const node = this.store.getDataObj(id);
        if(node.type === 'DIRECTORY'){
            this.store.deepsPush();
            this.store.routePush(node.name);
            this.store.update();
            this.nodeUrl = NODE_URL.replace('@id',id);
            
            this.render();
        }else {
            if(node.filePath)
                this.image.updateFilePath(node.filePath);
            this.image.onChange();
        }
    }

    onBackClick() {
        const data = this.store.data = this.store.deepsPop();
        this.store.routePop();
        this.store.update();
        this.breadcrumb.render();
        // root 아닐 경우 이전으로가기 추가.
        if(!this.store.root) {
            this.addHtml(`
            <div class="Node">
                <img src="./assets/prev.png">
            </div>
            `)
        }
        data.forEach(element => {
            this.addHtml(this.getData(element));
        });

        this.updateView();

        this.container.querySelectorAll('.Node').forEach($node => {
            $node.addEventListener('click', (e) => {
                const id = e.target.dataset.nodeId;
                if(id){
                    this.onClick(id);
                }else{
                    this.onBackClick();
                }
            })
        });

    }

    getData(data) {
        var myTemplate = template;
        myTemplate = myTemplate.replace(`{{__id__}}`,data.id);
        myTemplate = myTemplate.replace(`{{__src__}}`,data.type === 'DIRECTORY' ? DIRECTORY: FILE);
        myTemplate = myTemplate.replace(`{{__name__}}`,data.name);
        return myTemplate;
    }

    setMyData(key, value) {
        this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
    }

    async render() {
        const api = new NodeApi(this.nodeUrl);
        this.loading.onChange();
        const data = this.store.data = await api.getData();
        this.loading.onChange();
        this.breadcrumb.render();
        
        // root 아닐 경우 이전으로가기 추가.
        if(!this.store.root) {
            this.addHtml(`
            <div class="Node">
                <img src="./assets/prev.png">
            </div>
            `)
        }
        data.forEach(element => {
            this.addHtml(this.getData(element));
        });

        this.updateView();

        this.container.querySelectorAll('.Node').forEach($node => {
            $node.addEventListener('click', (e) => {
                const id = e.target.dataset.nodeId;
                if(id){
                    this.onClick(id);
                }else{
                    this.onBackClick();
                }
            })
        });
    }
}