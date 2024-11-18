import Application from "../types/application.js"
import { BaseElement } from "../inc/inc.js"

export default class Novel extends Application{
    constructor({containerID, isUpdate = false, timerStamp = 2000}){
        super({customTags: {
            "text-box": TextBox,
            "object-box": ObjectBox,
            "character-box": CharacterBox
        }, isUpdate, timerStamp})
        this.container = document.getElementById(containerID)
        this.create({
            element: "character-box",
            classname: "character-left",
            parent: this.container
        })
        this.create({
            element: "character-box",
            classname: "character-right",
            parent: this.container
        })
        this.create({
            element: "object-box",
            parent: this.container
        })
        this.create({
            element: "text-box",
            parent: this.container
        })
    }
}

class TextBox extends BaseElement{
    constructor(){
        super({subtree: true})
    }
    Awake(){
        let dialog = this.create({
            element: "p",
            classname: "dialog"
        })
    }

    childrenChanged(node, added, removed){
        super.childrenChanged(node, added, removed)
        console.log(node)
    }
}

class ObjectBox extends BaseElement{}

class CharacterBox extends BaseElement{}