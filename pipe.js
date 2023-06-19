import { getScreenDim } from "./Screen.js";

export { Pipe, PipeCreator }

const STARTX = 1000;
const SPEED = 40;

var groundstartper = 0.75;

const TILEWIDTH = 16;
const TILEHEIGHT = 16;
const SHEET = new Image();
SHEET.src = "fbsheet.png";

var actualtilewidth = 64;
var actualtileheight = 64;

class Pipe{
    constructor(x = STARTX, _topend, _bottomstart){
        this.x = x;
        this.topend = _topend;
        this.bottomstart = _bottomstart;
    }

    getTopBounds(){
        var screen = getScreenDim();
        return [
            this.x, 0, actualtilewidth, Math.round(screen[1] * this.topend)
        ]
    }

    getBottomBounds(){
        var screen = getScreenDim();
        return [
            this.x, Math.round(screen[1] * this.bottomstart), 
            actualtilewidth, Math.round(screen[1] * (groundstartper - this.bottomstart))
        ]
    }

    update(deltatime){
        this.x -= SPEED * deltatime;
    }

    draw(context){
        var screen = getScreenDim();

        //draw top body
        context.drawImage(SHEET,
            2 * TILEWIDTH, TILEHEIGHT * 1, TILEWIDTH, TILEHEIGHT, 
            this.x, 0, actualtilewidth, Math.round(screen[1] * this.topend) - actualtileheight);

        //draw bottom body
        context.drawImage(SHEET,
            2 * TILEWIDTH, TILEHEIGHT * 1, TILEWIDTH, TILEHEIGHT, 
            this.x, Math.round(screen[1] * this.bottomstart) + actualtileheight,
            actualtilewidth, Math.round(screen[1] * (groundstartper - this.bottomstart)) - actualtileheight);
            
        //draw heads
        context.drawImage(SHEET,
            2 * TILEWIDTH, TILEHEIGHT * 2, TILEWIDTH, TILEHEIGHT,  
            this.x, Math.round(screen[1] * this.topend) - actualtileheight,
            actualtilewidth, actualtileheight);

        context.drawImage(SHEET,
            2 * TILEWIDTH, TILEHEIGHT * 0, TILEWIDTH, TILEHEIGHT, 
            this.x, Math.round(screen[1] * this.bottomstart),
            actualtilewidth, actualtileheight);
    }
}

class PipeCreator{
    /**
     * @returns {Pipe}
     */
    static {
        this.lastpipe = null;
    }

    static createPipe(startover = false){
        if(startover){
            this.lastpipe = null;
        }
        
        let x;
        if(this.lastpipe == null){  
            x = STARTX;
        }else{
            x = this.lastpipe.x + 400;
        }

        let te = 0.1 + Math.random() * 0.4;
        let bs = te + Math.random() * 0.2;

        if(bs - te > 0.2) bs = te + 0.2;
        if(bs - te < 0.15) bs = te + 0.15;

        var p = new Pipe(x, te, bs);
        this.lastpipe = p;

        return p; 
    }
}