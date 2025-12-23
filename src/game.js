/**
 * OOPS! ALL SPIKES - Main Game Logic
 * ==================================
 * Core game loop, state management, and event handling
 */

// Game state object
let game = {
    player: { x: 50, y: 500, width: 16, height: 36, vx: 0, vy: 0, grounded: false, size: 1 },
    platforms: [],
    spikes: [],
    goal: { x: 700, y: 500, width: 30, height: 50, moved: false },
    keys: {},
    gravity: GAME_CONFIG.GRAVITY,
    jumpPower: GAME_CONFIG.JUMP_POWER,
    speed: GAME_CONFIG.MOVE_SPEED,
    level: 1,
    deaths: 0,
    rage: 0,
    time: 0,
    controlsReversed: false,
    gravityFlipped: false,
    cameraShake: false,
    gameStarted: false,
    showMap: false,
    completedLevels: new Set(),
    levelSeeds: {},
};

let canvas, ctx, gameContainer;

/**
 * Initialize the game
 * Set up canvas, event listeners, and start game loop
 */
function initializeGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    gameContainer = document.getElementById('gameContainer');

    // Set canvas to full screen
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Set up event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Initialize first level
    initLevel();
    updateUI();

    // Show welcome message after a short delay
    setTimeout(() => {
        alert(UI_TEXT.WELCOME);
    }, 500);

    // Start game loop
    gameLoop();
}

/**
 * Resize canvas to match window size
 */
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/**
 * Initialize/load a level
 */
function initLevel() {
    const levelData = generateLevel(game.level, game.levelSeeds);
    game.platforms = JSON.parse(JSON.stringify(levelData.platforms));
    game.spikes = JSON.parse(JSON.stringify(levelData.spikes));

    // Scale to canvas size
    const scaledLevel = scaleLevelToCanvas(
        { platforms: game.platforms, spikes: game.spikes },
        canvas.width,
        canvas.height
    );
    game.platforms = scaledLevel.platforms;
    game.spikes = scaledLevel.spikes;

    // Randomize some spike positions slightly for variety
    game.spikes.forEach(spike => {
        if (Math.random() < 0.3) {
            spike.x += (Math.random() - 0.5) * 50 * (canvas.width / GAME_CONFIG.CANVAS_WIDTH);
        }
    });

    // Initialize player
    const scaleX = canvas.width / GAME_CONFIG.CANVAS_WIDTH;
    const scaleY = canvas.height / GAME_CONFIG.CANVAS_HEIGHT;
    
    game.player = {
        x: GAME_CONFIG.PLAYER_START_X * scaleX,
        y: GAME_CONFIG.PLAYER_START_Y * scaleY,
        width: GAME_CONFIG.PLAYER_WIDTH * scaleX,
        height: GAME_CONFIG.PLAYER_HEIGHT * scaleY,
        vx: 0,
        vy: 0,
        grounded: false,
        size: 1,
    };

    // Generate goal position
    game.goal = generateGoalPosition(canvas.width, canvas.height);

    // Reset troll effects
    game.controlsReversed = false;
    game.gravityFlipped = false;
}

/**
 * Update game state
 */
function update() {
    if (!game.gameStarted) return;

    // Handle map toggle
    if (game.keys['m'] || game.keys['M']) {
        game.showMap = !game.showMap;
        game.keys['m'] = false;
        game.keys['M'] = false;
        return;
    }

    if (game.showMap) return; // Don't update while map is shown

    // Physics updates
    const gravityDir = game.gravityFlipped ? -1 : 1;
    applyGravity(game.player, gravityDir);

    // Handle input
    handleMovementInput(game.player, game.keys, game.controlsReversed);
    const jumped = handleJumpInput(game.player, game.keys, game.player.grounded, game.gravityFlipped);

    // Camera shake on jump (20% chance)
    if (jumped && Math.random() < 0.2) {
        canvas.classList.add('shake');
        setTimeout(() => canvas.classList.remove('shake'), ANIMATION_CONFIG.SHAKE_DURATION);
    }

    // Update position
    updatePlayerPosition(game.player);

    // Check collisions
    checkPlatformCollisions(game.player, game.platforms, game.gravityFlipped);

    // Check spikes
    if (checkSpikeCollisions(game.player, game.spikes)) {
        die();
        return;
    }

    // Check boundaries
    if (checkBoundaryCollision(game.player, canvas.height)) {
        die();
        return;
    }

    // Check goal
    if (checkGoalCollision(game.player, game.goal)) {
        // Troll: 70% chance goal moves
        if (!game.goal.moved && Math.random() < GAME_CONFIG.GOAL_MOVE_CHANCE) {
            game.goal.x = Math.random() * (canvas.width - game.goal.width);
            game.goal.y = Math.random() * (canvas.height - 100) + 50;
            game.goal.moved = true;
        } else {
            // Actually win the level
            nextLevel();
            return;
        }
    }

    // Random troll events
    if (Math.random() < GAME_CONFIG.RANDOM_TROLL_CHANCE) {
        activateRandomTroll();
    }

    // Update time
    game.time += 1 / 60;
}

