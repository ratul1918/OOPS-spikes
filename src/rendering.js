/**
 * OOPS! ALL SPIKES - Rendering Engine
 * ====================================
 * All canvas drawing functions for game visuals
 */

/**
 * Draw static cave background
 * @param {object} ctx - Canvas context
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 */
function drawCaveBackground(ctx, width, height) {
    // Cave ceiling with stalactites
    ctx.fillStyle = COLORS.CAVE_CEILING;
    for (let i = 0; i < width; i += 30) {
        const spikeHeight = 20 + Math.sin(i * 0.05) * 10;
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 15, spikeHeight);
        ctx.lineTo(i + 30, 0);
        ctx.closePath();
        ctx.fill();
    }
}

/**
 * Draw a single platform with rocky texture
 * @param {object} ctx - Canvas context
 * @param {object} platform - Platform object
 */
function drawPlatform(ctx, platform) {
    if (platform.width <= 0) return;

    // Main platform
    ctx.fillStyle = platform.fake ? COLORS.PLATFORM_FAKE : COLORS.PLATFORM;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);

    // Rocky texture on top
    ctx.fillStyle = COLORS.CAVE_ROCK;
    for (let i = 0; i < platform.width; i += ANIMATION_CONFIG.PLATFORM_ROCK_SPACING) {
        const rockHeight = ANIMATION_CONFIG.PLATFORM_ROCK_HEIGHT_MIN + 
                          Math.random() * (ANIMATION_CONFIG.PLATFORM_ROCK_HEIGHT_MAX - ANIMATION_CONFIG.PLATFORM_ROCK_HEIGHT_MIN);
        ctx.fillRect(
            platform.x + i,
            platform.y - rockHeight,
            ANIMATION_CONFIG.PLATFORM_ROCK_WIDTH,
            rockHeight
        );
    }

    // Platform edge highlight
    ctx.fillStyle = platform.fake ? '#8B0000' : COLORS.PLATFORM_EDGE;
    ctx.fillRect(platform.x, platform.y, platform.width, 2);
}

/**
 * Draw all platforms in level
 * @param {object} ctx - Canvas context
 * @param {array} platforms - Array of platforms
 */
function drawPlatforms(ctx, platforms) {
    platforms.forEach(platform => drawPlatform(ctx, platform));
}

/**
 * Draw a single spike
 * @param {object} ctx - Canvas context
 * @param {object} spike - Spike object
 */
function drawSpike(ctx, spike) {
    if (spike.hidden) return;

    // Main spike body - dark red/brown
    ctx.fillStyle = COLORS.SPIKE;
    ctx.beginPath();
    ctx.moveTo(spike.x, spike.y + spike.height);
    ctx.lineTo(spike.x + spike.width / 2, spike.y);
    ctx.lineTo(spike.x + spike.width, spike.y + spike.height);
    ctx.closePath();
    ctx.fill();

    // Spike highlight
    ctx.fillStyle = COLORS.SPIKE_HIGHLIGHT;
    ctx.beginPath();
    ctx.moveTo(spike.x + 2, spike.y + spike.height);
    ctx.lineTo(spike.x + spike.width / 2, spike.y + 2);
    ctx.lineTo(spike.x + spike.width / 2 + 1, spike.y + 2);
    ctx.closePath();
    ctx.fill();
}

/**
 * Draw all spikes in level
 * @param {object} ctx - Canvas context
 * @param {array} spikes - Array of spikes
 */
function drawSpikes(ctx, spikes) {
    spikes.forEach(spike => drawSpike(ctx, spike));
}

/**
 * Draw the player character
 * @param {object} ctx - Canvas context
 * @param {object} player - Player object
 */
function drawPlayer(ctx, player) {
    const playerSize = player.width * player.size;
    const playerHeight = player.height * player.size;
    const offsetX = (player.width - playerSize) / 2;
    const offsetY = (player.height - playerHeight) / 2;

    ctx.fillStyle = COLORS.PLAYER;

    // Main body (torso)
    ctx.fillRect(
        player.x + offsetX,
        player.y + offsetY + playerHeight * 0.28,
        playerSize,
        playerHeight * 0.45
    );

    // Head
    ctx.fillRect(
        player.x + offsetX,
        player.y + offsetY,
        playerSize,
        playerHeight * 0.3
    );

    // Left arm
    ctx.fillRect(
        player.x + offsetX - 3,
        player.y + offsetY + playerHeight * 0.3,
        3,
        playerHeight * 0.4
    );

    // Right arm
    ctx.fillRect(
        player.x + offsetX + playerSize,
        player.y + offsetY + playerHeight * 0.3,
        3,
        playerHeight * 0.4
    );

    // Left leg
    ctx.fillRect(
        player.x + offsetX + 2,
        player.y + offsetY + playerHeight * 0.73,
        4,
        playerHeight * 0.27
    );

    // Right leg
    ctx.fillRect(
        player.x + offsetX + playerSize - 6,
        player.y + offsetY + playerHeight * 0.73,
        4,
        playerHeight * 0.27
    );

    // Eyes
    ctx.fillStyle = COLORS.PLAYER_EYES;
    ctx.fillRect(player.x + 4, player.y + 6, 2, 2);
    ctx.fillRect(player.x + 10, player.y + 6, 2, 2);
}

/**
 * Draw the goal/exit
 * @param {object} ctx - Canvas context
 * @param {object} goal - Goal object
 */
function drawGoal(ctx, goal) {
    // Outer golden frame
    ctx.fillStyle = COLORS.GOAL_OUTER;
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

    // Inner orange area
    ctx.fillStyle = COLORS.GOAL_INNER;
    ctx.fillRect(goal.x + 5, goal.y + 5, goal.width - 10, goal.height - 10);

    // Door emoji
    ctx.fillStyle = COLORS.TEXT_DARK;
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🚪', goal.x + goal.width / 2, goal.y + goal.height / 2);
}

