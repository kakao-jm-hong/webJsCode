import Base from '../core/BaseComponents.js';

const template = `
    <div class="Modal ImageViewer">
        <div class="content">
            <img src="{{__filePath__}}">
        </div>
    </div>
`

export class Image extends Base{
    constructor(containerId) {
        super(containerId, template);
        this.filePath = './assets/sample_image.jpg';
        this.state = false;
        this.$target;
    }

    updateFilePath(filePath) {
        this.filePath = filePath;
        this.render();
    }

    appendChild() {
        let div = document.createElement('div');
        div.innerHTML = this.renderTemplate.trim();
        this.$target = div.firstChild;
        this.container.appendChild(this.$target);
        this.renderTemplate = this.template;

    }

    onChange() {
        this.state = !this.state;
        this.$target.style.display = this.state ? 'block' : 'none';
    }

    render() {
        this.setTemplateData('filePath',this.filePath);
        this.appendChild();
        this.$target.style.display = this.state ? 'block' : 'none';
    
        this.$target.addEventListener('click', (e)=> {
            this.onChange();
        });
    }
}