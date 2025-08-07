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
let fishSpawnTimer = 0;
const fishSpawnInterval = 80;
let score = 0;
let lives = 3;
let fallSpeed = 1;

// Right panel setup
const rightCanvas = document.getElementById('canvas2');
const rightPanel = rightCanvas.getContext('2d');
rightCanvas.width = 200;
rightCanvas.height = 800;

function drawRightPanel() {
    rightPanel.clearRect(0, 0, 200, 800);
    rightPanel.fillStyle = 'pink';
    rightPanel.fillRect(0, 0, 200, 800);

    rightPanel.fillStyle = '#ad62d8ff';
    rightPanel.font = 'bold 20px "Baloo", cursive';
    rightPanel.fillText('Fish Guide', 40, 40);

    let y = 80;
    fishTypes.forEach(fish => {
        const img = fishImages[fish.name];
        if (img.complete) {
            rightPanel.drawImage(img, 20, y, 30, 30);
        }

        rightPanel.fillStyle = fish.isHazard ? 'red' : '#00bfff';
        const label = fish.isHazard
            ? `${fish.name}`
            : `${fish.name}: ${fish.points}pt`;
        rightPanel.fillText(label, 60, y + 20);

        y += 75;

    });

    // Lives Icon
    rightPanel.fillStyle = '#00bfff';
    rightPanel.font = '18px "Comic Sans MS", cursive';
    rightPanel.fillText('Lives:', 20, y + 40);

    if (lifeIcon.complete) {
        rightPanel.drawImage(lifeIcon, 60, y, 70, 70);
    }

    rightPanel.font = 'bold 20px "Comic Sans MS", cursive';
    rightPanel.fillText(`x ${lives}`, 120, y + 42);
}

// Left panel setup
const leftCanvas = document.getElementById('canvas3');
const leftPanel = leftCanvas.getContext('2d');
leftCanvas.width = 200;
leftCanvas.height = 800;
buttonSize = 64;
function drawLeftPanel() {
    leftPanel.clearRect(0, 0, 200, 800);
    leftPanel.fillStyle = 'pink';
    leftPanel.fillRect(0, 0, 200, 800);

    leftPanel.fillStyle = '#00bfff';
    leftPanel.font = 'bold 20px "Baloo", cursive';
    leftPanel.fillText('Controls', 50, 40);

    if (buttonSheet.complete) {
        // Left arrow button
        leftPanel.drawImage(buttonSheet, buttonSize * 5, buttonSize * 2, 64, 64, 50, 80, 40, 40);
        leftPanel.fillText('Left', 100, 105);

        // Right arrow button
        leftPanel.drawImage(buttonSheet, buttonSize, buttonSize * 3, 64, 64, 50, 140, 40, 40);
        leftPanel.fillText('Right', 100, 165);

        // Instructions
        const fishIcon = fishImages['Pufferfish'];
        if (fishIcon.complete) {
            leftPanel.drawImage(fishIcon, 20, 230, 30, 30);
        }
        leftPanel.fillText('Catch fish', 60, 250);

        // Draw "Avoid trash" row
        const hazardIcon = fishImages['Rusty Can']; // or 'Lure'
        if (hazardIcon.complete) {
            leftPanel.drawImage(hazardIcon, 20, 270, 30, 30);
        }
        leftPanel.fillStyle = 'red';
        leftPanel.fillText('Avoid trash!', 60, 290);
    }

    // Score display
    leftPanel.fillStyle = '#ad62d8ff';
    leftPanel.font = 'bold 40px "Baloo", cursive';
    leftPanel.fillText('Score', 30, 500);

    leftPanel.font = 'bold 50px "Comic Sans MS", cursive';
    leftPanel.fillText(`${score}`, leftCanvas.width / 3, 575);
}

// Game Assets
const bgImage = new Image();
bgImage.src = 'images/Background.png';
const lifeIcon = new Image();
lifeIcon.src = 'images/catLickIdle3.png';
const buttonSheet = new Image();
buttonSheet.src = 'images/Pixel Art Buttons.png';
const playerImage = new Image();
playerImage.src = 'images/kitten.png';

