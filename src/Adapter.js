class Adapter {
    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    getResources(){
        return fetch(this.baseUrl)
        .then(response => response.json())
    }
}