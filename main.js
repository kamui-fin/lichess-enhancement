// apply piece style from storage
const applyPieces = (reset = false) => {
    chrome.storage.sync.get("pieces", function(data) {
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
    chrome.storage.sync.get("board", function(data) {
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
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    applyBoard(true)
    applyPieces(true)
})

document.addEventListener(
    "mousedown",
    function() {
        applyPieces()
    },
    false
)
