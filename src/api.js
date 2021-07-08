const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: async keyword => {
    try{
      const response = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
      console.log(response);
      if(response.ok)
        return await response.json();
    }catch(e){
      console.error(e);
    }
  },

  // [D] 자세히보기
  catsId: async id => {
    try{
      const response = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
      if(response.ok)
        return await response.json();
    }catch(e){
      console.error(e);
    }

  },

  // [D] random50 
  random50: async () => {
    try{
      const response = await fetch(`${API_ENDPOINT}/api/cats/random50`);
      if(response.ok)
        return await response.json();
    }catch(e){
      console.error(e);
    }

  }
};


