import { getEl } from './function.js';

export default class stEngine{
    /**
     * @param {{canvasid?:string, start?:function, update?:function, restart?:function, width?:number, height?:number, autostart?:boolean, autorefresh?:boolean}} 
     */
    constructor({canvasid = "canvas", start, update, restart, width = null, height = null, autostart = true, autorefresh = true}){
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
        if(this.canvas.tagName == "CANVAS"){
            this.context = this.canvas.getContext('2d');
            this.canvas.width = (width) ? width : innerWidth;
            this.canvas.height = (height) ? height : innerHeight;
        }
        else{
            this.context = null;
            this.canvas.style.width = (width) ? width+"px" : "100vw";
            this.canvas.style.height = (height) ? height+"px" : "100vh";
        }

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

    reload(){ this.restart(true); }

    start(){
        if(this.starter) this.starter();
        this.update();
    }

    update(){
        if(this.autorefresh && this.context) this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        if(this.updater) this.updater();
        if(this.context != null) this.draw();
        requestAnimationFrame(() => this.update());
    }

    draw(){}

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