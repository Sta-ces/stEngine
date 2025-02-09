import Application from "../types/application.js"
import { BaseElement, AutoTyped } from "../inc/inc.js"

export default class Novel extends Application{
    /**
     * @param {Object} options - Configuration options
     * @param {string} options.containerID - The container ID element where game will appear
     * @param {Object} [options.backgrounds={}] - List of images path
     */
    constructor({containerID, backgrounds = {}, isUpdate = false, timerStamp = 2000}){
        super({customTags: {
            "text-box": TextBox,
            "object-box": ObjectBox,
            "character-box": CharacterBox
        }, isUpdate, timerStamp})
        this.container = document.getElementById(containerID)
        this.backgrounds = backgrounds
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
     * @param {string|number} backgroundID - Image's ID from your list of backgrounds
     * @param {string} [position="center center"] - Specify the position of your background (ex: "center center", "50% 50%")
     * @param {Node} [parent=container] - Specify the HTML Element
     */
    setBackground(backgroundID, position = "center center", parent = this.container){
        parent.style.backgroundImage = `url('./${this.backgrounds[backgroundID]}')`
        parent.style.backgroundPosition = position
    }
}

class TextBox extends BaseElement{
    constructor(){ super({subtree: true}) }

    setDialog(dialog){
        this.typed.typed(dialog).start()
    }

    Awake(){
        this.dialog = this.create({
            element: "p",
            classname: "dialog"
        })
        this.typed = new AutoTyped({
            container: this.dialog
        })
    }
}

class ObjectBox extends BaseElement{}

class CharacterBox extends BaseElement{}