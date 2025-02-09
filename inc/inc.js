export class Shapes{
    static Square(ctx, {x, y, w, h, fillColor, strokeColor, strokeWidth = 0}){
        if(fillColor) ctx.fillStyle = fillColor;
        if(strokeColor) ctx.strokeStyle = strokeColor;
        if(strokeWidth) ctx.lineWidth = strokeWidth;
        ctx.fillRect(x, y, w, h);
        if(strokeWidth > 0 || strokeColor) ctx.strokeRect(x, y, w, h);
    }

    static Circle(ctx, {x, y, r, startAngle = 0, endAngle = 2 * Math.PI, fillColor, strokeColor, strokeWidth = 0}){
        if(fillColor) ctx.fillStyle = fillColor;
        if(strokeColor) ctx.strokeStyle = strokeColor;
        if(strokeWidth) ctx.lineWidth = strokeWidth;
        ctx.beginPath();
        ctx.arc(x, y, r, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
        if(strokeWidth > 0 || strokeColor) ctx.stroke();
    }

    static Star(ctx, {x, y, spikes = 5, outerRadius = 30, innerRadius = 15, fillColor, strokeColor, strokeWidth = 0}){
        let rot = Math.PI/2*3;
        let cx = x, cy = y;
        let step = Math.PI/spikes;

        if(fillColor) ctx.fillStyle = fillColor;
        if(strokeColor) ctx.strokeStyle = strokeColor;
        if(strokeWidth) ctx.lineWidth = strokeWidth;
        ctx.beginPath();
        ctx.moveTo(cx,cy-outerRadius);
        for(let i=0;i<spikes;i++){
            x=cx+Math.cos(rot)*outerRadius;
            y=cy+Math.sin(rot)*outerRadius;
            ctx.lineTo(x,y);
            rot+=step;
            x=cx+Math.cos(rot)*innerRadius;
            y=cy+Math.sin(rot)*innerRadius;
            ctx.lineTo(x,y);
            rot+=step;
        }
        ctx.lineTo(cx,cy-outerRadius);
        ctx.closePath();
        if(fillColor) ctx.fill();
        if(strokeWidth > 0 || strokeColor) ctx.stroke();
    }

    static Path(ctx, {curves, closePath = true, fillColor, strokeColor, strokeWidth = 0}){
        if(curves && curves.length > 0){
            if(fillColor) ctx.fillStyle = fillColor;
            if(strokeColor) ctx.strokeStyle = strokeColor;
            if(strokeWidth) ctx.lineWidth = strokeWidth;
            ctx.beginPath();
            ctx.moveTo(curves[0].x, curves[0].y);
            for (let c = 1; c < curves.length; c++) {
                const curve = curves[c];
                ctx.lineTo(curve.x, curve.y);
            }
            if(closePath) ctx.closePath();
            if(fillColor) ctx.fill();
            if(strokeWidth > 0 || strokeColor) ctx.stroke();
        }
    }

    static HTML({element = "div", classname = "", id = "", src = "", alt = "", data = "", type = "", attr = {}, parent = null, textContent = null, append = true}){
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
        if(parent && append) parent.append(el)
        return el
    }
}

export class BaseElement extends HTMLElement{
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
                switch(mutation.type){
                    case "attributes":
                        this.attributesChanged(mutation, mutation.attributeName);
                        break;
                    case "childList":
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

export class Timer {
    constructor(callback, time = 1000){
        this.time = time
        this.callback = callback
        this.timerObject = setInterval(callback, time)
    }

    stop() {
        if (this.timerObject) {
            clearInterval(this.timerObject)
            this.timerObject = null
        }
        return this
    }

    start() {
        if (!this.timerObject) {
            this.stop()
            this.timerObject = setInterval(this.callback, this.time)
        }
        return this
    }

    reset(newTime = this.time) {
        this.time = newTime
        return this.stop().start()
    }

    isStart(){ return this.timerObject != null }
}

export class Chronometer {

    constructor({parent = null, duration, speed = 1000, play = true, callback_display, callback_end = () => {}}){
        this.duration = duration
        this.parent = parent
        this.callback_display = callback_display
        this.callback_end = callback_end
        this.play = play
        
        this.CHRONOSTATE = new Timer(() => {this.#chrono(this)}, speed)
    }
    
    #chrono(_CHRONO) {
        let milliseconds = parseInt(_CHRONO.duration % 60)
        let seconds = parseInt((_CHRONO.duration / 60) % 60)
        let minutes = parseInt(((_CHRONO.duration / 60) / 60) % 60)
        let hours = parseInt(((((_CHRONO.duration / 60) / 60) / 24) % 24))

        hours = hours < 10 ? "0" + hours : hours
        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds
        milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds

        let obj = {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            milliseconds: milliseconds,
            time: _CHRONO.duration
        }

        _CHRONO.callback_display(obj, _CHRONO.parent)

        if(_CHRONO.play) _CHRONO.duration--

        if (_CHRONO.duration < 0) {
            _CHRONO.CHRONOSTATE.stop()
            _CHRONO.callback_end(_CHRONO.CHRONOSTATE, _CHRONO.parent)
            _CHRONO.play = false
        }
    }

    isPlay(){ return this.play }
    setPlay(play){ this.play = play }
}

export class AutoTyped {
    /**
     * @param {Object} options - Configuration options
     * @param {Node} options.container - The container element where text will be typed
     * @param {number} [options.typeSpeed=1] - The typing speed in characters per second (default 1)
     */
    constructor({ container, typeSpeed = 1000 }) {
        if (!(container instanceof Node)) {
            throw new Error("Invalid container: must be a DOM Node.");
        }

        this.container = container;
        this.typeSpeed = Math.max(typeSpeed, 0);
        this.content = "";
        this.timer = (new Timer(this.#_autotyped.bind(this), this.typeSpeed)).stop();

        // Define states
        this.STATEMENT = {
            DEFAULT: "default",
            ERASED: "erased",
            TYPED: "typed",
            FINISHED: "finished",
        };
        this.state = this.STATEMENT.DEFAULT;

        // Promise-related handlers
        this.promiseResolve = null;
        this.promiseReject = null;
    }

    /**
     * Get the current state of the typing animation.
     * @returns {string} The current state (e.g., "default", "erased", "typed", "finished")
     */
    getState(){ return this.state }
    /**
     * Get the current timer object.
     * @returns {Timer} The timer instance controlling the typing speed
     */
    getTimer(){ return this.timer }
    /**
     * Set a new typing speed.
     * @param {number} speed - The new typing speed (in characters per second)
     */
    setTypeSpeed(speed){
        this.typeSpeed = Math.max(speed, 0);
        this.timer.reset(this.typeSpeed);
    }

    /**
     * Set the text content to be typed.
     * @param {string} content - The text to type
     * @returns {AutoTyped} The current AutoTyped instance
     */
    typed(content) {
        this.state = this.STATEMENT.TYPED;
        this.content = content.toString(); // Ensure content is a string
        return this;
    }

    /**
     * Start erasing the text content.
     * @returns {Promise} A promise that resolves when the text is completely erased
     */
    erased() {
        if (this.container.textContent.length === 0) {
            throw new Error("AutoTyped: Nothing to erase.");
        }

        this.state = this.STATEMENT.ERASED;

        return new Promise((resolve, reject) => {
            this.promiseResolve = resolve;
            this.promiseReject = reject;

            // Start the erasing process
            this.timer.start();
        });
    }

    /**
     * Start the typing animation.
     * @returns {Promise} A promise that resolves when the typing animation is complete
     */
    start() {
        if (this.state !== this.STATEMENT.TYPED) {
            throw new Error("AutoTyped: Call `typed()` before starting the animation.");
        }

        // Clear the container's content
        this.container.textContent = "";

        return new Promise((resolve, reject) => {
            this.promiseResolve = resolve;
            this.promiseReject = reject;

            // Start the typing process
            this.timer.start();
        });
    }

    /**
     * Stop the typing animation and reject the promise.
     */
    stop() {
        this.timer.stop();
        if (this.promiseReject) {
            this.promiseReject("Typing animation stopped.");
            this.promiseReject = null;
        }
    }

    /**
     * Check if the current state is "typed".
     * @returns {boolean} True if the state is "typed", false otherwise
     */
    isTyped(){ return this.state === this.STATEMENT.TYPED }
    /**
     * Check if the current state is "erased".
     * @returns {boolean} True if the state is "erased", false otherwise
     */
    isErased(){ return this.state === this.STATEMENT.ERASED }
    /**
     * Check if the current state is "finished".
     * @returns {boolean} True if the state is "finished", false otherwise
     */
    isFinished(){ return this.state === this.STATEMENT.FINISHED }
    /**
     * Check if the current state is "default".
     * @returns {boolean} True if the state is "default", false otherwise
     */
    isDefault(){ return this.state === this.STATEMENT.DEFAULT }

    /**
     * Internal method that handles the typing and erasing logic.
     * @private
     */
    #_autotyped() {
        const textLength = this.container.textContent.length;

        switch (this.state) {
            case this.STATEMENT.TYPED:
                if (textLength < this.content.length) {
                    // Add the next character
                    this.container.textContent += this.content.charAt(textLength);
                } else {
                    // Typing is complete
                    this.state = this.STATEMENT.FINISHED;
                    this.#_finish();
                }
                break;

            case this.STATEMENT.ERASED:
                if (textLength > 0) {
                    // Remove the last character
                    this.container.textContent = this.container.textContent.slice(0, -1);
                } else {
                    // Erasing is complete
                    this.state = this.STATEMENT.FINISHED;
                    this.#_finish();
                }
                break;

            default:
                this.stop();
                break;
        }
    }

    /**
     * Finish the animation (typing or erasing) and resolve the promise.
     * @private
     */
    #_finish() {
        this.timer.stop();
        if (this.promiseResolve) {
            this.promiseResolve();
            this.promiseResolve = null;
        }
    }
}

export class SaveManager{
    static save(key, value){ localStorage.setItem(key, JSON.stringify(value)) }
    static load(key, default_value = []){
        if(!localStorage.getItem(key)) return default_value
        return JSON.parse(localStorage.getItem(key))
    }
    static remove(key){ localStorage.removeItem(key); }
}

export class JSONManager{
    constructor({pathfile, saverSystem}) {
        this.pathfile = pathfile;
        this.saverSystem = saverSystem;
        this.datas = {};
    }

    get(param) {
        if (this.datas.hasOwnProperty(param)) {
            return this.datas[param];
        } else {
            console.error(`The parameter "${param}" doesn't exist in the JSON file.`);
            return null;
        }
    }

    set(param, value){
        if (this.datas.hasOwnProperty(param)) {
            this.datas[param] = value;
        } else {
            console.error(`The parameter "${param}" doesn't exist in the JSON file.`);
        }
    }

    getDatas(){ return this.datas; }

    async load(){
        try {
            const reponse = await fetch(this.pathfile);
            this.datas = await reponse.json();
            console.log(`JSON file has loaded successfully from ${this.pathfile}`);
        } catch (erreur) {
            console.error(`Error during the JSON file load: ${erreur.message}`);
        }
    }

    async save(){
        try {
            const datasJSON = JSON.stringify(this.datas, null, 2);
            this._request({
                action: this.saverSystem,
                params: `datas=${datasJSON}&filename=${this.pathfile}`
            }, (res) => { console.log(res); })
        } catch (erreur) {
            console.error(`Error during the JSON file save: ${erreur.message}`);
        }
    }

    _request({action, params = "", method = "POST", type = "text/html"}, callback = () => {}) {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (this.readyState === xhr.DONE && this.status === 200) callback(this.responseText)
        }
        xhr.open(method, action, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        xhr.type = type
        xhr.send(params)
    }
}

export class Score{
    constructor(ini = 0, isNegative = false){
        this.ini = ini
        this.isNegative = isNegative
        this.score = ini
    }

    get(){ return this.score }
    set(point){
        this.score = parseFloat(point)
        this.#format()
        this.#checkNegative()
    }

    getScoreFormat(lang, options = {}){ return new Intl.NumberFormat(lang, options).format(this.score) }

    add(point = 1){
        this.score += point
        this.#format()
        this.#checkNegative()
    }
    remove(point = 1){
        this.score -= point
        this.#format()
        this.#checkNegative()
    }
    reset(){ this.score = this.ini }

    #checkNegative(){ if(!this.isNegative && this.score < 0) this.score = 0 }
    #format(){ this.score = Math.round(this.score) }
}

export class Statistics{
    constructor(){
        this.combo = 0
        this.maxcombo = 0
        this.success = 0
        this.errors = 0
    }

    getCombos(){ return this.combos }
    setCombos(comb){ this.combos = comb }
    addCombos(comb = 1){ this.combos += comb; this.setMaxCombo() }
    lessCombos(comb = 1){ this.combos -= comb }

    getMaxCombo(){ return this.maxcombo }
    setMaxCombo(){ if(this.combo > this.maxcombo) this.maxcombo = this.combo }

    getSuccess(){ return this.success }
    setSuccess(succ){ this.success = succ }
    addSuccess(succ = 1){ this.success += succ }
    lessSuccess(succ = 1){ this.success -= succ }

    getErrors(){ return this.errors }
    setErrors(err){ this.errors = err }
    addErrors(err = 1){ this.errors += err }
    lessErrors(err = 1){ this.errors -= err }
}

export class TypingStatistics extends Statistics{
    constructor(){
        super()
        this.findingWords = 0
        this.tappedLetter = 0
    }

    getFindingWords(){ return this.findingWords }
    addFindingWords(){ this.findingWords++ }
    getTappedLetter(){ return this.tappedLetter }
    addTappedLetter(){ this.tappedLetter++ }
}