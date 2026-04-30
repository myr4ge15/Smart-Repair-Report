/**
 * База знаний компонентов
 * id: уникальный идентификатор для редактирования
 * category: используется для сортировки приоритетов
 * patterns: массив строк для поиска
 * phraseDone: фраза для отчета "Выполнено"
 */
const COMPONENT_DB = [
    // --- Модемы ---
    {
        id: 'modem_gen',
        category: 'MODEM',
        patterns: ['SIM7600', 'SIM800', 'GL865', 'GL868', 'SIM7000', 'L860'],
        phraseDone: 'Замена беспроводного модуля связи',
        priority: 1
    },
    // --- МК ---
    {
        id: 'mcu_gen',
        category: 'MCU',
        patterns: ['STM32L151', 'STM32F4', 'GD32F103', 'ATMEGA', 'STM32L4'],
        phraseDone: 'Замена микроконтроллера',
        priority: 2
    },
    // --- Питание (Микросхемы) ---
    {
        id: 'pwr_ic',
        category: 'POWER_IC',
        patterns: ['AP3012', 'TPS54260', 'MIC2875', 'TPS7A4501', 'LM217', 'TPS542'],
        phraseDone: 'замена микросхемы управления питанием',
        priority: 3
    },
    {
        id: 'pwr_board',
        category: 'POWER_MAIN',
        patterns: ['БП-11.1.W', 'TNY278', '0095.3.3'],
        phraseDone: 'Замена встроенного блока питания',
        priority: 3
    },
    // --- Варисторы / Защита ---
    {
        id: 'varistor',
        category: 'PROTECTION',
        patterns: ['B72207', 'Варистор', 'S14K', 'S10K'],
        phraseDone: 'ремонт встроенного блока питания', // Исправлено по запросу
        priority: 7
    },
    // --- Интерфейсы ---
    {
        id: 'rs485',
        category: 'INTERFACE',
        patterns: ['ST1480', 'ADM2587', 'TD541', 'MAX485', 'SN65HVD'],
        phraseDone: 'замена микросхемы интерфейса RS485',
        priority: 4
    },
    {
        id: 'eth',
        category: 'INTERFACE',
        patterns: ['LAN9730', 'DP83848', 'RTL8201'],
        phraseDone: 'замена Ethernet-контроллера',
        priority: 4
    },
    {
        id: 'buffer',
        category: 'BUFFER',
        patterns: ['74LVC07', 'SN74LVC', '74HC'],
        phraseDone: 'замена буферной микросхемы',
        priority: 4
    },
    // --- GPIO / Транзисторы ---
    {
        id: 'gpio',
        category: 'GPIO',
        patterns: ['2N7002', 'IRLML0060', 'SSM3J332R', 'CJ2310', 'PMV120', 'AO3400'],
        phraseDone: 'замена транзисторов цепей управления',
        priority: 5
    },
    // --- Разъемы ---
    {
        id: 'conn_usb',
        category: 'CONNECTOR',
        patterns: ['Mini USB', 'Micro USB', 'USB B'],
        phraseDone: 'замена разъема USB',
        priority: 6
    },
    {
        id: 'conn_sim',
        category: 'CONNECTOR',
        patterns: ['Molex 91228', 'SIM-014', 'держатель SIM'],
        phraseDone: 'замена держателя SIM-карты',
        priority: 6
    },
    // --- Батареи ---
    {
        id: 'batt_cr',
        category: 'BATTERY',
        patterns: ['CR2032', 'CR1220'],
        phraseDone: 'замена батареи RTC',
        priority: 6
    },
    {
        id: 'batt_er',
        category: 'BATTERY',
        patterns: ['ER18505', 'ER14505', 'FANSO 3.6V'],
        phraseDone: 'замена элемента питания',
        priority: 6
    }
];

// Приоритеты категорий для сортировки
const CATEGORY_PRIORITY = {
    'MODEM': 1,
    'MCU': 2,
    'POWER_MAIN': 3,
    'POWER_IC': 3,
    'INTERFACE': 4,
    'BUFFER': 4,
    'GPIO': 5,
    'CONNECTOR': 6,
    'BATTERY': 6,
    'PROTECTION': 7,
    'PASSIVE': 8
};