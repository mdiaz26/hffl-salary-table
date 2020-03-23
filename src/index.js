const BASE_URL = "http://localhost:3000/api/v1/franchises"
const adapter = new Adapter(BASE_URL)
const teamsDiv = document.getElementById("teams-container")

document.addEventListener("DOMContentLoaded", event => {
    console.log("here we go")
    adapter.getResources()
    .then(renderFranchises)

    renderDropDown()
})

const renderFranchises = (franchisesData) => {
    franchisesData.forEach(renderFranchise)
}

const renderFranchise = franchiseObj => {
    let franchise = new Franchise(franchiseObj)
    
    franchise.render()
}

const fetchAndRenderFranchisePlayers = (franchiseId, table) => {
    fetch(`http://localhost:3000/api/v1/franchises/${franchiseId}`)
    .then(response => response.json())
    .then(franchise => {
        renderPlayers(franchise.players, table)
        calculateTotalSalary(franchise.players)
    })
}

const renderPlayers = (players, table) => {
    players.forEach(playerObj => {
        let player = new Player(playerObj)
        player.renderSinglePlayer(table)
    })
    let total = calculateTotalSalary(players)
    table.prepend(total)
}

const calculateTotalSalary = (players) => {
    return players.reduce(reducer, 0)
}

const reducer = (accumulator, currentValue) => {
    return accumulator + parseInt(currentValue.salary)
}

const renderDropDown = () => {
    let selector = document.querySelector("#drop-down")
    console.log(selector)

}
