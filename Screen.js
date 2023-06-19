export { getScreenDim, onScreenResize }

var screen_width = window.innerWidth;
var screen_height = window.innerHeight;

function getScreenDim(){
    return [screen_width, screen_height];
}

function onScreenResize(){
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
}