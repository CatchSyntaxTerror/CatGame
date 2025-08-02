# Cat Game

This project is a JavaScript-based animation built using the HTML5 Canvas API. It is designed as a learning exercise in procedural animation, sprite management, and canvas layout. The main feature of the game is a cat character that responds to keyboard input and performs different animations depending on its movement and state.

## Overview

The layout includes three canvas elements:
- A central canvas (`canvas1`) where the main game and animation logic takes place.
- Two side panels (`canvas2` and `canvas3`) intended for UI elements or additional interactions.

The game is displayed in a fixed-size layout, with all canvases aligned horizontally and centered on the screen. This ensures consistent behavior and appearance across different devices and screen resolutions.

## Features

- Smooth sprite-based animations controlled by keyboard input
- Procedural animation states including "idle", "lick", "runLeft", and "runRight"
- Responsive and centered layout using CSS Flexbox
- Background rendering and frame-based animation timing

## Controls

- Arrow keys or `A`/`D` can be used to move the cat left or right.
- On key release, the cat randomly selects between idle and licking animations.

## Project Structure

- `index.html`: Defines the canvas layout and links to style and script files.
- `style.css`: Handles the styling and layout of the canvases using Flexbox.
- `main.js`: Contains the animation loop, sprite logic, and input handling.

## Setup Instructions

1. Clone or download the project.
2. Open `index.html` in a browser to run the game. No build tools or live server required.

## Future Improvements

- Add falling fish mechanics with various fish types and point values
- Animate the background to enhance visual appeal and immersion
- Display fish types and score values in the right panel
- Display current score and control instructions in the left panel
- Implement player-fish collision detection and scoring logic
- Expand player animation states and transitions for catching actions
- Add sound effects and particle animations for catches and misses


## Author

Youssef Amin  
Created to practice JavaScript, HTML canvas
