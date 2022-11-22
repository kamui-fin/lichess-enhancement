if (typeof browser === "undefined") {
    var browser = chrome;
}

// apply piece style from storage
const applyPieces = (reset = false) => {
    browser.storage.sync.get("pieces").then(data => {
        if (data["pieces"] != "none_pieces") {
            Pieces.chooseStyleAndApply(data["pieces"])
        } else if (reset) {
            Pieces.unbindPieces()
            Pieces.greatReset()
        }
    })
}

// apply board style from storage
const applyBoard = (reset = false) => {
    browser.storage.sync.get("board").then(data => {
        if (data["board"] != "none_board") {
            Boards.chooseStyleAndApply(data["board"])
        } else if (reset) {
            Boards.greatReset()
        }
    })
}

applyBoard()
applyPieces()

// update pieces and boards from popup
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    applyBoard(true)
    applyPieces(true)
})

document.addEventListener(
    "mousedown",
    applyPieces,
    false
)
