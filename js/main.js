import {
    questsDatabase, itemsDatabase, slots, stats, nameVariants,
    chestTypes, rarities, rarityColors, statMultipliers, achievementsData,
    shopItems, talentTree, mobs, bosses
} from './data.js';

const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();   


let playerGold, playerXp, playerLevel, maxXp = 1000;
let playerHp, maxHp = 1000;
let playerEnergy, maxEnergy = 100;
let talentPoints, playerStats, playerInventory, equippedItems;
let completedQuests, talentsState;
let defeatedMobsCount, bossAvailable, currentEnemy = null;

// Статистика тренировок
let totalPushups = 0, totalPullups = 0, totalAbs = 0, totalPlank = 0, totalStretch = 0;
let totalSquats = 0, totalRunKm = 0, totalRunMins = 0; // Новые данные
let claimedAchievements = []; // Список забранных наград
let metricsHistory = [];
let totalLoginDays = 0;
let totalCompletedQuests = 0;

// Настройки
let soundEnabled, musicEnabled;
    
function saveGame() {
    localStorage.setItem('rpg_gold', playerGold);
    localStorage.setItem('rpg_xp', playerXp);
    localStorage.setItem('rpg_level', playerLevel);
    localStorage.setItem('rpg_hp', playerHp);
    localStorage.setItem('rpg_energy', playerEnergy);
    localStorage.setItem('rpg_talent_points', talentPoints);
    localStorage.setItem('rpg_stats', JSON.stringify(playerStats));
    localStorage.setItem('rpg_inv_v2', JSON.stringify(playerInventory));
    localStorage.setItem('rpg_equipped_v2', JSON.stringify(equippedItems));
    localStorage.setItem('rpg_completed', JSON.stringify(completedQuests));
    localStorage.setItem('rpg_learned_talents', JSON.stringify(learnedTalents));
    
    // Сохранение мира
    localStorage.setItem('rpg_defeated_mobs', defeatedMobsCount);
    localStorage.setItem('rpg_boss_available', bossAvailable);
    
    // Сохранение метрик
    localStorage.setItem('metrics_history', JSON.stringify(metricsHistory));
    localStorage.setItem('stats_login_days', totalLoginDays);
    localStorage.setItem('stats_total_quests', totalCompletedQuests);
    localStorage.setItem('stats_pushups', totalPushups);
    localStorage.setItem('stats_pullups', totalPullups);
    localStorage.setItem('stats_abs', totalAbs);
    localStorage.setItem('stats_plank', totalPlank);
    localStorage.setItem('stats_stretch', totalStretch);

    // Сохранение настроек
    localStorage.setItem('rpg_sound_enabled', soundEnabled);
    localStorage.setItem('rpg_music_enabled', musicEnabled);
    localStorage.setItem('rpg_last_login', getToday());
}

function loadGame() {
    playerGold = parseInt(localStorage.getItem('rpg_gold')) || 10000;
    playerXp = parseInt(localStorage.getItem('rpg_xp')) || 250;
    playerLevel = parseInt(localStorage.getItem('rpg_level')) || 0;
    playerHp = parseInt(localStorage.getItem('rpg_hp')) || 1000;
    playerEnergy = parseInt(localStorage.getItem('rpg_energy')) || 100;
    talentPoints = parseInt(localStorage.getItem('rpg_talent_points')) || 0;
    
    playerStats = JSON.parse(localStorage.getItem('rpg_stats')) || {
        "Сила": 10, "Ловкость": 10, "Выносливость": 10, "Интеллект": 10,
        "Сила духа": 10, "Гибкость": 10, "Концентрация": 10, "Креативность": 10
    };
    
    playerInventory = JSON.parse(localStorage.getItem('rpg_inv_v2')) || [
        { id: "sword", rarity: 1 }, { id: "sword", rarity: 1 }, 
        { id: "sword", rarity: 1 }, { id: "shoes", rarity: 0 }
    ];
    
    equippedItems = JSON.parse(localStorage.getItem('rpg_equipped_v2')) || {};
    completedQuests = JSON.parse(localStorage.getItem('rpg_completed')) || [];
    learnedTalents = JSON.parse(localStorage.getItem('rpg_learned_talents')) || [];
    
    defeatedMobsCount = parseInt(localStorage.getItem('rpg_defeated_mobs')) || 0;
    bossAvailable = localStorage.getItem('rpg_boss_available') === 'true';
    
    metricsHistory = JSON.parse(localStorage.getItem('metrics_history')) || [];
    totalLoginDays = parseInt(localStorage.getItem('stats_login_days')) || 0;
    totalCompletedQuests = parseInt(localStorage.getItem('stats_total_quests')) || 0;
    totalPushups = parseInt(localStorage.getItem('stats_pushups')) || 0;
    totalPullups = parseInt(localStorage.getItem('stats_pullups')) || 0;
    totalAbs = parseInt(localStorage.getItem('stats_abs')) || 0;
    totalPlank = parseInt(localStorage.getItem('stats_plank')) || 0;
    totalStretch = parseInt(localStorage.getItem('stats_stretch')) || 0;

    soundEnabled = localStorage.getItem('rpg_sound_enabled') !== 'false';
    musicEnabled = localStorage.getItem('rpg_music_enabled') !== 'false';

    totalSquats = parseInt(localStorage.getItem('stats_squats')) || 0;
    totalRunKm = parseFloat(localStorage.getItem('stats_run_km')) || 0;
    totalRunMins = parseInt(localStorage.getItem('stats_run_mins')) || 0;
    claimedAchievements = JSON.parse(localStorage.getItem('rpg_achievements')) || [];
}

// ==========================================
// 3. ИНТРФЕЙС
// ==========================================

// ==========================================
// 4. ЛОГИКА ИГРЫ 
// ==========================================

