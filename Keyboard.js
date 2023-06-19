export { Keys, KeyLookup, keyEvent }

const TESTING = false;

const Keys = {
    'KeyW' : false,
    'KeyA' : false,
    'KeyS' : false,
    'KeyD' : false,
    'ShiftLeft' : false,

    'KeyE' : false,
    'KeyP' : false,

    'Enter' : false,
    'Space' : false,

    'Digit1' : false,
    'Digit2' : false,
    'Digit3' : false,
    'Digit4' : false,
    'Digit5' : false,
    'Digit6' : false,
    'Digit7' : false,
    'Digit8' : false,
    'Digit9' : false,
    'Digit0' : false,
}

const KeyLookup = {
    'KeyA' : ['a', 'A'],
    'KeyB' : ['b', 'B'],
    'KeyC' : ['c', 'C'],
    'KeyD' : ['d', 'D'],
    'KeyE' : ['e', 'E'],
    'KeyF' : ['f', 'F'],
    'KeyG' : ['g', 'G'],
    'KeyH' : ['h', 'H'],
    'KeyI' : ['i', 'I'],
    'KeyJ' : ['j', 'J'],
    'KeyK' : ['k', 'K'],
    'KeyL' : ['l', 'L'],
    'KeyM' : ['m', 'M'],
    'KeyN' : ['n', 'N'],
    'KeyO' : ['o', 'O'],
    'KeyP' : ['p', 'P'],
    'KeyQ' : ['q', 'Q'],
    'KeyR' : ['r', 'R'],
    'KeyS' : ['s', 'S'],
    'KeyT' : ['t', 'T'],
    'KeyU' : ['u', 'U'],
    'KeyV' : ['v', 'V'],
    'KeyW' : ['w', 'W'],
    'KeyX' : ['x', 'X'],
    'KeyY' : ['y', 'Y'],
    'KeyZ' : ['z', 'Z'],
    'Digit1' : ['1', '1'],
    'Digit2' : ['1', '2'],
    'Digit3' : ['1', '3'],
    'Digit4' : ['1', '4'],
    'Digit5' : ['1', '5'],
    'Digit6' : ['1', '6'],
    'Digit7' : ['1', '7'],
    'Digit8' : ['1', '8'],
    'Digit9' : ['1', '9'],
    'Digit0' : ['1', '0'],
}


function keyEvent(e) {
    if(TESTING){
        console.log(`un/pressed ${e.code }`)
    }

    if (Keys[e.code] !== undefined) {
        if(TESTING){
            console.log(e.code + " " + e.type)
        }
        
        Keys[e.code] = e.type === "keydown";
        //e.preventDefault();
    }
}