class Player {
    constructor(playerObj){
        this.id = playerObj.id
        this.name = playerObj.name
        this.nflTeam = playerObj.nfl_team
        this.salary = playerObj.salary
        this.franchise = playerObj.franchise
        this.contract = playerObj.contract
        this.position = playerObj.position
    }

    renderSinglePlayer(table){
        let tr = document.createElement('tr')
        tr.dataset.playerId = this.id
        tr.innerHTML = `
        <td class=${this.position}>${this.position}</td>
        <td>${this.futureContractYears(tr)}</td>
        <td>${this.salary}</td>
        `
        table.append(tr)
    }
    
    futureContractYears(tr){
        switch (this.contract) {
            case 1:
                tr.className = `contract`
                return this.name
                break;
            case 2:
                tr.className = `contract`
                return `${this.name} (${Math.ceil(this.salary * 1.4)})`
                break;
            case 3:
                tr.className = `contract`
                return `${this.name} (${Math.ceil(this.salary * 1.25)}, ${Math.ceil(this.salary * 1.25 * 1.25)})`
                break;
        
            default:
                return this.name
                break;
        }
    }
}