//Fish setup
const fishTypes = [
    { name: 'Anchovy', points: 1, speed: 2, src: 'images/Anchovy.png', isHazard: false },
    { name: 'Eel', points: 2, speed: 2.5, src: 'images/Moray Eel.png', isHazard: false },
    { name: 'Pufferfish', points: 3, speed: 3, src: 'images/Pufferfish.png', isHazard: false },
    { name: 'Starfish', points: 5, speed: 3.5, src: 'images/Starfish.png', isHazard: false },
    { name: 'Shark', points: 10, speed: 2, src: 'images/Shark.png', rare: true, isHazard: false },
    { name: 'Lure', points: 0, speed: 3, src: 'images/Lure.png', isHazard: true },
    { name: 'Rusty Can', points: 0, speed: 2, src: 'images/Rusty Can.png', isHazard: true }
];

const fishImages = {};
fishTypes.forEach(fish => {
    const img = new Image();
    img.src = fish.src;
    fishImages[fish.name] = img;
});

const fishArray = [];

class Fish {
    constructor() {
        const type = getRandomFishType();
        this.type = type;
        this.x = Math.random() * (CANVAS_WIDTH - 50);
        this.y = -50;
        this.speed = type.speed;
        this.points = type.points;
        this.color = type.color;
        this.width = 30;
        this.height = 30;
    }

    update() {
        this.y += this.speed * fallSpeed;
    }
    draw() {
        const image = fishImages[this.type.name];
        ctx.drawImage(image, this.x, this.y, this.width, this.height);
    }

}

function getRandomFishType() {
    const rareRoll = Math.random();
    if (rareRoll < 0.03) return fishTypes.find(f => f.rare);
    return fishTypes[Math.floor(Math.random() * (fishTypes.length - 1))];
}


// Player State
class Player {
    constructor() {
        this.size = 32;
        this.stretch = this.size * 3.5;
        this.x = 0;
        this.y = CANVAS_HEIGHT * 0.75;
        this.state = 'lick';
        this.direction = 'still';
    }

    move() {
        if (this.direction === 'right' && this.x < CANVAS_WIDTH - this.stretch) this.x += 5;
        if (this.direction === 'left' && this.x > 0) this.x -= 5;
    }

    getHitbox() {
        return {
            x: this.x + this.stretch * 0.25,
            y: this.y + this.stretch * 0.25,
            width: this.stretch * 0.5,
            height: this.stretch * 0.5
        };
    }

    draw(frameX, frameY) {
        ctx.drawImage(playerImage, frameX, frameY, this.size, this.size,
            this.x, this.y, this.stretch, this.stretch);
    }
}

const player = new Player();

// Input Handling
window.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowLeft':
            player.direction = 'left';
            player.state = 'runLeft';
            break;
        case 'ArrowRight':
            player.direction = 'right';
            player.state = 'runRight';
            break;
    }
});

window.addEventListener('keyup', () => {
    player.direction = 'still';
    player.state = Math.random() < 0.5 ? 'idle' : 'lick';
});



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
            x: j * player.size,
            y: index * player.size,
        });
    }
    spriteAnimations[state.name] = frames;
});

// Game Loop 
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawRightPanel();
    drawLeftPanel();


    for (let i = fishArray.length - 1; i >= 0; i--) {
        const fish = fishArray[i];
        fish.update();
        fish.draw();

        if (fish.y > CANVAS_HEIGHT) {
            fishArray.splice(i, 1);
        }

        const playerHitbox = player.getHitbox();

        if (
            fish.x < playerHitbox.x + playerHitbox.width &&
            fish.x + fish.width > playerHitbox.x &&
            fish.y < playerHitbox.y + playerHitbox.height &&
            fish.y + fish.height > playerHitbox.y
        ) {
            if (!fish.type.isHazard) {
                score += fish.points;
                fallSpeed += 0.05;
                console.log('Caught:', fish.type.name, 'Score:', score);
            } else {
                lives--;
                console.log('Hit a hazard:', fish.type.name, 'Lives left:', lives);
            }
            fishArray.splice(i, 1);
        }
    }

    player.move();

    const position = Math.floor(gameFrames / staggerFrames) % spriteAnimations[player.state].loc.length;
    const frameX = spriteAnimations[player.state].loc[position].x;
    const frameY = spriteAnimations[player.state].loc[position].y;

    player.draw(frameX, frameY);

    fishSpawnTimer++;
    const dynamicInterval = Math.max(10, 80 - (fallSpeed * 15));
    if (fishSpawnTimer > dynamicInterval) {
        fishArray.push(new Fish());
        fishSpawnTimer = 0;
    }

    gameFrames++;
    requestAnimationFrame(animate);
}

const staggerFrames = 8;
let gameFrames = 0;
animate();