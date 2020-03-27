class EventHandler {

    static alternateDragListeners = () => {
        teamsDiv.addEventListener('dragstart', event => {
            if (event.target.dataset.playerId){
                event.dataTransfer.setData('text', event.target.id)
                console.log("start")
            }
            }, false)
    
        teamsDiv.addEventListener('dragend', event => {
            if (event.target.dataset.playerId){
                event.dataTransfer.clearData()
                if (document.querySelector('.over')){
                    document.querySelector('.over').classList.remove('over')
                }
                console.log("end")
            }
        })
    }

}