const SoundManager = (function() {
    let audioCtx = null;
    let musicInterval = null;
    let currentMusicType = null;
    let sfxEnabled = true;
    let musicEnabled = true;
    
    function initAudio() {
        if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
        }
    }
    
    function playTone(frequency, duration, type = 'sine', volume = 0.2) {
        if (!sfxEnabled) return;
        initAudio();
        if (!audioCtx) return;
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = frequency;
        gain.gain.value = volume;
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(now + duration);
    }
    
    function click() {
        playTone(800, 0.08, 'sine', 0.1);
    }
    function victory() {
        playTone(523.25, 0.2, 'sine', 0.2);
        setTimeout(() => playTone(659.25, 0.2, 'sine', 0.2), 150);
        setTimeout(() => playTone(783.99, 0.3, 'sine', 0.2), 300);
    }
    function defeat() {
        playTone(440, 0.3, 'sawtooth', 0.2);
        setTimeout(() => playTone(349.23, 0.5, 'sawtooth', 0.2), 250);
    }
    function chest() {
        playTone(659.25, 0.1, 'square', 0.15);
        setTimeout(() => playTone(783.99, 0.15, 'square', 0.15), 100);
        setTimeout(() => playTone(987.77, 0.2, 'square', 0.15), 250);
    }
    function levelUp() {
        playTone(523.25, 0.2, 'sine', 0.2);
        setTimeout(() => playTone(659.25, 0.2, 'sine', 0.2), 150);
        setTimeout(() => playTone(783.99, 0.3, 'sine', 0.2), 300);
        setTimeout(() => playTone(1046.5, 0.4, 'sine', 0.2), 450);
    }
    function questComplete() {
        playTone(523.25, 0.1, 'triangle', 0.15);
        setTimeout(() => playTone(659.25, 0.15, 'triangle', 0.15), 100);
    }
    function buy() {
        playTone(600, 0.1, 'sine', 0.1);
        setTimeout(() => playTone(800, 0.1, 'sine', 0.1), 80);
    }
    function merge() {
        playTone(440, 0.2, 'sawtooth', 0.15);
        setTimeout(() => playTone(880, 0.3, 'sawtooth', 0.15), 150);
    }
    function equip() {
        playTone(600, 0.1, 'sine', 0.12);
    }
    function heal() {
        playTone(523.25, 0.3, 'sine', 0.12);
        setTimeout(() => playTone(659.25, 0.4, 'sine', 0.12), 200);
    }
    function modal() {
        playTone(400, 0.05, 'sine', 0.08);
    }
    
    function stopMusic() {
        if (musicInterval) {
            clearInterval(musicInterval);
            musicInterval = null;
        }
        currentMusicType = null;
    }
    
    function startMusic(type) {
        if (!musicEnabled) return;
        if (currentMusicType === type && musicInterval) return;
        stopMusic();
        currentMusicType = type;
        let notes = [];
        if (type === 'menu') {
            notes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 261.63];
        } else if (type === 'battle') {
            notes = [440.00, 523.25, 587.33, 698.46, 587.33, 523.25, 440.00];
        } else {
            return;
        }
        let noteIndex = 0;
        musicInterval = setInterval(() => {
            if (!musicEnabled) return;
            if (!audioCtx) return;
            const now = audioCtx.currentTime;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.value = notes[noteIndex];
            gain.gain.value = 0.05;
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(now + 0.5);
            noteIndex = (noteIndex + 1) % notes.length;
        }, 600);
    }
    
    function setSfxEnabled(enabled) {
        sfxEnabled = enabled;
        localStorage.setItem('rpg_sfx_enabled', enabled);
    }
    
    function setMusicEnabled(enabled) {
        musicEnabled = enabled;
        localStorage.setItem('rpg_music_enabled', enabled);
        if (!enabled) {
            stopMusic();
        } else {
            const battleModal = document.getElementById('modal-battle');
            if (battleModal && battleModal.style.display === 'flex') {
                startMusic('battle');
            } else {
                startMusic('menu');
            }
        }
    }
    
    function loadSettings() {
        const sfx = localStorage.getItem('rpg_sfx_enabled');
        if (sfx !== null) sfxEnabled = sfx === 'true';
        const music = localStorage.getItem('rpg_music_enabled');
        if (music !== null) musicEnabled = music === 'true';
        if (musicEnabled) {
            const activateMusic = () => {
                initAudio();
                startMusic('menu');
                document.removeEventListener('click', activateMusic);
                document.removeEventListener('touchstart', activateMusic);
            };
            document.addEventListener('click', activateMusic);
            document.addEventListener('touchstart', activateMusic);
        }
    }
    
    return {
        init: initAudio,
        playEffect: function(effect) {
            if (!sfxEnabled) return;
            switch(effect) {
                case 'click': click(); break;
                case 'victory': victory(); break;
                case 'defeat': defeat(); break;
                case 'chest': chest(); break;
                case 'levelup': levelUp(); break;
                case 'quest': questComplete(); break;
                case 'buy': buy(); break;
                case 'merge': merge(); break;
                case 'equip': equip(); break;
                case 'heal': heal(); break;
                case 'modal': modal(); break;
                default: click();
            }
        },
        setSfxEnabled: setSfxEnabled,
        setMusicEnabled: setMusicEnabled,
        getSfxEnabled: () => sfxEnabled,
        getMusicEnabled: () => musicEnabled,
        startMusic: startMusic,
        stopMusic: stopMusic,
        loadSettings: loadSettings,
        toggleSfx: function() {
            const newState = !sfxEnabled;
            this.setSfxEnabled(newState);
            const btn = document.getElementById('sound-toggle');
            if (btn) {
                btn.innerText = newState ? 'ВКЛ' : 'ВЫКЛ';
                btn.classList.toggle('on', newState);
            }
            this.playEffect('click');
        },
        toggleMusic: function() {
            const newState = !musicEnabled;
            this.setMusicEnabled(newState);
            const btn = document.getElementById('music-toggle');
            if (btn) {
                btn.innerText = newState ? 'ВКЛ' : 'ВЫКЛ';
                btn.classList.toggle('on', newState);
            }
            if (newState) {
                this.startMusic('menu');
            } else {
                this.stopMusic();
            }
        }
    };
})();

function addItemToInventory(newItem, amount = 1) {
    let found = playerInventory.find(item => 
        (newItem.type === 'chest' && item.type === 'chest' && item.chestRarity === newItem.chestRarity) ||
        (newItem.type !== 'chest' && item.type !== 'chest' && item.id === newItem.id && item.rarity === newItem.rarity)
    );

    if (found) {
        found.count = (found.count || 1) + amount; 
    } else {
        newItem.count = amount; 
        playerInventory.push(newItem);
    }
}

function removeItemFromInventory(index, amount = 1) {
    if ((playerInventory[index].count || 1) > amount) {
        playerInventory[index].count -= amount; 
    } else {
        playerInventory.splice(index, 1); 
    }
}

function updateUI() {
    const goldEl = document.getElementById('gold');
    if (goldEl) goldEl.innerText = playerGold;
    
    const levelEl = document.getElementById('level');
    if (levelEl) levelEl.innerText = playerLevel;
    
    updatePowerDisplay();
    updateXPdisplay();
    updateHpDisplay();
    updateEnergyDisplay();
}  
    
function calculatePower() {
    let power = 0;
        for (let stat in playerStats) {
        power += playerStats[stat];
        }
    return power;
    }







function getToday() {
    return new Date().toISOString().split('T')[0];
}

function updatePowerDisplay() {
const powerSpan = document.getElementById('player-power');
if (powerSpan) {
powerSpan.innerText = calculatePower();
}
}

function closeInventory() {
    document.getElementById('modal-inventory').style.display = 'none';
}
    
            function renderQuests() {
                const container = document.getElementById('quests-container');
                container.innerHTML = '';
                questsDatabase.forEach(quest => {
                    if (completedQuests.includes(quest.id)) return;
                    const taskDiv = document.createElement('div');
                    taskDiv.className = 'task';
                    taskDiv.innerHTML = `
                        <div class="task-info">
                            <div class="task-title">${quest.title}</div>
                            <div class="task-reward">+1 ${quest.stat} | ${quest.gold}💰 | ${quest.xp} XP</div>
                        </div>
                       <button id="btn-quest-${quest.id}" class="btn-action" onclick="completeQuest('${quest.id}', ${quest.xp}, ${quest.gold}, '${quest.stat}')">СДЕЛАТЬ</button>
                    `;
                    container.appendChild(taskDiv);
                });
            }

