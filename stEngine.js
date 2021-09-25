import { getEl } from './function.js';

export default class stEngine{
    /**
     * @param {{canvasid?:string, start?:function, update?:function, restart?:function, autostart?:boolean, autorefresh?:boolean}} 
     */
    constructor({canvasid = "canvas", start, update, restart, autostart = true, autorefresh = true}){
        this.canvas = getEl(canvasid);
        this.starter = start;
        this.updater = update;
        this.restarter = restart;
        this.autorefresh = autorefresh;
        this.GAMESTATE = {
            PLAY: "play",
            STOP: "stop",
            PAUSE: "pause",
            GAMEOVER: "gameover"
        };
        this.gamestate = this.GAMESTATE.PLAY;
        this.context = this.canvas.getContext('2d');

        // END CONSTRUCTOR AND START SYSTEM
        if(autostart) this.start();
    }

    /**
     * @param {boolean} forced Forced the navigator reload.
     */
    restart(forced = false){
        if(!forced && this.restarter) this.restarter();
        else document.location.reload();
    }

    start(){
        if(this.starter) this.starter();
        this.update();
    }

    update(){
        if(this.autorefresh) this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        if(this.updater) this.updater();
        requestAnimationFrame(() => this.update());
    }

    /**
     * @param {{src:string, volume?:number, autoplay?:boolean}}
     * @returns {Audio}
     */
    sound({src, volume = 1, autoplay = true}){
        let sound = new Audio();
        sound.src = src;
        sound.volume = (volume > 1) ? 1 : (volume < 0) ? 0 : volume;
        if(autoplay) sound.play();
        return sound;
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