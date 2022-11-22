// Set up default values in storage during installation
browser.runtime.onInstalled.addListener(function() {
    browser.storage.sync.set({
        pieces: "neo",
        board: "marble",
    })
})

browser.storage.sync.get("board").then(data => {
    let urls = []
    if (data["board"] != "none_board")
        urls.push("https://lichess1.org/assets/*/images/board/svg/*")

    browser.storage.sync.get("pieces").then(data => {
        if (data["pieces"] != "none_pieces")
            urls.push("https://lichess1.org/assets/*/piece-css/*")

        // Avoid flicker effect
        if (urls.length)
            browser.webRequest.onBeforeRequest.addListener(() => ({ cancel: true }), { urls }, ['blocking']);
    })
})

/* 
// Block audio files from network

chrome.webRequest.onBeforeRequest.addListener(
    function() {
        return { cancel: true };
    },
    {
        urls: ["https://lichess1.org/assets/_Iu1lae/sound/standard/*.ogg"]
    },
    ["blocking"]
);

Permissions:
        "<all_urls>",
        "webRequest",
        "webRequestBlocking"
*/

