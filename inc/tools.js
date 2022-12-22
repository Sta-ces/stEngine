/** PROTOTYPES */
if(!Window.prototype.hasOwnProperty("action"))
    Window.prototype.action = function(event, callback, options = false){ addEventListener(event, callback, options); return callback }
if(!HTMLElement.prototype.hasOwnProperty("action"))
    HTMLElement.prototype.action = function(event, callback, options) { if(!this) return null; this.addEventListener(event, callback, options); return callback }
if(!NodeList.prototype.hasOwnProperty("action"))
    NodeList.prototype.action = function(event, callback, options) { if(!this.length) return null; Array.from(this).action(event, callback, options); return callback }
if(!Array.prototype.hasOwnProperty("action"))
    Array.prototype.action = function(event, callback, options) { if(!this.length) return null; this.map(t => { t.action(event, callback, options) }); return callback }
if(!Window.prototype.hasOwnProperty("noaction"))
    Window.prototype.noaction = function(event, callback = () => {}, options = false, element = document){ element.removeEventListener(event, callback, options) }
if(!HTMLElement.prototype.hasOwnProperty("noaction"))
    HTMLElement.prototype.noaction = function(event, callback = () => {}, options = false) { this.removeEventListener(event, callback, options) }
if(!NodeList.prototype.hasOwnProperty("noaction"))
    NodeList.prototype.noaction = function(event, callback = () => {}, options = false) { this.forEach(el => el.noaction(event, callback, options)) }
if(!Window.prototype.hasOwnProperty("load"))
    Window.prototype.load = function(callback, options = false){ action("load", callback, options) }
if(!Window.prototype.hasOwnProperty("click"))
    Window.prototype.click = function(callback, options = false){ action("click", callback, options) }
if(!HTMLElement.prototype.hasOwnProperty("click"))
    HTMLElement.prototype.click = function(callback, options = false){ this.action("click", callback, options) }
if(!NodeList.prototype.hasOwnProperty("click"))
    NodeList.prototype.click = function(callback, options = false){ Array.from(this).map(e => e.action("click", callback, options)) }
if(!Window.prototype.hasOwnProperty("getElId"))
    Window.prototype.getElId = function(id){ if(id === "") return null; return document.getElementById(id) }
if(!Window.prototype.hasOwnProperty("getQuery"))
    Window.prototype.getQuery = function(query){ if(query === "") return null; return document.querySelector(query) }
if(!HTMLElement.prototype.hasOwnProperty("getQuery"))
    HTMLElement.prototype.getQuery = function(query){ if(query === "") return null; return this.querySelector(query) }
