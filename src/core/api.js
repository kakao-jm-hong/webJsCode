export class Api {
    constructor(url) {
        this.url =url;
    }

    async request() {
        try {
            const response = await fetch(this.url);
            return await response.json(); 
        } catch(e) {
            console.error(e);
        }
    }
}

export class NodeApi extends Api {
    constructor(url) {
        super(url);
    }

    async getData() {
        try{
            return await this.request();
        }catch(e) {
            console.error(e);
        }
    }
}