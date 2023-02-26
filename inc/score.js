export default class Score{
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