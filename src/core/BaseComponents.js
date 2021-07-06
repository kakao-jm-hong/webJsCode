export default class Base {
    constructor(containerId, template) {
        const containerElement = document.getElementById(containerId);

        if(!containerElement){
            throw `최상위 컨테이너${containerElement}가 없습니다.`;
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
}