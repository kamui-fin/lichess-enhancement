var board_select = document.getElementById("board_select")
var piece_select = document.getElementById("pieces_select")

const updateRequest = () => {
    chrome.tabs.query(
        {
            active: true,
            currentWindow: true,
        },
        function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {})
        }
    )
}

// Update <option> with value in storage
chrome.storage.sync.get("board", function(data) {
    board_select.value = data["board"]
})

// Update storage with new value and send a signal to main script
board_select.onchange = function() {
    let value = this.value
    chrome.storage.sync.set({ board: value })

    updateRequest()
}

// Update <option> with value in storage
chrome.storage.sync.get("pieces", function(data) {
    piece_select.value = data["pieces"]
})

// Update storage with new value and send a signal to main script
piece_select.onchange = function() {
    let value = this.value
    chrome.storage.sync.set({ pieces: value }, function() { })

    updateRequest()
}
