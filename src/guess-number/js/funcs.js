class NumberButton {
    constructor(label) {
        this.label = label
        this.onclick = undefined
        this.width = 32
        this.height = 32

        this.sprite = new Container()
        this.sprite.width = this.width
        this.sprite.height = this.height

        this.bg = this.generateBgRect()

        this.sprite.addChild(this.bg)

        this.normalStyle = new TextStyle({
            fontFamily: 'monospace',
            fontSize: 16,
            fill: 'black',
            stroke: 'black',
            strokeThickness: 1,
        })
        this.pressedStyle = new TextStyle({
            fontFamily: 'monospace',
            fontSize: 16,
            fill: 'white',
            stroke: 'white',
            strokeThickness: 1,
        })
        this.text = new Text(label, this.normalStyle)
        this.text.anchor.set(0.5, 0.5)
        this.text.position.set(this.width / 2, this.height / 2)
        this.sprite.addChild(this.text)

        this.sprite.interactive = true
        this.sprite.buttonMode = true

        this.sprite.on('pointerdown', this.onPointerDown.bind(this))
        this.sprite.on('pointerup', this.onPointerUp.bind(this))
    }

    generateBgRect() {
        let bg = new Sprite(Texture.WHITE)
        bg.width = this.width
        bg.height = this.height
        return bg
    }

    /**
     * @param {boolean} state
     */
    set pressed(state) {
        this.text.style = state ? this.pressedStyle : this.normalStyle
        this.bg.tint = state ? 0x000000 : 0xffffff
    }

    /**
     * @return {boolean}
     */
    get pressed() {
        return this.bg.tint === 0x000000
    }

    onPointerDown() {
        this.pressed = true
    }

    onPointerUp() {
        this.pressed = false
        if (this.onclick) {
            this.onclick(this)
        }
    }
}

class NumberPad {
    constructor() {
        this.buttons = [['', '0', '→'], Array(9).fill(0).map((_, i) => (i + 1).toString())].flat()
    }
}

function run(app) {
    let button = new NumberButton(5)
    button.onclick = (btn) => {
        console.log(`button pressed: ${btn.label}`)
    }
    button.sprite.position.set(app.screen.width / 2, app.screen.height / 2)
    app.stage.addChild(button.sprite)
}