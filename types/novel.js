import Application from "../types/application.js"
import { BaseElement, AutoTyped, Random } from "../inc/inc.js"

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
     * @param {string} classname - Add a classname to your new HTML element
     * @param {Node} [parent=container] - Specify the HTML Element
     * @returns {CharacterBox}
     */
    addCharacterBox(classname = "", parent = this.container){ return this.create({ element: "character-box", classname, parent }) }
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
    constructor(){ super({subtree: true}) }

    /**
     * @param {string} dialog 
     * @param {string} nameCharacter 
     */
    setDialog(dialog, nameCharacter){
        this.setAttribute("namecharacter", nameCharacter)
        this.typed?.typed(dialog).start()
    }
    finishDialog(dialog){
        this.dialog.textContent = dialog
    }
    typingSound(){
        let randomSound = (new Random()).array(Novel.SFX.typings)
        console.log(randomSound)
        // PlaySound() in system.js to inc.js
    }

    getTyped(){ return this.typed }
    isTyped(){ return this.typed?.isTyped() }
    isFinished(){ return this.typed?.isFinished() }
    /**
     * @param {number} speed - Speed in second of the displaying text
     */
    setTypeSpeed(speed){ this.typed?.setTypeSpeed(speed) }

    Awake(){
        this.setAttribute("namecharacter", "")
        this.dialog = this.create({
            element: "p",
            classname: "dialog"
        })
        this.typed = new AutoTyped({ container: this.dialog, typingEvent: this.typingSound.bind(this) })
    }
}

class ObjectBox extends BaseElement{}

class CharacterBox extends BaseElement{}