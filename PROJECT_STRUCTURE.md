# 📋 Project Structure

## Overview

This project follows a **modular, component-based architecture** designed for maintainability, scalability, and professional code organization.

```
OOPS-spikes/
├── index.html                 # Entry point (main HTML file)
├── Readme.md                  # Project documentation
├── css/
│   └── styles.css            # All game styling (responsive, animations)
├── src/
│   ├── constants.js          # Game configuration & constants
│   ├── level-generator.js    # Level generation algorithm
│   ├── physics.js            # Physics engine & collisions
│   ├── rendering.js          # Canvas rendering functions
│   └── game.js               # Main game logic & loop
├── assets/                   # Game assets (reserved for future use)
└── docs/
    └── PROJECT_STRUCTURE.md  # This file
```

## File Dependencies

```
index.html
    ├── css/styles.css
    ├── src/constants.js (no dependencies)
    ├── src/level-generator.js (depends on constants.js)
    ├── src/physics.js (no dependencies)
    ├── src/rendering.js (depends on constants.js)
    └── src/game.js (depends on all above)
```

## Module Descriptions

### 🔧 `index.html`
**Purpose:** Entry point and DOM structure

**Contents:**
- Canvas element for rendering
- UI containers (HUD, buttons, instructions)
- Script imports in correct dependency order

**Key Elements:**
- `#gameContainer` - Main game wrapper
- `#gameCanvas` - Canvas for game rendering
- `#ui`, `#rageBar`, `#deathCounter` - HUD elements
- `#trollButtons` - Troll event buttons

---

### 🎨 `css/styles.css`
**Purpose:** All styling, animations, and responsive design

**Sections:**
- Root variables (colors, shadows)
- Canvas & container styles
- UI element styling
- Animations (shake, flip, pulse, glow)
- Responsive breakpoints (1024px, 768px, 480px)
- Accessibility (prefers-reduced-motion)
- Dark mode support
- Utility classes

**Key Classes:**
- `.shake` - Screen shake animation
- `.flip` - Gravity flip animation
- `.trollBtn` - Button styling
- `.pulse`, `.glow` - Effect animations

---

### ⚙️ `src/constants.js`
**Purpose:** Centralized configuration

**Exports:**
- `GAME_CONFIG` - Physics, canvas, level settings
- `DIFFICULTY_LEVELS` - Level ranges and labels
- `COLORS` - Color palette for all elements
- `TROLL_MESSAGES` - UI text for troll events
- `HINT_MESSAGES` - Hint pool
- `UI_TEXT` - UI messages (templates)
- `MAP_CONFIG` - Level map settings
- `ANIMATION_CONFIG` - Animation parameters

**Usage Example:**
```javascript
const gravity = GAME_CONFIG.GRAVITY;
const spikeColor = COLORS.SPIKE;
```

---

### 🌍 `src/level-generator.js`
**Purpose:** Procedural level generation with seeding

**Key Functions:**

#### `generateLevel(levelNum, levelSeeds)`
Generates level with platforms and spikes
- Uses seeded random for consistency
- Difficulty scales every 10 levels
- Returns `{ platforms: [], spikes: [] }`

#### `createSeededRandom(seed)`
Creates a seeded RNG function
- Ensures same seed = same level every time
- Uses linear congruential generator

#### `calculateDifficulty(levelNum)`
Returns difficulty multiplier (1-10)

#### `scaleLevelToCanvas(levelData, width, height)`
Scales level to fit canvas dimensions

#### `generateGoalPosition(width, height)`
Creates random goal placement

#### `getLevelDifficulty(levelNum)`
Returns difficulty info for a level

---

### ⚡ `src/physics.js`
**Purpose:** Physics engine and collision detection

**Key Functions:**

#### Movement & Gravity
- `applyGravity(player, direction)` - Apply gravity
- `updatePlayerPosition(player)` - Update position
- `handleMovementInput(player, keys, reversed)` - Handle arrow keys
- `handleJumpInput(player, keys, grounded, flipped)` - Handle spacebar

#### Collision Detection
- `checkCollision(x1, y1, w1, h1, x2, y2, w2, h2)` - AABB collision
- `checkPlatformCollisions(player, platforms, flipped)` - Platform logic
- `checkSpikeCollisions(player, spikes)` - Spike & hidden spike logic
- `checkGoalCollision(player, goal)` - Exit detection
- `checkBoundaryCollision(player, height)` - Off-screen detection

#### Utilities
- `isGrounded(player, platforms, flipped)` - Check if player on ground
- `clampPlayerPosition(player, width, height)` - Keep player on screen

---

