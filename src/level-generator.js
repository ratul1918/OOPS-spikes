/**
 * OOPS! ALL SPIKES - Level Generator
 * ===================================
 * Procedurally generates levels with consistent seeding
 * Each level is identical on replay (same seed)
 * Difficulty increases progressively
 */

/**
 * Seeded Random Number Generator
 * Uses consistent seeds for reproducible level generation
 * @param {number} seed - The seed value
 * @returns {number} Random number between 0 and 1
 */
function createSeededRandom(seed) {
    return function() {
        seed = (seed * RANDOM_CONFIG.LINEAR_MULTIPLIER + RANDOM_CONFIG.LINEAR_INCREMENT) % RANDOM_CONFIG.LINEAR_MODULO;
        return seed / RANDOM_CONFIG.LINEAR_MODULO;
    };
}

/**
 * Get or create a seed for a specific level
 * @param {number} levelNum - Level number (1-100)
 * @param {object} levelSeeds - Object storing level seeds
 * @returns {number} Seed for this level
 */
function getLevelSeed(levelNum, levelSeeds) {
    if (!levelSeeds[levelNum]) {
        levelSeeds[levelNum] = levelNum * RANDOM_CONFIG.SEED_MULTIPLIER;
    }
    return levelSeeds[levelNum];
}

/**
 * Calculate difficulty multiplier based on level
 * Difficulty increases every 10 levels
 * @param {number} levelNum - Level number (1-100)
 * @returns {number} Difficulty multiplier (1-10)
 */
function calculateDifficulty(levelNum) {
    return Math.floor(levelNum / GAME_CONFIG.DIFFICULTY_INCREASE_INTERVAL) + 1;
}

/**
 * Generate a complete level layout
 * Includes platforms, spikes, and goal placement
 * @param {number} levelNum - Level number to generate
 * @param {object} levelSeeds - Object storing level seeds for consistency
 * @returns {object} Level data containing platforms and spikes
 */
function generateLevel(levelNum, levelSeeds) {
    const seed = getLevelSeed(levelNum, levelSeeds);
    const seededRandom = createSeededRandom(seed);
    const difficulty = calculateDifficulty(levelNum);

    // Ground platform (always safe)
    const platforms = [{
        x: 0,
        y: 580,
        width: GAME_CONFIG.CANVAS_WIDTH,
        height: GAME_CONFIG.PLATFORM_HEIGHT,
        fake: false,
    }];

    const spikes = [];

    // Generate main platforms
    const platformCount = Math.min(
        GAME_CONFIG.MIN_PLATFORMS_PER_LEVEL + Math.floor(levelNum / 20),
        GAME_CONFIG.MAX_PLATFORMS_PER_LEVEL
    );

    for (let i = 0; i < platformCount; i++) {
        const x = 100 + (i * 150) + seededRandom() * 50;
        const y = 500 - (i * 80) - seededRandom() * 50;
        const isFake = seededRandom() < GAME_CONFIG.FAKE_PLATFORM_CHANCE + (difficulty * 0.05);
        const platformWidth = GAME_CONFIG.PLATFORM_WIDTH_MIN + seededRandom() * 
                            (GAME_CONFIG.PLATFORM_WIDTH_MAX - GAME_CONFIG.PLATFORM_WIDTH_MIN);

        platforms.push({
            x: x,
            y: y,
            width: platformWidth,
            height: GAME_CONFIG.PLATFORM_HEIGHT,
            fake: isFake,
        });

        // Add spikes near platforms
        if (seededRandom() < GAME_CONFIG.GROUND_SPIKE_CHANCE) {
            spikes.push({
                x: x + seededRandom() * 60,
                y: y - 20,
                width: GAME_CONFIG.SPIKE_WIDTH,
                height: GAME_CONFIG.SPIKE_HEIGHT,
                hidden: seededRandom() < GAME_CONFIG.HIDDEN_SPIKE_REVEAL_CHANCE,
                triggered: false,
            });
        }
    }

    // Add ground-level spikes
    const groundSpikeCount = Math.min(2 + Math.floor(difficulty / 2), 6);
    for (let i = 0; i < groundSpikeCount; i++) {
        spikes.push({
            x: 100 + seededRandom() * 600,
            y: 560,
            width: GAME_CONFIG.SPIKE_WIDTH,
            height: GAME_CONFIG.SPIKE_HEIGHT,
            hidden: seededRandom() < 0.3,
            triggered: false,
        });
    }

    // Add ceiling hazards for higher difficulties
    if (difficulty > 3) {
        for (let i = 0; i < Math.floor(difficulty / 2); i++) {
            spikes.push({
                x: seededRandom() * GAME_CONFIG.CANVAS_WIDTH,
                y: seededRandom() * 100,
                width: GAME_CONFIG.SPIKE_WIDTH,
                height: GAME_CONFIG.SPIKE_HEIGHT,
                hidden: seededRandom() < 0.5,
                triggered: false,
            });
        }
    }

    return { platforms, spikes };
}