function completeQuest(questId, xpReward, goldReward, statName) {
    playerGold += Math.floor(goldReward * getGoldMultiplier());
    playerXp += Math.floor(xpReward * getXpMultiplier());
    if (playerStats[statName] !== undefined) {
        playerStats[statName] += 1;
        const statEl = document.getElementById('stat-' + statName);
        if (statEl) statEl.innerText = playerStats[statName];
    }
    while (playerXp >= maxXp) {
        playerLevel++;
        playerXp -= maxXp;
        talentPoints++;
        tg.showPopup({ title: 'Уровень повышен!', message: `Теперь ты ${playerLevel} уровня.`, buttons: [{ type: 'ok' }] });
        SoundManager.playEffect('levelup');
    }
    completedQuests.push(questId);
    totalCompletedQuests++;

    const title = questsDatabase.find(q => q.id === questId)?.title || '';
    
    if (title.toLowerCase().includes('отжимания')) {
        let count = parseInt(prompt("Сколько раз отжался?", "10"));
        if (isNaN(count) || count <= 0) return;
        totalPushups += count;
    }
    else if (title.toLowerCase().includes('подтягивания')) {
        let count = parseInt(prompt("Сколько раз подтянулся?", "5"));
        if (isNaN(count) || count <= 0) return;
        totalPullups += count;
    }
    else if (title.toLowerCase().includes('приседания')) {
        let count = parseInt(prompt("Сколько раз присел?", "20"));
        if (isNaN(count) || count <= 0) return;
        totalSquats += count;
    }
    else if (title.toLowerCase().includes('пресс')) {
        let count = parseInt(prompt("Сколько раз сделал пресс?", "20"));
        if (isNaN(count) || count <= 0) return;
        totalAbs += count;
    }
    else if (title.toLowerCase().includes('планка')) {
        let mins = parseFloat(prompt("Сколько минут простоял в планке?", "1"));
        if (isNaN(mins) || mins <= 0) return;
        totalPlank += mins;
    }
    else if (title.toLowerCase().includes('бег')) {
        let km = parseFloat(prompt("Сколько километров пробежал?", "1"));
        let mins = parseInt(prompt("За сколько минут?", "10"));
        if (isNaN(km) || isNaN(mins) || km <= 0) return;
        totalRunKm += km;
        totalRunMins += mins;
    }
    else if (title.toLowerCase().includes('сон')) {
        let bedTime = parseInt(prompt("Во сколько лег спать? (введи часы, например 23 или 1)", "23"));
        let wakeTime = parseInt(prompt("Во сколько проснулся? (введи часы, например 7)", "7"));
        if (isNaN(bedTime) || isNaN(wakeTime)) return;
        let hours = wakeTime < bedTime ? (24 - bedTime) + wakeTime : wakeTime - bedTime;
        playerEnergy = Math.min(maxEnergy, playerEnergy + (hours * 10));
        alert(`Отличный сон! Ты проспал ${hours} ч. Энергия восстановлена!`);
    }
    else if (title.toLowerCase().includes('растяжка')) totalStretch++;

    saveGame();
    updateUI();
    
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
SoundManager.playEffect('quest');
    const btn = document.getElementById(`btn-quest-${questId}`);
    if (btn) {
        // Добавляем класс для красивого исчезновения
        const taskDiv = btn.closest('.task');
        taskDiv.classList.add('completed');
        
        showFloatingText(btn, `+${Math.floor(xpReward * getXpMultiplier())} XP`, 'var(--accent-green)');
        showFloatingText(btn, `+${Math.floor(goldReward * getGoldMultiplier())} 💰`, 'gold');
        
        // Ждем 300 миллисекунд (пока идет анимация), и только потом убираем квест из списка
        setTimeout(() => {
            renderQuests();
        }, 300);
    } else {
        renderQuests();
    }
}
    
        function openBattle() {
    updateCurrentEnemy();
    
    document.getElementById('hero-power-display').innerText = `⚔️ Сила: ${getEffectiveHeroPower(currentEnemy)}`;
    document.getElementById('hero-hp-display').innerHTML = `❤️ HP: ${playerHp}/${maxHp}`;
    document.getElementById('enemy-name').innerHTML = currentEnemy.isBoss ? `👑 ${currentEnemy.name}` : `👾 ${currentEnemy.name}`;
    document.getElementById('enemy-power-display').innerText = `⚔️ Сила: ${currentEnemy.basePower}`;
    document.getElementById('enemy-weakness').innerHTML = `Слабость: ${currentEnemy.weakness || 'нет'}`;
    document.getElementById('battle-log').innerHTML = '';
    document.getElementById('modal-battle').style.display = 'flex';
    SoundManager.startMusic('battle');

    const attackBtn = document.getElementById('attack-btn');
    attackBtn.onclick = startBattle;
}

function closeBattle() {
    document.getElementById('modal-battle').style.display = 'none';
    SoundManager.startMusic('menu');
}


function startBattle() {
    const log = document.getElementById('battle-log');
    const enemyDisplay = document.getElementById('enemy-name'); 
    const heroAvatar = document.getElementById('hero-sprite');  
    
    if (!log) return;
    log.innerHTML = ''; 

    if (playerHp <= 0) {
        log.innerHTML = '<div style="color: red;">💀 Вы мертвы! Отдохните.</div>';
        return;
    }
    
    if (playerEnergy < 10) {
        log.innerHTML += '<div style="color: cyan;">⚡ Нет энергии для боя! Нужно выполнить квест "Сон".</div>';
        return;
    }
    
    playerEnergy -= 10;
    updateEnergyDisplay();

    const heroPower = getEffectiveHeroPower(currentEnemy);
    const enemyPower = currentEnemy.basePower;

    log.innerHTML += `<div>⚔️ Ваша сила: ${heroPower}</div>`;
    log.innerHTML += `<div>👾 Сила врага: ${enemyPower}</div>`;

    if (enemyDisplay) {
        showFloatingText(enemyDisplay, `-${heroPower}`, 'white');
        enemyDisplay.classList.add('shake');
        setTimeout(() => enemyDisplay.classList.remove('shake'), 300);
    }

    if (heroPower >= enemyPower) {
        log.innerHTML += `<div style="color: lightgreen;">✅ ПОБЕДА!</div>`;
        SoundManager.playEffect('victory');

        const earnedXp = Math.floor(currentEnemy.expReward * getXpMultiplier());
        const earnedGold = Math.floor(currentEnemy.goldReward * getGoldMultiplier());
        
        playerXp += earnedXp;
        playerGold += earnedGold;

        setTimeout(() => {
            if (enemyDisplay) {
                showFloatingText(enemyDisplay, `+${earnedXp} XP`, 'var(--accent-green)');
                showFloatingText(enemyDisplay, `+${earnedGold} 💰`, 'gold');
            }
        }, 300);

        while (playerXp >= maxXp) {
            playerLevel++;
            playerXp -= maxXp;
            talentPoints++;
        }

        let chestRarity = 0;
        let random = Math.random();
        let cumulative = 0;
        for (let i = 0; i < chestTypes.length; i++) {
            cumulative += chestTypes[i].dropChance;
            if (random < cumulative) { chestRarity = chestTypes[i].rarity; break; }
        }
        addChest(chestRarity);
        log.innerHTML += `<div style="color: gold;">🎁 Получен ${chestTypes[chestRarity].img} сундук!</div>`;

        if (currentEnemy.isBoss) {
            defeatedMobsCount = 0;
            bossAvailable = false;
        } else {
            defeatedMobsCount++;
            if (defeatedMobsCount >= 10) bossAvailable = true;
        }

        updateCurrentEnemy();
    } else {

        log.innerHTML += `<div style="color: red;">💔 ПОРАЖЕНИЕ!</div>`;
        playerHp = Math.max(0, playerHp - 10);
        SoundManager.playEffect('defeat');
        
        if (heroAvatar) {
            showFloatingText(heroAvatar, `-10 ❤️`, 'red');
            heroAvatar.classList.add('shake');
            setTimeout(() => heroAvatar.classList.remove('shake'), 300);
        }
    }

    saveGame();
    updateUI();
    
    document.getElementById('hero-hp-display').innerHTML = `❤️ HP: ${playerHp}/${maxHp}`;
    document.getElementById('enemy-name').innerHTML = currentEnemy.isBoss ? `👑 ${currentEnemy.name}` : `👾 ${currentEnemy.name}`;
    document.getElementById('enemy-power-display').innerText = `⚔️ Сила: ${currentEnemy.basePower}`;
    log.scrollTop = log.scrollHeight;
}

function addChest(chestRarity) {
    addItemToInventory({ type: 'chest', chestRarity: chestRarity });
    saveGame();
}

function restoreHp() {
    if (playerGold >= 10 && playerHp < maxHp) {
        playerGold -= 10;
        playerHp = Math.min(maxHp, playerHp + 10);
        localStorage.setItem('rpg_gold', playerGold);
        localStorage.setItem('rpg_hp', playerHp);
        document.getElementById('gold').innerText = playerGold;
        updateHpDisplay();
        SoundManager.playEffect('heal');
        const heroHpDiv = document.getElementById('hero-hp-display');
        if (heroHpDiv) heroHpDiv.innerHTML = `❤️ HP: ${playerHp}/${maxHp}`;
        if (playerHp > 0) {
            const attackBtn = document.getElementById('attack-btn');
            if (attackBtn) {
                attackBtn.disabled = false;
                attackBtn.onclick = startBattle;
            }
        }
    } else {
        const log = document.getElementById('battle-log');
        if (log) log.innerHTML += '<div style="color: red;">Недостаточно золота или HP полное!</div>';
    }
}

