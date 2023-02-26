import Shapes from "../inc/shapes.js"

export default class BaseElement extends HTMLElement{
    constructor(){
        super();

        this.options = {
            attributes: true,
            childList: true
        };
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if(mutation.type == "attributes"){
                    console.log("Attribute changed");
                    this.attributesChanged(mutation, mutation.attributeName);
                }
            });
        });
    }

    getStyle(css, importUrl = ""){
        if(typeof css != "string"){
            console.error("Style type error");
            return;
        }

        let style = document.createElement('style');
        let importCSS = (importUrl !== "") ? `@import url('${importUrl}');` : "";
        style.textContent = importCSS + css.replaceAll(" ", "").trim();
        return style;
    }
    
    connectedCallback(){
        this.observer.observe(this, this.options);
        this.Awake();
    }

    getAttr(attr, defaultValue = ""){
        return (this.hasAttribute(attr)) ? this.getAttribute(attr) : defaultValue;
    }

    setAttr(attr, value){
        if(this.hasAttribute(attr)){
            this.setAttribute(attr, value);
        }
    }

    attributesChanged(attr, name){
        if(attr == null || name == null){
            console.error("Attributes error");
            return;
        }
    }

    create({element = "div", classname = "", id = "", src = "", alt = "", data = "", type = "", attr = {}, parent = null, textContent = null, append = true}){
        Shapes.HTML(this, {element, classname, id, src, alt, data, type, attr, parent, textContent, append})
    }

    Awake(){}
}