import System from "../system.js"

export default class Canvas extends System{
    /**
     * canvasid = "canvas"
     * @param {{canvasid?:string, width?:number, height?:number, autostart?:boolean, autorefresh?:boolean}} 
     */
    constructor({canvasid = "canvas", width = null, height = null, autorefresh = true, isUpdate = true, timerStamp = 50, isDev = false}){
        super({isUpdate, timerStamp, isDev})
        this.canvas = document.getElementById(canvasid)
        this.autorefresh = autorefresh
        this.responsive = width === null && height === null
        this.sizes = {width, height}
        if(this.canvas){
            this.context = (this.canvas.tagName === "CANVAS") ? this.canvas.getContext('2d') : null;
            this.#_resize()
        }
    }

    #_resize(){
        if(this.context){
            this.canvas.width = (this.sizes.width) ? this.sizes.width : innerWidth
            this.canvas.height = (this.sizes.height) ? this.sizes.height : innerHeight
            this.canvasSize = {w: this.canvas.width, h: this.canvas.height}
        }
        else{
            this.canvas.style.width = (this.sizes.width) ? this.sizes.width+"px" : "100vw"
            this.canvas.style.height = (this.sizes.height) ? this.sizes.height+"px" : "100vh"
            this.canvasSize = {w: this.canvas.style.width, h: this.canvas.style.height}
        }
    }

    getContext(){ return this.context }
    getCanvas(){ return this.canvas }
    getCanvasSize(){ return this.canvasSize }

    isResponsive(){ return this.responsive }
    setResponsive(r){ this.responsive = r }

    Update(){
        super.Update()
        if(this.context){
            if(this.autorefresh) this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
            if(this.responsive) this.#_resize()
            this.Draw()
        }
    }

    Draw(){}
}