/**
 * OOPS! ALL SPIKES - Physics Engine
 * ==================================
 * Handles collision detection, movement, and gravity
 */

/**
 * Apply gravity to player
 * @param {object} player - Player object
 * @param {number} gravityDirection - 1 for normal, -1 for flipped
 */
function applyGravity(player, gravityDirection = 1) {
    player.vy += GAME_CONFIG.GRAVITY * gravityDirection;
    player.vy = Math.max(Math.min(player.vy, GAME_CONFIG.MAX_VELOCITY), -GAME_CONFIG.MAX_VELOCITY);
}

/**
 * Update player position based on velocity
 * @param {object} player - Player object
 */
function updatePlayerPosition(player) {
    player.x += player.vx;
    player.y += player.vy;
}

/**
 * Check if two rectangles collide
 * @param {number} x1 - First rect x
 * @param {number} y1 - First rect y
 * @param {number} w1 - First rect width
 * @param {number} h1 - First rect height
 * @param {number} x2 - Second rect x
 * @param {number} y2 - Second rect y
 * @param {number} w2 - Second rect width
 * @param {number} h2 - Second rect height
 * @returns {boolean} Whether rectangles collide
 */
function checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}

/**
 * Handle platform collisions
 * @param {object} player - Player object
 * @param {array} platforms - Array of platform objects
 * @param {boolean} gravityFlipped - Whether gravity is flipped
 */
function checkPlatformCollisions(player, platforms, gravityFlipped = false) {
    player.grounded = false;

    platforms.forEach(platform => {
        // Skip if platform has zero width (fake platform that disappeared)
        if (platform.width <= 0) return;

        // Skip fake platforms for collision detection
        if (platform.fake) {
            // Make fake platform disappear when stepped on
            if (checkCollision(
                player.x, player.y, player.width, player.height,
                platform.x, platform.y, platform.width, platform.height
            )) {
                platform.width = 0;
            }
            return;
        }

        // Check collision with solid platform
        if (checkCollision(
            player.x, player.y, player.width, player.height,
            platform.x, platform.y, platform.width, platform.height
        )) {
            // Falling down and landing on platform (normal gravity)
            if (player.vy > 0 && !gravityFlipped) {
                player.y = platform.y - player.height;
                player.vy = 0;
                player.grounded = true;
            }
            // Falling up and hitting platform (flipped gravity)
            else if (player.vy < 0 && gravityFlipped) {
                player.y = platform.y + platform.height;
                player.vy = 0;
                player.grounded = true;
            }
        }
    });
}

/**
 * Check spike collisions and hidden spike triggering
 * @param {object} player - Player object
 * @param {array} spikes - Array of spike objects
 * @returns {boolean} Whether player hit a spike
 */
function checkSpikeCollisions(player, spikes) {
    for (let spike of spikes) {
        // Trigger hidden spikes when player gets close
        if (spike.hidden && !spike.triggered) {
            const dx = Math.abs(player.x - spike.x);
            const dy = Math.abs(player.y - spike.y);
            if (dx < GAME_CONFIG.SPIKE_DETECTION_RANGE && dy < GAME_CONFIG.SPIKE_DETECTION_RANGE) {
                spike.triggered = true;
                spike.hidden = false;
            }
        }

        // Check collision with visible spike
        if (!spike.hidden) {
            if (checkCollision(
                player.x, player.y, player.width, player.height,
                spike.x, spike.y, spike.width, spike.height
            )) {
                return true; // Player hit a spike
            }
        }
    }

    return false;
}

/**
 * Check goal collision
 * @param {object} player - Player object
 * @param {object} goal - Goal object
 * @returns {boolean} Whether player touched the goal
 */
function checkGoalCollision(player, goal) {
    return checkCollision(
        player.x, player.y, player.width, player.height,
        goal.x, goal.y, goal.width, goal.height
    );
}

/**
 * Check boundary collisions (falling off screen)
 * @param {object} player - Player object
 * @param {number} canvasHeight - Canvas height
 * @returns {boolean} Whether player fell off
 */
function checkBoundaryCollision(player, canvasHeight) {
    return player.y > canvasHeight || player.y < -player.height;
}

/**
 * Check if player is on ground/ceiling
 * @param {object} player - Player object
 * @param {array} platforms - Array of platform objects
 * @param {boolean} gravityFlipped - Whether gravity is flipped
 * @returns {boolean} Whether player is grounded
 */
function isGrounded(player, platforms, gravityFlipped = false) {
    // Check platform collision
    for (let platform of platforms) {
        if (platform.width <= 0 || platform.fake) continue;

        if (checkCollision(
            player.x, player.y, player.width, player.height,
            platform.x, platform.y, platform.width, platform.height
        )) {
            return true;
        }
    }
    return false;
}

/**
 * Apply movement input to player
 * @param {object} player - Player object
 * @param {object} keys - Keys pressed object
 * @param {boolean} controlsReversed - Whether controls are reversed
 */
function handleMovementInput(player, keys, controlsReversed = false) {
    let moveX = 0;

    if (keys['ArrowLeft']) moveX = -GAME_CONFIG.MOVE_SPEED;
    if (keys['ArrowRight']) moveX = GAME_CONFIG.MOVE_SPEED;

    // Apply control reversal
    if (controlsReversed) {
        moveX *= -1;
    }

    player.vx = moveX;
}

/**
 * Handle jump input
 * @param {object} player - Player object
 * @param {object} keys - Keys pressed object
 * @param {boolean} grounded - Whether player is grounded
 * @param {boolean} gravityFlipped - Whether gravity is flipped
 * @returns {boolean} Whether jump was performed
 */
function handleJumpInput(player, keys, grounded, gravityFlipped = false) {
    if (keys[' '] && grounded) {
        const gravityDirection = gravityFlipped ? -1 : 1;
        player.vy = GAME_CONFIG.JUMP_POWER * gravityDirection;
        return true;
    }
    return false;
}

/**
 * Clamp player position to keep on screen (optional)
 * @param {object} player - Player object
 * @param {number} canvasWidth - Canvas width
 * @param {number} canvasHeight - Canvas height
 */
function clampPlayerPosition(player, canvasWidth, canvasHeight) {
    player.x = Math.max(0, Math.min(player.x, canvasWidth - player.width));
    // Allow falling off top/bottom for death mechanics
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        applyGravity,
        updatePlayerPosition,
        checkCollision,
        checkPlatformCollisions,
        checkSpikeCollisions,
        checkGoalCollision,
        checkBoundaryCollision,
        isGrounded,
        handleMovementInput,
        handleJumpInput,
        clampPlayerPosition,
    };
}
