const Boards = {
    updateBg: (url) => {
        for (let board of document.querySelectorAll("cg-board")) {
            board.style.backgroundImage = `url(${url})`
        }

    },
    replaceBackgroundImage: function(board_url) {
        this.updateBg(board_url)
        document.arrive("cg-board", function() {
            this.style.backgroundImage = `url(${board_url})`
        })
    },

    greatReset: function() {
        for (let board of document.querySelectorAll("cg-board")) {
            board.style.backgroundImage = null
        }
        document.unbindArrive("cg-board")
    },

    chooseStyleAndApply: function(style_id) {
        const board = browser.runtime.getURL(
            "assets/boards/" + style_id + ".png"
        )
        this.replaceBackgroundImage(board)
    },
}
const pieces = [
    { "piece.black.pawn": "bp" },
    { "piece.black.bishop": "bb" },
    { "piece.black.knight": "bn" },
    { "piece.black.king": "bk" },
    { "piece.black.queen": "bq" },
    { "piece.black.rook": "br" },
    { "piece.white.pawn": "wp" },
    { "piece.white.bishop": "wb" },
    { "piece.white.knight": "wn" },
    { "piece.white.king": "wk" },
    { "piece.white.queen": "wq" },
    { "piece.white.rook": "wr" }
]

const Pieces = {
    replaceBackgroundImage: function(styleObj) {
        for (let [selector, url] of Object.entries(styleObj)) {
            for (let element of document.querySelectorAll(selector))
                element.style.backgroundImage = `url(${url})`
        }
    },

    refresh: function(styleObj) {
        for (let [selector, url] of Object.entries(styleObj)) {
            document.arrive(selector, function() {
                for (let element of document.querySelectorAll(selector))
                    element.style.backgroundImage = "url(" + url + ")"
            })
        }
    },

    greatReset: function() {
        for (let obj of pieces) {
            const selector = Object.keys(obj)[0]
            for (let element of document.querySelectorAll(selector)) {
                element.style.backgroundImage = null
            }
        }
    },

    getStyleObj: (id, overrides = {}) => {
        let obj = {}
        for (let piece of pieces) {
            const [selector, shorthand] = Object.entries(piece)[0]

            let extension = "png"
            if (id in overrides && shorthand in overrides[id])
                extension = overrides[shorthand]

            obj[selector] = browser.runtime.getURL(
                `assets/pieces/${id}/${shorthand}.${extension}`
            )
        }
        return obj
    },

    chooseStyleAndApply: function(style_id) {
        // file extension special cases
        const overrides = {
            "pony": {
                "bq": "gif",
                "wq": "gif"
            },
            "random": {}
        }
        for (let piece of pieces) {
            overrides["random"][Object.values(piece)[0]] = "gif"
        }
        const styleObj = this.getStyleObj(style_id, overrides)
        this.replaceBackgroundImage(styleObj)
        this.refresh(styleObj)
    },

    unbindPieces: function() {
        for (let piece of pieces)
            document.unbindArrive(Object.keys(piece)[0])
    },
}
