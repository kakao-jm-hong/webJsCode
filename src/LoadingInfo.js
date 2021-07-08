const template = `
    <div class="loading"></div>
    <div id="loading-text">loading</div>
`;

class LoadingInfo {
    $loadingInfo = null;
    data = null;
  
    constructor({ $target, data }) {
        const $loadingInfo = document.createElement("div");
        $loadingInfo.className = "loading-container";
        this.$loadingInfo = $loadingInfo;
        this.data = data;
        this.$loadingInfo.style.display = this.data.visible ? 'block' : 'none';
        $target.appendChild($loadingInfo);
    
        this.render();
  
    }

    onChange() {
        this.data.visible = !this.data.visible;
        this.$loadingInfo.style.display = this.data.visible ? 'block' : 'none';
    }
  
    render() {
        this.$loadingInfo.innerHTML = template;
    }
  }
  