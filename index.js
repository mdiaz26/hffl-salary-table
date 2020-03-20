document.addEventListener("DOMContentLoaded", event => {
    console.log("here we go")
    teamsDiv = document.getElementById("teams-container")

    fetchAndRenderFranchises()
})

const fetchAndRenderFranchises = () => {
    fetch("http://localhost:3000/api/v1/franchises")
    .then(response => response.json())
    .then(franchises => renderFranchises(franchises))
}

const renderFranchises = (franchises) => {
    franchises.forEach(franchise => {
        renderSingleFranchise(franchise)
    })
    
}

const renderSingleFranchise = franchise => {
    let div = document.createElement("div")
    div.dataset.id = franchise.id
    div.innerHTML = `
    <h1>${franchise.location} ${franchise.nickname}</h1>
    <p>${franchise.owners}</p>
    <ul class="players-container"></ul>
    `
    teamsDiv.append(div)
    const ul = div.getElementsByTagName('ul')[0]
    fetchAndRenderFranchisePlayers(franchise.id, ul)
}

const fetchAndRenderFranchisePlayers = (franchiseId, ul) => {
    fetch(`http://localhost:3000/api/v1/franchises/${franchiseId}`)
    .then(response => response.json())
    .then(franchise => {
        renderPlayers(franchise.players, ul)
        calculateTotalSalary(franchise.players)
    })
}

const renderPlayers = (players, ul) => {
    players.forEach(player => renderSinglePlayer(player, ul))
    let total = players.reduce(reducer, 0)
    ul.prepend(total)
}

const renderSinglePlayer = (player, ul) => {
    let li = document.createElement('li')
    li.dataset.playerId = player.id
    li.innerHTML = `${player.name} ${player.salary}`
    ul.append(li)
}

const calculateTotalSalary = (players) => {
    console.log(players.reduce(reducer, 0))
}

const reducer = (accumulator, currentValue) => accumulator + parseInt(currentValue.salary)
