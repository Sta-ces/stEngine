import Timer from "./timer.js";

export default class Chronometer {

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