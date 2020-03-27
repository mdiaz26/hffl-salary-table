class Adapter {
    constructor(baseUrl){
        this.baseUrl = baseUrl
    }

    getResources(){
        return fetch(this.baseUrl)
        .then(response => response.json())
    }

    // getFranchise(franchiseId){
    //     return fetch(this.baseUrl + franchiseId)
    //     .then(response => response.json())
    // }
}