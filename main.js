/**
 * Author: Youssef Amin
 * this project is made so I can practice HTML, Canvas and JS
 * this project is all done in one class to avoid needing a live server to run 
 */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600

const bgImage = new Image();
bgImage.src = 'images/Background.png';
const playerImage = new Image();
playerImage.src = 'images/kitten.png';
var playerSize = 32;
var playerStretch = playerSize * 3;
var playerX = 0;
var playerY = 440;
var gameFrames = 0;
var staggerFrames = 8;
var playerState = 'lick';
var playerDirection = 'still'


//here is where I handle aniomations based on keys pressed
window.addEventListener('keydown', (e) => {
    var rand = Math.floor(Math.random() * 2);
    switch (e.code) {
        case 'ArrowLeft':
            playerDirection = 'left'
            playerState = 'runLeft';
            break;
        case 'ArrowRight':
            playerDirection = 'right'
            playerState = 'runRight';
            break;
        default:
            playerDirection = 'still'
            if (rand === 0) playerState = 'idle';
            else playerState = 'lick';
    }
});

window.addEventListener('keyup', (e) => {
    playerDirection = 'still'
    var rand = Math.floor(Math.random() * 2);
    if (rand === 0) playerState = 'idle';
    else playerState = 'lick';
});

//this is my data structure for looping through sprite animations
var spriteAnimations = [];
var animationStates = [
    {
        name: 'lick',
        frames: 3
    },
    {
        name: 'idle',
        frames: 4
    },
    {
        name: 'runRight',
        frames: 4
    },
    {
        name: 'runLeft',
        frames: 4
    }
];

animationStates.forEach((state, index) => {
    var frames = {
        loc: [],
    }
    for (var j = 0; j < state.frames; j++) {
        var positionX = j * playerSize;
        var positionY = index * playerSize;
        frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimations[state.name] = frames;
});



//Animate function draws the game 
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if(playerDirection === 'right' && playerX < CANVAS_WIDTH - playerStretch) playerX += 5;
    if(playerDirection === 'left' && playerX > 0) playerX -= 5;
    let position = Math.floor(gameFrames / staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = playerSize * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, playerSize,
        playerSize, playerX, playerY, playerStretch, playerStretch);
    gameFrames++;
    requestAnimationFrame(animate);
}

animate();