/**
 * Draw troll effect indicators
 * @param {object} ctx - Canvas context
 * @param {object} game - Game state object
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 */
function drawTrollIndicators(ctx, game, width, height) {
    if (game.controlsReversed) {
        ctx.fillStyle = COLORS.TROLL_OVERLAY;
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = COLORS.TEXT_PRIMARY;
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(TROLL_MESSAGES.CONTROLS_REVERSED, width / 2, 50);
    }

    if (game.gravityFlipped) {
        ctx.fillStyle = COLORS.TEXT_PRIMARY;
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(TROLL_MESSAGES.GRAVITY_FLIPPED, width / 2, height - 30);
    }
}

/**
 * Draw the level map (shows all 100 levels)
 * @param {object} ctx - Canvas context
 * @param {object} game - Game state object
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 */
function drawLevelMap(ctx, game, width, height) {
    // Dark background
    ctx.fillStyle = COLORS.MAP_BACKGROUND;
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.fillStyle = COLORS.ACCENT;
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('LEVEL MAP - 100 LEVELS OF CHAOS', width / 2, MAP_CONFIG.TITLE_Y);

    // Progress info
    ctx.fillStyle = COLORS.TEXT_PRIMARY;
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(
        `Current Level: ${game.level} | Completed: ${game.completedLevels.size}/100 | Deaths: ${game.deaths}`,
        50,
        70
    );

    // Draw level grid (10x10)
    for (let row = 0; row < MAP_CONFIG.GRID_ROWS; row++) {
        for (let col = 0; col < MAP_CONFIG.GRID_COLS; col++) {
            const levelNum = row * MAP_CONFIG.GRID_COLS + col + 1;
            const x = MAP_CONFIG.START_X + col * MAP_CONFIG.SPACING;
            const y = MAP_CONFIG.START_Y + row * MAP_CONFIG.SPACING;

            // Determine box color
            let boxColor = COLORS.MAP_UNREACHED;
            if (game.completedLevels.has(levelNum)) {
                boxColor = COLORS.MAP_COMPLETED;
            } else if (levelNum === game.level) {
                boxColor = COLORS.MAP_CURRENT;
            } else if (levelNum < game.level) {
                boxColor = COLORS.MAP_FAILED;
            }

            // Draw box
            ctx.fillStyle = boxColor;
            ctx.fillRect(x, y, MAP_CONFIG.BOX_SIZE, MAP_CONFIG.BOX_SIZE);

            // Draw level number
            ctx.fillStyle = levelNum === game.level ? COLORS.TEXT_DARK : COLORS.TEXT_PRIMARY;
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(levelNum.toString(), x + MAP_CONFIG.BOX_SIZE / 2, y + MAP_CONFIG.BOX_SIZE / 2);
        }
    }

    // Legend
    drawMapLegend(ctx, width, height);

    // Close instruction
    ctx.fillStyle = '#FFFF00';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Press M to close map and continue playing', width / 2, height - 20);
}

/**
 * Draw the level map legend
 * @param {object} ctx - Canvas context
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 */
function drawMapLegend(ctx, width, height) {
    const legendX = 500;
    let legendY = MAP_CONFIG.LEGEND_START_Y;
    const boxSize = MAP_CONFIG.LEGEND_BOX_SIZE;
    const lineSpacing = 30;

    // Completed
    ctx.fillStyle = COLORS.MAP_COMPLETED;
    ctx.fillRect(legendX, legendY, boxSize, boxSize);
    ctx.fillStyle = COLORS.TEXT_PRIMARY;
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Completed', legendX + 30, legendY + 15);

    // Current
    legendY += lineSpacing;
    ctx.fillStyle = COLORS.MAP_CURRENT;
    ctx.fillRect(legendX, legendY, boxSize, boxSize);
    ctx.fillStyle = COLORS.TEXT_PRIMARY;
    ctx.fillText('Current Level', legendX + 30, legendY + 15);

    // Failed/Not Completed
    legendY += lineSpacing;
    ctx.fillStyle = COLORS.MAP_FAILED;
    ctx.fillRect(legendX, legendY, boxSize, boxSize);
    ctx.fillStyle = COLORS.TEXT_PRIMARY;
    ctx.fillText('Failed/Not Completed', legendX + 30, legendY + 15);

    // Not Reached
    legendY += lineSpacing;
    ctx.fillStyle = COLORS.MAP_UNREACHED;
    ctx.fillRect(legendX, legendY, boxSize, boxSize);
    ctx.fillStyle = COLORS.TEXT_PRIMARY;
    ctx.fillText('Not Reached', legendX + 30, legendY + 15);
}

/**
 * Draw complete game scene
 * @param {object} ctx - Canvas context
 * @param {object} game - Game state object
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 */
function drawGameScene(ctx, game, width, height) {
    if (game.showMap) {
        drawLevelMap(ctx, game, width, height);
        return;
    }

    // Draw background
    drawCaveBackground(ctx, width, height);

    // Draw game elements
    drawPlatforms(ctx, game.platforms);
    drawSpikes(ctx, game.spikes);
    drawPlayer(ctx, game.player);
    drawGoal(ctx, game.goal);
    drawTrollIndicators(ctx, game, width, height);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        drawCaveBackground,
        drawPlatform,
        drawPlatforms,
        drawSpike,
        drawSpikes,
        drawPlayer,
        drawGoal,
        drawTrollIndicators,
        drawLevelMap,
        drawMapLegend,
        drawGameScene,
    };
}
