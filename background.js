// Set up default values in storage during installation
browser.runtime.onInstalled.addListener(function() {
    browser.storage.sync.set({
        pieces: "neo",
        board: "marble",
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
