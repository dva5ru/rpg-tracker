// js/state.js

export const state = {
    // Базовые параметры
    gold: 10000,
    xp: 250,
    level: 0,
    maxXp: 1000,
    hp: 1000,
    maxHp: 1000,
    energy: 100,
    maxEnergy: 100,
    talentPoints: 0,
    
    // Игровые данные
    stats: {
        "Сила": 10, "Ловкость": 10, "Выносливость": 10, "Интеллект": 10,
        "Сила духа": 10, "Гибкость": 10, "Концентрация": 10, "Креативность": 10
    },
    inventory: [
        { id: "sword", rarity: 1 }, { id: "sword", rarity: 1 }, 
        { id: "sword", rarity: 1 }, { id: "shoes", rarity: 0 }
    ],
    equippedItems: {},
    completedQuests: [],
    learnedTalents: [],
    
    // Боевка
    defeatedMobsCount: 0,
    bossAvailable: false,
    currentEnemy: null,

    // Метрики и статистика
    metricsHistory: [],
    totalLoginDays: 0,
    totalCompletedQuests: 0,
    totalPushups: 0,
    totalPullups: 0,
    totalAbs: 0,
    totalPlank: 0,
    totalStretch: 0,
    totalSquats: 0,
    totalRunKm: 0,
    totalRunMins: 0,
    claimedAchievements: []
};

// Вспомогательная функция для получения текущей даты
export function getToday() {
    return new Date().toISOString().split('T')[0];
}

// Загрузка всех данных при старте
export function loadGame() {
    state.gold = parseInt(localStorage.getItem('rpg_gold')) || state.gold;
    state.xp = parseInt(localStorage.getItem('rpg_xp')) || state.xp;
    state.level = parseInt(localStorage.getItem('rpg_level')) || state.level;
    state.hp = parseInt(localStorage.getItem('rpg_hp')) || state.hp;
    state.energy = parseInt(localStorage.getItem('rpg_energy')) || state.energy;
    state.talentPoints = parseInt(localStorage.getItem('rpg_talent_points')) || state.talentPoints;
    
    state.stats = JSON.parse(localStorage.getItem('rpg_stats')) || state.stats;
    state.inventory = JSON.parse(localStorage.getItem('rpg_inv_v2')) || state.inventory;
    state.equippedItems = JSON.parse(localStorage.getItem('rpg_equipped_v2')) || state.equippedItems;
    state.completedQuests = JSON.parse(localStorage.getItem('rpg_completed')) || state.completedQuests;
    state.learnedTalents = JSON.parse(localStorage.getItem('rpg_learned_talents')) || state.learnedTalents;
    
    state.defeatedMobsCount = parseInt(localStorage.getItem('rpg_defeated_mobs')) || state.defeatedMobsCount;
    state.bossAvailable = localStorage.getItem('rpg_boss_available') === 'true';
    
    state.metricsHistory = JSON.parse(localStorage.getItem('metrics_history')) || state.metricsHistory;
    state.totalLoginDays = parseInt(localStorage.getItem('stats_login_days')) || state.totalLoginDays;
    state.totalCompletedQuests = parseInt(localStorage.getItem('stats_total_quests')) || state.totalCompletedQuests;
    state.totalPushups = parseInt(localStorage.getItem('stats_pushups')) || state.totalPushups;
    state.totalPullups = parseInt(localStorage.getItem('stats_pullups')) || state.totalPullups;
    state.totalAbs = parseInt(localStorage.getItem('stats_abs')) || state.totalAbs;
    state.totalPlank = parseInt(localStorage.getItem('stats_plank')) || state.totalPlank;
    state.totalStretch = parseInt(localStorage.getItem('stats_stretch')) || state.totalStretch;
    state.totalSquats = parseInt(localStorage.getItem('stats_squats')) || state.totalSquats;
    state.totalRunKm = parseFloat(localStorage.getItem('stats_run_km')) || state.totalRunKm;
    state.totalRunMins = parseInt(localStorage.getItem('stats_run_mins')) || state.totalRunMins;
    state.claimedAchievements = JSON.parse(localStorage.getItem('rpg_achievements')) || state.claimedAchievements;

    // Логика ежедневного сброса квестов
    const today = getToday();
    let lastLoginDate = localStorage.getItem('rpg_last_login');
    if (lastLoginDate !== today) {
        state.completedQuests = [];
        localStorage.setItem('rpg_last_login', today);
        localStorage.setItem('rpg_completed', JSON.stringify(state.completedQuests));
        state.totalLoginDays++;
        saveGame();  
    }
}

// Сохранение всех данных (вызываем после любого изменения)
export function saveGame() {
    localStorage.setItem('rpg_gold', state.gold);
    localStorage.setItem('rpg_xp', state.xp);
    localStorage.setItem('rpg_level', state.level);
    localStorage.setItem('rpg_hp', state.hp);
    localStorage.setItem('rpg_energy', state.energy);
    localStorage.setItem('rpg_talent_points', state.talentPoints);
    
    localStorage.setItem('rpg_stats', JSON.stringify(state.stats));
    localStorage.setItem('rpg_inv_v2', JSON.stringify(state.inventory));
    localStorage.setItem('rpg_equipped_v2', JSON.stringify(state.equippedItems));
    localStorage.setItem('rpg_completed', JSON.stringify(state.completedQuests));
    localStorage.setItem('rpg_learned_talents', JSON.stringify(state.learnedTalents));
    
    localStorage.setItem('rpg_defeated_mobs', state.defeatedMobsCount);
    localStorage.setItem('rpg_boss_available', state.bossAvailable);
    
    localStorage.setItem('metrics_history', JSON.stringify(state.metricsHistory));
    localStorage.setItem('stats_login_days', state.totalLoginDays);
    localStorage.setItem('stats_total_quests', state.totalCompletedQuests);
    localStorage.setItem('stats_pushups', state.totalPushups);
    localStorage.setItem('stats_pullups', state.totalPullups);
    localStorage.setItem('stats_abs', state.totalAbs);
    localStorage.setItem('stats_plank', state.totalPlank);
    localStorage.setItem('stats_stretch', state.totalStretch);
    localStorage.setItem('stats_squats', state.totalSquats);
    localStorage.setItem('stats_run_km', state.totalRunKm);
    localStorage.setItem('stats_run_mins', state.totalRunMins);
    localStorage.setItem('rpg_achievements', JSON.stringify(state.claimedAchievements));
}
