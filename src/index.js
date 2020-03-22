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
    div.className = "franchise"
    div.innerHTML = `
    <h3>${franchise.location} ${franchise.nickname}</h3>
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
    fetchAndRenderFranchisePlayers(franchise.id, table)
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

