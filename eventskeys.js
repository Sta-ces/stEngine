import { keys } from "./libs/keycodes.js";

export default class EventsKeys {
    static #key = {};
    static #profiles = {};
    static #callbacks = [];

    static #onKeyUp(e) { this.#key[e.code] = false; }
    static #onKeyDown(e) {
        this.#key[e.code] = e;
        this.#callbacks.forEach(cb => cb(e))
    }
    static #onMouseUp(e) { this.#key[`mouse${e.button}`] = false; }
    static #onMouseDown(e) { this.#key[`mouse${e.button}`] = e; }
    static #isValid(value) { return value !== undefined && value !== null && value !== false; }

    static init(oncontextmenu = false) {
        document.body.setAttribute("oncontextmenu", `return ${oncontextmenu};`);
        window.addEventListener('keydown', e => { this.#onKeyDown(e) });
        window.addEventListener('keyup', e => { this.#onKeyUp(e) });
        window.addEventListener('mousedown', e => { this.#onMouseDown(e) });
        window.addEventListener('mouseup', e => { this.#onMouseUp(e) });
    }
    static destroy() {
        window.removeEventListener('keydown', this.#onKeyDown);
        window.removeEventListener('keyup', this.#onKeyUp);
        window.removeEventListener('mousedown', this.#onMouseDown);
        window.removeEventListener('mouseup', this.#onMouseUp);
    }

    static isKeyDown(name) {
        let profile = this.#profiles[name];
        if(!profile) return false;
        return this.#isValid(this.#key[profile.code]);
    }
    static getProfile(name){ return this.getKey(name) }
    static getKey(name){ return this.#profiles[name] }
    static getProfiles(){ return this.#profiles }
    static addCallbacks(callback){ this.#callbacks.push(callback) }
    /**
     * 
     * @param {string} name 
     * @param {object} key 
     */
    static registerProfile(name, key) {
        switch(key){
            case "Left mouse":
            case "Left click":
            case "click":
            case "mouse0":
                this.#profiles[name] = { key: 'Left click', code: 'mouse0', keyCode: 0 };
                break;
            case "Middle mouse":
            case "Middle click":
            case "mouse1":
                this.#profiles[name] = { key: 'Middle click', code: 'mouse1', keyCode: 1 };
                break;
            case "Right mouse":
            case "Right click":
            case "mouse2":
                this.#profiles[name] = { key: 'Right click', code: 'mouse2', keyCode: 2 };
                break;
            default:
                this.#profiles[name] = keys.find(k => k.key === key || k.code === key || k.keyCode === key);
                break;
        }
    }
    static registerProfiles(profiles){
        if(typeof profiles !== 'object') return null;
        Object.entries(profiles).forEach(p => this.registerProfile(p[0],p[1]))
    }
}