### 🎬 `src/rendering.js`
**Purpose:** All canvas drawing operations

**Rendering Functions:**

#### Background & Platforms
- `drawCaveBackground(ctx, width, height)` - Cave ceiling
- `drawPlatform(ctx, platform)` - Single platform
- `drawPlatforms(ctx, platforms)` - All platforms

#### Game Objects
- `drawSpike(ctx, spike)` - Single spike
- `drawSpikes(ctx, spikes)` - All spikes
- `drawPlayer(ctx, player)` - Player character
- `drawGoal(ctx, goal)` - Exit portal

#### UI & Effects
- `drawTrollIndicators(ctx, game, width, height)` - Troll notifications
- `drawGameScene(ctx, game, width, height)` - Main render function

#### Level Map
- `drawLevelMap(ctx, game, width, height)` - Full 100-level grid
- `drawMapLegend(ctx, width, height)` - Map legend

---

### 🎮 `src/game.js`
**Purpose:** Core game logic and main loop

**State Object:**
```javascript
let game = {
    player: { x, y, width, height, vx, vy, grounded, size },
    platforms: [],
    spikes: [],
    goal: { x, y, width, height, moved },
    keys: {},
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

**Lifecycle Functions:**
- `initializeGame()` - Setup on page load
- `initLevel()` - Load new level
- `gameLoop()` - Main loop (called via requestAnimationFrame)
- `update()` - Update game state
- `render()` - Draw frame

**Game Logic:**
- `die()` - Handle player death
- `nextLevel()` - Progress to next level
- `activateRandomTroll()` - Trigger random events
- `updateUI()` - Update HUD

**Button Functions:**
- `skipLevel()` - Skip level button (troll)
- `getHint()` - Get hint button (troll)

**Event Handlers:**
- `handleKeyDown(e)` - Key press
- `handleKeyUp(e)` - Key release
- `resizeCanvas()` - Window resize

---

## Game Loop Flow

```
┌─────────────────────────────────────┐
│      gameLoop() [requestAnimationFrame]
└────────────────┬────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
    v                         v
update()                    render()
├─ Apply gravity            ├─ Clear canvas
├─ Handle input             ├─ Draw background
├─ Update position          ├─ Draw platforms
├─ Check collisions         ├─ Draw spikes
├─ Check spikes             ├─ Draw player
├─ Check boundaries         ├─ Draw goal
├─ Check goal               ├─ Draw UI
├─ Random trolls            └─ Draw trolls/map
├─ Update time
└─ Die/NextLevel            updateUI()
                            ├─ Update HUD
                            ├─ Update rage bar
                            └─ Update counters
```

---

## Adding New Features

### Add a New Troll Event
Edit `src/game.js`, function `activateRandomTroll()`:
```javascript
() => {
    // Your troll effect here
    game.someProperty = !game.someProperty;
}
```

### Add a New Configuration Option
Edit `src/constants.js`, object `GAME_CONFIG`:
```javascript
MY_NEW_SETTING: value,
```

### Add New Level Graphics
Edit `src/rendering.js`:
```javascript
function drawMyGraphic(ctx, obj) {
    // Your drawing code
}
```

### Modify Physics Behavior
Edit `src/physics.js` functions like:
- `checkPlatformCollisions()`
- `applyGravity()`
- `handleMovementInput()`

---

## Performance Considerations

1. **Canvas Rendering** - Pixel-perfect rendering at 60 FPS
2. **Collision Detection** - AABB (Axis-Aligned Bounding Box) for performance
3. **Seeded Generation** - No frame drops from level generation
4. **Animation Cleanup** - Effects auto-remove after duration
5. **Event Listeners** - One per window (not per frame)

---

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Not supported:**
- IE 11 (No Canvas support)
- Mobile browsers with < 1GB RAM

---

## Development Tips

### Enable Debug Mode
In `src/constants.js`:
```javascript
DEBUG_MODE: true,
```

Shows debug info on-screen during gameplay.

### Test a Specific Level
In browser console:
```javascript
game.level = 50;
initLevel();
```

### Force a Troll Event
```javascript
activateRandomTroll();
```

### View Game State
```javascript
console.log(game);
```

---

## Future Expansion Possibilities

- 🔊 **Sound Effects** - Add audio.js module
- 🎨 **Themes** - Add theme switcher
- 👥 **Multiplayer** - WebSocket support
- 📊 **Leaderboard** - Backend integration
- 🎮 **Mobile Input** - Touch controls
- ⚙️ **Settings** - User preferences
- 🌐 **Localization** - Multi-language support

---

**Last Updated:** December 24, 2025
