export default class Save{
    static save(key, value){ localStorage.setItem(key, JSON.stringify(value)) }
    static load(key, default_value = []){
        if(!localStorage.getItem(key)) return default_value
        return JSON.parse(localStorage.getItem(key))
    }
    static remove(key){ localStorage.removeItem(key); }
}