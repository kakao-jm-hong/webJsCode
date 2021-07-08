class SearchResult {
    $searchResult = null;
    data = null;
    onClick = null;
  
    constructor({ $target, initialData, onClick }) {
      this.$searchResult = document.createElement("div");
      this.$searchResult.className = "SearchResult";
      $target.appendChild(this.$searchResult);
  
      this.data = initialData;
      this.onClick = onClick;
  
      this.render();
  
      window.addEventListener('scroll', (e) => {
        let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
        let windowHeight = window.innerHeight; // 스크린 창
        let fullHeight = document.body.scrollHeight; //  margin 값은 포함 x
      
        if(scrollLocation + windowHeight >= fullHeight){
          // [D] 페이지 위치에대한 간격이 없으므로 똑같은 데이터 렌더링 한번 더실행.
          console.log('downPage');
          this.appendPage();
          
        }
      });
    }
  
    //[D] Data추가
    appendPage() {
      const list = this.data
      .map(
        cat => {
          const div = document.createElement('div');
          div.className = "item";
          div.innerHTML =
          `
        <img src=${cat.url} alt=${cat.name} />
        <div class="hover">${cat.name}</div>
        `;
        this.$searchResult.appendChild(div);
      });
      
      // [D] 개선해야함
      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onClick(this.data[index]);
        });
      });
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  
    render() {
      if(this.data.length !== 0){
        this.$searchResult.innerHTML = this.data
          .map(
            cat => `
              <div class="item">
                <img src=${cat.url} alt=${cat.name} />
                <div class="hover">${cat.name}</div>
              </div>
            `
          )
          .join("");
    
        this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
          $item.addEventListener("click", () => {
            this.onClick(this.data[index]);
          });
        });
      }else {
        this.$searchResult.innerHTML =`
            <strong>검색된 결과가 없습니다</strong>
        `
      }
    }
  }
  