function renderStats() {
    document.getElementById('stats-login-days').innerText = totalLoginDays;
    document.getElementById('stats-total-quests').innerText = totalCompletedQuests;
    document.getElementById('stats-pushups').innerText = totalPushups;
    document.getElementById('stats-pullups').innerText = totalPullups;
    document.getElementById('stats-squats').innerText = totalSquats;
    document.getElementById('stats-abs').innerText = totalAbs;
    document.getElementById('stats-plank').innerText = totalPlank;
    document.getElementById('stats-stretch').innerText = totalStretch;
    document.getElementById('stats-run-km').innerText = totalRunKm;
    document.getElementById('stats-run-mins').innerText = totalRunMins;
}

            function getToday() {
            return new Date().toISOString().split('T')[0];
          }

            function renderForecast(name, values) {
                const month = extrapolate(values, 30);
                const halfYear = extrapolate(values, 180);
                const year = extrapolate(values, 365);
                if (month === null) return `<div class="forecast">${name}: недостаточно данных для прогноза</div>`;
                return `<div class="forecast">${name}: через месяц → ${month}, через полгода → ${halfYear}, через год → ${year}</div>`;
            }

            function renderForecastTime(name, values) {
                const month = extrapolate(values, 30);
                const halfYear = extrapolate(values, 180);
                const year = extrapolate(values, 365);
                if (month === null) return `<div class="forecast">${name}: недостаточно данных для прогноза</div>`;
                return `<div class="forecast">${name}: через месяц → ${formatTime(month)}, через полгода → ${formatTime(halfYear)}, через год → ${formatTime(year)}</div>`;
            }
        
            function extrapolate(values, daysForward) {
                if (values.length < 2) return null;
                const recent = values.slice(-7);
                if (recent.length < 2) return null;
                const indices = recent.map((_, i) => i);
                const sumX = indices.reduce((a,b)=>a+b,0);
                const sumY = recent.reduce((a,b)=>a+b,0);
                const sumXY = indices.reduce((a,b,i)=>a+b*recent[i],0);
                const sumX2 = indices.reduce((a,b)=>a+b*b,0);
                const n = recent.length;
                const slope = (n*sumXY - sumX*sumY) / (n*sumX2 - sumX*sumX);
                const intercept = (sumY - slope*sumX)/n;
                const lastIndex = indices[indices.length-1];
                const lastValue = recent[lastIndex];
                const predicted = lastValue + slope * daysForward;
                return Math.round(predicted);
            }

            function updateXPdisplay() {
                document.getElementById('xp-current').innerText = playerXp;
                document.getElementById('xp-max').innerText = maxXp;
                document.querySelector('.xp-bar').style.width = Math.min((playerXp / maxXp) * 100, 100) + '%';
            }

            function updateHpDisplay() {
                document.getElementById('hp-current').innerText = playerHp;
                document.getElementById('hp-max').innerText = maxHp;
                const percent = (playerHp / maxHp) * 100;
                document.getElementById('hp-bar-fill').style.width = Math.max(0, percent) + '%';
            }

    function updateEnergyDisplay() {
    const energyCur = document.getElementById('energy-current');
    if (energyCur) energyCur.innerText = playerEnergy;
    const energyMax = document.getElementById('energy-max');
    if (energyMax) energyMax.innerText = maxEnergy;
    
    const percent = (playerEnergy / maxEnergy) * 100;
    const bar = document.getElementById('energy-bar-fill');
    if (bar) bar.style.width = Math.max(0, percent) + '%';
}

                    function saveStats() {
                localStorage.setItem('stats_login_days', totalLoginDays);
                localStorage.setItem('stats_total_quests', totalCompletedQuests);
                localStorage.setItem('stats_pushups', totalPushups);
                localStorage.setItem('stats_pullups', totalPullups);
                localStorage.setItem('stats_abs', totalAbs);
                localStorage.setItem('stats_plank', totalPlank);
                localStorage.setItem('stats_stretch', totalStretch);
                localStorage.setItem('stats_squats', totalSquats);
                localStorage.setItem('stats_run_km', totalRunKm);
                localStorage.setItem('stats_run_mins', totalRunMins);
                localStorage.setItem('rpg_achievements', JSON.stringify(claimedAchievements));        
            }

    
            function formatTime(sec) {
                if (!sec) return '—';
                const mins = Math.floor(sec / 60);
                const seconds = sec % 60;
                return `${mins}:${seconds.toString().padStart(2,'0')}`;
            }

const today = new Date().toISOString().split('T')[0];
let lastLoginDate = localStorage.getItem('rpg_last_login');
if (lastLoginDate !== today) {
    completedQuests = [];
    localStorage.setItem('rpg_last_login', today);
    localStorage.setItem('rpg_completed', JSON.stringify(completedQuests));
    totalLoginDays++;
    saveStats();  
}
            
function toggleSfx() {
    SoundManager.toggleSfx();
}

function toggleMusic() {
    SoundManager.toggleMusic();
}
    
        function updateSfxButton() {
    const btn = document.getElementById('sound-toggle');
    if (btn) {
        btn.innerText = SoundManager.getSfxEnabled() ? 'ВКЛ' : 'ВЫКЛ';
        btn.classList.toggle('on', SoundManager.getSfxEnabled());
    }
}

function updateMusicButton() {
    const btn = document.getElementById('music-toggle');
    if (btn) {
        btn.innerText = SoundManager.getMusicEnabled() ? 'ВКЛ' : 'ВЫКЛ';
        btn.classList.toggle('on', SoundManager.getMusicEnabled());
    }
}

    
    function getColor(slotId, defaultColor) {
        const item = equippedItems[slotId];
        if (item) return rarityColors[item.rarity];
        return defaultColor;
    }

   

function showFloatingText(element, text, color) {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const floatEl = document.createElement('div');
    floatEl.className = 'floating-text';
    floatEl.style.color = color;
    floatEl.innerText = text;
    
    const offsetX = (Math.random() - 0.5) * 30;
    floatEl.style.left = (rect.left + rect.width / 2 + offsetX) + 'px';
    floatEl.style.top = rect.top + 'px';
    
    document.body.appendChild(floatEl);
    setTimeout(() => floatEl.remove(), 1000);
}
        

                function updateCurrentEnemy() {
                    if (bossAvailable && bosses.length > 0) {
                        const randomIndex = Math.floor(Math.random() * bosses.length);
                        currentEnemy = { ...bosses[randomIndex], isBoss: true };
                    } else {
                        const randomIndex = Math.floor(Math.random() * mobs.length);
                        currentEnemy = { ...mobs[randomIndex], isBoss: false };
                    }
                }

function getEffectiveHeroPower(enemy) {
    let basePower = calculatePower();
    if (enemy.weakness && playerStats[enemy.weakness]) {
        basePower += playerStats[enemy.weakness];
    }
    return basePower;
}

