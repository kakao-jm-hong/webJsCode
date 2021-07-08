class Banner {
    $bannerInfo = null;
    data = null;
    constructor($target) {
        const $bannerInfo = document.createElement('div');
        $bannerInfo.className = 'banner';
        // this.data = onRandom();

        $bannerInfo.innerHTML = `
            <button type="button" class="prev">이전</button>
            <div id="banner_inner" class="banner_inner"></div>
            <button type="button" class="next">다음</button>
        `;

        this.$bannerInfo = $bannerInfo;
        console.log($bannerInfo)
        this.$banner_inner = document.getElementById('banner_inner');
        $target.appendChild(this.$bannerInfo);
    }

    setState(nextData) {
        this.data = nextData;
        this.render();
    }

    render() {
        const data = this.data.banner;

        this.$banner_inner.innerHTML = data
        .map(
          cat => `
            <div class="banner_item">
              <img src=${cat.url} alt=${cat.name} />
            </div>
          `
        )
        .join("");
        
    }
}