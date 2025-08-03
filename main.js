/**
 * Author: Youssef Amin
 * A cute HTML5 canvas game for practicing JS + Canvas with sprite animation!
 * All-in-one file so even my least techy friends can enjoy 
 */

// Canvas Setup 
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

// Game Assets
const bgImage = new Image();
bgImage.src = 'images/Background.png';

const playerImage = new Image();
playerImage.src = 'images/kitten.png';

// Player State
const playerSize = 32;
const playerStretch = playerSize * 3.5;
let playerX = 0;
let playerY = CANVAS_HEIGHT * 0.75;
let gameFrames = 0;
const staggerFrames = 8;
let playerState = 'lick';
let playerDirection = 'still';

// Input Handling
window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowLeft':
            playerDirection = 'left';
            playerState = 'runLeft';
            break;
        case 'ArrowRight':
            playerDirection = 'right';
            playerState = 'runRight';
            break;
    }
});

window.addEventListener('keyup', () => {
    playerDirection = 'still';
    playerState = Math.random() < 0.5 ? 'idle' : 'lick';
});

// ========== 🕹️ UI Panels ========== //
function drawLeftPanel() {
  leftPanel.clearRect(0, 0, 200, 800);
  leftPanel.fillStyle = 'black';
  leftPanel.fillRect(0, 0, 200, 800);

  leftPanel.fillStyle = 'white';
  leftPanel.font = '20px Arial';
  leftPanel.fillText('⬅ Move Left', 30, 100);
  leftPanel.fillText('➡ Move Right', 30, 150);
  leftPanel.fillText(`Score: ${score}`, 30, 250);
}

function drawRightPanel() {
  rightPanel.clearRect(0, 0, 200, 800);
  rightPanel.fillStyle = 'black';
  rightPanel.fillRect(0, 0, 200, 800);

  rightPanel.fillStyle = 'white';
  rightPanel.font = '16px Arial';
  rightPanel.fillText('Fish Types:', 30, 50);

  // Placeholder fish display
  fishTypes.forEach((fish, index) => {
    rightPanel.fillText(`${fish.name}: ${fish.points} pts`, 20, 100 + index * 40);
  });
}

// Animation Frames Setup 
const animationStates = [
    { name: 'lick', frames: 3 },
    { name: 'idle', frames: 4 },
    { name: 'runRight', frames: 4 },
    { name: 'runLeft', frames: 4 },
];

const spriteAnimations = {};
animationStates.forEach((state, index) => {
    const frames = { loc: [] };
    for (let j = 0; j < state.frames; j++) {
        frames.loc.push({
            x: j * playerSize,
            y: index * playerSize,
        });
    }
    spriteAnimations[state.name] = frames;
});

// Game Loop 
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawLeftPanel();
    drawRightPanel();

    if (playerDirection === 'right' && playerX < CANVAS_WIDTH - playerStretch) playerX += 5;
    if (playerDirection === 'left' && playerX > 0) playerX -= 5;

    const position = Math.floor(gameFrames / staggerFrames) % spriteAnimations[playerState].loc.length;
    const frameX = spriteAnimations[playerState].loc[position].x;
    const frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, playerSize, playerSize,
        playerX, playerY, playerStretch, playerStretch);

    gameFrames++;
    requestAnimationFrame(animate);
}

animate();
