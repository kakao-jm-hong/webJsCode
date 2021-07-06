import Base from '../core/BaseComponents.js';

const template = `
    <div class="Modal Loading">
        <div class="content">
            <img src="./assets/nyan-cat.gif">
        </div>
    </div>
`

export class Loading extends Base{
    constructor(containerId) {
        super(containerId, template);
        this.state = false;
        this.$target;
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
        this.appendChild();
        this.$target.style.display = this.state ? 'block' : 'none';
    }
}