function openInventory() {
    const modal = document.getElementById('modal-inventory');
    const grid = document.getElementById('inventory-grid');
    grid.innerHTML = '';
    hideItemDetails();
    
    for (let i = 0; i < playerInventory.length; i++) {
        const item = playerInventory[i];
        
        const slotDiv = document.createElement('div');
        slotDiv.className = 'inv-slot';
        slotDiv.style.position = 'relative'; 
        
        const count = item.count || 1;
        const countBadge = count > 1 ? `<div style="position: absolute; bottom: 2px; right: 2px; font-size: 5px; background: rgba(0,0,0,0.8); color: white; padding: 2px; border-radius: 2px;">x${count}</div>` : '';

        if (item.type === 'chest') {
            const chest = chestTypes[item.chestRarity];
            slotDiv.style.borderColor = chest.color;
            
           
            let imageHtml = chest.img.includes('.') 
    ? `<img src="images/${chest.img}" style="width: 80%; height: 80%; object-fit: contain; pointer-events: none;">`
    : `<span style="font-size: 16px;">${chest.img}</span>`;
                
            slotDiv.innerHTML = `${imageHtml}${countBadge}`;
            slotDiv.onclick = () => showChestDetails(i);
        } else {
            const baseItem = itemsDatabase[item.id];
            if (baseItem) {
                if (item.rarity === 3) slotDiv.classList.add('glow-3');
                if (item.rarity === 4) slotDiv.classList.add('glow-4');
                slotDiv.style.borderColor = rarityColors[item.rarity];
                
                // УМНАЯ ПРОВЕРКА ДЛЯ ПРЕДМЕТА
                let imageHtml = baseItem.img.includes('.') 
                    ? `<img src="${baseItem.img}" style="width: 80%; height: 80%; object-fit: contain; pointer-events: none;">`
                    : `<span style="font-size: 16px; color: ${rarityColors[item.rarity]};">${baseItem.img}</span>`;
                    
                slotDiv.innerHTML = `${imageHtml}${countBadge}`;
                slotDiv.onclick = () => showItemDetails(i);
            }
        }
        grid.appendChild(slotDiv);
    }
    
    const emptySlots = Math.max(0, 20 - playerInventory.length);
    for(let i = 0; i < emptySlots; i++){
        const slotDiv = document.createElement('div');
        slotDiv.className = 'inv-slot';
        grid.appendChild(slotDiv);
    }

    modal.style.display = 'flex';
}

        function saveMetrics() {
            const today = getToday();
            const pushups = parseInt(document.getElementById('metric-pushups').value) || 0;
            const pullups = parseInt(document.getElementById('metric-pullups').value) || 0;
            const barbell = parseInt(document.getElementById('metric-barbell').value) || 0;
            const bodyweight = parseInt(document.getElementById('metric-bodyweight').value) || 0;
            const run1k = parseInt(document.getElementById('metric-run1k').value) || 0;
            const run5k = parseInt(document.getElementById('metric-run5k').value) || 0;
            const run21k = parseInt(document.getElementById('metric-run21k').value) || 0;

            const existingIndex = metricsHistory.findIndex(entry => entry.date === today);
            const newEntry = { date: today, pushups, pullups, barbell, bodyweight, run1k, run5k, run21k };

            if (existingIndex !== -1) {
                metricsHistory[existingIndex] = newEntry;
            } else {
                metricsHistory.push(newEntry);
                metricsHistory.sort((a,b) => new Date(a.date) - new Date(b.date));
            }
            localStorage.setItem('metrics_history', JSON.stringify(metricsHistory));
            tg.showPopup({ title: 'Сохранено', message: 'Показатели сохранены!', buttons: [{ type: 'ok' }] });
            document.getElementById('metric-pushups').value = '';
            document.getElementById('metric-pullups').value = '';
            document.getElementById('metric-barbell').value = '';
            document.getElementById('metric-bodyweight').value = '';
            document.getElementById('metric-run1k').value = '';
            document.getElementById('metric-run5k').value = '';
            document.getElementById('metric-run21k').value = '';
            if (document.getElementById('metrics-graphs-tab').style.display !== 'none') {
                renderGraphs();
            }
        }

        let metricsChart = null;
        function renderGraphs() {
            if (metricsHistory.length === 0) {
                document.getElementById('metrics-dashboard').innerHTML = '<div style="text-align:center; padding:20px;">Нет данных. Введите показатели в разделе "Ввод данных".</div>';
                document.getElementById('forecast-container').innerHTML = '';
                if (metricsChart) metricsChart.destroy();
                return;
            }

            const dates = metricsHistory.map(e => e.date);
            const pushups = metricsHistory.map(e => e.pushups);
            const pullups = metricsHistory.map(e => e.pullups);
            const barbell = metricsHistory.map(e => e.barbell);
            const bodyweight = metricsHistory.map(e => e.bodyweight);
            const run1k = metricsHistory.map(e => e.run1k);
            const run5k = metricsHistory.map(e => e.run5k);
            const run21k = metricsHistory.map(e => e.run21k);

            const last = metricsHistory[metricsHistory.length-1];
            const prev = metricsHistory.length>1 ? metricsHistory[metricsHistory.length-2] : null;
            const dashboardHtml = `
                <div class="metric-card">
                    <div class="metric-title">📊 Текущие показатели (${last.date})</div>
                    <div class="metric-value">Отжимания: ${last.pushups || 0}</div>
                    <div class="metric-change">${prev ? (last.pushups - prev.pushups > 0 ? '▲' : (last.pushups - prev.pushups < 0 ? '▼' : '●')) + ' ' + Math.abs(last.pushups - prev.pushups) : ''}</div>
                    <div class="metric-value">Подтягивания: ${last.pullups || 0}</div>
                    <div class="metric-change">${prev ? (last.pullups - prev.pullups > 0 ? '▲' : (last.pullups - prev.pullups < 0 ? '▼' : '●')) + ' ' + Math.abs(last.pullups - prev.pullups) : ''}</div>
                    <div class="metric-value">Вес штанги: ${last.barbell || 0} кг</div>
                    <div class="metric-change">${prev ? (last.barbell - prev.barbell > 0 ? '▲' : (last.barbell - prev.barbell < 0 ? '▼' : '●')) + ' ' + Math.abs(last.barbell - prev.barbell) : ''}</div>
                    <div class="metric-value">Вес тела: ${last.bodyweight || 0} кг</div>
                    <div class="metric-change">${prev ? (last.bodyweight - prev.bodyweight > 0 ? '▲' : (last.bodyweight - prev.bodyweight < 0 ? '▼' : '●')) + ' ' + Math.abs(last.bodyweight - prev.bodyweight) : ''}</div>
                    <div class="metric-value">Бег 1 км: ${formatTime(last.run1k)}</div>
                    <div class="metric-change">${prev && last.run1k && prev.run1k ? (last.run1k - prev.run1k < 0 ? '▼' : (last.run1k - prev.run1k > 0 ? '▲' : '●')) + ' ' + Math.abs(last.run1k - prev.run1k) + ' сек' : ''}</div>
                    <div class="metric-value">Бег 5 км: ${formatTime(last.run5k)}</div>
                    <div class="metric-change">${prev && last.run5k && prev.run5k ? (last.run5k - prev.run5k < 0 ? '▼' : (last.run5k - prev.run5k > 0 ? '▲' : '●')) + ' ' + Math.abs(last.run5k - prev.run5k) + ' сек' : ''}</div>
                    <div class="metric-value">Бег 21 км: ${formatTime(last.run21k)}</div>
                    <div class="metric-change">${prev && last.run21k && prev.run21k ? (last.run21k - prev.run21k < 0 ? '▼' : (last.run21k - prev.run21k > 0 ? '▲' : '●')) + ' ' + Math.abs(last.run21k - prev.run21k) + ' сек' : ''}</div>
                </div>
            `;
            document.getElementById('metrics-dashboard').innerHTML = dashboardHtml;

            if (metricsChart) metricsChart.destroy();
            const ctx = document.getElementById('metrics-chart').getContext('2d');
            metricsChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [
                        { label: 'Отжимания', data: pushups, borderColor: '#ff6384', fill: false, tension: 0.1 },
                        { label: 'Подтягивания', data: pullups, borderColor: '#36a2eb', fill: false, tension: 0.1 },
                        { label: 'Вес штанги (кг)', data: barbell, borderColor: '#ffce56', fill: false, tension: 0.1 },
                        { label: 'Вес тела (кг)', data: bodyweight, borderColor: '#4bc0c0', fill: false, tension: 0.1 }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: { legend: { position: 'top', labels: { font: { size: 8 } } } },
                    scales: { x: { ticks: { font: { size: 6 } } }, y: { ticks: { font: { size: 6 } } } }
                }
            });

            const forecastHtml = `
                <div class="metric-card">
                    <div class="metric-title">📈 Прогноз (при сохранении темпа)</div>
                    ${renderForecast('Отжимания', pushups)}
                    ${renderForecast('Подтягивания', pullups)}
                    ${renderForecast('Вес штанги', barbell)}
                    ${renderForecast('Вес тела', bodyweight)}
                    ${renderForecastTime('Бег 1 км', run1k)}
                    ${renderForecastTime('Бег 5 км', run5k)}
                    ${renderForecastTime('Бег 21 км', run21k)}
                </div>
            `;
            document.getElementById('forecast-container').innerHTML = forecastHtml;
        }

        function openMetrics() {
            document.getElementById('modal-metrics').style.display = 'flex';
            document.querySelector('.tab-btn[data-tab="input"]').click();
            renderGraphs();
            renderStats();
        }
        function closeMetrics() {
            document.getElementById('modal-metrics').style.display = 'none';
        }

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const tab = this.dataset.tab;
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                document.getElementById('metrics-input-tab').style.display = tab === 'input' ? 'block' : 'none';
                document.getElementById('metrics-graphs-tab').style.display = tab === 'graphs' ? 'block' : 'none';
                const statsTab = document.getElementById('metrics-stats-tab');
                if (statsTab) statsTab.style.display = tab === 'stats' ? 'block' : 'none';
                if (tab === 'graphs') renderGraphs();
                if (tab === 'stats') renderStats();
            });
        });

        updateXPdisplay();
        document.getElementById('gold').innerText = playerGold;
        document.getElementById('level').innerText = playerLevel;

