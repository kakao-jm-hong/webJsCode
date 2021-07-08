console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.banner = new Banner( {
      $target
    });

    try{
        const {data} = await api.random50();
        this.banner.setState(data)
    }catch(e){
        console.error(e);
    }
   

    this.searchInput = new SearchInput({
      $target,
      onSearch: async keyword => {
        try{
          this.loadingInfo.onChange();
          const {data} = await api.fetchCats(keyword);
          this.setState(data);
        }catch(e){
          console.error(e);
        }finally{
          this.loadingInfo.onChange();
        }
      },
      onClick: async ()=> {
        try{
          this.loadingInfo.onChange();
          const {data} = await api.random50();
          this.setState(data);
        }catch(e){
          console.error(e);
        }finally{
          this.loadingInfo.onChange();
        }
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async image => {
        try{
          this.loadingInfo.onChange();
          const {data} = await api.catsId(image.id);
          this.imageInfo.setState({
            visible: true,
            image: data
          });
        }catch(e){
          console.error(e);
        }finally{
          this.loadingInfo.onChange();
        }
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });

    this.loadingInfo = new LoadingInfo({
      $target,
      data: {
        visible: false,
      }
    });
  }

  setState(nextData) {
    console.log('app');
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
