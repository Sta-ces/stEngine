import System from "../system.js"

export default class Application extends System{
    constructor({customElements = {}, isUpdate = false, timerStamp = 2000}){
        super({isUpdate, timerStamp})
        if(Object.keys(customElements).length > 0){
            for (const [key, value] of Object.entries(customElements))
                customElements.define(key, value)
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

    screen(nameScreen){
        const screen = document.querySelector(`.screen-element[name='${nameScreen}']`)
        if(screen) screen.setAttribute("state", "open")
        return screen
    }

    create({element = "div", classname = "", id = "", src = "", alt = "", data = "", type = "", attr = {}, parent = null, textContent = null, append = true}){
        const el = document.createElement(element)
        if(classname !== "") el.setAttribute("class", classname)
        if(id !== "") el.setAttribute("id", id)
        if(src !== "") el.setAttribute("src", src)
        if(data !== "") el.setAttribute("data", data)
        if(type !== "") el.setAttribute("type", type)
        if(alt !== "") el.setAttribute("alt", alt)
        if(Object.keys(attr).length > 0){
            for(const [key, value] of Object.entries(attr))
                el.setAttribute(key, value)
        }
        if(textContent) el.innerHTML = textContent
        if(parent) parent.appendChild(el)
        else if(append) this.append(el)
        return el
    }
}