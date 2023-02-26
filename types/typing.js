import TypingStatistics from "../inc/typingStatistics.js"
import System from "../system.js"

export default class Typing extends System{
    constructor({words, lang, limitWord = 3, isUpdate = false, timerStamp = 50}){
        super({isUpdate, timerStamp})
        this.words = (words.length > 0) ? words.filter(word => word["label"].length > limitWord) : []
        this.lang = lang
        this.lastword = ""
        this.letters = this.#GenerateWord()
        this.statistics = new TypingStatistics()
    }

    Start(){
        super.Start()
        action("keydown", event => { this.#KeyAction(event) })
    }

    GameOver(){
        super.GameOver()
        noaction("keydown")
    }

    goodLetter(key){}
    wrongLetter(key){}
    findWord(word){}
    resetWord(word){}

    getWord(){ return this.word }
    getLastWord(){ return this.lastword }
    getLetters(){ return this.letters }
    getCombo(){ return this.statistics.getCombos() }

    #GenerateWord(){
        if(!this.words.length) return ""
        this.lastword = this.word

        do{ this.word = this.words[sRandom(this.words.length-1)]["label"] }
        while(this.word === this.lastword)

        let w = this.word; this.resetWord(w)
        return aprostReplace(accentReplace(w))
    }

    #KeyAction(event){
        const KEY = event["key"]
        if(this.letters !== "" && this.gamestate === this.GAMESTATE.PLAY && KEY !== "Enter"){
            this.statistics.addTappedLetter()

            if(this.letters[0].toLowerCase() === accentReplace(KEY.toLowerCase())){
                this.letters = this.letters.substring(1)
                this.statistics.addCombos()
                this.goodLetter(KEY)

                if(this.letters === ""){
                    this.statistics.addFindingWords()
                    this.findWord(this.word)
                    this.letters = this.#GenerateWord()
                }
            }
            else{
                this.statistics.setCombos(0)
                this.statistics.addErrors()
                this.wrongLetter(KEY)
            }
        }

        if(this.letters === "" || this.word === "") this.letters = this.#GenerateWord()
    }
}