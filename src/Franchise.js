class Franchise {
    constructor(franchiseObj){
        this.id = franchiseObj.id
        this.nickname = franchiseObj.nickname
        this.owner = franchiseObj.owner
        this.location = franchiseObj.location
    }

    render(){
        let div = document.createElement("div")
        div.dataset.id = this.id
        div.className = "franchise"
        div.innerHTML = `
        <h3>${this.location} ${this.nickname}</h3>
        <table class="players-container">
            <tr>
                <th>Pos</th>
                <th>Player</th>
                <th>Salary</th>
            </tr>
        </table>
        `
        teamsDiv.append(div)
        const table = div.getElementsByTagName('table')[0]
        fetchAndRenderFranchisePlayers(this.id, table)
    }

    addFranchise(){
        let selector = document.querySelector("#drop-down")
            let option = document.createElement('option')
            option.value = this.id
            option.innerText = this.nickname
            selector.append(option)
    }
}