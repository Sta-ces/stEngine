export default class Score{
    constructor(ini = 0, negative_point = false){
        this.ini = ini;
        this.negative_point = negative_point;
        this.score = ini;
    }

    get(){
        return this.score;
    }

    set(point){
        this.score = parseFloat(point);
        this.#format();
        this.#checkNegative();
    }

    getScoreFormat(lang){
        return new Intl.NumberFormat(lang).format(this.get());
    }

    add(point = 1){
        this.score += point;
        this.#format();
        this.#checkNegative();
    }

    remove(point = 1){
        this.score -= point;
        this.#format();
        this.#checkNegative();
    }

    reset(){
        this.score = this.ini;
    }

    #checkNegative(){
        if(!this.negative_point){
            if(this.score < 0) this.score = 0;
        }
    }

    #format(){
        this.score = Math.round(this.score);
    }
}