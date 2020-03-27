const BASE_URL = "http://localhost:3000/api/v1/franchises/"
const adapter = new Adapter(BASE_URL)
const teamsDiv = document.getElementById("teams-container")
const dropDown = document.querySelector("#drop-down")
const editButton = document.querySelector("#edit-button")

document.addEventListener("DOMContentLoaded", event => {
    console.log("here we go")
    
    pageRender()

    addListenerToDropDown()
    addListenerToEditButton()
})

const pageRender = () => {
    teamsDiv.innerHTML = ""
    adapter.getResources()
    .then(franchisesData => {
        renderFranchises(franchisesData)
        populateDropDown(franchisesData)
    })
}

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

const populateDropDown = (franchisesData) => {
    dropDown.innerHTML = `<option>--</option>`
    franchisesData.forEach(franchiseObj => {
        let franchise = new Franchise(franchiseObj)
        franchise.addFranchise()
    })
}

const addListenerToDropDown = () => {
    dropDown.addEventListener("change", event => {
        dropDownChange(event)
    })
}

const dropDownChange = changeEvent => {
    console.log(changeEvent.target.value)
    teamsDiv.innerText = ""
    switch (changeEvent.target.value) {
        case "--":
        pageRender()
            break;
    
        default:
            let franchiseFinder = new Adapter(BASE_URL + changeEvent.target.value)
            franchiseFinder.getResources()
            .then(renderFranchise)
            break;
    }
}

const addListenerToEditButton = () => {
    editButton.addEventListener("click", event => {
        switch (event.target.innerText) {
            case "EDIT":
                switchToEditMode()
                break;
            case "SUBMIT":
                submitChanges()
                break;
        }
    })
}

const switchToEditMode = () => {
    editButton.innerText = "SUBMIT"
    let franchiseDivs = document.getElementsByClassName("franchise")
    Array.from(franchiseDivs).forEach(franchise => addEditButtons(franchise))
}

const addEditButtons = franchiseDiv => {
    let tableRows = Array.from(franchiseDiv.getElementsByTagName("tr"))
    tableRows.forEach(row => {
        if (tableRows.indexOf(row) === 0) {
            row.children[2].innerText = "Delete?"
        } else {
            row.children[2].innerHTML = `
            <input type="radio" id="delete-player">
            `
        }
    })    
}

const submitChanges = () => {
    editButton.innerText = "EDIT"
    pageRender()
}

const addDragEventListeners = (playerObject, playerElement) => {
    playerElement.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text', event.target.dataset.player.id)
        console.log("start",playerObject)
    }, false)
    playerElement.addEventListener('dragend', event => {
        console.log("end")
    })
}