/**
 * Render the game
 */
function render() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw game scene
    drawGameScene(ctx, game, canvas.width, canvas.height);

    // Debug mode (optional)
    if (GAME_CONFIG.DEBUG_MODE) {
        drawDebugInfo(ctx);
    }
}

/**
 * Main game loop
 */
function gameLoop() {
    update();
    render();
    updateUI();
    requestAnimationFrame(gameLoop);
}

/**
 * Handle player death
 */
function die() {
    game.deaths++;
    game.rage = Math.min(GAME_CONFIG.MAX_RAGE, game.rage + GAME_CONFIG.DEATH_RAGE_INCREASE);

    // Trigger extra trolls when rage is high
    if (game.rage > GAME_CONFIG.TROLL_ACTIVATION_RAGE_THRESHOLD) {
        activateRandomTroll();
    }

    updateUI();
    initLevel();
}

/**
 * Progress to next level
 */
function nextLevel() {
    game.completedLevels.add(game.level);

    game.level++;

    if (game.level > GAME_CONFIG.TOTAL_LEVELS) {
        // Game complete!
        alert(UI_TEXT.GAME_COMPLETE(game.deaths, game.time));
        // Reset for replay
        game.level = 1;
        game.deaths = 0;
        game.time = 0;
        game.rage = 0;
        game.completedLevels.clear();
    }

    // Show level complete message
    setTimeout(() => {
        alert(UI_TEXT.LEVEL_COMPLETE(game.level - 1, game.completedLevels.size));
    }, 100);

    initLevel();
    updateUI();
}

/**
 * Activate a random troll event
 */
function activateRandomTroll() {
    const trolls = [
        // Reverse controls
        () => {
            game.controlsReversed = !game.controlsReversed;
        },
        // Flip gravity
        () => {
            game.gravityFlipped = !game.gravityFlipped;
            gameContainer.classList.toggle('flip');
        },
        // Shrink player
        () => {
            game.player.size = 0.5;
            setTimeout(() => {
                game.player.size = 1;
            }, GAME_CONFIG.TROLL_EFFECT_DURATION);
        },
        // Zoom out
        () => {
            canvas.style.transform = 'scale(0.7)';
            setTimeout(() => {
                canvas.style.transform = 'scale(1)';
            }, GAME_CONFIG.TROLL_EFFECT_DURATION);
        },
        // Color chaos
        () => {
            canvas.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                canvas.style.filter = 'none';
            }, GAME_CONFIG.TROLL_EFFECT_DURATION);
        },
    ];

    const randomTroll = trolls[Math.floor(Math.random() * trolls.length)];
    randomTroll();
}

/**
 * Update UI elements
 */
function updateUI() {
    document.getElementById('level').textContent = game.level;
    document.getElementById('time').textContent = Math.floor(game.time);
    document.getElementById('deaths').textContent = game.deaths;
    document.getElementById('rageFill').style.width = game.rage + '%';
}

/**
 * Skip level button (troll button)
 */
function skipLevel() {
    alert(UI_TEXT.SKIP_LEVEL_TROLL);
    setTimeout(() => {
        die();
        alert(UI_TEXT.SKIP_LEVEL_FAIL);
    }, 1000);
}

/**
 * Get hint button (troll button)
 */
function getHint() {
    const hint = HINT_MESSAGES[Math.floor(Math.random() * HINT_MESSAGES.length)];
    alert(hint);

    // 50% chance hint triggers a troll
    if (Math.random() < 0.5) {
        activateRandomTroll();
    }
}

/**
 * Handle keydown event
 * @param {KeyboardEvent} e - Event object
 */
function handleKeyDown(e) {
    game.keys[e.key] = true;
    if (!game.gameStarted) {
        game.gameStarted = true;
    }
}

/**
 * Handle keyup event
 * @param {KeyboardEvent} e - Event object
 */
function handleKeyUp(e) {
    game.keys[e.key] = false;
}

/**
 * Draw debug information (optional)
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 */
function drawDebugInfo(ctx) {
    ctx.fillStyle = '#FF00FF';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Player: (${Math.round(game.player.x)}, ${Math.round(game.player.y)})`, 10, canvas.height - 100);
    ctx.fillText(`Velocity: (${game.player.vx.toFixed(2)}, ${game.player.vy.toFixed(2)})`, 10, canvas.height - 85);
    ctx.fillText(`Grounded: ${game.player.grounded}`, 10, canvas.height - 70);
    ctx.fillText(`Rage: ${game.rage}`, 10, canvas.height - 55);
    ctx.fillText(`Level: ${game.level}`, 10, canvas.height - 40);
}

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGame);
} else {
    initializeGame();
}
