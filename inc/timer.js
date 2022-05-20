export default class Timer {
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