export default class Statistics{
    constructor(){
        this.combo = 0
        this.maxcombo = 0
        this.success = 0
        this.errors = 0
    }

    getCombos(){ return this.combos }
    setCombos(comb){ this.combos = comb }
    addCombos(comb = 1){ this.combos += comb; this.setMaxCombo() }
    removeCombos(comb = 1){ this.combos -= comb }

    getMaxCombo(){ return this.maxcombo }
    setMaxCombo(){ if(this.combo > this.maxcombo) this.maxcombo = this.combo }

    getSuccess(){ return this.success }
    setSuccess(succ){ this.success = succ }
    addSuccess(succ = 1){ this.success += succ }
    removeSuccess(succ = 1){ this.success -= succ }

    getErrors(){ return this.errors }
    setErrors(err){ this.errors = err }
    addErrors(err = 1){ this.errors += err }
    removeErrors(err = 1){ this.errors -= err }
}