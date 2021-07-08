class ImageInfo {
    $imageInfo = null;
    data = null;
  
    constructor({ $target, data }) {
      const $imageInfo = document.createElement("div");
      $imageInfo.className = "ImageInfo";
      this.$imageInfo = $imageInfo;
      $target.appendChild($imageInfo);
  
      this.data = data;
  
      this.render();
  
      //
      this.$imageInfo.addEventListener('click', (e) => {
        const className = e.target.className;
        if(className ==='ImageInfo' || className === 'close') {
          // [D] fade out 적용
          this.fadeOut(this.$imageInfo);
        }
      })
  
      // [D] ESC 종료
      window.onkeyup = (e) => {
        var key = e.keyCode ? e.keyCode : e.which;
        if(key === 27){
          if(this.$imageInfo.style.display === 'block')
            this.fadeOut(this.$imageInfo);
        }
      }
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  
    fadeOut(element) {
      var op = 1;  // initial opacity
      var timer = setInterval(function () {
          if (op <= 0.1){
              clearInterval(timer);
              element.style.display = 'none';
          }
          element.style.opacity = op;
          element.style.filter = 'alpha(opacity=' + op * 100 + ")";
          op -= op * 0.1;
      }, 50);
    }
  
    fadeIn(element) {
      var op = 0.1;  // initial opacity
      element.style.display = 'block';
      var timer = setInterval(function () {
          if (op >= 1){
              clearInterval(timer);
          }
          element.style.opacity = op;
          element.style.filter = 'alpha(opacity=' + op * 100 + ")";
          op += op * 0.1;
      }, 10);
    }
  
    render() {
      if (this.data.visible) {
        const { name, url, temperament, origin } = this.data.image;
  
        this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;
        // this.$imageInfo.style.display = "block";
        this.fadeIn(this.$imageInfo);
  
        // [D]fade in 적용
  
      } else {
        this.$imageInfo.style.display = "none";
      }
    }
  }
  