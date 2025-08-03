# 🐱 Cat Game

This project is a JavaScript-based animation built using the HTML5 Canvas API.  
It was designed as a learning exercise in procedural animation, sprite management, and canvas layout.  
The main feature is a cat character that responds to keyboard input and performs different animations depending on its movement and state.

---

## 🧵 Overview

The layout includes three canvas elements:
- 🎯 A central canvas (`canvas1`) where the main game and animation logic takes place.
- 🧩 Two side panels (`canvas2` and `canvas3`) intended for UI elements or additional interactions.

The game is displayed in a fixed-size layout, with all canvases aligned horizontally and centered on the screen.  
This ensures consistent behavior and appearance across different devices and screen resolutions.

---

## ✅ Completed
- Cat movement (⬅️ ➡️ / A D)
- Idle + lick animations
- Multi-canvas layout (game + side panels)
- Responsive CSS (Flexbox)
- Smooth sprite animation

## 🚧 In Progress
- 🎣 Falling fish with scoring
- 🧮 Score tracker in left panel
- 🕹️ Controls guide (⬅️ ➡️ labels)
- 🎣 Right panel: fish types + point values
  - 🐟 Small Fish (1pt)
  - 🐠 Medium Fish (2pt)
  - 🐡 Pufferfish (3pt)
  - 🦑 Squid (5pt)
  - 🐋 Whale (10pt, rare)
- 📈 Level scaling (faster fish, rare spawns)
- 🎵 Music on progression

---

## 🎮 Controls

- ⬅️ ➡️ Arrow keys or `A` / `D` can be used to move the cat left or right.  
- 🎲 On key release, the cat randomly selects between idle and licking animations.

---

## 🗂️ Project Structure

- `index.html`: Defines the canvas layout and links to style and script files  
- `style.css`: Handles the styling and layout of the canvases using Flexbox  
- `main.js`: Contains the animation loop, sprite logic, and input handling  

---

## ⚙️ Setup Instructions

1. 📥 Clone or download the project  
2. 🌐 Open `index.html` in a browser to run the game (no build tools or live server required)

---


## 👤 Author

**Youssef Amin**  
> Created to practice JavaScript and HTML Canvas
