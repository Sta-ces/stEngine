import Shapes from "../inc/shapes.js"

export default class BaseElement extends HTMLElement{
    constructor(options = {}){
        super();

        this.options = {
            attributes: true,
            childList: true,
            subtree: false,
            ...options
        };
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                console.log(mutation)
                switch(mutation.type){
                    case "attributes":
                        console.log("Attribute changed");
                        this.attributesChanged(mutation, mutation.attributeName);
                        break;
                    case "childList":
                        console.log("Child changed");
                        this.childrenChanged(mutation, mutation.addedNodes, mutation.removedNodes);
                        break;
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

    watcher(node, options = this.options){ this.observer.observe(node, options); }
    
    connectedCallback(){
        this.watcher(this);
        this.Awake();
    }

    getAttr(attr, defaultValue = ""){
        return (this.hasAttribute(attr)) ? this.getAttribute(attr) : defaultValue;
    }

    setAttr(attr, value, forced = false){
        if(this.hasAttribute(attr) || forced){
            this.setAttribute(attr, value);
        }
    }

    attributesChanged(attr, name){
        if(attr == null || name == null){
            console.error("Attributes error");
            return;
        }
    }

    childrenChanged(node, added, removed){
        if(node == null){
            console.error("Children node error");
            return;
        }
    }

    create({element = "div", classname = "", id = "", src = "", alt = "", data = "", type = "", attr = {}, parent = this, textContent = null, append = true}){
        return Shapes.HTML({element, classname, id, src, alt, data, type, attr, parent, textContent, append})
    }

    Awake(){}
}
