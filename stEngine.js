import { getEl } from './function.js';

export default class stEngine{
    constructor({canvasid = "canvas", start, update, restart, autostart = true}){
        this.canvas = getEl(canvasid);
        this.starter = start;
        this.updater = update;
        this.restarter = restart;
        if(autostart) this.start();
    }

    restart(forced = false){
        if(!forced && this.restarter) this.restarter();
        else document.location.reload();
    }

    start(){
        if(this.starter) this.starter();
        if(this.updater) this.#update();
    }

    #update(){
        this.updater();
        requestAnimationFrame(() => this.#update());
    }

    PlaySound({src, volume = 1}){
        let sound = new Audio();
        sound.src = src;
        sound.volume = (volume > 1) ? 1 : (volume < 0) ? 0 : volume;
        sound.play();
    }
}