function recalcStats() {
    let newStats = {
        "Сила": 10, "Ловкость": 10, "Выносливость": 10, "Интеллект": 10,
        "Сила духа": 10, "Гибкость": 10, "Концентрация": 10, "Креативность": 10
    };
    
    for (let slotId in equippedItems) {
        let item = equippedItems[slotId];
        let baseItem = itemsDatabase[item.id];
        if (baseItem) {
            let bonus = baseItem.baseBonus * statMultipliers[item.rarity];
            newStats[baseItem.stat] += bonus;
        }
    }

    learnedTalents.forEach(nodeId => {
        const node = talentTree.find(n => n.id === nodeId);
        if (node) {
            if (node.effectType === 'stat') {
                newStats[node.stat] += node.value;
            } else if (node.effectType === 'all_stats') {
                for (let s in newStats) newStats[s] += node.value;
            }
        }
    });

    playerStats = newStats;
    localStorage.setItem('rpg_stats', JSON.stringify(playerStats));
    for (let stat in playerStats) {
        let el = document.getElementById('stat-' + stat);
        if (el) el.innerText = playerStats[stat];
    }
    updatePowerDisplay();          
}

function getXpMultiplier() {
    let mult = 1.0;
    learnedTalents.forEach(nodeId => {
        const node = talentTree.find(n => n.id === nodeId);
        if (node && node.effectType === 'xp_mult') mult += node.value / 100;
    });
    return mult;
}

function getGoldMultiplier() {
    let mult = 1.0;
    learnedTalents.forEach(nodeId => {
        const node = talentTree.find(n => n.id === nodeId);
        if (node && node.effectType === 'gold_mult') mult += node.value / 100;
    });
    return mult;
}

function getLuckBonus() {
    let luck = 0;
    learnedTalents.forEach(nodeId => {
        const node = talentTree.find(n => n.id === nodeId);
        if (node && node.effectType === 'luck') luck += node.value;
    });
    return luck;
}

        function openSettings() {
    document.getElementById('modal-settings').style.display = 'flex';
}
        function closeSettings() {
    document.getElementById('modal-settings').style.display = 'none';
}
        
        function getTalentLevel(talentId) {
            return talentsState[talentId] || 0;
        }

function openTalents() {
    document.getElementById('modal-talents').style.display = 'flex';
    document.getElementById('talent-points-display').innerText = talentPoints;
    
    document.getElementById('talent-info').innerHTML = `<div style="color: #aaa; font-size: 6px;">Нажми на узел, чтобы увидеть детали</div>`;
    
    renderTalentTree();
    
    setTimeout(() => {
        const container = document.getElementById('talent-tree-container');
        container.scrollLeft = 85; 
        container.scrollTop = 85;
    }, 10);
}

function closeTalents() {
    document.getElementById('modal-talents').style.display = 'none';
}

function renderTalentTree() {
    const svg = document.getElementById('talent-lines');
    const nodesContainer = document.getElementById('talent-nodes');
    svg.innerHTML = '';
    nodesContainer.innerHTML = '';

    talentTree.forEach(node => {
        node.req.forEach(reqId => {
            const parent = talentTree.find(n => n.id === reqId);
            if (parent) {
                const isLearned = learnedTalents.includes(node.id);
                const isAvailable = learnedTalents.includes(reqId) && !isLearned;
                
                let color = '#333'; 
                if (isLearned) color = 'var(--accent-yellow)'; 
                else if (isAvailable) color = 'var(--accent-green)'; 

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', parent.x + 15); 
                line.setAttribute('y1', parent.y + 15);
                line.setAttribute('x2', node.x + 15);
                line.setAttribute('y2', node.y + 15);
                line.setAttribute('stroke', color);
                line.setAttribute('stroke-width', isLearned ? '3' : '2');
                svg.appendChild(line);
            }
        });
    });

    talentTree.forEach(node => {
        const isLearned = learnedTalents.includes(node.id);
        const canLearn = (node.req.length === 0 || node.req.some(r => learnedTalents.includes(r))) && !isLearned;

        const el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.left = node.x + 'px';
        el.style.top = node.y + 'px';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.borderRadius = '50%';
        
        let borderColor = '#333';
        let bgColor = '#111';
        if (isLearned) { borderColor = 'var(--accent-yellow)'; bgColor = '#222'; }
        else if (canLearn) { borderColor = 'var(--accent-green)'; }

        el.style.border = `2px solid ${borderColor}`;
        el.style.background = bgColor;
        el.style.display = 'flex';
        el.style.justifyContent = 'center';
        el.style.alignItems = 'center';
        el.style.fontSize = '14px';
        el.style.cursor = 'pointer';
        el.style.boxShadow = isLearned ? '0 0 10px rgba(212, 175, 55, 0.5)' : 'none';
        
        el.innerText = node.icon;
        el.onclick = () => selectTalentNode(node, canLearn, isLearned);

        nodesContainer.appendChild(el);
    });
}

function selectTalentNode(node, canLearn, isLearned) {
    const info = document.getElementById('talent-info');
    let btnHtml = '';
    
    if (isLearned) {
        btnHtml = `<button disabled style="background: #333; color: var(--accent-yellow); border: 1px solid var(--accent-yellow); padding: 5px; font-size: 6px; border-radius: 3px;">ИЗУЧЕНО</button>`;
    } else if (canLearn) {
        if (talentPoints >= node.cost) {
            btnHtml = `<button onclick="learnTalent('${node.id}')" class="btn-action" style="padding: 5px; font-size: 6px; width: 100%;">ИЗУЧИТЬ (${node.cost} очков)</button>`;
        } else {
            btnHtml = `<button disabled style="background: #8b0000; color: white; border: none; padding: 5px; font-size: 6px; border-radius: 3px;">НУЖНО ${node.cost} ОЧКОВ</button>`;
        }
    } else {
        btnHtml = `<div style="font-size: 6px; color: #888;">Сначала изучите предыдущий узел</div>`;
    }

    info.innerHTML = `
        <div style="color: var(--accent-yellow); font-size: 8px; margin-bottom: 3px;">${node.icon} ${node.name}</div>
        <div style="color: #ccc; font-size: 6px; margin-bottom: 6px;">${node.desc}</div>
        ${btnHtml}
    `;
    SoundManager.playEffect('click');
}

function learnTalent(nodeId) {
    const node = talentTree.find(n => n.id === nodeId);
    if (!node || talentPoints < node.cost) return;

    talentPoints -= node.cost;
    learnedTalents.push(nodeId);

    saveGame();
    recalcStats();
    renderTalentTree();
    document.getElementById('talent-points-display').innerText = talentPoints;
    selectTalentNode(node, false, true); 
    SoundManager.playEffect('levelup');
}


function hideItemDetails() {
    document.getElementById('item-details').classList.remove('show');
}

        function showItemDetails(index) {
            const itemData = playerInventory[index];
            const baseItem = itemsDatabase[itemData.id];
            const totalBonus = baseItem.baseBonus * statMultipliers[itemData.rarity];
            const rColor = rarityColors[itemData.rarity];
            document.getElementById('detail-image').innerHTML = `<span style="font-size: 10px; color: ${rColor};">${baseItem.img}</span>`;
            document.getElementById('detail-name').innerHTML = `<span style="color: ${rColor};">${rarities[itemData.rarity]} ${baseItem.name}</span>`;
            document.getElementById('detail-stats').innerText = `Слот: ${baseItem.type} | +${totalBonus} ${baseItem.stat}`;
            const btnEquip = document.getElementById('btn-equip');
            btnEquip.innerText = "НАДЕТЬ";
            btnEquip.onclick = () => equipItem(index);
    const btnMerge = document.getElementById('btn-merge');
    const count = itemData.count || 1;
    
    if (itemData.rarity < 4) {
        btnMerge.style.display = 'block';
        btnMerge.innerText = `СЛИТЬ (${count}/3)`;
        btnMerge.disabled = count < 3;
        btnMerge.style.background = count >= 3 ? "#0070dd" : "#333";
        btnMerge.onclick = () => mergeItem(index);
    } else {
        btnMerge.style.display = 'none';
    }
    document.getElementById('item-details').classList.add('show');
} 

