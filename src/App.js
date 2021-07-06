import {Test} from './components/Test.js';

const template =`
    {{__Template__}}
`

const testComponents = `
    <div id="test"></div>
`;

export default class App {
    constructor(containerId) {
        const containerElement = document.getElementById(containerId);

        if(!containerElement){
            throw '최상위 컨테이너가 없습니다.';
        }
        
        this.template = template;
        this.renderTemplate = template;
        this.container = containerElement;
    }

    updateView() {
        this.container.innerHTML = this.renderTemplate;
        this.renderTemplate = this.template;
    }

    setTemplateData(key, value) {
        this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
    }

    render() {
        this.setTemplateData('Template',testComponents);
        this.updateView();

        // 하위 컴포넌트 추가.
        this.test = new Test('test');
        this.test.render();
    }
}