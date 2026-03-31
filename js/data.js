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
    // --- ГОЛОВА ---
    "head_1": { name: "Бандана новичка", type: "Голова", slotId: "slot-head", stat: "Ловкость", baseBonus: 1, img: "head_1.png" },
    "head_2": { name: "Железный шлем", type: "Голова", slotId: "slot-head", stat: "Выносливость", baseBonus: 2, img: "head_2.png" },
    "head_3": { name: "Капюшон тени", type: "Голова", slotId: "slot-head", stat: "Концентрация", baseBonus: 3, img: "head_3.png" },
    "head_4": { name: "Шляпа архимага", type: "Голова", slotId: "slot-head", stat: "Интеллект", baseBonus: 4, img: "head_4.png" },
    "head_5": { name: "Корона владыки", type: "Голова", slotId: "slot-head", stat: "Сила духа", baseBonus: 5, img: "head_5.png" },

    // --- АМУЛЕТ 1 ---
    "am1_1": { name: "Медный кулон", type: "Амулет", slotId: "slot-amulet", stat: "Выносливость", baseBonus: 1, img: "am1_1.png" },
    "am1_2": { name: "Клык волка", type: "Амулет", slotId: "slot-amulet", stat: "Сила", baseBonus: 2, img: "am1_2.png" },
    "am1_3": { name: "Глаз ворона", type: "Амулет", slotId: "slot-amulet", stat: "Концентрация", baseBonus: 3, img: "am1_3.png" },
    "am1_4": { name: "Камень душ", type: "Амулет", slotId: "slot-amulet", stat: "Интеллект", baseBonus: 4, img: "am1_4.png" },
    "am1_5": { name: "Звезда небес", type: "Амулет", slotId: "slot-amulet", stat: "Сила духа", baseBonus: 5, img: "am1_5.png" },

    // --- АМУЛЕТ 2 ---
    "am2_1": { name: "Счастливая монетка", type: "Амулет", slotId: "slot-amulet-2", stat: "Креативность", baseBonus: 1, img: "am2_1.png" },
    "am2_2": { name: "Резной оберег", type: "Амулет", slotId: "slot-amulet-2", stat: "Гибкость", baseBonus: 2, img: "am2_2.png" },
    "am2_3": { name: "Кулон времени", type: "Амулет", slotId: "slot-amulet-2", stat: "Ловкость", baseBonus: 3, img: "am2_3.png" },
    "am2_4": { name: "Сердце голема", type: "Амулет", slotId: "slot-amulet-2", stat: "Выносливость", baseBonus: 4, img: "am2_4.png" },
    "am2_5": { name: "Осколок метеорита", type: "Амулет", slotId: "slot-amulet-2", stat: "Сила", baseBonus: 5, img: "am2_5.png" },

    // --- ПЛАЩ ---
    "cape_1": { name: "Рваная накидка", type: "Плащ", slotId: "slot-cape", stat: "Ловкость", baseBonus: 1, img: "cape_1.png" },
    "cape_2": { name: "Дорожный плащ", type: "Плащ", slotId: "slot-cape", stat: "Выносливость", baseBonus: 2, img: "cape_2.png" },
    "cape_3": { name: "Мантия скрытности", type: "Плащ", slotId: "slot-cape", stat: "Концентрация", baseBonus: 3, img: "cape_3.png" },
    "cape_4": { name: "Плащ крестоносца", type: "Плащ", slotId: "slot-cape", stat: "Сила духа", baseBonus: 4, img: "cape_4.png" },
    "cape_5": { name: "Крылья дракона", type: "Плащ", slotId: "slot-cape", stat: "Сила", baseBonus: 5, img: "cape_5.png" },

    // --- НАПЛЕЧНИКИ ---
    "shoulder_1": { name: "Тряпичные накладки", type: "Наплечники", slotId: "slot-shoulders", stat: "Гибкость", baseBonus: 1, img: "shoulder_1.png" },
    "shoulder_2": { name: "Кожаные наплечники", type: "Наплечники", slotId: "slot-shoulders", stat: "Ловкость", baseBonus: 2, img: "shoulder_2.png" },
    "shoulder_3": { name: "Стальные эполеты", type: "Наплечники", slotId: "slot-shoulders", stat: "Выносливость", baseBonus: 3, img: "shoulder_3.png" },
    "shoulder_4": { name: "Наплечники берсерка", type: "Наплечники", slotId: "slot-shoulders", stat: "Сила", baseBonus: 4, img: "shoulder_4.png" },
    "shoulder_5": { name: "Титановые стражи", type: "Наплечники", slotId: "slot-shoulders", stat: "Сила духа", baseBonus: 5, img: "shoulder_5.png" },

    // --- ПРАВАЯ РУКА (Оружие) ---
    "rhand_1": { name: "Деревянная дубина", type: "Оружие", slotId: "slot-right-hand", stat: "Сила", baseBonus: 1, img: "rhand_1.png" },
    "rhand_2": { name: "Ржавый меч", type: "Оружие", slotId: "slot-right-hand", stat: "Ловкость", baseBonus: 2, img: "rhand_2.png" },
    "rhand_3": { name: "Кинжал убийцы", type: "Оружие", slotId: "slot-right-hand", stat: "Креативность", baseBonus: 3, img: "rhand_3.png" },
    "rhand_4": { name: "Посох пироманта", type: "Оружие", slotId: "slot-right-hand", stat: "Интеллект", baseBonus: 4, img: "rhand_4.png" },
    "rhand_5": { name: "Экскалибур", type: "Оружие", slotId: "slot-right-hand", stat: "Сила духа", baseBonus: 5, img: "rhand_5.png" },

    // --- ЛЕВАЯ РУКА (Щит/Книга) ---
    "lhand_1": { name: "Крышка от бочки", type: "Щит", slotId: "slot-left-hand", stat: "Выносливость", baseBonus: 1, img: "lhand_1.png" },
    "lhand_2": { name: "Деревянный щит", type: "Щит", slotId: "slot-left-hand", stat: "Сила", baseBonus: 2, img: "lhand_2.png" },
    "lhand_3": { name: "Книга заклинаний", type: "Книга", slotId: "slot-left-hand", stat: "Интеллект", baseBonus: 3, img: "lhand_3.png" },
    "lhand_4": { name: "Башенный щит", type: "Щит", slotId: "slot-left-hand", stat: "Выносливость", baseBonus: 4, img: "lhand_4.png" },
    "lhand_5": { name: "Сфера вечности", type: "Сфера", slotId: "slot-left-hand", stat: "Концентрация", baseBonus: 5, img: "lhand_5.png" },

    // --- НАГРУДНИК ---
    "armor_1": { name: "Тканевая рубаха", type: "Броня", slotId: "slot-armor", stat: "Гибкость", baseBonus: 1, img: "armor_1.png" },
    "armor_2": { name: "Кожаная куртка", type: "Броня", slotId: "slot-armor", stat: "Ловкость", baseBonus: 2, img: "armor_2.png" },
    "armor_3": { name: "Кольчуга стражника", type: "Броня", slotId: "slot-armor", stat: "Выносливость", baseBonus: 3, img: "armor_3.png" },
    "armor_4": { name: "Латы паладина", type: "Броня", slotId: "slot-armor", stat: "Сила духа", baseBonus: 4, img: "armor_4.png" },
    "armor_5": { name: "Доспех дракона", type: "Броня", slotId: "slot-armor", stat: "Сила", baseBonus: 5, img: "armor_5.png" },

    // --- ПЕРЧАТКИ ---
    "glove_1": { name: "Рабочие перчатки", type: "Перчатки", slotId: "slot-gloves", stat: "Сила", baseBonus: 1, img: "glove_1.png" },
    "glove_2": { name: "Перчатки вора", type: "Перчатки", slotId: "slot-gloves", stat: "Ловкость", baseBonus: 2, img: "glove_2.png" },
    "glove_3": { name: "Стальные рукавицы", type: "Перчатки", slotId: "slot-gloves", stat: "Выносливость", baseBonus: 3, img: "glove_3.png" },
    "glove_4": { name: "Перчатки заклинателя", type: "Перчатки", slotId: "slot-gloves", stat: "Интеллект", baseBonus: 4, img: "glove_4.png" },
    "glove_5": { name: "Рукавицы титана", type: "Перчатки", slotId: "slot-gloves", stat: "Сила духа", baseBonus: 5, img: "glove_5.png" },

    // --- НАРУЧИ ---
    "bracer_1": { name: "Веревочные обмотки", type: "Наручи", slotId: "slot-bracer", stat: "Гибкость", baseBonus: 1, img: "bracer_1.png" },
    "bracer_2": { name: "Кожаные повязки", type: "Наручи", slotId: "slot-bracer", stat: "Ловкость", baseBonus: 2, img: "bracer_2.png" },
    "bracer_3": { name: "Бронзовые наручи", type: "Наручи", slotId: "slot-bracer", stat: "Выносливость", baseBonus: 3, img: "bracer_3.png" },
    "bracer_4": { name: "Рунные наручи", type: "Наручи", slotId: "slot-bracer", stat: "Интеллект", baseBonus: 4, img: "bracer_4.png" },
    "bracer_5": { name: "Наручи гладиатора", type: "Наручи", slotId: "slot-bracer", stat: "Сила", baseBonus: 5, img: "bracer_5.png" },

    // --- БРАСЛЕТ (ПРАВЫЙ) ---
    "brace_r_1": { name: "Плетеный браслет", type: "Браслет", slotId: "slot-bracelet-right", stat: "Креативность", baseBonus: 1, img: "brace_r_1.png" },
    "brace_r_2": { name: "Медный браслет", type: "Браслет", slotId: "slot-bracelet-right", stat: "Выносливость", baseBonus: 2, img: "brace_r_2.png" },
    "brace_r_3": { name: "Браслет из клыков", type: "Браслет", slotId: "slot-bracelet-right", stat: "Сила", baseBonus: 3, img: "brace_r_3.png" },
    "brace_r_4": { name: "Огненный браслет", type: "Браслет", slotId: "slot-bracelet-right", stat: "Интеллект", baseBonus: 4, img: "brace_r_4.png" },
    "brace_r_5": { name: "Браслет чемпиона", type: "Браслет", slotId: "slot-bracelet-right", stat: "Сила духа", baseBonus: 5, img: "brace_r_5.png" },

    // --- БРАСЛЕТ (ЛЕВЫЙ) ---
    "brace_l_1": { name: "Браслет странника", type: "Браслет", slotId: "slot-bracelet-left", stat: "Гибкость", baseBonus: 1, img: "brace_l_1.png" },
    "brace_l_2": { name: "Серебряный браслет", type: "Браслет", slotId: "slot-bracelet-left", stat: "Концентрация", baseBonus: 2, img: "brace_l_2.png" },
    "brace_l_3": { name: "Браслет змеи", type: "Браслет", slotId: "slot-bracelet-left", stat: "Ловкость", baseBonus: 3, img: "brace_l_3.png" },
    "brace_l_4": { name: "Ледяной браслет", type: "Браслет", slotId: "slot-bracelet-left", stat: "Интеллект", baseBonus: 4, img: "brace_l_4.png" },
    "brace_l_5": { name: "Алмазный браслет", type: "Браслет", slotId: "slot-bracelet-left", stat: "Выносливость", baseBonus: 5, img: "brace_l_5.png" },

    // --- КОЛЬЦО 1 ---
    "ring1_1": { name: "Оловянное кольцо", type: "Кольцо", slotId: "slot-ring-1", stat: "Выносливость", baseBonus: 1, img: "ring1_1.png" },
    "ring1_2": { name: "Кольцо ученика", type: "Кольцо", slotId: "slot-ring-1", stat: "Интеллект", baseBonus: 2, img: "ring1_2.png" },
    "ring1_3": { name: "Кольцо лидерства", type: "Кольцо", slotId: "slot-ring-1", stat: "Сила духа", baseBonus: 3, img: "ring1_3.png" },
    "ring1_4": { name: "Кольцо Фонаря", type: "Кольцо", slotId: "slot-ring-1", stat: "Креативность", baseBonus: 4, img: "ring1_4.png" },
    "ring1_5": { name: "Кольцо Всевластия", type: "Кольцо", slotId: "slot-ring-1", stat: "Сила", baseBonus: 5, img: "ring1_5.png" },

    // --- КОЛЬЦО 2 ---
    "ring2_1": { name: "Медное кольцо", type: "Кольцо", slotId: "slot-ring-2", stat: "Выносливость", baseBonus: 1, img: "ring2_1.png" },
    "ring2_2": { name: "Кольцо с рубином", type: "Кольцо", slotId: "slot-ring-2", stat: "Сила", baseBonus: 2, img: "ring2_2.png" },
    "ring2_3": { name: "Кольцо с изумрудом", type: "Кольцо", slotId: "slot-ring-2", stat: "Ловкость", baseBonus: 3, img: "ring2_3.png" },
    "ring2_4": { name: "Кольцо теней", type: "Кольцо", slotId: "slot-ring-2", stat: "Концентрация", baseBonus: 4, img: "ring2_4.png" },
    "ring2_5": { name: "Кольцо вечности", type: "Кольцо", slotId: "slot-ring-2", stat: "Сила духа", baseBonus: 5, img: "ring2_5.png" },

    // --- ПОЯС ---
    "belt_1": { name: "Веревочный пояс", type: "Пояс", slotId: "slot-belt", stat: "Гибкость", baseBonus: 1, img: "belt_1.png" },
    "belt_2": { name: "Пояс охотника", type: "Пояс", slotId: "slot-belt", stat: "Ловкость", baseBonus: 2, img: "belt_2.png" },
    "belt_3": { name: "Тяжелый ремень", type: "Пояс", slotId: "slot-belt", stat: "Сила", baseBonus: 3, img: "belt_3.png" },
    "belt_4": { name: "Пояс мага", type: "Пояс", slotId: "slot-belt", stat: "Интеллект", baseBonus: 4, img: "belt_4.png" },
    "belt_5": { name: "Пояс чемпиона", type: "Пояс", slotId: "slot-belt", stat: "Выносливость", baseBonus: 5, img: "belt_5.png" },

    // --- ШТАНЫ ---
    "legs_1": { name: "Рваные штаны", type: "Штаны", slotId: "slot-legs", stat: "Гибкость", baseBonus: 1, img: "legs_1.png" },
    "legs_2": { name: "Кожаные поножи", type: "Штаны", slotId: "slot-legs", stat: "Ловкость", baseBonus: 2, img: "legs_2.png" },
    "legs_3": { name: "Штаны следопыта", type: "Штаны", slotId: "slot-legs", stat: "Концентрация", baseBonus: 3, img: "legs_3.png" },
    "legs_4": { name: "Латные поножи", type: "Штаны", slotId: "slot-legs", stat: "Выносливость", baseBonus: 4, img: "legs_4.png" },
    "legs_5": { name: "Поножи титана", type: "Штаны", slotId: "slot-legs", stat: "Сила", baseBonus: 5, img: "legs_5.png" },

    // --- НАКОЛЕННИКИ ---
    "knees_1": { name: "Тряпичные обмотки", type: "Наколенники", slotId: "slot-knees", stat: "Гибкость", baseBonus: 1, img: "knees_1.png" },
    "knees_2": { name: "Медные наколенники", type: "Наколенники", slotId: "slot-knees", stat: "Выносливость", baseBonus: 2, img: "knees_2.png" },
    "knees_3": { name: "Наколенники ловкача", type: "Наколенники", slotId: "slot-knees", stat: "Ловкость", baseBonus: 3, img: "knees_3.png" },
    "knees_4": { name: "Железные наколенники", type: "Наколенники", slotId: "slot-knees", stat: "Сила", baseBonus: 4, img: "knees_4.png" },
    "knees_5": { name: "Мифриловые стражи", type: "Наколенники", slotId: "slot-knees", stat: "Сила духа", baseBonus: 5, img: "knees_5.png" },

    // --- ОБУВЬ ---
    "shoes_1": { name: "Старые лапти", type: "Обувь", slotId: "slot-shoes", stat: "Гибкость", baseBonus: 1, img: "shoes_1.png" },
    "shoes_2": { name: "Башмаки скорости", type: "Обувь", slotId: "slot-shoes", stat: "Ловкость", baseBonus: 2, img: "shoes_2.png" },
    "shoes_3": { name: "Тяжелые ботинки", type: "Обувь", slotId: "slot-shoes", stat: "Сила", baseBonus: 3, img: "shoes_3.png" },
    "shoes_4": { name: "Сапоги-скороходы", type: "Обувь", slotId: "slot-shoes", stat: "Концентрация", baseBonus: 4, img: "shoes_4.png" },
    "shoes_5": { name: "Сапоги архимага", type: "Обувь", slotId: "slot-shoes", stat: "Интеллект", baseBonus: 5, img: "shoes_5.png" }
    "shoes_6": { name: "Дилдо", type: "Обувь", slotId: "slot-shoes", stat: "Интеллект", baseBonus: 5, img: "🍆" }
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
    { id: "rhand_1", type: "item", name: "Деревянная дубина", price: 50 },
    { id: "lhand_2", type: "item", name: "Деревянный щит", price: 50 },
    { id: "shoes_1", type: "item", name: "Старые лапти", price: 30 },
    { type: "chest", price: 200 }
    { id: "shoes_6", type: "item", name: "Дилдо", price: 30 }
    
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