function showChestDetails(index) {
    const item = playerInventory[index];
    if (item.type !== 'chest') return;
    const chest = chestTypes[item.chestRarity];
    document.getElementById('detail-image').innerHTML = `<span style="font-size: 30px;">${chest.img}</span>`;
    document.getElementById('detail-name').innerHTML = `<span style="color: ${chest.color};">${chest.name} сундук</span>`;
    document.getElementById('detail-stats').innerText = `Откройте, чтобы получить 3-6 предметов!`;
    const btnEquip = document.getElementById('btn-equip');
    btnEquip.innerText = "ОТКРЫТЬ";
    btnEquip.onclick = () => openChest(index);
    const btnMerge = document.getElementById('btn-merge');
    btnMerge.style.display = 'none';
    document.getElementById('item-details').classList.add('show');
    let detailImgHtml = chest.img.includes('.') 
    ? `<img src="images/${chest.img}" style="width: 60px; height: 60px; object-fit: contain;">` 
    : `<span style="font-size: 30px;">${chest.img}</span>`;
document.getElementById('detail-image').innerHTML = detailImgHtml;
}

function openChest(invIndex) {
    const chestItem = playerInventory[invIndex];
    if (!chestItem || chestItem.type !== 'chest') return;
    const chestRarity = chestItem.chestRarity;

    removeItemFromInventory(invIndex, 1);
    saveGame();

    let itemCount = Math.floor(Math.random() * 4) + 3;
    itemCount += chestRarity;

    const newItems = [];
    for (let i = 0; i < itemCount; i++) {
        const itemIds = Object.keys(itemsDatabase);
        const randomId = itemIds[Math.floor(Math.random() * itemIds.length)];
        
        let itemRarity;
        const luck = getLuckBonus() / 100;
        let baseChanceCommon = Math.max(0.1, Math.min(0.8, 0.5 - luck - (chestRarity * 0.1)));
        let baseChanceRare = Math.max(0.1, Math.min(0.5, 0.3 - luck + (chestRarity * 0.05)));
        let baseChanceEpic = Math.max(0.05, Math.min(0.3, 0.15 - luck + (chestRarity * 0.03)));
        let baseChanceLegendary = Math.max(0.01, Math.min(0.2, 0.05 - luck + (chestRarity * 0.02)));
        
        const total = baseChanceCommon + baseChanceRare + baseChanceEpic + baseChanceLegendary;
        const r = Math.random() * total;
        
        if (r < baseChanceCommon) itemRarity = 0;
        else if (r < baseChanceCommon + baseChanceRare) itemRarity = 1;
        else if (r < baseChanceCommon + baseChanceRare + baseChanceEpic) itemRarity = 2;
        else if (r < baseChanceCommon + baseChanceRare + baseChanceEpic + baseChanceLegendary) itemRarity = 3;
        else itemRarity = 4;
        
        newItems.push({ id: randomId, rarity: itemRarity });
    }

    for (let item of newItems) {
        addItemToInventory(item);
    }
    saveGame();

    closeInventory();
    showChestAnimation(chestRarity, newItems);
}

                function showChestAnimation(chestRarity, items) {
    const modal = document.getElementById('modal-chest');
    const animationDiv = document.getElementById('chest-animation');
    animationDiv.innerHTML = '';

    items.forEach((item, idx) => {
        const baseItem = itemsDatabase[item.id];
        const rarityColor = rarityColors[item.rarity];
        const rarityName = rarities[item.rarity];
        const div = document.createElement('div');
        div.className = 'chest-item';
        div.style.animationDelay = `${idx * 0.1}s`;
        div.innerHTML = `
            <div style="font-size: 30px;">${baseItem.img}</div>
            <div style="font-size: 8px; color: ${rarityColor};">${rarityName}</div>
            <div style="font-size: 7px;">${baseItem.name}</div>
            <div style="font-size: 6px;">+${baseItem.baseBonus * statMultipliers[item.rarity]} ${baseItem.stat}</div>
        `;
        animationDiv.appendChild(div);
    });

    modal.style.display = 'flex';
}

function closeChestModal() {
    document.getElementById('modal-chest').style.display = 'none';
    openInventory(); 
}
                
        function equipItem(invIndex) {
    const itemData = playerInventory[invIndex];
    const baseItem = itemsDatabase[itemData.id];
    
    if (equippedItems[baseItem.slotId]) {
        addItemToInventory(equippedItems[baseItem.slotId]);
    }
    
    equippedItems[baseItem.slotId] = { id: itemData.id, rarity: itemData.rarity };
    
    removeItemFromInventory(invIndex, 1);
    
    localStorage.setItem('rpg_inv_v2', JSON.stringify(playerInventory));
    localStorage.setItem('rpg_equipped_v2', JSON.stringify(equippedItems));
    recalcStats();
    hideItemDetails();
    openInventory();
    renderEquipment();
}

function unequipItem(slotId) {

    addItemToInventory(equippedItems[slotId]);
    delete equippedItems[slotId];
    
    localStorage.setItem('rpg_inv_v2', JSON.stringify(playerInventory));
    localStorage.setItem('rpg_equipped_v2', JSON.stringify(equippedItems));
    recalcStats();
    hideItemDetails();
    openInventory();
    renderEquipment();
}

        function renderEquipment() {
    const slotMap = {
        "slot-head": "Голова",
        "slot-amulet": "Амулет",
        "slot-amulet-2": "Амулет",
        "slot-cape": "Плащ",
        "slot-shoulders": "Наплечники",
        "slot-right-hand": "Правая рука",
        "slot-bracelet-right": "Браслет",
        "slot-ring-1": "Кольцо",
        "slot-gloves": "Перчатки",
        "slot-armor": "Нагрудник",
        "slot-left-hand": "Левая рука",
        "slot-bracer": "Наручи",
        "slot-bracelet-left": "Браслет",
        "slot-ring-2": "Кольцо",
        "slot-belt": "Пояс",
        "slot-legs": "Штаны",
        "slot-knees": "Наколенники",
        "slot-shoes": "Обувь"
    };

    for (let slotId in slotMap) {
        const slotHtml = document.getElementById(slotId);
        if (slotHtml) {
            slotHtml.style.borderColor = "var(--border-gray)";
            slotHtml.innerHTML = `<div class="slot-name">${slotMap[slotId]}</div>`;
            slotHtml.onclick = null;
        }
    }

    for (let slotId in equippedItems) {
        const itemData = equippedItems[slotId];
        const baseItem = itemsDatabase[itemData.id];
        const slotHtml = document.getElementById(slotId);
        if (slotHtml && baseItem) {
            slotHtml.className = 'slot'; 
            if (itemData.rarity === 3) slotHtml.classList.add('glow-3');
            if (itemData.rarity === 4) slotHtml.classList.add('glow-4');
            slotHtml.style.borderColor = rarityColors[itemData.rarity];
            slotHtml.innerHTML = `<span style="font-size: 5px; color: ${rarityColors[itemData.rarity]}">${baseItem.img}</span><div class="slot-name">${baseItem.type}</div>`;
            slotHtml.onclick = () => showEquippedItemDetails(slotId);
        }
    }
}

       function mergeItem(invIndex) {
    const itemData = playerInventory[invIndex];
    if ((itemData.count || 1) >= 3) {
        removeItemFromInventory(invIndex, 3); 
        addItemToInventory({ id: itemData.id, rarity: itemData.rarity + 1 }); 
        saveGame();
        hideItemDetails();
        openInventory(); 
        tg.showPopup({ title: 'Успех', message: '⚔️ УСПЕШНОЕ СЛИЯНИЕ! Предмет улучшен.', buttons: [{ type: 'ok' }] });
    }
}

        function showEquippedItemDetails(slotId) {
            const itemData = equippedItems[slotId];
            if (!itemData) return;
            const baseItem = itemsDatabase[itemData.id];
            const totalBonus = baseItem.baseBonus * statMultipliers[itemData.rarity];
            const rColor = rarityColors[itemData.rarity];
            document.getElementById('detail-image').innerHTML = `<span style="font-size: 10px; color: ${rColor};">${baseItem.img}</span>`;
            document.getElementById('detail-name').innerHTML = `<span style="color: ${rColor};">${rarities[itemData.rarity]} ${baseItem.name}</span>`;
            document.getElementById('detail-stats').innerText = `Слот: ${baseItem.type} | +${totalBonus} ${baseItem.stat}`;
            const btnEquip = document.getElementById('btn-equip');
            btnEquip.innerText = "СНЯТЬ";
            btnEquip.onclick = () => unequipItem(slotId);
            document.getElementById('btn-merge').style.display = 'none';
            document.getElementById('modal-inventory').style.display = 'flex';
            document.getElementById('item-details').classList.add('show');
        }

        function unequipItem(slotId) {
            if (playerInventory.length >= 20) {
                alert("Рюкзак полон! Продай вещи.");
                return;
            }
            playerInventory.push(equippedItems[slotId]);
            delete equippedItems[slotId];
            localStorage.setItem('rpg_inv_v2', JSON.stringify(playerInventory));
            localStorage.setItem('rpg_equipped_v2', JSON.stringify(equippedItems));
            recalcStats();
            hideItemDetails();
            openInventory();
            renderEquipment();
        }

        function openShop() {
            document.getElementById('modal-shop').style.display = 'flex';
            renderShop();
        }

        function closeShop() {
            document.getElementById('modal-shop').style.display = 'none';
        }

        function renderShop() {
            const container = document.getElementById('shop-items');
            container.innerHTML = '';
            shopItems.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'inv-slot';
                div.style.flexDirection = 'column';
                div.style.fontSize = '10px';
                if (item.type === 'item') {
                    const base = itemsDatabase[item.id];
                    div.innerHTML = `${base.img}<br><span style="font-size:6px;">${item.price}💰</span>`;
                } else {
                    div.innerHTML = `📦<br><span style="font-size:6px;">${item.price}💰</span>`;
                }
                div.onclick = (e) => buyItem(index, e.currentTarget);
                container.appendChild(div);
            });
        }

