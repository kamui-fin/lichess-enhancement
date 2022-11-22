if (typeof browser === "undefined") {
    var browser = chrome;
}

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
        if (urls.length) {
            if (!browser.declarativeNetRequest) {
                browser.webRequest.onBeforeRequest.addListener(() => ({ cancel: true }), { urls }, ['blocking']);
            }
            else {
                let count = 1
                for (let filter of urls) {
                    const RULE = {
                        id: count,
                        condition: {
                            urlFilter: filter,
                            requestDomains: ["lichess1.org"],
                            resourceTypes: ['stylesheet', 'image'],
                        },
                        action: {
                            type: 'block',
                        },
                    };
                    browser.declarativeNetRequest.updateSessionRules({
                        addRules: [RULE],
                    });
                    count += 1
                }
            }
        }
    })
})
