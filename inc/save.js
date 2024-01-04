export default class Save{
    static save(key, value){ localStorage.setItem(key, JSON.stringify(value)) }
    static load(key, default_value = []){
        if(!localStorage.getItem(key)) return default_value
        return JSON.parse(localStorage.getItem(key))
    }
    static remove(key){ localStorage.removeItem(key); }
}

export class JSONManager {
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
