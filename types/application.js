import Shapes from "../inc/shapes.js"
import System from "../system.js"

export default class Application extends System{
    constructor({customTags = {}, isUpdate = false, timerStamp = 2000}){
        super({isUpdate, timerStamp})
        if(Object.keys(customTags).length > 0){
            for (const [key, value] of Object.entries(customTags)){
                let final_key = (!key.includes("-")) ? `${key.trim()}-tag` : key.trim()
                customElements.define(final_key, value)
            }
        }
    }

    render({url, container}, callback = null){
        if(!container || !url) return null
        const result = fetch(url).then(response => { return response.text() })
        const getResult = async () => {
            container.innerHTML = await result
            if(callback !== null) callback(container)
        }
        getResult()
    }

    screen(name, state = "open"){
        const screen = document.querySelector(`.screen-element[name='${name}']`)
        if(screen) screen.setAttribute("data-state", state)
        return screen
    }

    create({element = "div", classname = "", id = "", src = "", alt = "", data = "", type = "", attr = {}, parent = null, textContent = null, append = true}){
        Shapes.HTML({element, classname, id, src, alt, data, type, attr, parent, textContent, append})
    }
}