if(!NodeList.prototype.hasOwnProperty("getQuery")){
    NodeList.prototype.getQuery = function(query){
        if(!this.length || query === "") return null
        return Array.from(this).map(e => [...e.getQuery(query)] )
    }
}
if(!Window.prototype.hasOwnProperty("getQueries")){
    Window.prototype.getQueries = function(query, toArray = false){
        if(query === "") return null
        let el = document.querySelectorAll(query)
        if(toArray) return Array.from(el)
        return el
    }
}
if(!HTMLElement.prototype.hasOwnProperty("getQueries")){
    HTMLElement.prototype.getQueries = function(query, toArray = false){
        if(query === "") return null
        let el = this.querySelectorAll(query)
        if(toArray) return Array.from(el)
        return el
    }
}
if(!NodeList.prototype.hasOwnProperty("getQueries")){
    NodeList.prototype.getQueries = function(query){
        if(!this.length || query === "") return null
        return Array.from(this).map(e => [...e.getQueries(query, true)] )
    }
}
if(!NodeList.prototype.hasOwnProperty("classList")){
    Object.defineProperty(NodeList.prototype, "classList", {
        get: function(){ return new ClassLists(this) }
    })
}
if(!HTMLElement.prototype.hasOwnProperty("scrollSmooth")){
    HTMLElement.prototype.scrollSmooth = function(duration = 1000, stopDistance = 100) {
        if(!this) return null
        this.action("click", () => {
            let href = (this.hasAttribute("href"))
                ? this.getAttribute("href")
                : this.getAttribute("data-href")
            let target = getQuery(href)
            let targetPosition = target.offsetTop - stopDistance
            let startPosition = document.scrollingElement.scrollTop
            let distance = targetPosition - startPosition
            let startTime = null
    
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime
                let timeElapsed = currentTime - startTime
                let run = ease(timeElapsed, startPosition, distance, duration)
                window.scrollTo(0, run)
                if (timeElapsed < duration) requestAnimationFrame(animation)
            }
    
            function ease(t, b, c, d) {
                t /= d / 2; if (t < 1) return c / 2 * t * t + b; t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
    
            requestAnimationFrame(animation);
        })
    }
}
if(!NodeList.prototype.hasOwnProperty("scrollSmooth")){
    NodeList.prototype.scrollSmooth = function(duration = 1000, stopDistance = 100) {
        if (!this.length) return null
        Array.from(this).map(element => element.scrollSmooth(duration, stopDistance) )
    }
}
if(!HTMLElement.prototype.hasOwnProperty("filterSearch")){
    HTMLElement.prototype.filterSearch = function({models, classfilter = "filter-search", symbols = true, action = "keyup", msg = "No Result", tag = "li"}, callback = () => {}) {
        this.action(action, () => {
            let input_val = models.value.toLowerCase()
            if(symbols){
                const REGEXP = new RegExp("\\"+getSymbols(true), "gmi")
                input_val = input_val.replace(REGEXP,"")
            }
            let new_listing = Array.from(models.children).filter(item => {
                let txtCont = "";
                let it = item.getQueries(classfilter, true)
                if(!it) it.map(i => txtCont += i.textContent.toLowerCase()+" " )
                else txtCont = item.textContent.toLowerCase()
                return txtCont.includes(input_val)
            })
            models.innerHTML = ""
            if(new_listing.length) models.appendChildren(new_listing)
            else models.appendChild(`<${tag} class='filter-msg'>${msg}</${tag}>`)
            callback()
        })
    }
}
if(!NodeList.prototype.hasOwnProperty("filterSearch")){
    NodeList.prototype.filterSearch = function ({classfilter = "filter-search", models, symbols = true, action = "keyup", msg = "No Result", tag = "li"}, callback = () => {}) {
        if(!this.length) return null
        this.forEach(element => element.filterSearch({classfilter, models, symbols, action, msg, tag}, callback) )
    }
}
if(!HTMLElement.prototype.hasOwnProperty("appendChildren")){
    HTMLElement.prototype.appendChildren = function(children){
        if(!Array.isArray(children)) return null
        for(let c = 0; c < children.length; c++) this.appendChild(children[c])
    }
}
if(!NodeList.prototype.hasOwnProperty("appendChildren")){
    NodeList.prototype.appendChildren = function(children){
        if(!Array.isArray(children) || !this.length) return null
        this.forEach(child => child.appendChildren(children))
    }
}
if(!NodeList.prototype.hasOwnProperty("appendChild")){
    NodeList.prototype.appendChild = function(children){
        if(!this.length) return null
        this.forEach(child => child.appendChild(children))
    }
}
if(!Array.prototype.hasOwnProperty("loop"))
    Array.prototype.loop = function(callback) { this.forEach(element => callback(element)) }
if(!NodeList.prototype.hasOwnProperty("loop"))
    NodeList.prototype.loop = function(callback) { NodeList.from(this).loop(callback) }
if(!HTMLElement.prototype.hasOwnProperty("html"))
    HTMLElement.prototype.html = function(txt){ this.innerHTML = txt }
if(!NodeList.prototype.hasOwnProperty("html"))
    NodeList.prototype.html = function(txt){ this.forEach(el => el.html(txt)) }

function sRandom(max = 1, min = 0) {
    if (isNaN(min) && isNaN(max)) return;
    min = parseFloat(min); max = parseFloat(max);
    return Math.round(min + Math.random() * (max - min));
}

