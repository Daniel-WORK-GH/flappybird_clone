import { getScreenDim } from "./Screen.js";
import { Keys, keyEvent } from "./Keyboard.js";
import { onScreenResize } from "./Screen.js";
import { PipeCreator } from "./pipe.js";

window.addEventListener('resize', onScreenResize, true);
document.addEventListener('keydown', keyEvent);
document.addEventListener('keyup', keyEvent);  

const FPS = 60;
const DELTATIME = 60 / 1000;
const TILEWIDTH = 16;
const TILEHEIGHT = 16;
const SHEET = new Image();
SHEET.src = "fbsheet.png";

const GRAVITY = 5;
const JUMP = 6;
const MAXVELFALL = 15;
const MAXVELJUMP = -10;

var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");

var actualtilewidth = 64;
var actualtileheight = 64;

var canvaswidth = 0;
var canvasheight = 0;

const BIRD = {
    x : 164,
    y : 200,
    velx : 0,
    vely : 0,
    texwidth : 16,
    texheight : 12,
    width : 64,
    height : 48,

    score : 0,
}

var groundstart = Math.round(0.75 * canvasheight);

var pipes = [];
for(let i = 0; i < 100; i++){
    pipes.push(PipeCreator.createPipe());
}

const GAMESTATES = {
    ONGOING : 0,
    ENDED : 1
}
var gamestate = GAMESTATES.ENDED;
var spacepressed = false;

function init(){
    let screen = getScreenDim();
    setSize(screen);

    setInterval(mainLoop, 1000 / 60);
}

function setSize(screen){
    canvas.width = screen[0];
    canvas.height = screen[1];

    canvaswidth = canvas.width;
    canvasheight = canvas.height;

    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    groundstart = Math.round(0.75 * canvasheight);
}

function checkIntersection(rect1, rect2) {
    const [x1, y1, width1, height1] = rect1;
    const [x2, y2, width2, height2] = rect2;
  
    if(x1 < x2 + width2 &&
        x1 + width1 > x2 &&
        y1 < y2 + height2 &&
        y1 + height1 > y2){
        return true;
    } else {
        return false;
    }
  }

function updateLoop(){
    //apply gravity and check for ground
    if(gamestate == GAMESTATES.ONGOING){
        //velocity gravity
        BIRD.vely = BIRD.vely + DELTATIME * GRAVITY;
        if(BIRD.vely >= MAXVELFALL) BIRD.vely = 15;

        //velocity jump
        if(!spacepressed && Keys.Space){
            if(BIRD.vely > -2){
                BIRD.vely = -JUMP;
            }else{
                BIRD.vely += -JUMP;
            }
            if(BIRD.vely <= MAXVELJUMP) BIRD.vely = MAXVELJUMP;
            spacepressed = true;
        }else if(!Keys.Space){
            spacepressed = false;
        }

        BIRD.y += BIRD.vely;
    }

    //lose on ground
    if(BIRD.y + BIRD.height >= groundstart){
        gamestate = GAMESTATES.ENDED;
    }

    //update pipes
    if(gamestate == GAMESTATES.ONGOING){
        for(let i = 0; i < 10; i++){
            pipes[i].update(DELTATIME);
        }
    }

    //check collision
    for(let i = BIRD.score; i < BIRD.score + 2; i++){
        let bounds = [
            BIRD.x, BIRD.y, BIRD.width, BIRD.height
        ]

        if(checkIntersection(bounds, pipes[i].getTopBounds())){
            gamestate = GAMESTATES.ENDED;
        }

        if(checkIntersection(bounds, pipes[i].getBottomBounds())){
            gamestate = GAMESTATES.ENDED;
        }
    }

    //check score
    let b = pipes[BIRD.score].getTopBounds();
    if(b[0] + b[2] < BIRD.x){
        BIRD.score++;
    }

    if(gamestate == GAMESTATES.ENDED){
        if(!spacepressed && Keys.Space){
            BIRD.y = 200;
            BIRD.vely = 0;
            BIRD.score = 0;

            pipes = [PipeCreator.createPipe(true)];
            for(let i = 0; i < 99; i++){
                pipes.push(PipeCreator.createPipe());
            }

            gamestate = GAMESTATES.ONGOING;
        }
    }
}

function drawLoop(){
    //draw sky
    for(let x = 0; x < canvaswidth; x += actualtilewidth){
        for(let y = 0; y < canvasheight; y += actualtileheight){
            context.drawImage(SHEET,
                3 * TILEWIDTH, TILEHEIGHT * 1, TILEWIDTH, TILEHEIGHT, 
                x, y, actualtilewidth, actualtileheight);
        }
    }

    //draw ground
    for(let x = 0; x < canvaswidth; x += actualtilewidth){
        context.drawImage(SHEET,
            0, TILEHEIGHT * 2, TILEWIDTH, TILEHEIGHT, 
            x, groundstart, actualtilewidth, actualtileheight);
    
        for(let y = groundstart + actualtileheight; y < canvasheight; y += actualtileheight){
            context.drawImage(SHEET,
                0, TILEHEIGHT * 3, TILEWIDTH, TILEHEIGHT, 
                x, y, actualtilewidth, actualtileheight);
        }
    }
    
    //draw pipes
    for(let i = 0; i < 10; i++){
        pipes[i].draw(context);
    }

    //draw bird
    context.drawImage(SHEET,
        0, TILEHEIGHT * 1, BIRD.texwidth, BIRD.texheight, 
        Math.round(BIRD.x), Math.round(BIRD.y), BIRD.width, BIRD.height);


    //draw score
    context.font = "48px serif";
    const text = context.measureText(`Score : ${BIRD.score}`); // TextMetrics object
    context.fillText(`Score : ${BIRD.score}`, canvaswidth / 2 - text.width / 2, 50);

    //draw start/lose screen
    if(gamestate == GAMESTATES.ENDED){
        let text = 'Press any key to start.';
        if(BIRD.score != 0){
            text += `\nYour score was : ${BIRD.score} / 100`
        }
        const textsize = context.measureText(text); // TextMetrics object

        context.fillText(text, canvaswidth / 2 - textsize.width / 2, canvasheight / 2 - 48 / 2);
    }
}

function mainLoop(){
    let screen = getScreenDim();
    setSize(screen);

    updateLoop();
    drawLoop();
}

init()