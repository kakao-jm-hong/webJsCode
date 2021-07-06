import Base from '../core/BaseComponents.js';

const template = `
    <span>{{__test__}}</span>
`

export class Test extends Base{
    constructor(containerId) {
        super(containerId, template);
    }

    render() {
        this.setTemplateData('test','가즈아');
        this.updateView();
    }
}