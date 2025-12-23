# 🚀 Quick Start Guide

## Get Started in 3 Steps

### Step 1: Open the Game
```bash
# Option 1: Direct file open (simplest)
open index.html

# Option 2: Use Python (better for testing)
python3 -m http.server 8000
# Then visit: http://localhost:8000

# Option 3: Use Node.js
npx http-server
# Then visit: http://localhost:8080
```

### Step 2: Read the Welcome
A welcome dialog will appear explaining the controls and objective.

### Step 3: Press Any Key to Start!
The game begins once you press any key on your keyboard.

---

## Game Controls

| Control | Action |
|---------|--------|
| **←** Arrow Left | Move left |
| **→** Arrow Right | Move right |
| **Space** | Jump |
| **M** | Toggle level map |

---

## Game Objectives

1. **Survive** - Avoid spikes and platforms
2. **Navigate** - Jump from platform to platform
3. **Reach Goal** - Get to the golden door 🚪
4. **Progress** - Complete all 100 levels!

---

## What to Expect

- ✅ **100 Levels** - Progressive difficulty
- ✅ **Hidden Spikes** - Appear when you get close
- ✅ **Fake Platforms** - Disappear when you step on them
- ✅ **Troll Events** - Random chaos (reversed controls, gravity flip, etc.)
- ✅ **Level Map** - Press M to see your progress
- ✅ **Death Counter** - Track how many times you fail
- ✅ **Rage System** - Your frustration triggers more trolls

---

## Tips for Success

1. **Take it slow** - Don't rush, observe the level
2. **Use the map** - Press M to plan your route
3. **Watch for spikes** - Hidden ones appear as you approach
4. **Expect trolls** - They're part of the game!
5. **Don't give up** - Each death teaches you something

---

## When Stuck

- **Press M** - View the level map and current position
- **Press "Get Hint"** - Get a (possibly sarcastic) hint
- **Try again** - Learn from each attempt
- **Look for patterns** - Spikes often cluster together

---

## File Structure Overview

```
OOPS-spikes/
├── index.html              ← Open this file!
├── Readme.md              ← Full documentation
├── PROJECT_STRUCTURE.md   ← Architecture details
├── TROUBLESHOOTING.md     ← Problem solving
├── QUICK_START.md         ← This file
├── css/
│   └── styles.css         ← Game styling
└── src/
    ├── constants.js       ← Game settings
    ├── level-generator.js ← Level creation
    ├── physics.js         ← Physics engine
    ├── rendering.js       ← Drawing code
    └── game.js           ← Main game logic
```

---

## Need Help?

1. **Game won't start?** → See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. **Want to modify code?** → See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
3. **Need more info?** → See [Readme.md](Readme.md)

---

## Have Fun! 🎮

Remember: The game is designed to be frustrating and chaotic. That's the point! 😈

Good luck and enjoy the chaos!

---

**Ready? Open `index.html` in your browser and start playing!**
