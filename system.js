import Timer from "./inc/timer.js"

export default class System{
    constructor(timerStamp = 50){
        this.GAMESTATE = { PLAY: "play", STOP: "stop", PAUSE: "pause", GAMEOVER: "gameover" }
        this.gamestate = this.GAMESTATE.PLAY
        this.timerStamp = timerStamp
        this.#_()
    }

    async #_(){
        await this.Awake()
        await this.Start()
        this.timer = new Timer(() => { this.Update() }, this.timerStamp)
    }

    getState(){ return this.gamestate }
    getTimerStamp(){ return this.timerStamp }
    setTimer(timer){
        this.timerStamp = timer
        this.timer.reset(timer)
    }

    Awake(){}
    Start(){}
    Update(){
        switch(this.gamestate){
            case this.GAMESTATE.PLAY: this.Play(); break;
            case this.GAMESTATE.STOP: this.Stop(); break;
            case this.GAMESTATE.PAUSE: this.Pause(); break;
            case this.GAMESTATE.GAMEOVER: this.GameOver(); break;
        }
    }
    
    Play(){
        this.gamestate = this.GAMESTATE.PLAY
        this.timer?.start()
    }
    Stop(){
        this.gamestate = this.GAMESTATE.STOP
        this.timer?.stop()
    }
    Pause(){
        this.gamestate = this.GAMESTATE.PAUSE
        this.timer?.stop()
    }
    GameOver(){
        this.gamestate = this.GAMESTATE.GAMEOVER
        this.timer?.stop()
    }

    PlaySound({src, volume = 1}){
        let sound = new Audio();
        sound.src = src;
        sound.volume = (volume > 1) ? 1 : (volume < 0) ? 0 : volume;
        sound.play();
    }

    /** @return {boolean} */
    isPlay(){ return this.gamestate === this.GAMESTATE.PLAY; }
    /** @return {boolean} */
    isStop(){ return this.gamestate === this.GAMESTATE.STOP; }
    /** @return {boolean} */
    isPause(){ return this.gamestate === this.GAMESTATE.PAUSE; }
    /** @return {boolean} */
    isGameOver(){ return this.gamestate === this.GAMESTATE.GAMEOVER; }
}