/**
 * Scale level elements to match canvas size
 * Ensures consistent experience across different screen sizes
 * @param {object} levelData - Level data with platforms and spikes
 * @param {number} canvasWidth - Current canvas width
 * @param {number} canvasHeight - Current canvas height
 * @returns {object} Scaled level data
 */
function scaleLevelToCanvas(levelData, canvasWidth, canvasHeight) {
    const scaleX = canvasWidth / GAME_CONFIG.CANVAS_WIDTH;
    const scaleY = canvasHeight / GAME_CONFIG.CANVAS_HEIGHT;

    // Scale platforms
    levelData.platforms.forEach(platform => {
        platform.x *= scaleX;
        platform.y *= scaleY;
        platform.width *= scaleX;
        platform.height *= scaleY;
    });

    // Scale spikes
    levelData.spikes.forEach(spike => {
        spike.x *= scaleX;
        spike.y *= scaleY;
        spike.width *= scaleX;
        spike.height *= scaleY;
    });

    return levelData;
}

/**
 * Generate goal position for level
 * Position varies but respects canvas bounds
 * @param {number} canvasWidth - Current canvas width
 * @param {number} canvasHeight - Current canvas height
 * @returns {object} Goal position and dimensions
 */
function generateGoalPosition(canvasWidth, canvasHeight) {
    const scaleX = canvasWidth / GAME_CONFIG.CANVAS_WIDTH;
    const scaleY = canvasHeight / GAME_CONFIG.CANVAS_HEIGHT;

    const goalX = (650 + Math.random() * 100) * scaleX;
    const goalY = (450 + Math.random() * 100) * scaleY;

    return {
        x: Math.max(0, Math.min(goalX, canvasWidth - GAME_CONFIG.GOAL_WIDTH * scaleX)),
        y: Math.max(0, Math.min(goalY, canvasHeight - GAME_CONFIG.GOAL_HEIGHT * scaleY)),
        width: GAME_CONFIG.GOAL_WIDTH * scaleX,
        height: GAME_CONFIG.GOAL_HEIGHT * scaleY,
        moved: false,
    };
}

/**
 * Get difficulty information for a level
 * @param {number} levelNum - Level number
 * @returns {object} Difficulty information
 */
function getLevelDifficulty(levelNum) {
    const difficulty = calculateDifficulty(levelNum);

    for (const [key, value] of Object.entries(DIFFICULTY_LEVELS)) {
        if (levelNum >= value.min && levelNum <= value.max) {
            return {
                level: key,
                label: value.label,
                multiplier: difficulty,
                range: `${value.min}-${value.max}`,
            };
        }
    }

    return {
        level: 'UNKNOWN',
        label: 'Unknown',
        multiplier: difficulty,
        range: 'Unknown',
    };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateLevel,
        scaleLevelToCanvas,
        generateGoalPosition,
        getLevelDifficulty,
        createSeededRandom,
        getLevelSeed,
        calculateDifficulty,
    };
}
