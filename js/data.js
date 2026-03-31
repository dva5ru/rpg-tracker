// js/data.js

export const questsDatabase = [
    // Ежедневные
    { id: "d1", type: "daily", title: "Шаги (10к)", xp: 10, gold: 2, stat: "Выносливость", metricKey: null},
    { id: "d2", type: "daily", title: "Вода", xp: 5, gold: 1, stat: "Выносливость" },
    { id: "d3", type: "daily", title: "Питание", xp: 10, gold: 2, stat: "Сила духа" },
    { id: "d4", type: "daily", title: "Дефицит", xp: 15, gold: 3, stat: "Концентрация" },
    { id: "d5", type: "daily", title: "Белок", xp: 10, gold: 2, stat: "Сила" },
    { id: "d6", type: "daily", title: "Витамины", xp: 5, gold: 1, stat: "Выносливость" },
    { id: "d7", type: "daily", title: "Чтение", xp: 10, gold: 2, stat: "Интеллект" },
    { id: "d8", type: "daily", title: "Зубы", xp: 5, gold: 1, stat: "Гибкость" },
    { id: "d9", type: "daily", title: "Умывание", xp: 5, gold: 1, stat: "Креативность" },
    { id: "d10", type: "daily", title: "Душ", xp: 10, gold: 2, stat: "Сила духа" },
    { id: "d11", type: "daily", title: "Отжимания (50х)", xp: 15, gold: 3, stat: "Сила" },
    { id: "d12", type: "daily", title: "Пресс (100х)", xp: 15, gold: 3, stat: "Сила" },
    { id: "d13", type: "daily", title: "Планка (2 мин)", xp: 10, gold: 2, stat: "Сила духа" },
    { id: "d14", type: "daily", title: "Сон (8ч)", xp: 15, gold: 3, stat: "Концентрация" },
    { id: "d15", type: "daily", title: "Растяжка (5 мин)", xp: 10, gold: 2, stat: "Гибкость" },
    { id: "d16", type: "daily", title: "Медитация", xp: 10, gold: 2, stat: "Сила духа" },      
    // Еженедельные
    { id: "w1", type: "weekly", title: "Взвешивание", xp: 20, gold: 5, stat: "Концентрация" },
    { id: "w2", type: "weekly", title: "Волейбол", xp: 50, gold: 15, stat: "Ловкость" },
    { id: "w3", type: "weekly", title: "Силовая тренировка", xp: 60, gold: 20, stat: "Сила" },
    { id: "w4", type: "weekly", title: "Бассейн", xp: 40, gold: 10, stat: "Выносливость" },
    { id: "w5", type: "weekly", title: "Скакалка (15 мин)", xp: 30, gold: 10, stat: "Ловкость" },
    { id: "w6", type: "weekly", title: "Бег (1 км)", xp: 40, gold: 15, stat: "Выносливость" },         
    // Ежемесячные
    { id: "m1", type: "monthly", title: "Бег (5 км)", xp: 100, gold: 30, stat: "Выносливость" },
    { id: "m2", type: "monthly", title: "Замеры", xp: 50, gold: 15, stat: "Концентрация" },
    { id: "m3", type: "monthly", title: "Прыжок", xp: 80, gold: 25, stat: "Ловкость" },
];

export const itemsDatabase = {
  "sword": { name: "Меч", type: "Правая рука", slotId: "slot-right-hand", stat: "Сила", baseBonus: 1, img: "⚔️" },
  "shoes": { name: "Ботинки", type: "Обувь", slotId: "slot-shoes", stat: "Выносливость", baseBonus: 2, img: "👟" }
};

export const slots = [
  { id: "slot-head", type: "Шлем" }, { id: "slot-amulet", type: "Амулет" }, { id: "slot-amulet-2", type: "Амулет" },
  { id: "slot-cape", type: "Плащ" }, { id: "slot-shoulders", type: "Наплечники" }, { id: "slot-right-hand", type: "Правая рука" },
  { id: "slot-bracelet-right", type: "Браслет" }, { id: "slot-ring-1", type: "Кольцо" }, { id: "slot-gloves", type: "Перчатки" },
  { id: "slot-armor", type: "Нагрудник" }, { id: "slot-left-hand", type: "Левая рука" }, { id: "slot-bracer", type: "Наручи" },
  { id: "slot-bracelet-left", type: "Браслет" }, { id: "slot-ring-2", type: "Кольцо" }, { id: "slot-belt", type: "Пояс" },
  { id: "slot-legs", type: "Штаны" }, { id: "slot-knees", type: "Наколенники" }, { id: "slot-shoes", type: "Обувь" }
];

