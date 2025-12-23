# 🎮 Oops! All Spikes

> A chaotic, troll-filled 2D platformer with 100 levels of pure madness. Can you survive the chaos?

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Levels](https://img.shields.io/badge/levels-100-brightgreen.svg)](#features)
[![Status](https://img.shields.io/badge/status-active-success.svg)](#status)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [How to Play](#how-to-play)
- [Project Structure](#project-structure)
- [Game Mechanics](#game-mechanics)
- [Troll Events](#troll-events)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

**Oops! All Spikes** is an intentionally frustrating platformer game that combines classic platforming mechanics with unpredictable troll events. Navigate through 100 procedurally-seeded levels filled with deadly spikes, fake platforms, hidden traps, and reality-bending shenanigans.

Nothing is as it seems. Trust nobody, not even yourself.

## ✨ Features

- **100 Progressively Challenging Levels** - Each level is procedurally generated with consistent seeds for fair replays
- **Smart Difficulty Scaling** - Levels become harder with more spikes, narrower platforms, and increased trickery
- **Dynamic Troll Events** - Random events that flip gravity, reverse controls, shrink the player, and more
- **Hidden Spike Mechanics** - Spikes remain invisible until you get too close, then BOOM!
- **Deceptive Goal Placement** - 70% chance the goal moves when you reach it (trolling guaranteed)
- **Fake Platforms** - Disappear when you step on them
- **Level Map System** - Track your progress through all 100 levels with visual feedback
- **Rage System** - Your frustration meter builds with each death, triggering more trolls
- **Responsive Design** - Works seamlessly on different screen sizes
- **Death Counter & Time Tracking** - Monitor your progress with real-time statistics

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or dependencies required!

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/OOPS-spikes.git
cd OOPS-spikes
```

2. Open in your browser:
```bash
# Option 1: Direct file open
open index.html

# Option 2: Using Python (local server)
python3 -m http.server 8000
# Then visit http://localhost:8000

# Option 3: Using Node.js (if you have http-server)
npx http-server
```

3. Start playing and prepare to rage! 😈

## 🎮 How to Play

### Controls

| Key | Action |
|-----|--------|
| `←` | Move Left |
| `→` | Move Right |
| `Space` | Jump |
| `M` | Toggle Level Map |

### Objectives

1. **Survive** - Don't touch the spikes or fall off the level
2. **Navigate** - Jump across platforms to reach the goal
3. **Adapt** - Deal with random troll events that mess with your game
4. **Progress** - Complete all 100 levels and earn bragging rights

### Game Elements

- 🟫 **Platforms** - Solid surfaces you can jump on
- 🟥 **Fake Platforms** - Brown platforms that disappear when stepped on
- 🔴 **Spikes** - Deadly obstacles that end your run instantly
- 👁️ **Hidden Spikes** - Invisible until you get too close
- 🚪 **Goal** - The exit portal at the end of each level
- 💀 **Lava/Void** - Falling off the bottom = death

## 📁 Project Structure

```
OOPS-spikes/
├── index.html              # Main HTML file (entry point)
├── Readme.md              # This file
├── css/
│   └── styles.css         # All game styling
├── src/
│   ├── game.js            # Main game logic
│   ├── constants.js       # Game constants and configuration
│   ├── rendering.js       # Canvas rendering functions
│   ├── physics.js         # Physics and collision detection
│   └── level-generator.js # Level generation algorithm
└── assets/                # Game assets (images, sounds, etc.)
    └── (future expansion)
```

### File Descriptions

- **index.html** - Entry point containing canvas and script imports
- **css/styles.css** - All CSS styling including animations and UI elements
- **src/constants.js** - Game configuration (gravity, jump power, speeds, etc.)
- **src/level-generator.js** - Procedural level generation with seeding
- **src/physics.js** - Collision detection, platform interactions, and movement
- **src/rendering.js** - Canvas drawing for players, platforms, spikes, and UI
- **src/game.js** - Core game loop, state management, and event handling

## 🎯 Game Mechanics

### Movement

- Player moves left/right with arrow keys
- Jump with spacebar (only while grounded)
- Gravity pulls you down by default
- Momentum-based movement for smooth feel

### Collisions

- **Platform Collision** - Land on platforms to stop falling
- **Spike Collision** - Instant death on contact
- **Boundary Collision** - Falling off bottom = death
- **Goal Collision** - Reach the exit to progress (sometimes...)

### Level Generation

Each level is generated using a seeded random number generator:
- Same seed = identical level every time
- Difficulty increases every 10 levels
- 2-4 platforms per level with random positioning
- 60% chance of spikes near platforms
- Hidden spikes trigger when player gets within 40px

### Difficulty Scaling

| Levels | Difficulty | Changes |
|--------|-----------|---------|
| 1-10 | Easy | Few platforms, minimal spikes |
| 11-20 | Medium | More spikes, some hidden |
| 21-50 | Hard | Narrower platforms, more traps |
| 51-99 | Nightmare | Dense spike patterns, frequent trolls |
| 100 | Insane | Maximum chaos, all trolls enabled |

## 👹 Troll Events

Random events trigger with 0.2% probability per frame, increasing with rage:

### Available Trolls

1. **Reversed Controls** - Left becomes right, right becomes left
2. **Gravity Flip** - Screen flips, gravity inverts, perspective warps
3. **Shrink Player** - Your character becomes tiny and harder to control
4. **Zoom Out** - View zooms out, making it hard to see details
5. **Color Chaos** - Screen colors flip, creating visual confusion

### Troll Mechanics

- More trolls activate as your **Rage Meter** increases
- Deaths add 20 rage points
- Rage > 60 triggers additional troll events
- Getting hints has 50% chance to trigger a troll
- All effects reset after ~3 seconds

## 📊 Statistics

The game tracks:

- **Level Number** - Current level (1-100)
- **Deaths** - Total deaths across all attempts
- **Time** - Elapsed time in seconds
- **Rage Meter** - Your frustration level (0-100%)
- **Completed Levels** - Levels successfully cleared

View all stats with the **Level Map** (Press M):

```
╔════════════════════════════════════════════════════════╗
║            LEVEL MAP - 100 LEVELS OF CHAOS             ║
║                                                        ║
║    Current Level: 23 | Completed: 19/100 | Deaths: 156║
║                                                        ║
║    [Grid showing 100 levels with color coding]        ║
║                                                        ║
║    ✓ Green = Completed                                 ║
║    ○ Gold  = Current Level                             ║
║    ✗ Red   = Failed/Skipped                            ║
║    □ Gray  = Not Reached                               ║
╚════════════════════════════════════════════════════════╝
```

## 🐛 Debugging & Development

### Enable Developer Mode

Open the browser console (F12) to access game state:

```javascript
// View current game state
console.log(game);

// Modify game values
game.level = 50;                    // Jump to level 50
game.rage = 100;                    // Max rage
game.player.x = 100;               // Teleport player
game.controlsReversed = !game.controlsReversed; // Toggle trolls
```

### Performance Tips

- Close other browser tabs for better performance
- Use Chrome for best performance
- Disable browser extensions that modify the DOM
- Run in fullscreen mode for immersive experience

## 🎓 Code Architecture

### Game State Object

```javascript
let game = {
  player: { x, y, width, height, vx, vy, grounded, size },
  platforms: [],      // Array of platform objects
  spikes: [],        // Array of spike objects
  goal: { x, y, width, height, moved },
  keys: {},          // Pressed keys tracker
  level: 1,
  deaths: 0,
  rage: 0,
  time: 0,
  controlsReversed: false,
  gravityFlipped: false,
  showMap: false,
  completedLevels: Set,
  levelSeeds: {}
};
```

### Game Loop

```
Update Phase:
  → Handle input
  → Apply physics
  → Check collisions
  → Update game state
  → Trigger random trolls

Render Phase:
  → Clear canvas
  → Draw platforms
  → Draw spikes
  → Draw player
  → Draw UI elements
  → Draw level map (if active)
```

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

- Add new troll events
- Create level themes/skins
- Add sound effects
- Implement multiplayer mode
- Create a level editor
- Add leaderboard system
- Improve mobile controls

To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by games like Super Meat Boy and Jump King
- Troll events inspired by community feedback and chaos theory
- Made with HTML5 Canvas and pure JavaScript (no frameworks!)

## 📧 Support

- Found a bug? [Open an issue](https://github.com/yourusername/OOPS-spikes/issues)
- Want to discuss strategies? [Join discussions](https://github.com/yourusername/OOPS-spikes/discussions)
- Need help? Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

**Remember:** *Nothing is as it seems. Trust nobody, not even yourself.* 😈

**Good luck, and may the chaos be ever in your favor!** 🎮

---

*Last Updated: December 24, 2025*
