import Statistics from "./statistics.js";

export default class TypingStatistics extends Statistics{
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