export const stats = [
  { name: "Сила", img: "💪" }, { name: "Ловкость", img: "🏹" }, { name: "Интеллект", img: "📚" },
  { name: "Выносливость", img: "🛡️" }, { name: "Дух", img: "✨" }
];

export const nameVariants = {
  "Шлем": ["Шлем воина", "Колдовская корона", "Капюшон теней", "Стальной шлем", "Кожаный капюшон"],
  "Амулет": ["Амулет силы", "Оберег мудрости", "Кулон ловкости", "Талисман стойкости", "Амулет духов"],
  "Плащ": ["Плащ неуловимости", "Мантия мага", "Накидка охотника", "Плащ стража", "Плащ теней"],
  "Наплечники": ["Наплечники ярости", "Эполеты мудреца", "Наплечники ловкача", "Стальные наплечники", "Кожаные наплечники"],
  "Правая рука": ["Двуручный меч", "Посох магии", "Кинжал теней", "Боевой топор", "Булава правосудия"],
  "Браслет": ["Браслет силы", "Браслет ловкости", "Браслет интеллекта", "Браслет выносливости", "Браслет духа"],
  "Кольцо": ["Кольцо воина", "Кольцо мага", "Кольцо разбойника", "Кольцо защитника", "Кольцо судьбы"],
  "Перчатки": ["Рукавицы мощи", "Перчатки проворства", "Перчатки заклинателя", "Латные перчатки", "Кожаные перчатки"],
  "Нагрудник": ["Кираса титана", "Роба архимага", "Кожаный доспех", "Латы защитника", "Доспех скитальца"],
  "Левая рука": ["Щит стража", "Кинжал левой руки", "Гримуар заклинаний", "Факел света", "Эгида защиты"],
  "Наручи": ["Наручи мощи", "Наручи ловкости", "Наручи интеллекта", "Наручи выносливости", "Наручи духа"],
  "Пояс": ["Пояс силы", "Пояс ловкости", "Пояс интеллекта", "Пояс выносливости", "Пояс духа"],
  "Штаны": ["Поножи титана", "Штаны мага", "Кожаные штаны", "Латные поножи", "Штаны следопыта"],
  "Наколенники": ["Наколенники стража", "Наколенники проворства", "Наколенники мудрости", "Стальные наколенники", "Кожаные наколенники"],
  "Обувь": ["Сапоги скорости", "Ботинки мага", "Кожаные сапоги", "Латные сапоги", "Сапоги следопыта"]
};

export const chestTypes = [
    { name: "Деревянный", rarity: 0, dropChance: 0.5, img: "wooden_chest.png", color: "#8B5A2B" },
    { name: "Бронзовый", rarity: 1, dropChance: 0.3, img: "🥉", color: "#CD7F32" },
    { name: "Серебряный", rarity: 2, dropChance: 0.15, img: "🥈", color: "#C0C0C0" },
    { name: "Золотой", rarity: 3, dropChance: 0.04, img: "🥇", color: "#FFD700" },
    { name: "Алмазный", rarity: 4, dropChance: 0.01, img: "💎", color: "#B9F2FF" }
];

export const rarities = ["Сломанный", "Обычный", "Редкий", "Эпический", "Легендарный"]; 
export const rarityColors = ["#777777", "#ffffff", "#0070dd", "#a335ee", "#ff8000"]; 
export const statMultipliers = [1, 2, 4, 8, 15]; 

