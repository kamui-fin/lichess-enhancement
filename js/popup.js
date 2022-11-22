if (typeof browser === "undefined") {
    var browser = chrome;
}

const board_select = document.getElementById("board_select")
const piece_select = document.getElementById("pieces_select")

const updateRequest = () => {
    browser.tabs.query({
        active: true,
        currentWindow: true,
    }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {})
    })
}

// Update <option> with value in storage
browser.storage.sync.get("board").then(data => {
    board_select.value = data["board"]
})

// Update storage with new value and send a signal to main script
board_select.onchange = function() {
    let value = this.value
    browser.storage.sync.set({ board: value })

    updateRequest()
}

// Update <option> with value in storage
browser.storage.sync.get("pieces").then(data => {
    piece_select.value = data["pieces"]
})

// Update storage with new value and send a signal to main script
piece_select.onchange = function() {
    let value = this.value
    browser.storage.sync.set({ pieces: value })

    updateRequest()
}