function sMultiRandom(count, max = 1, min = 0){
    let aRand = []
    for (let index = 0; index < count; index++)
        aRand[index] = sRandom(max, min)
    return aRand;
}

function sArrayRandom(array){ return array[sRandom(array.length-1)] }

function accentReplace(str){ return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "") }
function aprostReplace(str){ return str.replace(/.\'/g, "") }
function compressReplace(str){ return aprostReplace(accentReplace(str)).toLowerCase() }

HTMLElement.prototype.sInsert = (position, string) => {
    switch (position) {
        case "before": case "beforebegin": case "begin":
        case "start": case "previous":
            position = "beforebegin"; break;

        case "after": case "afterend":
        case "end": case "next":
            position = "afterend"; break;

        case "inbefore": case "instart": case "afterbegin":
        case "insert": case "insertBefore":
            position = "afterbegin"; break;

        case "inafter": case "inend": case "beforeend":
        case "append": case "appendChild": default:
            position = "beforeend"; break;
    }

    this.insertAdjacentHTML(position, string.trim())
}

NodeList.prototype.sInsert = (position, string) => {
    if (this.length <= 0) return
    this.forEach(element => element.sInsert(position, string) )
}

HTMLElement.prototype.sModel = (elements) => {
    const model = this;
    model.addEventListener("keyup", () => {
        if (elements instanceof NodeList) elements.forEach((element) => element.innerHTML = model.value )
        else elements.innerHTML = model.value
    })
}

HTMLElement.prototype.percentage = ({excute = "percentage", max = 100, min = 0, reduce = 0}) => {
    if (Number.isNaN(this) || Number.isNaN(max) || Number.isNaN(min) || Number.isNaN(reduce)) return null;
    let rslt = null;
    switch(excute){
        case "percentage": rslt = valToPerc(this, max, min); break;
        case "value": rslt = percToVal(this, max, min); break;
        case "reduce": rslt = reducePerc(this, reduce); break;
    }
    if(excute != "reduce" && reduce > 0) rslt = reducePerc(rslt, reduce);
    return rslt;
}

HTMLElement.prototype.watchAttr = (nameAttr = "", callback) => {
    let observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if(mutation.type === "attributes" && (nameAttr === "" || mutation.attributeName === nameAttr))
                callback(mutation, mutation.attributeName)
        })
    })
    observer.observe(this, { attributes: true })
}

NodeList.prototype.watchAttr = (nameAttr = "", callback) => {
    if (this.length <= 0) return
    this.forEach(element => element.watchAttr(nameAttr, callback))
}

function isMobileAndTablet() {
    let check = false
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera)
    return check
}

function sender({action, params = "", method = "POST", type = "text/html"}, callback) {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) callback(this.responseText)
    }
    xhr.open(method, action, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.type = type
    xhr.send(params)
}

function loadView({url, container}, callback){
    if(!container) return null
    return fetch(url)
        .then(response => { return response.text() })
        .then(txt => container.innerHTML = txt)
        .then(callback)
        .catch(err => cerror(err))
}

function clog(msg){ console.log(msg) }
function cwarn(msg){ console.warn(msg) }
function cerror(msg){ console.error(msg) }

/** PRIVATES */
function ClassLists(nl){
    this.add = function(classname){ nl.forEach(el => el.classList.add(classname)) }
    this.remove = function(classname){ nl.forEach(el => el.classList.remove(classname)) }
    this.toggle = function(classname){ nl.forEach(el => el.classList.toggle(classname)) }
    this.contains = function(classname){ return !!Array.from(nl).filter(el => el.classList.contains(classname)).length }
    this.replace = function(oldClass, newClass){ nl.forEach(el => el.classList.replace(oldClass, newClass)) }
}

// NOT PERCENTAGE
function valToPerc(number, max = 100, min = 0){ return ((number - min) * 100) / (max - min); }
function percToVal(number, max = 100, min = 0){ return (number * (max - min) / 100) + min; }
function reducePerc(number, percentage){ return ((100 - percentage) / 100) * number; }
