/**
 * OOPS! ALL SPIKES - Game Constants
 * ================================
 * Central configuration file for all game parameters
 * Modify these values to adjust game difficulty and behavior
 */

const GAME_CONFIG = {
    // Canvas & Display
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,

    // Physics
    GRAVITY: 0.5,
    JUMP_POWER: -12,
    MOVE_SPEED: 3,
    MAX_VELOCITY: 15,

    // Player
    PLAYER_WIDTH: 16,
    PLAYER_HEIGHT: 36,
    PLAYER_START_X: 50,
    PLAYER_START_Y: 500,

    // Levels
    TOTAL_LEVELS: 100,
    MIN_PLATFORMS_PER_LEVEL: 2,
    MAX_PLATFORMS_PER_LEVEL: 4,
    PLATFORM_WIDTH_MIN: 80,
    PLATFORM_WIDTH_MAX: 120,
    PLATFORM_HEIGHT: 20,

    // Spikes
    SPIKE_WIDTH: 15,
    SPIKE_HEIGHT: 15,
    SPIKE_DETECTION_RANGE: 40,
    HIDDEN_SPIKE_REVEAL_CHANCE: 0.4,

    // Goal
    GOAL_WIDTH: 30,
    GOAL_HEIGHT: 50,
    GOAL_MOVE_CHANCE: 0.7,

    // Game Mechanics
    FAKE_PLATFORM_CHANCE: 0.2,
    GROUND_SPIKE_CHANCE: 0.6,
    DIFFICULTY_INCREASE_INTERVAL: 10,

    // Troll System
    RANDOM_TROLL_CHANCE: 0.002, // 0.2% per frame
    TROLL_ACTIVATION_RAGE_THRESHOLD: 60,
    DEATH_RAGE_INCREASE: 20,
    MAX_RAGE: 100,
    TROLL_EFFECT_DURATION: 3000, // milliseconds

    // UI
    UPDATE_INTERVAL: 60, // FPS

    // Development
    DEBUG_MODE: false,
    SHOW_HITBOXES: false,
};

// Level difficulty mapping
const DIFFICULTY_LEVELS = {
    EASY: { min: 1, max: 10, label: 'Easy' },
    MEDIUM: { min: 11, max: 20, label: 'Medium' },
    HARD: { min: 21, max: 50, label: 'Hard' },
    NIGHTMARE: { min: 51, max: 99, label: 'Nightmare' },
    INSANE: { min: 100, max: 100, label: 'Insane' },
};

// Color Palette
const COLORS = {
    PRIMARY: '#FFDDA0',
    SECONDARY: '#FFB347',
    ACCENT: '#FFD700',
    PLATFORM: '#8B4513',
    PLATFORM_FAKE: '#654321',
    PLATFORM_EDGE: '#D2691E',
    SPIKE: '#8B0000',
    SPIKE_HIGHLIGHT: '#CD5C5C',
    PLAYER: '#000000',
    PLAYER_EYES: '#FFFFFF',
    GOAL_OUTER: '#FFD700',
    GOAL_INNER: '#FFA500',
    CAVE_CEILING: '#8B3A3A',
    CAVE_ROCK: '#A0522D',
    TEXT_PRIMARY: '#FFFFFF',
    TEXT_WARN: '#FF4444',
    TROLL_OVERLAY: 'rgba(255,0,0,0.3)',
    MAP_BACKGROUND: 'rgba(0,0,0,0.9)',
    MAP_COMPLETED: '#00FF00',
    MAP_CURRENT: '#FFD700',
    MAP_FAILED: '#FF4444',
    MAP_UNREACHED: '#444444',
};

// Troll Messages
const TROLL_MESSAGES = {
    CONTROLS_REVERSED: 'CONTROLS REVERSED!',
    GRAVITY_FLIPPED: 'GRAVITY FLIPPED!',
    PLAYER_SHRUNK: 'SHRINK MODE ACTIVATED!',
    ZOOMED_OUT: 'ZOOM OUT!',
    COLOR_CHAOS: 'VISUAL CHAOS!',
};

// Hint Messages
const HINT_MESSAGES = [
    "Hint: Try not dying! 💡",
    "Hint: The floor is lava... wait, no, that's the spikes! 🔥",
    "Hint: Have you tried turning it off and on again? 🔌",
    "Hint: Jump when you see spikes! (This hint may be incorrect) 🤸",
    "Hint: The cake is a lie, but the spikes are real! 🎂",
    "Hint: Maybe you're just bad at video games? 🎮",
    "Hint: I'm not helping you. Good luck! 😈",
    "Hint: *whispers* There's no escape... 👻",
];

// UI Text
const UI_TEXT = {
    WELCOME: `Welcome to Oops! All Spikes! 🎮

🔥 100 LEVELS OF PURE CHAOS 🔥

Nothing is as it seems...
Trust nobody, not even yourself!

Can you survive all 100 levels?

🗺️ Press M anytime to view the Level Map!

Press any key to begin your journey! 😈`,

    LEVEL_COMPLETE: (levelNum, completed) => 
        `🎯 Level ${levelNum} Complete!\n\nPress M to view the level map and see your progress!\n\nLevels completed: ${completed}/100`,

    GAME_COMPLETE: (deaths, time) =>
        `🎉 CONGRATULATIONS! 🎉\n\nYou have conquered all 100 levels of Oops! All Spikes!\n\nYou are truly a master of patience and persistence!\n\nFinal Stats:\n• Deaths: ${deaths}\n• Time: ${Math.floor(time)} seconds\n\nThank you for playing! 🎮`,

    SKIP_LEVEL_TROLL: 'Loading next level... 😈',
    SKIP_LEVEL_FAIL: 'Oops! Looks like that button was broken! 🤪',
};

// Seeded Random Function Configuration
const RANDOM_CONFIG = {
    SEED_MULTIPLIER: 12345,
    LINEAR_MULTIPLIER: 9301,
    LINEAR_INCREMENT: 49297,
    LINEAR_MODULO: 233280,
};

// Map Configuration
const MAP_CONFIG = {
    GRID_COLS: 10,
    GRID_ROWS: 10,
    BOX_SIZE: 30,
    SPACING: 35,
    START_X: 50,
    START_Y: 100,
    TITLE_Y: 40,
    LEGEND_START_X: 500,
    LEGEND_START_Y: 450,
    LEGEND_BOX_SIZE: 20,
};

// Animation Configuration
const ANIMATION_CONFIG = {
    SHAKE_DURATION: 500,
    SHAKE_DISTANCE: 5,
    PLATFORM_ROCK_HEIGHT_MIN: 3,
    PLATFORM_ROCK_HEIGHT_MAX: 7,
    PLATFORM_ROCK_WIDTH: 6,
    PLATFORM_ROCK_SPACING: 8,
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GAME_CONFIG,
        DIFFICULTY_LEVELS,
        COLORS,
        TROLL_MESSAGES,
        HINT_MESSAGES,
        UI_TEXT,
        RANDOM_CONFIG,
        MAP_CONFIG,
        ANIMATION_CONFIG,
    };
}