function buyItem(index, element) { // Обрати внимание: добавлен аргумент element
    const item = shopItems[index];
    const shopMsg = document.getElementById('shop-message');

    if (playerGold < item.price) {
        if (shopMsg) shopMsg.innerText = '❌ Недостаточно золота!';
        if (element) {
            element.classList.add('shake'); // Эффект тряски при нехватке денег
            setTimeout(() => element.classList.remove('shake'), 300);
        }
        return;
    }

    playerGold -= item.price;

    if (element) {
        showFloatingText(element, `-${item.price} 💰`, 'red'); // Всплывающий текст цены
        element.style.transform = 'scale(0.9)'; // Эффект нажатия (уменьшение)
        setTimeout(() => element.style.transform = 'scale(1)', 100); // Возврат размера
    }

    if (item.type === 'item') {
        addItemToInventory({ id: item.id, rarity: 1 });
        if (shopMsg) shopMsg.innerText = `✅ Куплен ${item.name}!`;
    } 
    else if (item.type === 'chest') {
        let chestRarity = 0;
        let random = Math.random();
        let cumulative = 0;
        for (let i = 0; i < chestTypes.length; i++) {
            cumulative += chestTypes[i].dropChance;
            if (random < cumulative) { chestRarity = chestTypes[i].rarity; break; }
        }
        
        addItemToInventory({ type: 'chest', chestRarity: chestRarity });
        if (shopMsg) shopMsg.innerText = `📦 Сундук добавлен в инвентарь!`;
    }

    saveGame();
    updateUI(); 
    SoundManager.playEffect('buy');
    setTimeout(() => { if (shopMsg) shopMsg.innerText = ''; }, 3000);
}

            function resetProgress() {
                if (confirm('Вы уверены? Весь прогресс (уровень, золото, предметы, таланты, метрики) будет удалён без возможности восстановления.')) {
                    const sfx = SoundManager.getSfxEnabled();
                    const music = SoundManager.getMusicEnabled();
                    localStorage.clear();
                    SoundManager.setSfxEnabled(sfx);
                    SoundManager.setMusicEnabled(music);
                    location.reload();
                }
            }

        try {
            loadGame();     
            updateUI();      
            renderQuests();  
            recalcStats();   
            renderEquipment();
            SoundManager.loadSettings();
            updateSfxButton();
            updateMusicButton();
            
            document.body.addEventListener('click', function once() {
                SoundManager.init();
                document.body.removeEventListener('click', once);
            });
            
            console.log("Игра успешно инициализирована");
        } catch (e) {
            console.error("Ошибка при запуске игры:", e);
        }

    document.body.insertAdjacentHTML('beforeend', `
        <div id="modal-achievements" class="modal-overlay">
            <div class="modal-content">
                <button class="close-btn" onclick="closeAchievements()">✖</button>
                <h2>🏆 ДОСТИЖЕНИЯ</h2>
                <div id="achievements-list" style="display: flex; flex-direction: column; gap: 8px;"></div>
            </div>
        </div>
    `);

    function getMetricValue(metric) {
        switch(metric) {
            case 'pushups': return totalPushups;
            case 'pullups': return totalPullups;
            case 'squats': return totalSquats;
            case 'runKm': return totalRunKm;
            case 'runMins': return totalRunMins;
            case 'quests': return totalCompletedQuests;
            case 'plank': return totalPlank;
            case 'abs': return totalAbs;
            default: return 0;
        }
    }

    function openAchievements() {
        const container = document.getElementById('achievements-list');
        container.innerHTML = '';
        
        achievementsData.forEach(ach => {
            const current = getMetricValue(ach.metric);
            const isClaimed = claimedAchievements.includes(ach.id);
            const isCompleted = current >= ach.target;
            
            let btnHtml = '';
            if (isClaimed) {
                btnHtml = `<button disabled style="background: #333; color: #777; border: none; padding: 5px; font-size: 6px; border-radius: 3px;">ПОЛУЧЕНО</button>`;
            } else if (isCompleted) {
                btnHtml = `<button onclick="claimAchievement('${ach.id}', ${ach.rewardXp}, ${ach.rewardGold})" class="btn-action" style="padding: 5px; font-size: 6px; background: #d4af37; color: black;">ЗАБРАТЬ</button>`;
            } else {
                btnHtml = `<div style="font-size: 6px; color: #aaa;">${current}/${ach.target}</div>`;
            }

            container.innerHTML += `
                <div style="background: #111; border: 1px solid ${isClaimed ? '#1b5e20' : '#333'}; padding: 8px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="width: 70%;">
                        <div style="color: var(--accent-yellow); font-size: 7px; margin-bottom: 3px;">${ach.title}</div>
                        <div style="font-size: 5px; color: #ccc;">${ach.desc}</div>
                        <div style="font-size: 5px; color: #888; margin-top: 3px;">Награда: ${ach.rewardGold}💰 | ${ach.rewardXp} XP</div>
                    </div>
                    <div>${btnHtml}</div>
                </div>
            `;
        });
        document.getElementById('modal-achievements').style.display = 'flex';
    }

    function claimAchievement(id, xp, gold) {
        claimedAchievements.push(id);
        playerGold += gold;
        playerXp += xp;
        
        while (playerXp >= maxXp) {
            playerLevel++;
            playerXp -= maxXp;
            talentPoints++;
        }
        
        saveGame();
        saveStats();
        updateUI();
        openAchievements(); 
        SoundManager.playEffect('victory');
    }

    function closeAchievements() {
        document.getElementById('modal-achievements').style.display = 'none';
    }

window.openInventory = openInventory;
window.closeInventory = closeInventory;
window.openShop = openShop;
window.closeShop = closeShop;
window.openTalents = openTalents;
window.closeTalents = closeTalents;
window.openBattle = openBattle;
window.closeBattle = closeBattle;
window.openAchievements = openAchievements;
window.closeAchievements = closeAchievements;
window.openMetrics = openMetrics;
window.closeMetrics = closeMetrics;
window.openSettings = openSettings;
window.closeSettings = closeSettings;
window.hideItemDetails = hideItemDetails;
window.closeChestModal = closeChestModal;
window.completeQuest = completeQuest;
window.restoreHp = restoreHp;
window.saveMetrics = saveMetrics;
window.toggleSfx = toggleSfx;
window.toggleMusic = toggleMusic;
window.resetProgress = resetProgress;
window.claimAchievement = claimAchievement;
window.learnTalent = learnTalent;