export const achievementsData = [
    { id: "a1", title: "Новичок отжиманий", desc: "Сделать 50 отжиманий", metric: "pushups", target: 50, rewardXp: 100, rewardGold: 50 },
    { id: "a2", title: "Машина", desc: "Сделать 1000 отжиманий", metric: "pushups", target: 1000, rewardXp: 500, rewardGold: 300 },
    { id: "a3", title: "Легкоатлет", desc: "Пробежать 10 км суммарно", metric: "runKm", target: 10, rewardXp: 150, rewardGold: 80 },
    { id: "a4", title: "Марафонец", desc: "Пробежать 42 км суммарно", metric: "runKm", target: 42, rewardXp: 1000, rewardGold: 500 },
    { id: "a5", title: "Стальные ноги", desc: "Сделать 200 приседаний", metric: "squats", target: 200, rewardXp: 200, rewardGold: 100 },
    { id: "a6", title: "Дисциплина", desc: "Выполнить 50 квестов", metric: "quests", target: 50, rewardXp: 300, rewardGold: 150 }
];
    
export const shopItems = [
  { name: "Сундук", price: 200, type: "chest" }
];

for (let [id, item] of Object.entries(itemsDatabase)) {
  if (id === "sword" || id === "shoes") continue;
  const price = 80 + item.baseBonus * 20;
  shopItems.push({ id: id, name: item.name, price: price, type: "item" });
}

export const talentTree = [
    { id: 'start', name: 'Начало пути', desc: '+1 ко всем статам', x: 185, y: 185, cost: 1, req: [], effectType: 'all_stats', value: 1, icon: '🌟' },
    { id: 'str_1', name: 'Мощь I', desc: '+2 Силы', x: 185, y: 120, cost: 1, req: ['start'], effectType: 'stat', stat: 'Сила', value: 2, icon: '💪' },
    { id: 'str_2', name: 'Мощь II', desc: '+4 Силы', x: 185, y: 55, cost: 2, req: ['str_1'], effectType: 'stat', stat: 'Сила', value: 4, icon: '💥' },
    { id: 'dex_1', name: 'Рефлексы I', desc: '+2 Ловкости', x: 250, y: 185, cost: 1, req: ['start'], effectType: 'stat', stat: 'Ловкость', value: 2, icon: '🏃' },
    { id: 'dex_2', name: 'Рефлексы II', desc: '+4 Ловкости', x: 315, y: 185, cost: 2, req: ['dex_1'], effectType: 'stat', stat: 'Ловкость', value: 4, icon: '⚡' },
    { id: 'end_1', name: 'Стойкость I', desc: '+2 Выносливости', x: 185, y: 250, cost: 1, req: ['start'], effectType: 'stat', stat: 'Выносливость', value: 2, icon: '🛡️' },
    { id: 'end_2', name: 'Стойкость II', desc: '+4 Выносливости', x: 185, y: 315, cost: 2, req: ['end_1'], effectType: 'stat', stat: 'Выносливость', value: 4, icon: '⛰️' },
    { id: 'util_1', name: 'Мудрость', desc: '+5% к Опыту', x: 120, y: 185, cost: 1, req: ['start'], effectType: 'xp_mult', value: 5, icon: '🧠' },
    { id: 'util_2', name: 'Алчность', desc: '+10% к Золоту', x: 55, y: 185, cost: 2, req: ['util_1'], effectType: 'gold_mult', value: 10, icon: '💰' },
    { id: 'luck_1', name: 'Удача', desc: '+5% к шансу редких вещей', x: 120, y: 120, cost: 2, req: ['str_1', 'util_1'], effectType: 'luck', value: 5, icon: '🍀' }
];

export const mobs = [
    { id: 1, name: "🐞 Жук-трупоед", basePower: 8, weakness: "Ловкость", expReward: 15, goldReward: 5 },
    { id: 2, name: "🍄 Гриб-поганка", basePower: 12, weakness: "Интеллект", expReward: 25, goldReward: 8 },
    { id: 3, name: "🐺 Лесной волк", basePower: 18, weakness: "Сила", expReward: 35, goldReward: 12 },
    { id: 4, name: "🦇 Пещерный вампир", basePower: 25, weakness: "Сила духа", expReward: 50, goldReward: 18 },
    { id: 5, name: "🧙 Темный маг", basePower: 32, weakness: "Концентрация", expReward: 70, goldReward: 25 }
];
    
export const bosses = [
    { id: 101, name: "👑 Король гоблинов", basePower: 45, weakness: "Гибкость", expReward: 150, goldReward: 50 },
    { id: 102, name: "🐉 Огненный дракон", basePower: 70, weakness: "Креативность", expReward: 300, goldReward: 100 }
];
