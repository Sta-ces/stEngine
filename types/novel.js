import Application from "../types/application.js"
import { BaseElement, AutoTyped, Random, Sound } from "../inc.js"

export default class Novel extends Application{
    static SFX = {typings: []}
    /**
     * @param {Object} options - Configuration options
     * @param {string} options.containerID - The container ID element where game will appear
     */
    constructor({containerID, typingSFX = [], isUpdate = false, timerStamp = 2000, isDev = false}){
        super({customTags: {
            "text-box": TextBox,
            "object-box": ObjectBox,
            "character-box": CharacterBox
        }, isUpdate, timerStamp, isDev})
        this.container = document.getElementById(containerID)
        Novel.SFX.typings = typingSFX
    }
    /**
     * @param {string} classname - Add a classname to your new HTML element
     * @param {Node} [parent=container] - Specify the HTML Element
     * @returns {TextBox}
     */
    addTextBox(classname = "", parent = this.container){ return this.create({ element: "text-box", classname, parent }) }
    /**
     * @param {string} src - Image path
     * @param {string} [classname=""] - Add a classname to your new HTML element
     * @param {boolean} [flip=false] - true|false to flip on the X side
     * @param {Node} [parent=container] - Specify the HTML Element
     * @returns {CharacterBox}
     */
    addCharacterBox(src, classname = "", flip = false, parent = this.container){ return this.create({ element: "character-box", classname, parent, src, attr: { flip } }) }
    /**
     * @param {string} classname - Add a classname to your new HTML element
     * @param {Node} [parent=container] - Specify the HTML Element
     * @returns {ObjectBox}
     */
    addObjectBox(classname = "", parent = this.container){ return this.create({ element: "object-box", classname, parent }) }
    /**
     * @param {string} backgroundURL - Image's path
     * @param {string} [position="center center"] - Specify the position of your background (ex: "center center", "50% 50%")
     * @param {Node} [parent=container] - Specify the HTML Element
     */
    setBackground(backgroundURL, position = "center center", parent = this.container){
        parent.style.backgroundImage = `url('./${backgroundURL}')`
        parent.style.backgroundPosition = position
    }
}

class TextBox extends BaseElement{
    currentSound = null;

    get speed(){ return this.typed.typeSpeed }
    get nameCharacter(){ return this.getAttribute("namecharacter") }

    set speed(speed){ this.typed?.setTypeSpeed(speed) }
    set nameCharacter(nc){ this.setAttribute("namecharacter", nc) }

    constructor(){ super({subtree: true}) }

    /**
     * @param {string} dialog 
     * @param {string} nameCharacter 
     */
    setDialog(dialog, nameCharacter){
        this.nameCharacter = nameCharacter
        this.typed?.typed(dialog).start()
    }
    finishDialog(dialog){
        this.dialog.textContent = dialog
    }
    async typingSound(){
        // Stop if currentSound is playing
        if (this.currentSound?.paused === false) return;

        let randomSound = (new Random()).array(Novel.SFX.typings)
        this.currentSound = await Sound.play(randomSound)
    }

    getTyped(){ return this.typed }
    isTyped(){ return this.typed?.isTyped() }
    isFinished(){ return this.typed?.isFinished() }

    Awake(){
        this.nameCharacter = ""
        this.dialog = this.create({
            element: "p",
            classname: "dialog"
        })
        this.typed = new AutoTyped({ container: this.dialog, typingEvent: this.typingSound.bind(this) })
    }
}

class ObjectBox extends BaseElement{}

class CharacterBox extends BaseElement{
    get src(){ return this.getAttribute("src") }
    get flip(){ return this.getAttribute("flip") === "true" }
    get flipStyle(){ return this.flip ? 'scaleX(-1)' : 'scaleX(1)'; }

    set src(path){ this.setAttribute("src", path) }
    set flip(dir){ this.setAttribute("flip", dir.toString()) }

    attributesChanged(attr, name){
        super.attributesChanged(attr, name)
        switch(name){
            case "src":
                this.character.src = this.src;
                break;
            case "flip":
                this.character.style.transform = this.flipStyle;
                break;
        }
    }

    Awake(){
        this.style = "width: 25em; height: 50em;"
        this.character = this.create({
            element: "img",
            src: this.src,
            classname: "character-image",
            attr: {
                style: `object-fit: contain; background-position: center bottom; width: 100%; height: 100%; transform: ${this.flipStyle};`
            },
            alt: "Character box"
        })
    }
}