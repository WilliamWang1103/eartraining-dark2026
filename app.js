// 应用状态
const chordAppState = {
    currentMode: 'practice', // 'practice' | 'test' | 'leaderboard'
    currentExercise: 'chord',
    currentFunction: 'pitch', // 'pitch' 或 'quality'
    score: 0,
    correct: 0,
    wrong: 0,
    totalQuestions: 0,
    pitchCorrect: 0,
    qualityCorrect: 0,
    isPlaying: false,
    testInProgress: false,
    difficulty: 1,
    scaleDifficulty: 1,
    currentScale: 'C大调', // 当前调式调性
    scaleNotes: [], // 当前调式包含的音符
    inversion: '0',  // 默认只出原位和弦（0=原位，'all'=全部转位）
    selectedNotes: [], // 存储用户点击的音符
    selectedChordType: null,
    currentChord: null,
    userInfo: {
        school: '',
        majorClass: '',
        name: '',
        teacher: '',
        saved: false
    },
    errorChords: [],
    testHistory: [],
    testStartTime: null,
    testEndTime: null,
    testTimer: null,
    elapsedTime: 0, // 用时（秒）
    elapsedTimeTimer: null, // 用时计时器ID
    leaderboard: [] // 风云榜单数据
};

// 单音练习状态
const singleAppState = {
    currentMode: 'practice', // 'practice' | 'test'
    testInProgress: false, // 测试是否进行中
    currentVoices: 1, // 1=单声部, 2=双声部, 3=三声部
    currentScale: 'C大调', // 当前调式调性
    currentLevel: '听高音', // '听高音' | '听中音' | '听低音'
    scaleNotes: [], // 当前调式包含的音符
    lastQuestion: null, // 最后一题的音符数组
    previousQuestion: null, // 上一题的音符数组（避免重复）
    lastSubmittedAnswer: null, // 最后提交的答案
    pianoSelection: null, // 琴键上最后一次选择的音

    // 用户信息（与 chordAppState 共享）
    userInfo: {
        school: '',
        majorClass: '',
        name: '',
        teacher: '',
        saved: false
    },

    // 测试模式专用状态
    score: 0, // 总分
    correct: 0, // 正确数
    wrong: 0, // 错误数
    totalQuestions: 0, // 总题数
    errorQuestions: [], // 错题记录
    testStartTime: null, // 测试开始时间
    testEndTime: null, // 测试结束时间
    testTimer: null, // 计时器
    elapsedTime: 0, // 用时（秒）
    elapsedTimeTimer: null, // 用时计时器ID
    leaderboard: [] // 风云榜单数据
};

// 音程听辨状态
const intervalAppState = {
    currentMode: 'practice', // 'practice' | 'test'
    currentFunction: 'pitch', // 'pitch'(音程音高) | 'quality'(音程性质)
    testInProgress: false, // 测试是否进行中
    currentScale: 'C大调', // 当前调式调性
    scaleNotes: [], // 当前调式包含的音符
    lastQuestion: null, // 最后一题的音程 [note1, note2]
    previousQuestion: null, // 上一题的音程（避免重复）
    selectedIntervalQuality: null, // 用户选择的音程性质
    pianoSelection: [], // 琴键上选择的音符（最多2个）

    // 用户信息（与其他模式共享）
    userInfo: {
        school: '',
        majorClass: '',
        name: '',
        teacher: '',
        saved: false
    },

    // 测试模式专用状态
    score: 0, // 总分
    correct: 0, // 正确数
    wrong: 0, // 错误数
    totalQuestions: 0, // 总题数
    errorQuestions: [], // 错题记录
    testStartTime: null, // 测试开始时间
    testEndTime: null, // 测试结束时间
    testTimer: null, // 计时器
    elapsedTime: 0, // 用时（秒）
    elapsedTimeTimer: null, // 用时计时器ID
    leaderboard: [] // 风云榜单数据
};

// 节奏听辨状态管理
const rhythmAppState = {
    currentMode: 'practice', // 'practice' | 'test'
    currentFunction: 'rhythm', // 'rhythm'(节奏型) | 'meter'(节拍)
    testInProgress: false,
    score: 0,
    correct: 0,
    wrong: 0,
    totalQuestions: 0,
    errorQuestions: [],
    testStartTime: null,
    testEndTime: null,
    testTimer: null,
    elapsedTime: 0,
    elapsedTimeTimer: null,
    userInfo: {
        school: '',
        majorClass: '',
        name: '',
        teacher: '',
        saved: false
    },
    // 节奏相关状态
    currentRhythm: null, // 当前节奏题目
    selectedRhythm: null, // 用户选择的节奏
    selectedRhythms: [], // 用户选择的所有节奏（数组）
    activeSlotIndex: -1, // 当前激活的槽位索引（-1表示未激活）
    metronomeOn: false, // 节拍器开关
    bpm: 72, // 节拍速度
    difficulty: 1, // 难度级别
    scaleDifficulty: 1, // 拍型难度
    paramType: 'rhythm', // 当前参数类型：'rhythm'(节奏型) 或 'meter'(节拍)
    // 节拍听辨专用状态
    meterBeatsPerMeasure: 2, // 每小节拍数（从节拍参数获取）
    measureRhythms: [], // 每个小节已选择的节奏型数组（二维数组）
    measureBeatsFilled: [] // 每个小节已填充的拍数
};

// 音符表 - 钢琴键盘范围 G3 至 F5
const allNotes = [
    { note: 'G3', name: 'G', display: 'G3', type: 'white', octave: 3, position: 0, group: 'group1' },
    { note: 'G#3', name: 'G#', display: 'G#3<br>Ab3', type: 'black', octave: 3, position: 0.5, group: 'group1' },
    { note: 'A3', name: 'A', display: 'A3', type: 'white', octave: 3, position: 1, group: 'group1' },
    { note: 'A#3', name: 'A#', display: 'A#3<br>Bb3', type: 'black', octave: 3, position: 1.5, group: 'group1' },
    { note: 'B3', name: 'B', display: 'B3', type: 'white', octave: 3, position: 2, group: 'group1' },
    { note: 'C4', name: 'C', display: 'C4', type: 'white', octave: 4, position: 3, group: 'group2' },
    { note: 'C#4', name: 'C#', display: 'C#4<br>Db4', type: 'black', octave: 4, position: 3.5, group: 'group2' },
    { note: 'D4', name: 'D', display: 'D4', type: 'white', octave: 4, position: 4, group: 'group2' },
    { note: 'D#4', name: 'D#', display: 'D#4<br>Eb4', type: 'black', octave: 4, position: 4.5, group: 'group2' },
    { note: 'E4', name: 'E', display: 'E4', type: 'white', octave: 4, position: 5, group: 'group2' },
    { note: 'F4', name: 'F', display: 'F4', type: 'white', octave: 4, position: 6, group: 'group2' },
    { note: 'F#4', name: 'F#', display: 'F#4<br>Gb4', type: 'black', octave: 4, position: 6.5, group: 'group2' },
    { note: 'G4', name: 'G', display: 'G4', type: 'white', octave: 4, position: 7, group: 'group2' },
    { note: 'G#4', name: 'G#', display: 'G#4<br>Ab4', type: 'black', octave: 4, position: 7.5, group: 'group2' },
    { note: 'A4', name: 'A', display: 'A4', type: 'white', octave: 4, position: 8, group: 'group2' },
    { note: 'A#4', name: 'A#', display: 'A#4<br>Bb4', type: 'black', octave: 4, position: 8.5, group: 'group2' },
    { note: 'B4', name: 'B', display: 'B4', type: 'white', octave: 4, position: 9, group: 'group2' },
    { note: 'C5', name: 'C', display: 'C5', type: 'white', octave: 5, position: 10, group: 'group3' },
    { note: 'C#5', name: 'C#', display: 'C#5<br>Db5', type: 'black', octave: 5, position: 10.5, group: 'group3' },
    { note: 'D5', name: 'D', display: 'D5', type: 'white', octave: 5, position: 11, group: 'group3' },
    { note: 'D#5', name: 'D#', display: 'D#5<br>Eb5', type: 'black', octave: 5, position: 11.5, group: 'group3' },
    { note: 'E5', name: 'E', display: 'E5', type: 'white', octave: 5, position: 12, group: 'group3' },
    { note: 'F5', name: 'F', display: 'F5', type: 'white', octave: 5, position: 13, group: 'group3' }
];

// 等音映射表 - 用于判断两个音名是否表示同一个音高
const enharmonicMap = {
    'C#': 'Db', 'Db': 'C#',
    'D#': 'Eb', 'Eb': 'D#',
    'F#': 'Gb', 'Gb': 'F#',
    'G#': 'Ab', 'Ab': 'G#',
    'A#': 'Bb', 'Bb': 'A#'
};

// 检查两个音符是否为等音（同一音高的不同名称）
function areEnharmonic(note1, note2) {
    // 完全相同
    if (note1 === note2) return true;

    // 提取音名和八度
    const match1 = note1.match(/^([A-G][#b]?)(\d)$/);
    const match2 = note2.match(/^([A-G][#b]?)(\d)$/);

    if (!match1 || !match2) return false;

    const [, name1, octave1] = match1;
    const [, name2, octave2] = match2;

    // 八度不同，不是等音
    if (octave1 !== octave2) return false;

    // 检查是否为等音映射
    return enharmonicMap[name1] === name2 || enharmonicMap[name2] === name1;
}

// 扩展允许的音符集合，包括等音形式
function enrichAllowedNotes(notes) {
    const allowed = new Set();
    (notes || []).forEach(n => {
        allowed.add(n);
        const match = n.match(/^([A-G][#b]?)(\d)$/);
        if (match) {
            const [, noteName, octave] = match;
            const enharmonic = enharmonicMap[noteName];
            if (enharmonic) {
                allowed.add(enharmonic + octave);
            }
        }
    });
    return allowed;
}

// 音程类型配置
const intervalTypes = [
    { semitones: 0, name: '纯一度', abbr: 'P1' },
    { semitones: 1, name: '小二度', abbr: 'm2' },
    { semitones: 2, name: '大二度', abbr: 'M2' },
    { semitones: 3, name: '小三度', abbr: 'm3' },
    { semitones: 4, name: '大三度', abbr: 'M3' },
    { semitones: 5, name: '纯四度', abbr: 'P4' },
    { semitones: 6, name: '增四度', abbr: 'A4' },
    { semitones: 6, name: '减五度', abbr: 'd5' },
    { semitones: 7, name: '纯五度', abbr: 'P5' },
    { semitones: 8, name: '小六度', abbr: 'm6' },
    { semitones: 9, name: '大六度', abbr: 'M6' },
    { semitones: 10, name: '小七度', abbr: 'm7' },
    { semitones: 11, name: '大七度', abbr: 'M7' },
    { semitones: 12, name: '纯八度', abbr: 'P8' }
];

// 计算两个音符之间的半音数
function getIntervalSemitones(note1, note2) {
    const freq1 = getFrequency(note1);
    const freq2 = getFrequency(note2);

    // 确保 note1 是较低的音
    const lowerFreq = Math.min(freq1, freq2);
    const higherFreq = Math.max(freq1, freq2);

    // 计算半音数：12 * log2(频率比)
    const semitones = Math.round(12 * Math.log2(higherFreq / lowerFreq));
    return semitones;
}

// 根据半音数获取音程名称
function getIntervalName(semitones) {
    const interval = intervalTypes.find(iv => iv.semitones === semitones);
    return interval ? interval.name : '未知音程';
}

// 音程级别配置
const intervalLevelConfig = {
    1: {
        name: "1级: 常见二、三度",
        description: "大小二度、大小三度",
        intervals: [1, 2, 3, 4] // 小二度、大二度、小三度、大三度
    },
    2: {
        name: "2级: 加入四、五度",
        description: "二、三度 + 纯四度、增四度/减五度、纯五度",
        intervals: [1, 2, 3, 4, 5, 6, 7] // 增加纯四度、增四度/减五度、纯五度
    },
    3: {
        name: "3级: 全部单音程",
        description: "所有单音程（一度到八度）",
        intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] // 全部音程
    }
};

// 和弦数据模型 - 按照难度分级
const chordTypes = [
    { name: "大三", type: "major", difficulty: 1, intervals: [0, 4, 7], description: "大三度+小三度" },
    { name: "小三", type: "minor", difficulty: 1, intervals: [0, 3, 7], description: "小三度+大三度" },
    { name: "增三", type: "augmented", difficulty: 1, intervals: [0, 4, 8], description: "大三度+大三度" },
    { name: "减三", type: "diminished", difficulty: 1, intervals: [0, 3, 6], description: "小三度+小三度" },
    { name: "大七", type: "major7", difficulty: 2, intervals: [0, 4, 7, 11], description: "大三和弦+大七度" },
    { name: "属七", type: "dominant7", difficulty: 2, intervals: [0, 4, 7, 10], description: "大三和弦+小七度" },
    { name: "小大七", type: "minorMajor7", difficulty: 3, intervals: [0, 3, 7, 11], description: "小三和弦+大七度" },
    { name: "小七", type: "minor7", difficulty: 2, intervals: [0, 3, 7, 10], description: "小三和弦+小七度" },
    { name: "半减七", type: "halfDiminished7", difficulty: 3, intervals: [0, 3, 6, 10], description: "减三和弦+小七度" },
    { name: "减七", type: "diminished7", difficulty: 3, intervals: [0, 3, 6, 9], description: "减三和弦+减七度" },
    { name: "增七", type: "augmented7", difficulty: 7, intervals: [0, 4, 8, 11], description: "增三和弦+大七度" },
    { name: "属七升五", type: "dominant7sharp5", difficulty: 7, intervals: [0, 4, 8, 10], description: "增三和弦+小七度" },
    { name: "属七降五", type: "dominant7flat5", difficulty: 7, intervals: [0, 4, 6, 10], description: "减五度+小七度" },
    { name: "大九", type: "major9", difficulty: 7, intervals: [0, 4, 7, 11, 14], description: "大七和弦+大九度" },
    { name: "小九", type: "minor9", difficulty: 7, intervals: [0, 3, 7, 10, 14], description: "小七和弦+大九度" },
    { name: "属九", type: "dominant9", difficulty: 7, intervals: [0, 4, 7, 10, 14], description: "属七和弦+大九度" },
    { name: "挂二", type: "sus2", difficulty: 7, intervals: [0, 2, 7], description: "大二度+纯五度" },
    { name: "挂四", type: "sus4", difficulty: 7, intervals: [0, 5, 7], description: "纯四度+纯五度" },
    { name: "属七挂四", type: "dominant7sus4", difficulty: 7, intervals: [0, 5, 7, 10], description: "挂四和弦+小七度" }
];

// 调式难度配置（用于单音/调式选择）
const scaleDifficultyConfig = {
    1: {
        name: "1级: 无升降调号调",
        description: "C自然/和声大调、a自然/和声小调",
        scales: {
            "C自然大调": ["C", "D", "E", "F", "G", "A", "B"],
            "C和声大调": ["C", "D", "E", "F", "G", "Ab", "B"],
            "a自然小调": ["A", "B", "C", "D", "E", "F", "G"],
            "a和声小调": ["A", "B", "C", "D", "E", "F", "G#"]
        },
        notes: ['G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G#3', 'G#4']
    },
    2: {
        name: "2级: 一升调号调",
        description: "G自然/和声大调、e自然/和声小调",
        scales: {
            "G自然大调": ["G", "A", "B", "C", "D", "E", "F#"],
            "G和声大调": ["G", "A", "B", "C", "D", "Eb", "F#"],
            "e自然小调": ["E", "F#", "G", "A", "B", "C", "D"],
            "e和声小调": ["E", "F#", "G", "A", "B", "C", "D#"]
        },
        notes: ['G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'F#3', 'F#4', 'D#4']
    },
    3: {
        name: "3级: 一降调号调",
        description: "F自然/和声大调、d自然/和声小调",
        scales: {
            "F自然大调": ["F", "G", "A", "Bb", "C", "D", "E"],
            "F和声大调": ["F", "G", "A", "Bb", "C", "Db", "E"],
            "d自然小调": ["D", "E", "F", "G", "A", "Bb", "C"],
            "d和声小调": ["D", "E", "F", "G", "A", "Bb", "C#"]
        },
        notes: ['G3', 'A3', 'A#3', 'A#4', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'C5', 'D5', 'E5', 'F5', 'C#4', 'C#5']
    },
    4: {
        name: "4级: 二升调号调",
        description: "D自然/和声大调、b自然/和声小调",
        scales: {
            "D自然大调": ["D", "E", "F#", "G", "A", "B", "C#"],
            "D和声大调": ["D", "E", "F#", "G", "A", "Bb", "C#"],
            "b自然小调": ["B", "C#", "D", "E", "F#", "G", "A"],
            "b和声小调": ["B", "C#", "D", "E", "F#", "G", "A#"]
        },
        notes: ['B3', 'C#4', 'D4', 'E4', 'F#4', 'G4', 'A4', 'B4', 'C#5', 'D5', 'E5', 'A#3', 'A#4']
    },
    5: {
        name: "5级: 二降调号调",
        description: "Bb自然/和声大调、g自然/和声小调",
        scales: {
            "Bb自然大调": ["Bb", "C", "D", "Eb", "F", "G", "A"],
            "Bb和声大调": ["Bb", "C", "D", "Eb", "F", "Gb", "A"],
            "g自然小调": ["G", "A", "Bb", "C", "D", "Eb", "F"],
            "g和声小调": ["G", "A", "Bb", "C", "D", "Eb", "F#"]
        },
        notes: ['G3', 'A3', 'A#3', 'Bb3', 'Bb4', 'A#4', 'C4', 'C5', 'D4', 'D5', 'D#4', 'Eb4', 'Eb5', 'F4', 'F5', 'G4', 'A4', 'F#4', 'Gb4']
    },
    6: {
        name: "6级: 三升调号调",
        description: "A自然/和声大调、f#自然/和声小调",
        scales: {
            "A自然大调": ["A", "B", "C#", "D", "E", "F#", "G#"],
            "A和声大调": ["A", "B", "C#", "D", "E", "F", "G#"],
            "f#自然小调": ["F#", "G#", "A", "B", "C#", "D", "E"],
            "f#和声小调": ["F#", "G#", "A", "B", "C#", "D", "E#"]
        },
        notes: ['G#3', 'A3', 'B3', 'C#4', 'D4', 'E4', 'F#4', 'G#4', 'A4', 'B4', 'C#5', 'D5', 'E5', 'F5']
    },
    7: {
        name: "7级: 三降调号调",
        description: "Eb自然/和声大调、c自然/和声小调",
        scales: {
            "Eb自然大调": ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
            "Eb和声大调": ["Eb", "F", "G", "Ab", "Bb", "Cb", "D"],
            "c自然小调": ["C", "D", "Eb", "F", "G", "Ab", "Bb"],
            "c和声小调": ["C", "D", "Eb", "F", "G", "Ab", "B"]
        },
        notes: ['G3', 'G#3', 'A#3', 'B3', 'C4', 'D4', 'D#4', 'F4', 'G4', 'G#4', 'A#4', 'C5', 'D5', 'D#5', 'F5', 'B4']
    },
    8: {
        name: "8级: 所有调式",
        description: "所有调式的音符",
        scales: {
            "所有调式": ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
        },
        notes: allNotes.map(note => note.note)
    }
};

// 难度配置
const difficultyConfig = {
    1: {
        name: "1级: 基础三和弦",
        description: "大三和弦、小三和弦、增三和弦、减三和弦",
        chords: chordTypes.filter(c => c.difficulty <= 1)
    },
    2: {
        name: "2级: 常用七和弦",
        description: "加入属七和弦、小七和弦、大七和弦",
        chords: chordTypes.filter(c => c.difficulty <= 2)
    },
    3: {
        name: "3级: 其他七和弦",
        description: "加入半减七和弦、减七和弦、小大七和弦",
        chords: chordTypes.filter(c => c.difficulty <= 3)
    },
};

// WebPiano 原生 Web Audio API 钢琴音色
const pianoMetrics = { spacing: null, offset: null, whiteWidth: null };

// MIDI 支持 - 直接移植自 Web Piano
let midiAccess = null;
let midiInputs = [];
const activeNotes = new Set(); // 跟踪当前按下的 MIDI 音符
let midiInitialized = false; // 防止重复初始化

// 全局触摸锁 - 防止移动端触摸事件触发后合成的mousedown事件导致双响
let lastPianoTouchTime = 0;
const PIANO_TOUCH_LOCK_MS = 300; // 触摸锁持续时间（毫秒）

function ensureAudioReady() {
    if (!window.audioContext) {
        window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (window.audioContext.state === 'suspended') {
        return window.audioContext.resume();
    }
    return Promise.resolve();
}

function setupAudioUnlock() {
    // 创建音频激活提示
    const audioHint = document.createElement('div');
    audioHint.id = 'audio-unlock-hint';
    audioHint.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 16px;
        text-align: center;
        z-index: 10000;
        display: none;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        pointer-events: auto; /* 确保点击事件能被捕获 */
    `;
    audioHint.innerHTML = '🔊 点击屏幕任意位置激活音频';
    document.body.appendChild(audioHint);

    let audioUnlocked = false;
    let showHintTimer = null;

    const unlock = async (e) => {
        if (audioUnlocked) return;
        audioUnlocked = true;

        // 关键修复：立即取消待显示的提示框定时器
        if (showHintTimer) {
            clearTimeout(showHintTimer);
            showHintTimer = null;
        }

        console.log('🔓 尝试激活音频...');

        try {
            // 1. 激活原生 AudioContext
            await ensureAudioReady();
            console.log('✅ AudioContext 已激活:', window.audioContext.state);

            // 2. 激活 Tone.js（关键！移动端必须）
            if (typeof Tone !== 'undefined') {
                await Tone.start();
                console.log('✅ Tone.js 已激活');

                // 3. 立即播放一个测试音（确保音频链路通畅）
                const testSynth = new Tone.Synth().toDestination();
                testSynth.volume.value = -20; // 降低音量
                testSynth.triggerAttackRelease("C4", "32n");
                console.log('🎵 测试音已播放');
            }

            // 隐藏提示 - 使用安全方式
            if (audioHint && audioHint.parentNode) {
                audioHint.style.opacity = '0';
                audioHint.style.transition = 'opacity 0.3s';
                setTimeout(() => {
                    if (audioHint.parentNode) {
                        audioHint.parentNode.removeChild(audioHint);
                    }
                }, 300);
            }

            console.log('✅ 音频系统完全激活！');

        } catch (err) {
            console.error('❌ 音频激活失败:', err);
            audioUnlocked = false; // 允许重试

            // 显示错误提示
            if (audioHint && audioHint.parentNode) {
                audioHint.innerHTML = '❌ 激活失败，请再点击一次';
                audioHint.style.background = 'rgba(255, 0, 0, 0.9)';
            }
        } finally {
            // 移除事件监听器
            document.removeEventListener('pointerdown', unlock);
            document.removeEventListener('touchstart', unlock);
            document.removeEventListener('keydown', unlock);
        }
    };

    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // 移动设备立即显示提示，桌面设备只在需要时显示
    if (isMobile || (window.audioContext && window.audioContext.state === 'suspended')) {
        showHintTimer = setTimeout(() => {
            // 关键修复：检查是否已激活，避免提示框在激活后才显示
            if (!audioUnlocked && audioHint.parentNode) {
                audioHint.style.display = 'block';
            }
        }, 500);
    }

    // 监听多种交互事件（移动端优先 touchstart）
    document.addEventListener('touchstart', unlock, { once: true, passive: false });
    document.addEventListener('pointerdown', unlock, { once: true });
    document.addEventListener('mousedown', unlock, { once: true });
    document.addEventListener('keydown', unlock, { once: true });
}

// ==================== MIDI 支持功能 ====================

// MIDI 音符编号到音符名称的映射
function midiNoteToNoteName(midiNote) {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor(midiNote / 12) - 1;
    const noteIndex = midiNote % 12;
    return noteNames[noteIndex] + octave;
}

// 更新 MIDI 状态显示
function updateMidiStatus(isConnected, deviceName = '') {
    // 更新所有页面的 MIDI 状态
    const pages = ['chord', 'single', 'interval'];
    pages.forEach(page => {
        const statusText = document.getElementById(`midi-status-text-${page}`);
        if (statusText) {
            if (isConnected) {
                statusText.textContent = `已连接 (${deviceName})`;
                statusText.style.color = '#4CAF50';
                // 隐藏连接按钮
                const connectBtn = document.getElementById(`connect-midi-btn-${page}`);
                if (connectBtn) connectBtn.style.display = 'none';
            } else if (deviceName === '等待连接') {
                statusText.textContent = '点击页面任意位置或点击下方按钮以连接 MIDI 设备';
                statusText.style.color = '#FFA500';
            } else {
                statusText.textContent = '未连接';
                statusText.style.color = '#999';
            }
        }
    });
}

// 处理 MIDI 消息
function handleMIDIMessage(event) {
    const [command, note, velocity] = event.data;

    // Note On (144) 或 Note Off (128)
    if (command === 144 && velocity > 0) {
        // ✅ 确保 AudioContext 已激活（每次 MIDI 输入都检查）
        ensureAudioReady();

        // 音符按下
        const noteName = midiNoteToNoteName(note);
        const noteObj = allNotes.find(n => n.note === noteName);

        if (noteObj) {
            activeNotes.add(note);

            // ✅ 根据当前页面调用相应的处理函数（使用正确的选择器 .page.active）
            const currentPage = document.querySelector('.page.active');
            if (currentPage) {
                const pageId = currentPage.id;
                if (pageId === 'single-page') {
                    handlePianoNoteOnSingle(noteObj);
                } else if (pageId === 'interval-page') {
                    handlePianoNoteOnInterval(noteObj);
                } else {
                    // 默认使用和弦处理
                    handlePianoNoteOnChord(noteObj);
                }
            } else {
                handlePianoNoteOnChord(noteObj);
            }
        }
    } else if (command === 128 || (command === 144 && velocity === 0)) {
        // 音符释放
        const noteName = midiNoteToNoteName(note);
        activeNotes.delete(note);

        // 停止声音
        stopNoteWithWebAudio(noteName);

        // 移除高亮
        removeHighlightKey(noteName);
    }
}

// 初始化 MIDI 访问
// 初始化 MIDI 访问 - 移植自 Web Piano
async function initMIDI() {
    if (midiInitialized) {
        console.log('MIDI 已经初始化过了');
        return;
    }

    console.log(' 开始初始化 MIDI...');

    // 先激活 AudioContext（用户交互触发）
    await ensureAudioReady();
    console.log('✅ AudioContext 已激活');

    // 检查浏览器支持
    if (!navigator.requestMIDIAccess) {
        console.warn('⚠️ 浏览器不支持 Web MIDI API');
        updateMidiStatus(false);
        return;
    }

    try {
        console.log('📡 请求 MIDI 访问权限...');
        midiAccess = await navigator.requestMIDIAccess({ sysex: false });
        midiInitialized = true;

        console.log('✅ MIDI 访问已授予');

        // 监听 MIDI 设备连接/断开
        midiAccess.onstatechange = (event) => {
            console.log('🔄 MIDI 设备状态变化:', event.port.name, event.port.state);
            refreshMIDIInputs();
        };

        // 遍历所有 MIDI 输入设备并连接
        for (let input of midiAccess.inputs.values()) {
            connectMidiInput(input);
        }

        refreshMIDIInputs();

        console.log('✅ MIDI 初始化成功，可用设备:', Array.from(midiAccess.inputs.keys()));
    } catch (error) {
        console.error('❌ MIDI 初始化失败:', error);
        updateMidiStatus(false);
        alert('无法访问 MIDI 设备：' + error.message + '\n\n请确保：\n1. 使用 Chrome 或 Edge 浏览器\n2. 在弹出的对话框中点击"允许"\n3. MIDI 键盘已正确连接');
    }
}

// 连接单个 MIDI 输入设备 - 移植自 Web Piano
function connectMidiInput(input) {
    input.onmidimessage = (message) => {
        handleMIDIMessage(message);
    };
    console.log('✅ 已连接 MIDI 设备:', input.name);
}

// 刷新 MIDI 输入设备列表
function refreshMIDIInputs() {
    if (!midiAccess) return;

    // 清除旧的监听器
    midiInputs.forEach(input => {
        input.onmidimessage = null;
    });
    midiInputs = [];

    let connectedDevice = '';

    // 遍历所有输入端口
    for (let input of midiAccess.inputs.values()) {
        if (input.state === 'connected') {
            console.log('MIDI 输入设备:', input.name, input.manufacturer);
            connectedDevice = input.name;

            // 设置消息处理器
            input.onmidimessage = handleMIDIMessage;
            midiInputs.push(input);
        }
    }

    if (midiInputs.length > 0) {
        updateMidiStatus(true, connectedDevice);
        console.log(`已连接 ${midiInputs.length} 个 MIDI 设备`);
    } else {
        updateMidiStatus(false);
    }
}

// 初始化 MIDI 连接按钮 - 简化版
function initMidiConnectButtons() {
    console.log('🔘 初始化 MIDI 连接按钮...');
    const pages = ['chord', 'single', 'interval'];

    pages.forEach(page => {
        const btn = document.getElementById(`connect-midi-btn-${page}`);

        if (!btn) {
            console.warn(`⚠️ 未找到 ${page} 页面的 MIDI 连接按钮`);
            return;
        }

        console.log(`✅ 找到 ${page} 页面的 MIDI 连接按钮`);

        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            console.log(`🖱️ 用户点击 ${page} 页面的 MIDI 连接按钮`);

            // 直接调用 initMIDI，它内部会检查是否已经初始化
            await initMIDI();
        });
    });

    console.log('✅ MIDI 连接按钮初始化完成');
}

function getFrequency(note) {
    const noteMap = {
        'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
        'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8,
        'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
    };
    const match = note.match(/^([A-G][#b]?)(\d)$/);
    if (!match) return 440;
    const noteName = match[1];
    const octave = parseInt(match[2]);
    const semitone = noteMap[noteName];
    if (semitone === undefined) return 440;
    const midiNote = (octave + 1) * 12 + semitone;
    return 440 * Math.pow(2, (midiNote - 69) / 12);
}

// 活跃的音符追踪（用于控制声音持续时间）
const activeOscillators = new Map(); // note -> { oscillators, gains, masterGain }

// 钢琴音色合成（更接近真实钢琴）
function playNoteWithWebAudio(note, duration = 2.5, volume = 1.0) {
    const ctx = window.audioContext;
    const now = ctx.currentTime;
    const freq = getFrequency(note);

    // 创建主增益节点 - 提高基础音量
    const masterGain = ctx.createGain();
    masterGain.gain.value = volume * 0.7; // 从 0.5 提高到 0.7

    // 添加低通滤波器模拟钢琴的温暖音色 - 提高截止频率让更多高频通过
    const lowpassFilter = ctx.createBiquadFilter();
    lowpassFilter.type = 'lowpass';
    lowpassFilter.frequency.value = 12000; // 从 8000 提高到 12000
    lowpassFilter.Q.value = 0.5;

    lowpassFilter.connect(masterGain);
    masterGain.connect(ctx.destination);

    const oscillators = [];
    const gains = [];

    // 基频 + 多个泛音（增强谐波，更丰富的音色）
    const harmonics = [
        { ratio: 1, amp: 1.0, type: 'triangle' },    // 基频
        { ratio: 2, amp: 0.7, type: 'sine' },        // 2次泛音（增强）
        { ratio: 3, amp: 0.45, type: 'sine' },       // 3次泛音（增强）
        { ratio: 4, amp: 0.3, type: 'sine' },        // 4次泛音（增强）
        { ratio: 5, amp: 0.2, type: 'sine' },        // 5次泛音（增强）
        { ratio: 6, amp: 0.15, type: 'sine' },       // 6次泛音（增强）
        { ratio: 7, amp: 0.1, type: 'sine' },        // 7次泛音（增强）
        { ratio: 8, amp: 0.06, type: 'sine' },       // 8次泛音（增强）
        { ratio: 9, amp: 0.04, type: 'sine' },       // 9次泛音（新增）
        { ratio: 10, amp: 0.02, type: 'sine' },      // 10次泛音（新增）
    ];

    harmonics.forEach((h, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = h.type;
        osc.frequency.value = freq * h.ratio;

        // 高频泛音稍微失谐，更自然（增加失谐范围创造合唱效果）
        if (idx > 3) {
            osc.detune.value = (Math.random() - 0.5) * 15; // ±7.5 cents（从 ±5 增加到 ±7.5）
        }

        // 钢琴的 ADSR 包络：快速起音，快速衰减到延音水平
        const attackTime = 0.003; // 3ms 更快起音
        const decayTime = 0.2;    // 200ms 更快衰减
        const sustainLevel = 0.2;  // 稍高的延音水平

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(h.amp, now + attackTime);
        gain.gain.exponentialRampToValueAtTime(Math.max(h.amp * sustainLevel, 0.001), now + attackTime + decayTime);
        // 长衰减
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(lowpassFilter);

        osc.start(now);
        osc.stop(now + duration);

        oscillators.push(osc);
        gains.push(gain);
    });

    // 添加击弦噪声（模拟琴槌击弦的机械声）- 增强噪声
    const noiseDuration = 0.1;
    const bufferSize = ctx.sampleRate * noiseDuration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();

    noise.buffer = buffer;
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = freq * 3; // 噪声频率跟随音高
    noiseFilter.Q.value = 2;
    noiseGain.gain.setValueAtTime(0.35, now); // 从 0.25 提高到 0.35
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + noiseDuration);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noise.start(now);
    noise.stop(now + noiseDuration);
}

// 启动一个可控制的音符（用于 MIDI 和鼠标持续按压）
function startNoteWithWebAudio(note, volume = 1.0) {
    const ctx = window.audioContext;
    const now = ctx.currentTime;
    const freq = getFrequency(note);

    // 如果已经在播放，先停止
    if (activeOscillators.has(note)) {
        stopNoteWithWebAudio(note);
    }

    // 创建主增益节点
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(volume * 0.5, now + 0.005);

    // 添加低通滤波器
    const lowpassFilter = ctx.createBiquadFilter();
    lowpassFilter.type = 'lowpass';
    lowpassFilter.frequency.value = 8000;
    lowpassFilter.Q.value = 0.5;

    lowpassFilter.connect(masterGain);
    masterGain.connect(ctx.destination);

    const oscillators = [];
    const gains = [];

    // 钢琴谐波结构
    const harmonics = [
        { ratio: 1, amp: 1.0, type: 'triangle' },
        { ratio: 2, amp: 0.6, type: 'sine' },
        { ratio: 3, amp: 0.35, type: 'sine' },
        { ratio: 4, amp: 0.2, type: 'sine' },
        { ratio: 5, amp: 0.12, type: 'sine' },
        { ratio: 6, amp: 0.08, type: 'sine' },
        { ratio: 7, amp: 0.05, type: 'sine' },
        { ratio: 8, amp: 0.03, type: 'sine' },
    ];

    harmonics.forEach((h, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = h.type;
        osc.frequency.value = freq * h.ratio;

        // 高频泛音轻微失谐
        if (idx > 4) {
            osc.detune.value = (Math.random() - 0.5) * 10;
        }

        // ADSR 包络：快速起音，衰减到延音水平
        const attackTime = 0.005;
        const decayTime = 0.3;
        const sustainLevel = 0.3; // 延音时保持较高音量

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(h.amp, now + attackTime);
        gain.gain.exponentialRampToValueAtTime(Math.max(h.amp * sustainLevel, 0.001), now + attackTime + decayTime);

        osc.connect(gain);
        gain.connect(lowpassFilter);

        osc.start(now);

        oscillators.push(osc);
        gains.push(gain);
    });

    // 添加击弦噪声
    const noiseDuration = 0.08;
    const bufferSize = ctx.sampleRate * noiseDuration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    const noiseFilter = ctx.createBiquadFilter();

    noise.buffer = buffer;
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = freq * 3;
    noiseFilter.Q.value = 2;
    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + noiseDuration);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    noise.start(now);
    noise.stop(now + noiseDuration);

    // 保存引用以便后续停止
    activeOscillators.set(note, {
        oscillators: oscillators,
        gains: [...gains, masterGain, lowpassFilter],
        masterGain: masterGain
    });
}

// 停止一个音符
function stopNoteWithWebAudio(note) {
    if (!activeOscillators.has(note)) return;

    const ctx = window.audioContext;
    const now = ctx.currentTime;
    const { oscillators, gains, masterGain } = activeOscillators.get(note);

    // 平滑淡出
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.setValueAtTime(masterGain.gain.value, now);
    masterGain.gain.linearRampToValueAtTime(0, now + 0.1);

    // 停止所有振荡器
    oscillators.forEach(osc => {
        try {
            osc.stop(now + 0.1);
        } catch (e) {
            // 忽略已经停止的振荡器
        }
    });

    // 清理
    setTimeout(() => {
        oscillators.forEach(osc => osc.disconnect());
        gains.forEach(gain => gain.disconnect());
        masterGain.disconnect();
    }, 150);

    activeOscillators.delete(note);
}

// 页面管理
const pageManager = {
    currentPage: 'home',
    switchToPage(pageId) {
        // 确保只有一个页面是active的
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
            document.title = this.getPageTitle(pageId);

            console.log('切换到页面:', pageId);
            console.log('当前active页面:', document.querySelector('.page.active')?.id);
        }
        if (pageId === 'chord-page') { setChordInteractiveVisibility(true); this.initializeChordPage(); initChordPage(); }
        else if (pageId === 'melody-page') { setMelodyInteractiveVisibility(true); initMelodyPage(); }
        else if (pageId === 'interval-page') { setIntervalInteractiveVisibility(true); this.initializeIntervalPage(); initIntervalPage(); }
        else if (pageId === 'single-page') { setSingleInteractiveVisibility(true); this.initializeSinglePage(); initSinglePage(); }
        else if (pageId === 'rhythm-page') { setRhythmInteractiveVisibility(true); initRhythmPage(); }
        else if (pageId === 'chord-test-end-page') {
            setChordInteractiveVisibility(false);
            initEndPage();
        }
        else if (pageId === 'interval-test-end-page') setIntervalInteractiveVisibility(false);
        else if (pageId === 'single-test-end-page') {
            setSingleInteractiveVisibility(false);
            initSingleEndPage();
        }
        else if (pageId === 'rhythm-test-end-page') setRhythmInteractiveVisibility(false);
    },
    getPageTitle(pageId) {
        const titles = {
            'home-page': '音乐听觉综合训练系统',
            'chord-page': '和弦听辨 - 音乐听觉综合训练系统',
            'chord-test-end-page': '和弦听辨结果 - 音乐听觉综合训练系统',
            'single-page': '单音听辨 - 音乐听觉综合训练系统',
            'single-test-end-page': '单音听辨结果 - 音乐听觉综合训练系统',
            'rhythm-page': '节奏听辨 - 音乐听觉综合训练系统',
            'rhythm-test-end-page': '节奏听辨结果 - 音乐听觉综合训练系统',
            'melody-page': '旋律听辨 - 音乐听觉综合训练系统',
            'learning-report-page': '学习报告 - 音乐听觉综合训练系统',
            'error-book-page': '错题本 - 音乐听觉综合训练系统',
            'adaptive-page': '智能推荐 - 音乐听觉综合训练系统'
        };
        return titles[pageId] || '音乐听觉综合训练系统';
    },
    initializeChordPage() {
        if (!window.chordPianoInitialized) {
            // 1. First initialize scale difficulty to set scaleNotes
            initScaleDifficultySelector();
            // 2. Then initialize piano (after scaleNotes is set)
            initChordPiano();
            // 3. Initialize other UI components
            initChordDifficultySelector();
            initInversionSelector();
            initChordButtons();
            window.chordPianoInitialized = true;
        }
        updateChordButtonStates();
        // 确保进入练习模式的初始状态
        startChordPracticeMode();
        switchToPitchIdentificationChord();
    },
    initializeSinglePage() {
        if (!window.singlePianoInitialized) {
            initSinglePiano();
            window.singlePianoInitialized = true;
        }
        // 确保进入练习模式的初始状态
        startSinglePracticeMode();
    },
    initializeIntervalPage() {
        if (!window.intervalPianoInitialized) {
            initIntervalPiano();
            window.intervalPianoInitialized = true;
        }
        // 确保进入练习模式的初始状态
        startIntervalPracticeMode();
        switchToPitchIdentificationInterval();
    }
};

// 学生信息管理
const userManager = {
    saveUserInfo() {
        const school = document.getElementById('school').value.trim();
        const majorClass = document.getElementById('major-class').value.trim();
        const name = document.getElementById('name').value.trim();
        const teacher = document.getElementById('teacher').value.trim();
        if (!school || !majorClass || !name || !teacher) { this.showSaveStatus('请填写所有学生信息！', 'error'); return; }

        // 同步到所有模块的用户信息
        const userInfo = { school, majorClass, name, teacher, saved: true };
        chordAppState.userInfo = { ...userInfo };
        singleAppState.userInfo = { ...userInfo };
        intervalAppState.userInfo = { ...userInfo };

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        this.showSaveStatus('信息已保存', 'success');
        setTimeout(() => { this.hideSaveStatus(); }, 500);
    },
    loadUserInfo() {
        const savedInfo = localStorage.getItem('userInfo');
        if (savedInfo) {
            try {
                const userInfo = JSON.parse(savedInfo);
                // 同步到所有模块的用户信息
                chordAppState.userInfo = { ...userInfo, saved: true };
                singleAppState.userInfo = { ...userInfo, saved: true };
                intervalAppState.userInfo = { ...userInfo, saved: true };

                document.getElementById('school').value = userInfo.school || '';
                document.getElementById('major-class').value = userInfo.majorClass || '';
                document.getElementById('name').value = userInfo.name || '';
                document.getElementById('teacher').value = userInfo.teacher || '';
                this.showSaveStatus('已加载保存的学生信息', 'success');
                setTimeout(() => this.hideSaveStatus(), 2000);
            } catch (e) { console.error('加载用户信息失败:', e); }
        }
    },
    showSaveStatus(message, type) {
        const statusEl = document.getElementById('save-status');
        if (statusEl) { statusEl.textContent = message; statusEl.className = `save-status ${type}`; statusEl.style.display = 'block'; }
    },
    hideSaveStatus() {
        const statusEl = document.getElementById('save-status');
        if (statusEl) { statusEl.style.display = 'none'; statusEl.textContent = ''; statusEl.className = 'save-status'; }
    }
};

// ==================== 核心功能函数 ====================

function initChordPiano() {
    const piano = document.getElementById('piano-chord');
    if (!piano) return;
    piano.innerHTML = '';
    const whiteNotes = allNotes.filter(n => n.type === 'white');
    whiteNotes.forEach((note, index) => {
        const key = document.createElement('div');
        key.className = 'white-key';
        key.innerHTML = `<span class="note-name">${note.display}</span>`;
        key.dataset.note = note.note;
        key.dataset.index = index;
        const octaveLabel = document.createElement('div');
        octaveLabel.className = `octave-label ${note.group}`;
        if (note.group === 'group1') octaveLabel.textContent = '小字组';
        else if (note.group === 'group2') octaveLabel.textContent = '小字一组';
        else if (note.group === 'group3') octaveLabel.textContent = '小字二组';
        key.appendChild(octaveLabel);
        // 桌面端事件（添加触摸锁检查，防止移动端双响）
        key.addEventListener('mousedown', (e) => {
            // 如果是触摸事件触发的合成mousedown，跳过执行
            if (Date.now() - lastPianoTouchTime < PIANO_TOUCH_LOCK_MS) return;
            e.preventDefault();
            handlePianoNoteOnChord(note);
        });
        key.addEventListener('mouseup', () => handlePianoNoteOffChord(note));
        key.addEventListener('mouseleave', () => handlePianoNoteOffChord(note));

        // 移动端触摸事件（按下立即发声，支持滚动）
        let touchStartX = 0;
        let touchStartY = 0;
        let isScrolling = false;
        let hasPlayed = false;

        key.addEventListener('touchstart', (e) => {
            // 记录触摸时间，用于防止合成mousedown双响
            lastPianoTouchTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isScrolling = false;
            hasPlayed = false;

            // 按下时立即发声（关键：按下就播放）
            handlePianoNoteOnChord(note);
            hasPlayed = true;
        }, { passive: true });

        key.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const diffX = Math.abs(touchX - touchStartX);
            const diffY = Math.abs(touchY - touchStartY);

            // 如果水平移动距离大于垂直移动，认为是滚动
            if (diffX > diffY && diffX > 10) {
                isScrolling = true;
                // 滚动时停止发声
                if (hasPlayed) {
                    handlePianoNoteOffChord(note);
                    hasPlayed = false;
                }
            }
        }, { passive: true });

        key.addEventListener('touchend', (e) => {
            // 如果已经因为滚动停止了，就不再处理
            if (!isScrolling && hasPlayed) {
                // 点击结束，停止发声
                handlePianoNoteOffChord(note);
            }
        }, { passive: true });
        piano.appendChild(key);
    });
    invalidatePianoMetrics();
    updatePianoMetrics('piano-chord');
    const blackNotes = allNotes.filter(n => n.type === 'black');
    blackNotes.forEach(note => {
        const key = document.createElement('div');
        key.className = 'black-key';
        key.innerHTML = `<span class="note-name">${note.display}</span>`;
        key.dataset.note = note.note;
        key.style.left = calculateBlackKeyLeft(note.position);
        // 桌面端事件（添加触摸锁检查，防止移动端双响）
        key.addEventListener('mousedown', (e) => {
            // 如果是触摸事件触发的合成mousedown，跳过执行
            if (Date.now() - lastPianoTouchTime < PIANO_TOUCH_LOCK_MS) return;
            e.preventDefault();
            handlePianoNoteOnChord(note);
        });
        key.addEventListener('mouseup', () => handlePianoNoteOffChord(note));
        key.addEventListener('mouseleave', () => handlePianoNoteOffChord(note));

        // 移动端触摸事件（按下立即发声，支持滚动）
        let touchStartX = 0;
        let touchStartY = 0;
        let isScrolling = false;
        let hasPlayed = false;

        key.addEventListener('touchstart', (e) => {
            // 记录触摸时间，用于防止合成mousedown双响
            lastPianoTouchTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isScrolling = false;
            hasPlayed = false;

            // 按下时立即发声
            handlePianoNoteOnChord(note);
            hasPlayed = true;
        }, { passive: true });

        key.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const diffX = Math.abs(touchX - touchStartX);
            const diffY = Math.abs(touchY - touchStartY);

            // 如果水平移动距离大于垂直移动，认为是滚动
            if (diffX > diffY && diffX > 10) {
                isScrolling = true;
                // 滚动时停止发声
                if (hasPlayed) {
                    handlePianoNoteOffChord(note);
                    hasPlayed = false;
                }
            }
        }, { passive: true });

        key.addEventListener('touchend', (e) => {
            if (!isScrolling && hasPlayed) {
                // 点击结束，停止发声
                handlePianoNoteOffChord(note);
            }
        }, { passive: true });
        piano.appendChild(key);
    });
    // 注意：不在这里调用 applyScaleRestrictionsToPiano()，因为 initScaleDifficultySelector 已经通过 updateChordScaleNotesByLevel 调用了 applyChordScaleRestrictions()
    positionBlackKeys('piano-chord');
}

function initChordDifficultySelector() {
    const select = document.getElementById('difficulty-chord');
    select.innerHTML = '';
    const keys = Object.keys(difficultyConfig).map(k => parseInt(k, 10)).sort((a, b) => a - b);
    keys.forEach(i => { const option = document.createElement('option'); option.value = i; option.textContent = difficultyConfig[i].name; select.appendChild(option); });
    const defaultKey = keys && keys.length ? keys[0] : 1;
    if (!keys.includes(chordAppState.difficulty)) chordAppState.difficulty = defaultKey;
    select.value = chordAppState.difficulty;
    select.addEventListener('change', function () { chordAppState.difficulty = parseInt(this.value); updateChordStatus(difficultyConfig[chordAppState.difficulty].description); initChordButtons(); updateInversionOptions(); });
}

function initScaleDifficultySelector() {
    const select = document.getElementById('scale-difficulty-chord');
    if (!select) return;
    select.innerHTML = '';
    for (let i = 1; i <= 8; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = scaleDifficultyConfig[i].name;
        select.appendChild(option);
    }
    select.value = chordAppState.scaleDifficulty || 1;
    // 使用 updateChordScaleNotesByLevel 来正确初始化并应用琴键限制
    updateChordScaleNotesByLevel(chordAppState.scaleDifficulty || 1);
    select.addEventListener('change', function () {
        const val = parseInt(this.value, 10);
        if (!isNaN(val)) {
            updateChordScaleNotesByLevel(val);
        }
    });
}

function initInversionSelector() {
    const select = document.getElementById('inversion-chord'); if (!select) return; select.addEventListener('change', function () { chordAppState.inversion = this.value; updateChordStatus('已切换转位类型: ' + (this.selectedOptions[0]?.text || this.value)); }); updateInversionOptions();
}

function updateInversionOptions() {
    const select = document.getElementById('inversion-chord'); if (!select) return; select.innerHTML = '';
    const config = difficultyConfig[chordAppState.difficulty] || { chords: [] };
    let maxInv = 0; config.chords.forEach(ch => { const inv = Math.max(0, ch.intervals.length - 1); if (inv > maxInv) maxInv = inv; });
    const allOpt = document.createElement('option'); allOpt.value = 'all'; allOpt.textContent = '全部'; select.appendChild(allOpt);
    const labels = ['原位', '一转', '二转', '三转'];
    for (let i = 0; i <= maxInv; i++) { const o = document.createElement('option'); o.value = String(i); o.textContent = labels[i] || `第${i}转位`; select.appendChild(o); }
    const prev = chordAppState.inversion || 'all'; const exists = Array.from(select.options).some(opt => opt.value === String(prev)); select.value = exists ? String(prev) : 'all'; chordAppState.inversion = select.value;
}

function applyScaleRestrictionsToPiano() {
    const allowed = enrichAllowedNotes(chordAppState.scaleNotes);
    const piano = document.getElementById('piano-chord');
    if (!piano) return;
    const keys = piano.querySelectorAll('.white-key, .black-key');
    keys.forEach(key => {
        const note = key.dataset.note;
        if (!allowed.has(note)) {
            key.classList.add('disabled');
            key.dataset.disabled = 'true';
        } else {
            key.classList.remove('disabled');
            delete key.dataset.disabled;
        }
    });
}

function findCandidatesForChord(chord, allowedSet, allowedInversions) {
    const candidates = [];
    for (let rootIndex = 0; rootIndex < allNotes.length; rootIndex++) {
        for (const inv of allowedInversions) {
            const intervals = chord.intervals.map((it, idx) => (idx < inv ? it + 12 : it));
            const notes = [];
            let ok = true;
            for (const interval of intervals) {
                const idx = rootIndex + interval;
                if (idx < 0 || idx >= allNotes.length) { ok = false; break; }
                const noteObj = allNotes[idx];
                if (!allowedSet.has(noteObj.note)) { ok = false; break; }
                notes.push(noteObj);
            }
            if (ok) candidates.push({ rootIndex, inversion: inv, notes });
        }
    }
    return candidates;
}

function findCandidatesAcrossChords(chordList, allowedSet, allowedInversions) {
    const results = [];
    for (const chord of chordList) { const cands = findCandidatesForChord(chord, allowedSet, allowedInversions); if (cands && cands.length) results.push({ chord, candidates: cands }); }
    return results;
}

function showAdjustmentOptions(message) {
    const statusEl = document.getElementById('status-chord'); if (!statusEl) return; statusEl.innerHTML = '';
    const msgDiv = document.createElement('div'); msgDiv.textContent = message; statusEl.appendChild(msgDiv);
    const btnContainer = document.createElement('div'); btnContainer.style.display = 'flex'; btnContainer.style.gap = '8px'; btnContainer.style.justifyContent = 'center'; btnContainer.style.marginTop = '8px';
    const allowAllBtn = document.createElement('button'); allowAllBtn.className = 'btn'; allowAllBtn.textContent = '允许全部转位'; allowAllBtn.addEventListener('click', () => { autoAllowAllInversions(); });
    const lowerDiffBtn = document.createElement('button'); lowerDiffBtn.className = 'btn'; lowerDiffBtn.textContent = '自动降低难度'; lowerDiffBtn.addEventListener('click', () => { autoLowerDifficulty(); });
    const cancelBtn = document.createElement('button'); cancelBtn.className = 'btn'; cancelBtn.textContent = '取消'; cancelBtn.addEventListener('click', () => { updateChordStatus('已取消调整'); });
    btnContainer.appendChild(allowAllBtn); btnContainer.appendChild(lowerDiffBtn); btnContainer.appendChild(cancelBtn); statusEl.appendChild(btnContainer);
}

function autoAllowAllInversions() { chordAppState.inversion = 'all'; const invSelect = document.getElementById('inversion-chord'); if (invSelect) invSelect.value = 'all'; updateChordStatus('已允许全部转位，正在生成题目...'); setTimeout(() => { playRandomChord(); }, 200); }

function autoLowerDifficulty() {
    const allowedSet = enrichAllowedNotes(chordAppState.scaleNotes);
    const currentInv = chordAppState.inversion; let found = false;
    for (let d = chordAppState.difficulty - 1; d >= 1; d--) {
        const chordList = difficultyConfig[d].chords;
        for (const chord of chordList) {
            const maxInv = Math.max(0, chord.intervals.length - 1);
            let invs = [];
            if (!currentInv || currentInv === 'all') { for (let ii = 0; ii <= maxInv; ii++) invs.push(ii); }
            else { const v = parseInt(currentInv, 10); if (!isNaN(v) && v >= 0 && v <= maxInv) invs = [v]; else invs = [0]; }
            const cands = findCandidatesForChord(chord, allowedSet, invs);
            if (cands && cands.length) {
                chordAppState.difficulty = d; const diffSelect = document.getElementById('difficulty-chord'); if (diffSelect) diffSelect.value = d; initChordButtons(); updateInversionOptions(); updateChordStatus('已自动降低难度至 ' + difficultyConfig[d].name + '，正在生成题目...'); setTimeout(() => playRandomChord(), 200); found = true; break;
            }
        }
        if (found) break;
    }
    if (!found) updateChordStatus('无法通过降低难度找到兼容题目，请尝试允许全部转位或调整调式。');
}

function initChordButtons() {
    const container = document.getElementById('chord-layer'); if (!container) return; container.innerHTML = '';
    const currentDifficultyChords = difficultyConfig[chordAppState.difficulty].chords || [];
    currentDifficultyChords.forEach(chord => {
        const button = document.createElement('button');
        button.className = 'chord-btn';
        button.id = `chord-btn-${chord.type}`; // 添加唯一ID
        button.textContent = chord.name;
        button.dataset.chord = chord.type;
        button.addEventListener('click', () => selectChordType(chord));
        container.appendChild(button);
    });
    updateInversionOptions();
}

function switchChordTab(tabName) {
    document.querySelectorAll('.chord-tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(`${tabName}-chord-tab`).classList.add('active');
    document.querySelectorAll('.chord-layer').forEach(layer => layer.classList.remove('active'));
    document.getElementById(`${tabName}-chord-layer`).classList.add('active');
}

function resetNoteSelectionState() { chordAppState.selectedNotes = []; }
function invalidatePianoMetrics() { pianoMetrics.spacing = null; pianoMetrics.offset = null; pianoMetrics.whiteWidth = null; }
function updatePianoMetrics(pianoId = 'piano-chord') {
    const piano = document.getElementById(pianoId); if (!piano) return; const whiteKeys = piano.querySelectorAll('.white-key'); if (!whiteKeys.length) return; const pianoRect = piano.getBoundingClientRect(); const firstRect = whiteKeys[0].getBoundingClientRect(); pianoMetrics.offset = firstRect.left - pianoRect.left; pianoMetrics.whiteWidth = whiteKeys[0].offsetWidth; if (whiteKeys.length > 1) { const secondRect = whiteKeys[1].getBoundingClientRect(); pianoMetrics.spacing = secondRect.left - firstRect.left; } else { const whiteKeyStyle = window.getComputedStyle(whiteKeys[0]); const marginRight = parseFloat(whiteKeyStyle.marginRight || 0); pianoMetrics.spacing = pianoMetrics.whiteWidth + marginRight; }
    console.log(`updatePianoMetrics(${pianoId}) - offset: ${pianoMetrics.offset}, spacing: ${pianoMetrics.spacing}, whiteWidth: ${pianoMetrics.whiteWidth}`);
}

function calculateBlackKeyLeft(position) {
    if (pianoMetrics.spacing === null || pianoMetrics.offset === null || pianoMetrics.whiteWidth === null) updatePianoMetrics();
    const BLACK_KEY_WIDTH = 20;
    if (pianoMetrics.spacing === null || pianoMetrics.offset === null || pianoMetrics.whiteWidth === null) return '0px';
    const halfWhite = pianoMetrics.whiteWidth / 2; const halfBlack = BLACK_KEY_WIDTH / 2;
    // Shift black keys 2px to the left for better centering
    const offsetAdjustment = -2;
    return `${pianoMetrics.offset + position * pianoMetrics.spacing + halfWhite - halfBlack + offsetAdjustment}px`;
}

function positionBlackKeys(pianoId = 'piano-chord') {
    const piano = document.getElementById(pianoId); if (!piano) return; requestAnimationFrame(() => { updatePianoMetrics(pianoId); const blackKeys = piano.querySelectorAll('.black-key'); blackKeys.forEach(key => { const noteObj = allNotes.find(n => n.note === key.dataset.note); if (noteObj) { key.style.left = calculateBlackKeyLeft(noteObj.position); } }); });
}

function recordNoteSelection(noteObj) {
    if (!Array.isArray(chordAppState.selectedNotes)) chordAppState.selectedNotes = [];
    chordAppState.selectedNotes.push(noteObj);
    const needCount = (chordAppState.currentChord && chordAppState.currentChord.notes && chordAppState.currentChord.notes.length) ? chordAppState.currentChord.notes.length : 3;
    if (chordAppState.selectedNotes.length > needCount) chordAppState.selectedNotes = chordAppState.selectedNotes.slice(-needCount);
    if (chordAppState.selectedNotes.length === 1) updateChordStatus('已记录第一个音，请继续选择后续音'); else updateChordStatus(`已记录 ${chordAppState.selectedNotes.length} 个音，系统将在提交时以最后 ${needCount} 个音作为答案。`);
}

function getNoteIndex(noteName) { return allNotes.findIndex(n => n.note === noteName); }
function getOrderedNoteSelection() { if (!chordAppState.selectedNotes || chordAppState.selectedNotes.length === 0) return null; const sortedNotes = [...chordAppState.selectedNotes].sort((a, b) => getNoteIndex(a.note) - getNoteIndex(b.note)); return sortedNotes; }

function handlePianoClickChord(noteObj) {
    const allowedSet = enrichAllowedNotes(chordAppState.scaleNotes);
    if (chordAppState.currentMode === 'practice' && !allowedSet.has(noteObj.note)) { updateChordStatus('该音不在所选调式内，无法选择'); return; }
    if (chordAppState.currentMode !== 'test') playSingleNote(noteObj.note);
    highlightKey(noteObj.note);
    if (chordAppState.currentFunction === 'pitch') recordNoteSelection(noteObj);
}

function selectChordType(chord) {
    if (chordAppState.currentFunction === 'quality') {
        // 检查是否有当前题目
        if (!chordAppState.currentChord) {
            updateChordStatus('请先点击"随机播放"生成题目！');
            return;
        }

        chordAppState.selectedChordType = chord;
        document.querySelectorAll('.chord-btn').forEach(btn => btn.classList.remove('active'));
        let targetBtn = document.querySelector(`.chord-btn[data-chord="${chord.type}"]`);
        if (!targetBtn) { const all = Array.from(document.querySelectorAll('.chord-btn')); targetBtn = all.find(b => (b.textContent || '').trim() === (chord.name || '').trim()); }
        if (targetBtn) {
            targetBtn.classList.add('active');
            // 保存按钮ID，用于提交答案时高亮
            chordAppState.selectedChordType.buttonId = targetBtn.id;
        }
        updateChordStatus(`已选择 ${chord.name}，请点击提交答案`);
    }
}

window._melodyKeyHighlightTimers = window._melodyKeyHighlightTimers || [];
function highlightKey(note) {
    // 只高亮当前可见页面的琴键
    const currentPage = document.querySelector('.page.active');
    if (!currentPage) return;

    const key = currentPage.querySelector(`[data-note="${note}"]`);
    if (key) {
        key.classList.add('active');
    }
}

function removeHighlightKey(note) {
    // 只移除当前可见页面的琴键高亮
    const currentPage = document.querySelector('.page.active');
    if (!currentPage) return;

    const key = currentPage.querySelector(`[data-note="${note}"]`);
    if (key) {
        key.classList.remove('active');
    }
}

function highlightChordNotes(notes) {
    const currentPage = document.querySelector('.page.active');
    if (!currentPage) return;
    notes.forEach(note => {
        const key = currentPage.querySelector(`[data-note="${note}"]`);
        if (key) key.classList.add('active');
    });
}

function clearAllHighlights() {
    const currentPage = document.querySelector('.page.active');
    if (!currentPage) return;
    currentPage.querySelectorAll('.white-key.active, .black-key.active').forEach(key => key.classList.remove('active'));
}

window._melodyScheduledHighlightTimers = window._melodyScheduledHighlightTimers || [];
function scheduleKeyHighlight(note, time) {
    const delay = Math.max(0, (time - window.audioContext.currentTime) * 1000);
    const tid = setTimeout(() => {
        highlightKey(note);
        const idx = window._melodyScheduledHighlightTimers.indexOf(tid);
        if (idx !== -1) window._melodyScheduledHighlightTimers.splice(idx, 1);
    }, delay);
    window._melodyScheduledHighlightTimers.push(tid);
} function clearScheduledHighlights() { if (window._melodyScheduledHighlightTimers && window._melodyScheduledHighlightTimers.length) { window._melodyScheduledHighlightTimers.forEach(id => clearTimeout(id)); window._melodyScheduledHighlightTimers = []; } if (window._melodyKeyHighlightTimers && window._melodyKeyHighlightTimers.length) { window._melodyKeyHighlightTimers.forEach(id => clearTimeout(id)); window._melodyKeyHighlightTimers = []; } clearAllHighlights(); }




function playChord() {
    const args = Array.from(arguments);
    const notes = Array.isArray(args[0]) ? args[0] : args;
    if (!notes || notes.length === 0) return;
    chordAppState.isPlaying = true;
    ensureAudioReady().then(() => {
        const duration = 1.5;
        notes.forEach(note => {
            playNoteWithWebAudio(note, duration, 0.8);
        });
        setTimeout(() => {
            chordAppState.isPlaying = false;
        }, duration * 1000 + 40);
    }).catch(err => {
        console.warn('音频播放失败：', err);
        chordAppState.isPlaying = false;
    });
}

function playChordMelodic() {
    const args = Array.from(arguments);
    const notes = Array.isArray(args[0]) ? args[0] : args;
    if (!notes || notes.length === 0) return;
    chordAppState.isPlaying = true;
    ensureAudioReady().then(() => {
        const step = 500; // 每个音符间隔500ms
        const duration = 1.5; // 每个音符持续1.5秒

        // 使用 setTimeout 实现逐音播放
        notes.forEach((note, i) => {
            setTimeout(() => {
                playNoteWithWebAudio(note, duration);
            }, i * step);
        });

        // 播放完成后重置状态
        setTimeout(() => {
            chordAppState.isPlaying = false;
        }, (notes.length - 1) * step + duration * 1000 + 100);
    }).catch(err => {
        console.warn('和弦旋律播放失败：', err);
        chordAppState.isPlaying = false;
    });
}

function playSingleNote(note) {
    ensureAudioReady().then(() => {
        playNoteWithWebAudio(note, 1.5, 1.0);
    }).catch(err => {
        console.warn('单音播放失败：', err);
    });
}

function generateRandomChord() {
    const config = difficultyConfig[chordAppState.difficulty];
    const availableChords = config.chords;
    if (availableChords.length === 0) { updateChordStatus('当前难度没有可用的和弦'); return null; }
    const chord = availableChords[Math.floor(Math.random() * availableChords.length)];
    const allowed = enrichAllowedNotes(chordAppState.scaleNotes);
    const candidates = [];
    let allowedInversions = [];
    if (!chordAppState.inversion || chordAppState.inversion === 'all') for (let i = 0; i < chord.intervals.length; i++) allowedInversions.push(i); else { const v = parseInt(chordAppState.inversion, 10); if (!isNaN(v)) allowedInversions = [v]; else allowedInversions = [0]; }
    for (let rootIndex = 0; rootIndex < allNotes.length; rootIndex++) {
        for (const inv of allowedInversions) {
            const intervals = chord.intervals.map((it, idx) => idx < inv ? it + 12 : it);
            const notes = []; let ok = true;
            for (const interval of intervals) { const idx = rootIndex + interval; if (idx < 0 || idx >= allNotes.length) { ok = false; break; } const noteObj = allNotes[idx]; if (!allowed.has(noteObj.note)) { ok = false; break; } notes.push(noteObj); }
            if (ok) candidates.push({ rootIndex, inversion: inv, notes });
        }
    }
    if (candidates.length === 0) { showAdjustmentOptions('无法根据所选调式与转位生成和弦，请调整设置或使用下列自动调整选项：'); return null; }
    const chosen = candidates[Math.floor(Math.random() * candidates.length)]; const rootNote = allNotes[chosen.rootIndex]; const sortedNotes = chosen.notes.sort((a, b) => allNotes.findIndex(n => n.note === a.note) - allNotes.findIndex(n => n.note === b.note));
    return { chord: chord, rootNote: rootNote, notes: sortedNotes };
}

function playRandomChord() {
    if (chordAppState.isPlaying) return;
    const chordData = generateRandomChord();
    if (!chordData) {
        console.error('generateRandomChord returned null/undefined');
        return;
    }

    console.log('Generated chordData:', chordData);
    console.log('chordData.type:', chordData.type);

    chordAppState.currentChord = chordData;
    resetNoteSelectionState();
    chordAppState.selectedChordType = null;
    document.querySelectorAll('.chord-btn').forEach(btn => btn.classList.remove('active'));
    clearTestResult();
    clearAllHighlights();
    const noteNames = chordData.notes.map(note => note.note);
    playChord(noteNames);
    if (chordAppState.currentFunction === 'pitch') {
        updateChordStatus('请点击低、中、高音，系统会在提交时以最后三次点击为答案');
    } else {
        updateChordStatus('请选择和弦性质，确认后点击提交答案');
    }
}

function playCurrentChord() { if (chordAppState.currentChord && !chordAppState.isPlaying) { clearTestResult(); const noteNames = chordAppState.currentChord.notes.map(note => note.note); playChord(noteNames); } }

// 检查音准听辨答案
function checkPitchAnswer() {
    if (!chordAppState.currentChord) {
        updateChordStatus('请先播放一个和弦！');
        return;
    }

    // 获取用户选择的音符（最后3个）
    const userNotes = chordAppState.selectedNotes || [];
    if (userNotes.length < 3) {
        updateChordStatus(`请再选择${3 - userNotes.length}个音`);
        return;
    }

    // 取最后3个音符作为答案
    const lastThreeNotes = userNotes.slice(-3);

    // 对正确答案进行排序（从低到高）
    const correctNotes = chordAppState.currentChord.notes.map(n => n.note);
    const sortedCorrectNotes = [...correctNotes].sort((a, b) => getNoteIndex(a) - getNoteIndex(b));

    // 对用户选择的音符进行排序（从低到高）
    const sortedUserNotes = [...lastThreeNotes].sort((a, b) => getNoteIndex(a) - getNoteIndex(b));

    // 比较两个答案是否相同（考虑等音）
    const isCorrect = (
        (sortedUserNotes[0] === sortedCorrectNotes[0] || areEnharmonic(sortedUserNotes[0], sortedCorrectNotes[0])) &&
        (sortedUserNotes[1] === sortedCorrectNotes[1] || areEnharmonic(sortedUserNotes[1], sortedCorrectNotes[1])) &&
        (sortedUserNotes[2] === sortedCorrectNotes[2] || areEnharmonic(sortedUserNotes[2], sortedCorrectNotes[2]))
    );

    // 高亮+出声用户提交的答案
    lastThreeNotes.forEach(note => {
        highlightKey(note);
        playSingleNote(note);
    });

    // 记录学习数据（练习模式和测试模式都记录）
    learningManager.recordResult('chord', {
        question: chordAppState.currentChord.chord.name,
        chordType: chordAppState.currentChord.chord.name,
        correct: isCorrect,
        userAnswer: sortedUserNotes.join(' + '),
        correctAnswer: sortedCorrectNotes.join(' + '),
        mode: 'pitch',
        difficulty: chordAppState.scaleDifficulty || 1
    });

    // 测试模式下记录成绩并自动出下一题
    if (chordAppState.currentMode === 'test') {
        console.log('[checkPitchAnswer] 测试模式 - 答题前:', {
            totalQuestions: chordAppState.totalQuestions,
            correct: chordAppState.correct,
            wrong: chordAppState.wrong,
            score: chordAppState.score
        });

        chordAppState.totalQuestions++;

        if (isCorrect) {
            chordAppState.correct++;
            chordAppState.score += 5; // 每题5分，满分100分（20题）
            updateChordStatus(`✅ 回答正确！+5分`);
            console.log('[checkPitchAnswer] 答对！新成绩:', { score: chordAppState.score, correct: chordAppState.correct });
        } else {
            chordAppState.wrong++;
            // 记录错题 - 保存字符串即可，用于显示
            chordAppState.errorChords.push({
                correctChord: chordAppState.currentChord,
                selectedNotes: lastThreeNotes.map(n => ({
                    note: n,
                    display: n
                }))
            });
            updateChordStatus(`❌ 回答错误。正确答案是：${sortedCorrectNotes.join(' + ')}`);
            console.log('[checkPitchAnswer] 答错！新成绩:', { wrong: chordAppState.wrong });
        }

        updateChordStats();

        // 检查是否达到20题
        if (chordAppState.totalQuestions >= 20) {
            // 20题结束，自动结束测试
            setTimeout(() => {
                endChordTestMode();
            }, 2000);
        } else {
            // 测试模式下自动出下一题（2秒后）
            setTimeout(() => {
                playRandomChord();
                resetNoteSelectionState();
            }, 2000);
        }
    } else {
        // 练习模式：显示对错反馈
        if (isCorrect) {
            updateChordStatus('✅ 回答正确！');
        } else {
            updateChordStatus(`❌ 回答错误。正确答案是：${sortedCorrectNotes.join(' + ')}`);
        }
    }

    // 清空用户选择
    chordAppState.selectedNotes = [];
}

// 检查性质听辨答案
function checkQualityAnswer() {
    console.log('checkQualityAnswer called');
    console.log('selectedChordType:', chordAppState.selectedChordType);
    console.log('selectedNotes:', chordAppState.selectedNotes);
    console.log('currentChord:', chordAppState.currentChord);

    // 检查是否有当前和弦题目
    if (!chordAppState.currentChord) {
        updateChordStatus('请先点击“随机播放”生成题目！');
        return;
    }

    // 检查和弦题目是否有type属性
    if (!chordAppState.currentChord.chord || !chordAppState.currentChord.chord.type) {
        console.error('currentChord.chord.type is undefined:', chordAppState.currentChord);
        updateChordStatus('题目数据异常，请重新点击“随机播放”生成题目！');
        return;
    }

    if (!chordAppState.selectedChordType) {
        updateChordStatus('请先选择一个和弦性质！');
        return;
    }

    // 检查selectedChordType是否有name属性
    if (!chordAppState.selectedChordType.name) {
        console.error('selectedChordType.name is undefined:', chordAppState.selectedChordType);
        updateChordStatus('和弦性质数据异常，请重新选择和弦性质！');
        return;
    }

    // 判断是否正确
    const isCorrect = chordAppState.selectedChordType.name === chordAppState.currentChord.chord.name;

    // 高亮用户选择的和弦性质按钮
    if (chordAppState.selectedChordType && chordAppState.selectedChordType.buttonId) {
        const qualityBtn = document.getElementById(chordAppState.selectedChordType.buttonId);
        if (qualityBtn) {
            qualityBtn.classList.add('active');
        }
    }

    // 记录学习数据（练习模式和测试模式都记录）
    learningManager.recordResult('chord', {
        question: chordAppState.currentChord.chord.name,
        chordType: chordAppState.currentChord.chord.name,
        correct: isCorrect,
        userAnswer: chordAppState.selectedChordType.name,
        correctAnswer: chordAppState.currentChord.chord.name,
        mode: 'quality',
        difficulty: chordAppState.difficulty || 1
    });

    // 测试模式下记录成绩并自动出下一题
    if (chordAppState.currentMode === 'test') {
        console.log('[checkQualityAnswer] 测试模式 - 答题前:', {
            totalQuestions: chordAppState.totalQuestions,
            correct: chordAppState.correct,
            wrong: chordAppState.wrong,
            score: chordAppState.score
        });

        chordAppState.totalQuestions++;

        if (isCorrect) {
            chordAppState.correct++;
            chordAppState.score += 5; // 每题5分，满分100分（20题）
            updateChordStatus(`✅ 回答正确！+5分`);
            console.log('[checkQualityAnswer] 答对！新成绩:', { score: chordAppState.score, correct: chordAppState.correct });
        } else {
            chordAppState.wrong++;
            // 记录错题 - 性质听辨不记录琴键选择
            chordAppState.errorChords.push({
                correctChord: chordAppState.currentChord,
                selectedChordType: chordAppState.selectedChordType
            });
            updateChordStatus(`❌ 回答错误。正确答案是：${chordAppState.currentChord.chord.name}`);
            console.log('[checkQualityAnswer] 答错！新成绩:', { wrong: chordAppState.wrong });
        }

        updateChordStats();

        // 检查是否达到20题
        if (chordAppState.totalQuestions >= 20) {
            // 20题结束，自动结束测试
            setTimeout(() => {
                endChordTestMode();
            }, 2000);
        } else {
            // 测试模式下自动出下一题（2秒后）
            setTimeout(() => {
                playRandomChord();
                resetNoteSelectionState();
                chordAppState.selectedChordType = null;
            }, 2000);
        }
    } else {
        // 练习模式：显示对错反馈
        if (isCorrect) {
            updateChordStatus('✅ 回答正确！');
        } else {
            updateChordStatus(`❌ 回答错误。正确答案是：${chordAppState.currentChord.chord.name}`);
        }
    }

    // 清空用户选择（性质听辨只清空和弦性质选择）
    chordAppState.selectedChordType = null;
}

function submitAnswer() {
    console.log('submitAnswer called, currentFunction:', chordAppState.currentFunction);
    if (chordAppState.currentFunction === 'pitch') {
        console.log('Calling checkPitchAnswer');
        checkPitchAnswer();
    } else {
        console.log('Calling checkQualityAnswer');
        checkQualityAnswer();
    }
}

function showAnswer() {
    if (!chordAppState.currentChord) {
        updateChordStatus('请先播放一个和弦！');
        return;
    }

    if (chordAppState.currentFunction === 'pitch') {
        // 音准听辨：高亮+出声正确答案的音符
        clearAllHighlights();
        const noteNames = chordAppState.currentChord.notes.map(note => note.note);
        highlightChordNotes(noteNames);
        playChord(noteNames);
        updateChordStatus(`正确答案：${chordAppState.currentChord.notes.map(n => n.display.replace('<br>', '/')).join(' - ')}，已高亮并播放`);
    } else {
        // 性质听辨：高亮正确答案的和弦性质按钮 + 高亮+出声正确答案的音符
        clearAllHighlights();

        // 高亮正确的和弦性质按钮
        const correctChordType = chordAppState.currentChord.chord.type;
        const correctBtn = document.querySelector(`.chord-btn[data-chord="${correctChordType}"]`);
        if (correctBtn) {
            correctBtn.classList.add('active');
        }

        // 高亮+出声正确答案的音符
        const noteNames = chordAppState.currentChord.notes.map(note => note.note);
        highlightChordNotes(noteNames);
        playChord(noteNames);

        updateChordStatus(`正确答案：${chordAppState.currentChord.chord.name}，已高亮并播放`);
    }
}

// 结束和弦测试模式
function endChordTestMode() {
    chordAppState.currentMode = 'practice';
    chordAppState.testInProgress = false;
    chordAppState.testEndTime = new Date();

    const endBtn = document.getElementById('end-test-btn-chord');
    if (endBtn) endBtn.style.display = 'none';

    updateChordStatus('测试已结束');

    // 隐藏计分板和计时器
    const statsPanel = document.getElementById('stats-panel-chord');
    if (statsPanel) statsPanel.style.display = 'none';

    const timePanel = document.getElementById('time-panel-chord');
    if (timePanel) timePanel.style.display = 'none';

    // 停止计时器
    stopTimeUpdate();
    stopChordElapsedTimeTimer();

    // 更新风云榜单
    updateChordLeaderboard();

    // 隐藏钢琴、按钮和练习说明，显示测试结果
    const pianoContainer = document.getElementById('piano-container-chord');
    const playControls = document.getElementById('play-controls-chord');
    const testEndContent = document.getElementById('chord-test-end-content');
    const buttonsContainer = document.getElementById('chord-buttons-container');

    if (pianoContainer) pianoContainer.style.display = 'none';
    if (playControls) playControls.style.display = 'none';
    if (buttonsContainer) buttonsContainer.style.display = 'none';
    if (testEndContent) testEndContent.style.display = 'block';

    // 隐藏风云榜单
    const leaderboardContent = document.getElementById('leaderboard-content-chord');
    if (leaderboardContent) leaderboardContent.style.display = 'none';

    // 隐藏练习说明
    const instructions = document.querySelector('#practice-test-content-chord .practice-instructions');
    if (instructions) instructions.style.display = 'none';

    // 显示测试结果分析
    showChordTestEndPage();
}

function showChordTestAnalysis() {
    const testAnalysis = document.getElementById('test-analysis-chord'); let analysisHTML = `
        <h3>测试结果分析</h3>
        <div class="analysis-section">
            <h4>📊 测试概况</h4>
            <p>本次测试共完成 20 题，答对 ${chordAppState.correct} 题，正确率 ${Math.round(chordAppState.correct / 20 * 100)}%。</p>
            <p>音准听辨：${chordAppState.pitchCorrect}/10 正确</p>
            <p>性质听辨：${chordAppState.qualityCorrect}/10 正确</p>
        </div>
    `;
    if (chordAppState.errorChords.length > 0) {
        analysisHTML += `
            <div class="analysis-section">
                <h4>⚠️ 高频错误和弦</h4>
                <p>您对以下和弦的辨识需要加强：</p>
                <ul>`;
        const errorCounts = {};
        chordAppState.errorChords.forEach(error => { const chordName = error.correctChord.chord.name; errorCounts[chordName] = (errorCounts[chordName] || 0) + 1; });
        const highErrorChords = Object.entries(errorCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
        highErrorChords.forEach(([chord, count]) => { analysisHTML += `<li>${chord} (错误 ${count} 次)</li>`; });
        analysisHTML += `</ul></div>`;
    }
    analysisHTML += `
        <div class="analysis-section">
            <h4>💡 学习建议</h4>
            <p>1. 针对高频错误和弦进行专项练习</p>
            <p>2. 尝试在钢琴上反复弹奏这些和弦，加深印象</p>
            <p>3. 练习时注意区分不同和弦的色彩差异</p>
            <p>4. 保持每天练习，逐步提高和弦辨识能力</p>
        </div>
    `;
    testAnalysis.innerHTML = analysisHTML; testAnalysis.style.display = 'block';
}

function setChordInteractiveVisibility(visible) { const functionTabs = document.querySelector('.function-tabs'); const pianoContainer = document.getElementById('piano-container-chord'); const qualityButtons = document.getElementById('chord-buttons-container'); const playControls = document.getElementById('play-controls-chord'); if (functionTabs) functionTabs.style.display = visible ? 'flex' : 'none'; if (pianoContainer) pianoContainer.style.display = visible ? 'block' : 'none'; if (playControls) playControls.style.display = visible ? 'flex' : 'none'; if (qualityButtons) { if (visible && chordAppState.currentFunction === 'quality') qualityButtons.style.display = 'block'; else qualityButtons.style.display = 'none'; } }

function setSingleInteractiveVisibility(visible) { const pianoContainer = document.getElementById('piano-container-single'); const playControls = document.getElementById('play-controls-single'); if (pianoContainer) pianoContainer.style.display = visible ? 'block' : 'none'; if (playControls) playControls.style.display = visible ? 'flex' : 'none'; }

function setIntervalInteractiveVisibility(visible) { const pianoContainer = document.getElementById('piano-container-interval'); const playControls = document.getElementById('play-controls-interval'); if (pianoContainer) pianoContainer.style.display = visible ? 'block' : 'none'; if (playControls) playControls.style.display = visible ? 'flex' : 'none'; }

function setMelodyInteractiveVisibility(visible) { const pianoContainer = document.getElementById('piano-container-melody'); const playControls = document.getElementById('play-controls-melody'); if (pianoContainer) pianoContainer.style.display = visible ? 'block' : 'none'; if (playControls) playControls.style.display = visible ? 'flex' : 'none'; }

function setRhythmInteractiveVisibility(visible) { const rhythmArea = document.getElementById('rhythm-area'); const playControls = document.getElementById('play-controls-rhythm'); if (rhythmArea) rhythmArea.style.display = visible ? 'block' : 'none'; if (playControls) playControls.style.display = visible ? 'flex' : 'none'; }

// ==================== 按钮状态管理 ====================

function updateChordButtonStates() { const randomPlayBtn = document.getElementById('random-play-btn-chord'); const playBtn = document.getElementById('play-btn-chord'); const melodicBtn = document.getElementById('play-melodic-btn-chord'); const submitBtn = document.getElementById('submit-btn-chord'); const endTestBtn = document.getElementById('end-test-btn-chord'); const unitTestBtn = document.getElementById('unit-test-btn-chord'); const showAnswerBtn = document.getElementById('show-answer-btn-chord'); if (chordAppState.currentMode === 'practice') { if (randomPlayBtn) randomPlayBtn.disabled = false; if (playBtn) playBtn.disabled = false; if (melodicBtn) melodicBtn.disabled = false; if (submitBtn) submitBtn.disabled = false; if (endTestBtn) endTestBtn.style.display = 'none'; if (showAnswerBtn) showAnswerBtn.disabled = false; } else if (chordAppState.currentMode === 'test') { if (randomPlayBtn) randomPlayBtn.disabled = true; if (playBtn) playBtn.disabled = false; if (melodicBtn) melodicBtn.disabled = true; if (submitBtn) submitBtn.disabled = false; if (endTestBtn) endTestBtn.style.display = 'block'; if (showAnswerBtn) showAnswerBtn.disabled = true; } }

// ==================== 模式切换功能 ====================

function switchToPitchIdentificationChord() {
    chordAppState.currentFunction = 'pitch';
    const b1 = document.getElementById('pitch-identification-btn-chord');
    const b2 = document.getElementById('quality-identification-btn-chord');
    if (b1) b1.classList.add('active');
    if (b2) b2.classList.remove('active');
    const cb = document.getElementById('chord-buttons-container');

    // 如果在榜单模式，不显示性质按钮容器
    if (chordAppState.currentMode === 'leaderboard') {
        if (cb) cb.style.display = 'none';
        // 重新渲染榜单
        renderChordLeaderboard();
    } else {
        if (cb) cb.style.display = 'none';
    }

    // 音准听辨模式下始终显示钢琴键盘（包括测试模式）
    const pianoContainer = document.getElementById('piano-container-chord');
    if (pianoContainer) pianoContainer.style.display = 'block';

    resetNoteSelectionState();
    clearAllHighlights(); // 清除所有高亮
    updateChordStatus('请点击低、中、高音，最后三次点击的琴键将作为提交答案');
}

function switchToQualityIdentificationChord() {
    chordAppState.currentFunction = 'quality';
    const b1 = document.getElementById('quality-identification-btn-chord');
    const b2 = document.getElementById('pitch-identification-btn-chord');
    if (b1) b1.classList.add('active');
    if (b2) b2.classList.remove('active');
    resetNoteSelectionState();
    clearAllHighlights(); // 清除所有高亮
    const cb = document.getElementById('chord-buttons-container');

    // 如果在榜单模式，不显示性质按钮容器
    if (chordAppState.currentMode === 'leaderboard') {
        if (cb) cb.style.display = 'none';
        // 重新渲染榜单
        renderChordLeaderboard();
    } else {
        if (cb) cb.style.display = 'block';
    }

    // 性质听辨测试模式下隐藏钢琴键盘
    const pianoContainer = document.getElementById('piano-container-chord');
    if (chordAppState.currentMode === 'test') {
        if (pianoContainer) pianoContainer.style.display = 'none';
    } else {
        if (pianoContainer) pianoContainer.style.display = 'block';
    }

    updateChordStatus('请选择和弦性质，确认后点击提交答案');
}

// 开始和弦练习模式
function startChordPracticeMode() {
    chordAppState.currentMode = 'practice';
    chordAppState.testInProgress = false;

    // 隐藏计分板和时间面板
    const statsPanel = document.getElementById('stats-panel-chord');
    if (statsPanel) statsPanel.style.display = 'none';

    const timePanel = document.getElementById('time-panel-chord');
    if (timePanel) timePanel.style.display = 'none';

    // 显示练习说明
    const instructions = document.querySelector('#practice-test-content-chord .practice-instructions');
    if (instructions) instructions.style.display = 'block';

    // 隐藏测试结束内容和榜单
    const testEndContent = document.getElementById('chord-test-end-content');
    if (testEndContent) testEndContent.style.display = 'none';

    const leaderboardContent = document.getElementById('leaderboard-content-chord');
    if (leaderboardContent) leaderboardContent.style.display = 'none';

    // 显示钢琴和按钮
    setChordInteractiveVisibility(true);

    // 更新状态
    const config = difficultyConfig[chordAppState.difficulty];
    updateChordStatus(`已切换到练习模式 - ${config.name}：${config.description}`);

    // 清除测试结果
    clearTestResult();

    // 更新按钮状态
    updateChordButtonStates();

    // 停止计时器
    stopTimeUpdate();
    stopChordElapsedTimeTimer();
}

// 开始和弦测试模式
function startChordTestMode() {
    if (!chordAppState.userInfo.saved) {
        userManager.showSaveStatus('未保存学生信息（可跳过）', 'error');
        setTimeout(() => userManager.hideSaveStatus(), 1800);
    }

    chordAppState.currentMode = 'test';
    chordAppState.testInProgress = true;
    chordAppState.score = 0;
    chordAppState.correct = 0;
    chordAppState.wrong = 0;
    chordAppState.totalQuestions = 0;
    chordAppState.pitchCorrect = 0;
    chordAppState.qualityCorrect = 0;
    chordAppState.errorChords = [];
    resetNoteSelectionState();
    chordAppState.selectedChordType = null;
    chordAppState.testStartTime = new Date();

    // 隐藏练习说明
    const instructions = document.querySelector('#practice-test-content-chord .practice-instructions');
    if (instructions) instructions.style.display = 'none';

    // 显示计分板和时间面板
    const statsPanel = document.getElementById('stats-panel-chord');
    if (statsPanel) statsPanel.style.display = 'flex';

    const timePanel = document.getElementById('time-panel-chord');
    if (timePanel) timePanel.style.display = 'block';

    // 隐藏测试结束内容和榜单
    const testEndContent = document.getElementById('chord-test-end-content');
    if (testEndContent) testEndContent.style.display = 'none';

    const leaderboardContent = document.getElementById('leaderboard-content-chord');
    if (leaderboardContent) leaderboardContent.style.display = 'none';

    // 启动计时器
    startTimeUpdate();
    startChordElapsedTimeTimer();

    // 更新统计和进度
    updateChordStats();
    updateChordProgress();

    // 更新按钮状态
    updateChordButtonStates();

    // 如果是性质听辨测试模式，隐藏钢琴键盘
    if (chordAppState.currentFunction === 'quality') {
        const pianoContainer = document.getElementById('piano-container-chord');
        if (pianoContainer) pianoContainer.style.display = 'none';
    }

    // 自动出第一题
    playRandomChord();

    updateChordStatus('测试已开始，请认真听题并作答');
}

// ==================== 时间管理功能 ====================
function startTimeUpdate() {
    if (chordAppState.testTimer) clearInterval(chordAppState.testTimer);
    chordAppState.testTimer = setInterval(() => { updateCurrentTime(); }, 1000);
    updateCurrentTime();
}

function stopTimeUpdate() {
    if (chordAppState.testTimer) {
        clearInterval(chordAppState.testTimer);
        chordAppState.testTimer = null;
    }
}

function updateCurrentTime() {
    const timeDisplay = document.getElementById('current-time-chord');
    if (timeDisplay) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}

// 启动和弦用时计时器
function startChordElapsedTimeTimer() {
    // 先停止之前的计时器（防止重复启动）
    stopChordElapsedTimeTimer();

    chordAppState.elapsedTime = 0;
    updateChordElapsedTimeDisplay();

    chordAppState.elapsedTimeTimer = setInterval(() => {
        chordAppState.elapsedTime += 0.01; // 每 10 毫秒增加

        // 保护机制：如果用时超过 60 分钟（3600秒），自动停止
        if (chordAppState.elapsedTime > 3600) {
            console.warn('⚠️ 测试用时超过60分钟，自动停止计时器');
            stopChordElapsedTimeTimer();
            updateChordStatus('测试时间过长，已自动结束。请重新开始测试。');
            setTimeout(() => endChordTestMode(), 2000);
            return;
        }

        updateChordElapsedTimeDisplay();
    }, 10);
}

// 停止和弦用时计时器
function stopChordElapsedTimeTimer() {
    if (chordAppState.elapsedTimeTimer) {
        clearInterval(chordAppState.elapsedTimeTimer);
        chordAppState.elapsedTimeTimer = null;
    }
}

// 更新和弦用时显示
function updateChordElapsedTimeDisplay() {
    const elapsedTimeDisplay = document.getElementById('elapsed-time-chord');
    if (elapsedTimeDisplay) {
        const totalSeconds = chordAppState.elapsedTime;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const display = `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`;
        elapsedTimeDisplay.textContent = display;
    }
}

function resetChordTestProgress() { if (confirm('确定要清零测试进度吗？这将重置所有分数和进度。')) { chordAppState.score = 0; chordAppState.correct = 0; chordAppState.wrong = 0; chordAppState.totalQuestions = 0; chordAppState.pitchCorrect = 0; chordAppState.qualityCorrect = 0; chordAppState.errorChords = []; chordAppState.testStartTime = new Date(); chordAppState.testEndTime = null; updateChordStats(); updateChordProgress(); if (chordAppState.currentMode === 'test') playRandomChord(); updateChordStatus('测试进度已清零，重新开始测试'); } }

function startChordUnitTestMode() { alert('单元测验功能正在开发中，敬请期待！'); return; }

// 显示和弦测试结束页（在当前页面内显示）
function showChordTestEndPage() {
    // 调试信息：打印当前成绩状态
    console.log('=== 测试结束页显示 ===');
    console.log('score:', chordAppState.score);
    console.log('correct:', chordAppState.correct);
    console.log('wrong:', chordAppState.wrong);
    console.log('totalQuestions:', chordAppState.totalQuestions);
    console.log('elapsedTime:', chordAppState.elapsedTime);
    console.log('errorChords.length:', chordAppState.errorChords.length);

    // 填充学生信息
    document.getElementById('end-school-chord').textContent = chordAppState.userInfo.school;
    document.getElementById('end-major-class-chord').textContent = chordAppState.userInfo.majorClass;
    document.getElementById('end-name-chord').textContent = chordAppState.userInfo.name;
    document.getElementById('end-teacher-chord').textContent = chordAppState.userInfo.teacher;
    document.getElementById('end-total-score-chord').textContent = chordAppState.score;

    // 填充测试结束时间
    const endTime = chordAppState.testEndTime || new Date();
    const fmt = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        const ss = String(d.getSeconds()).padStart(2, '0');
        return `${y}-${m}-${day} ${hh}:${mm}:${ss}`;
    };
    document.getElementById('end-time-chord').textContent = fmt(endTime);

    // 生成分析内容
    generateChordAnalysisContent();

    // 隐藏钢琴、按钮、练习说明和状态消息
    const pianoContainer = document.getElementById('piano-container-chord');
    if (pianoContainer) pianoContainer.style.display = 'none';

    const playControls = document.getElementById('play-controls-chord');
    if (playControls) playControls.style.display = 'none';

    const buttonsContainer = document.getElementById('chord-buttons-container');
    if (buttonsContainer) buttonsContainer.style.display = 'none';

    const instructions = document.querySelector('#practice-test-content-chord .practice-instructions');
    if (instructions) instructions.style.display = 'none';

    // 隐藏状态消息
    const statusMessage = document.getElementById('status-chord');
    if (statusMessage) statusMessage.style.display = 'none';

    // 显示测试结束内容
    const testEndContent = document.getElementById('chord-test-end-content');
    if (testEndContent) testEndContent.style.display = 'block';
}

function generateChordAnalysisContent() {
    const analysisContent = document.getElementById('analysis-content-chord');
    let analysisHTML = '';

    // 成绩统计
    analysisHTML += `<div class="analysis-section">`;
    analysisHTML += `<h4>成绩统计</h4>`;

    // 第一行：总题数 + 正确题数 + 错误题数
    analysisHTML += `<div class="stats-row">`;
    analysisHTML += `<span><strong>总题数：</strong>${chordAppState.totalQuestions} 题</span>`;
    analysisHTML += `<span><strong>正确题数：</strong>${chordAppState.correct} 题</span>`;
    analysisHTML += `<span><strong>错误题数：</strong>${chordAppState.wrong} 题</span>`;
    analysisHTML += `</div>`;

    // 第二行：正确率 + 用时
    const accuracy = chordAppState.totalQuestions > 0
        ? ((chordAppState.correct / chordAppState.totalQuestions) * 100).toFixed(1)
        : 0;
    const elapsedSeconds = chordAppState.elapsedTime || 0;
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = (elapsedSeconds % 60).toFixed(2);
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.padStart(5, '0')}`;

    analysisHTML += `<div class="stats-row">`;
    analysisHTML += `<span><strong>正确率：</strong>${accuracy}%</span>`;
    analysisHTML += `<span><strong>用时：</strong>${timeStr}</span>`;
    analysisHTML += `</div>`;

    analysisHTML += `</div>`;

    // 测试评语（追加，不是覆盖）
    if (chordAppState.score === 100) {
        analysisHTML += `
            <div class="analysis-section">
                <h4>🎉 完美表现！</h4>
                <p>您在本次和弦听辨测试中获得了满分！表现非常出色！</p>
                <p>建议您可以尝试提高难度级别，继续挑战自己。</p>
            </div>
        `;
    } else if (chordAppState.score >= 80) {
        analysisHTML += `
            <div class="analysis-section">
                <h4>👍 优秀表现</h4>
                <p>您在本次和弦听辨测试中表现优秀，得分 ${chordAppState.score} 分。</p>
                <p>建议继续练习，争取获得更高分数。</p>
            </div>
        `;
    } else if (chordAppState.score >= 60) {
        analysisHTML += `
            <div class="analysis-section">
                <h4>📚 良好基础</h4>
                <p>您在本次和弦听辨测试中表现良好，得分 ${chordAppState.score} 分。</p>
                <p>建议加强练习，特别是对容易混淆的和弦进行专项训练。</p>
            </div>
        `;
    } else {
        analysisHTML += `
            <div class="analysis-section">
                <h4>💪 需要加强</h4>
                <p>您在本次和弦听辨测试中得分 ${chordAppState.score} 分，需要加强练习。</p>
                <p>和弦辨识是音乐学习的基础，建议从简单的三和弦开始练习。</p>
                <p>坚持每天练习，您的和弦辨识能力会逐步提高。</p>
            </div>
        `;
    }
    if (chordAppState.errorChords.length > 0) {
        analysisHTML += `
            <div class="analysis-section">
                <h4>📝 错误分析</h4>
                <p>您在 ${chordAppState.errorChords.length} 道题目中出现了错误，以下是详细分析：</p>
            </div>
        `;
        const wrongAnswersList = document.getElementById('wrong-answers-list-chord');
        const wrongAnswersContent = document.getElementById('wrong-answers-content-chord');
        if (wrongAnswersList) wrongAnswersList.style.display = 'block';
        let wrongAnswersHTML = '';
        chordAppState.errorChords.forEach((error, index) => {
            if (error.selectedNotes && error.selectedNotes.length > 0) {
                // 安全地获取音符显示文本
                const userAns = error.selectedNotes.map(n => {
                    if (!n || !n.display) return '?';
                    return n.display.replace('<br>', '/');
                }).join(' - ');
                const correctAns = error.correctChord.notes.map(n => {
                    if (!n || !n.display) return '?';
                    return n.display.replace('<br>', '/');
                }).join(' - ');
                wrongAnswersHTML += `
                    <div class="wrong-answer-item">
                        <span>第${index + 1}题（音准）：</span>
                        <span>您的答案: ${userAns}</span>
                        <span>正确答案: ${correctAns}</span>
                    </div>
                `;
            } else if (error.selectedChordType) {
                wrongAnswersHTML += `
                    <div class="wrong-answer-item">
                        <span>第${index + 1}题（性质）：</span>
                        <span>您的答案: ${error.selectedChordType.name}</span>
                        <span>正确答案: ${error.correctChord.chord.name}</span>
                    </div>
                `;
            }
        });
        if (wrongAnswersContent) wrongAnswersContent.innerHTML = wrongAnswersHTML;
    }
    let encouragement = '';
    if (chordAppState.score === 100) encouragement = '🎉 太棒了！您已接近完美，继续保持！'; else if (chordAppState.score >= 80) encouragement = '👍 优秀表现，请继续巩固与提高！'; else if (chordAppState.score >= 60) encouragement = '📈 良好基础，继续练习会更稳固成绩！'; else encouragement = '💪 别气馁，多练习、分步骤攻克弱项！';
    analysisHTML += `<div class="analysis-section"><h4>鼓励语</h4><p>${encouragement}</p></div>`;
    analysisContent.innerHTML = analysisHTML;
}

function updateChordStatus(msg) { const statusEl = document.getElementById('status-chord'); if (statusEl) statusEl.textContent = msg; }
function updateTestResult(msg, isCorrect) { const resultEl = document.getElementById('test-result-chord'); if (resultEl) { resultEl.textContent = msg; resultEl.className = `test-result ${isCorrect ? 'correct' : 'wrong'}`; } }
function clearTestResult() { const resultEl = document.getElementById('test-result-chord'); if (resultEl) { resultEl.textContent = ''; resultEl.className = 'test-result'; } }
function updateChordStats() {
    const el1 = document.getElementById('score-chord');
    const el2 = document.getElementById('correct-chord');
    const el3 = document.getElementById('wrong-chord');
    if (el1) el1.textContent = chordAppState.score;
    if (el2) el2.textContent = chordAppState.correct;
    if (el3) el3.textContent = chordAppState.wrong;
}

function updateChordProgress() {
    const el = document.getElementById('progress-chord');
    if (el) el.textContent = `${chordAppState.totalQuestions}题`;
    if (chordAppState.totalQuestions >= 20 && chordAppState.testTimer) {
        stopTimeUpdate();
        stopChordElapsedTimeTimer();
        chordAppState.testEndTime = new Date();

        // 更新风云榜单
        updateChordLeaderboard();

        showChordTestEndPage();
    }
}

// 更新和弦按钮状态
function updateChordButtonStates() {
    const practiceBtn = document.getElementById('practice-btn-chord');
    const testBtn = document.getElementById('test-btn-chord');
    const leaderboardBtn = document.getElementById('leaderboard-btn-chord');
    const endTestBtn = document.getElementById('end-test-btn-chord');
    const randomPlayBtn = document.getElementById('random-play-btn-chord');
    const melodicPlayBtn = document.getElementById('play-melodic-btn-chord');
    const showAnswerBtn = document.getElementById('show-answer-btn-chord');

    if (chordAppState.currentMode === 'test') {
        // 测试模式
        if (practiceBtn) practiceBtn.classList.remove('active');
        if (testBtn) testBtn.classList.add('active');
        if (leaderboardBtn) leaderboardBtn.classList.remove('active');
        if (endTestBtn) endTestBtn.style.display = 'block';
        // 测试模式下锁死随机播放、旋律播放和显示答案按钮
        if (randomPlayBtn) randomPlayBtn.disabled = true;
        if (melodicPlayBtn) melodicPlayBtn.disabled = true;
        if (showAnswerBtn) showAnswerBtn.disabled = true;

        // 测试模式下锁死非当前功能模式的按钮
        const pitchBtn = document.getElementById('pitch-identification-btn-chord');
        const qualityBtn = document.getElementById('quality-identification-btn-chord');
        if (chordAppState.currentFunction === 'pitch') {
            // 和弦音准听辨测试模式：和弦音准听辨按钮激活，和弦性质听辨按钮锁死
            if (pitchBtn) {
                pitchBtn.disabled = false;
                pitchBtn.style.opacity = '';
                pitchBtn.style.cursor = '';
                pitchBtn.style.pointerEvents = '';
            }
            if (qualityBtn) {
                qualityBtn.disabled = true;
                qualityBtn.style.opacity = '0.4';
                qualityBtn.style.cursor = 'not-allowed';
                qualityBtn.style.pointerEvents = 'none';
            }
        } else if (chordAppState.currentFunction === 'quality') {
            // 和弦性质听辨测试模式：和弦性质听辨按钮激活，和弦音准听辨按钮锁死
            if (pitchBtn) {
                pitchBtn.disabled = true;
                pitchBtn.style.opacity = '0.4';
                pitchBtn.style.cursor = 'not-allowed';
                pitchBtn.style.pointerEvents = 'none';
            }
            if (qualityBtn) {
                qualityBtn.disabled = false;
                qualityBtn.style.opacity = '';
                qualityBtn.style.cursor = '';
                qualityBtn.style.pointerEvents = '';
            }
        }
    } else if (chordAppState.currentMode === 'leaderboard') {
        // 榜单模式
        if (practiceBtn) practiceBtn.classList.remove('active');
        if (testBtn) testBtn.classList.remove('active');
        if (leaderboardBtn) leaderboardBtn.classList.add('active');
        if (endTestBtn) endTestBtn.style.display = 'none';
        // 榜单模式下锁死所有播放按钮
        if (randomPlayBtn) randomPlayBtn.disabled = true;
        if (melodicPlayBtn) melodicPlayBtn.disabled = true;
        if (showAnswerBtn) showAnswerBtn.disabled = true;
    } else {
        // 练习模式
        if (practiceBtn) practiceBtn.classList.add('active');
        if (testBtn) testBtn.classList.remove('active');
        if (leaderboardBtn) leaderboardBtn.classList.remove('active');
        if (endTestBtn) endTestBtn.style.display = 'none';
        // 练习模式下启用所有按钮
        if (randomPlayBtn) randomPlayBtn.disabled = false;
        if (melodicPlayBtn) melodicPlayBtn.disabled = false;
        if (showAnswerBtn) showAnswerBtn.disabled = false;

        // 练习模式下解锁功能按钮
        const pitchBtn = document.getElementById('pitch-identification-btn-chord');
        const qualityBtn = document.getElementById('quality-identification-btn-chord');
        if (pitchBtn) {
            pitchBtn.disabled = false;
            pitchBtn.style.opacity = '';
            pitchBtn.style.cursor = '';
            pitchBtn.style.pointerEvents = '';
        }
        if (qualityBtn) {
            qualityBtn.disabled = false;
            qualityBtn.style.opacity = '';
            qualityBtn.style.cursor = '';
            qualityBtn.style.pointerEvents = '';
        }
    }
}

// 更新和弦风云榜单
function updateChordLeaderboard() {
    const userInfo = chordAppState.userInfo;

    // 如果没有学生信息，不记录
    if (!userInfo || !userInfo.name) {
        return;
    }

    // 获取当前设置
    const currentFunction = chordAppState.currentFunction || 'pitch';
    const currentScale = scaleDifficultyConfig[chordAppState.scaleDifficulty]?.name || '未选择';
    const difficultySelect = document.getElementById('difficulty-chord');
    const currentLevel = difficultySelect ? difficultySelect.value || '未选择' : '未选择';

    // 使用组合键存储不同配置的榜单
    const storageKey = `chordLeaderboard_${currentFunction}_${currentScale}_${currentLevel}`;

    // 从 localStorage 加载榜单
    const savedLeaderboard = localStorage.getItem(storageKey);
    chordAppState.leaderboard = savedLeaderboard ? JSON.parse(savedLeaderboard) : [];

    // 添加新记录
    const newRecord = {
        name: userInfo.name,
        school: userInfo.school || '未填写',
        majorClass: userInfo.majorClass || '未填写',
        score: chordAppState.score,
        time: chordAppState.elapsedTime,
        function: currentFunction,
        scale: currentScale,
        level: currentLevel,
        date: chordAppState.testEndTime ? chordAppState.testEndTime.toLocaleString('zh-CN') : new Date().toLocaleString('zh-CN')
    };

    chordAppState.leaderboard.push(newRecord);

    // 排序：先按分数降序，再按用时升序
    chordAppState.leaderboard.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score; // 分数高的排前面
        }
        return a.time - b.time; // 用时短的排前面
    });

    // 只保留前 10 名
    chordAppState.leaderboard = chordAppState.leaderboard.slice(0, 10);

    // 保存到 localStorage
    localStorage.setItem(storageKey, JSON.stringify(chordAppState.leaderboard));
}

// 显示和弦风云榜单
function showChordLeaderboard() {
    chordAppState.currentMode = 'leaderboard';

    const leaderboardContent = document.getElementById('leaderboard-content-chord');
    const pianoContainer = document.getElementById('piano-container-chord');
    const playControls = document.getElementById('play-controls-chord');
    const testEndContent = document.getElementById('chord-test-end-content');
    const buttonsContainer = document.getElementById('chord-buttons-container');
    const instructions = document.querySelector('#practice-test-content-chord .practice-instructions');
    const statsPanel = document.getElementById('stats-panel-chord');
    const timePanel = document.getElementById('time-panel-chord');
    const statusMessage = document.getElementById('status-chord');

    // 隐藏其他内容（包括钢琴琴键）
    if (pianoContainer) pianoContainer.style.display = 'none';
    if (playControls) playControls.style.display = 'none';
    if (testEndContent) testEndContent.style.display = 'none';
    if (buttonsContainer) buttonsContainer.style.display = 'none';
    if (instructions) instructions.style.display = 'none';
    if (statsPanel) statsPanel.style.display = 'none';
    if (timePanel) timePanel.style.display = 'none';
    if (statusMessage) statusMessage.style.display = 'none';

    // 显示榜单
    if (leaderboardContent) leaderboardContent.style.display = 'block';

    // 更新按钮状态
    updateChordButtonStates();

    // 渲染榜单数据
    renderChordLeaderboard();
}

// 渲染和弦榜单数据
function renderChordLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list-chord');
    if (!leaderboardList) return;

    // 获取当前设置
    const currentFunction = chordAppState.currentFunction || 'pitch';
    const currentScale = scaleDifficultyConfig[chordAppState.scaleDifficulty]?.name || '未选择';
    const difficultySelect = document.getElementById('difficulty-chord');
    const currentLevel = difficultySelect ? difficultySelect.value || '未选择' : '未选择';

    // 使用组合键加载对应配置的榜单
    const storageKey = `chordLeaderboard_${currentFunction}_${currentScale}_${currentLevel}`;

    const savedLeaderboard = localStorage.getItem(storageKey);
    const leaderboard = savedLeaderboard ? JSON.parse(savedLeaderboard) : [];

    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = '<div style="text-align: center; padding: 40px; color: rgba(255, 255, 255, 0.5);">暂无榜单数据</div>';
        return;
    }

    let html = '';
    leaderboard.forEach((record, index) => {
        const rank = index + 1;
        const rankClass = rank <= 3 ? `lb-rank-${rank}` : '';
        const timeStr = formatElapsedTime(record.time);

        html += `
            <div class="leaderboard-row ${rankClass}">
                <div class="lb-rank-value">${rank}</div>
                <div class="lb-name-value">${record.name}</div>
                <div class="lb-score-value">${record.score}</div>
                <div class="lb-time-value">${timeStr}</div>
            </div>
        `;
    });

    leaderboardList.innerHTML = html;
}

// 清空和弦榜单
function clearChordLeaderboard() {
    if (confirm('确定要清空风云榜单吗？此操作不可恢复！')) {
        // 获取当前设置
        const currentFunction = chordAppState.currentFunction || 'pitch';
        const currentScale = scaleDifficultyConfig[chordAppState.scaleDifficulty]?.name || '未选择';
        const difficultySelect = document.getElementById('difficulty-chord');
        const currentLevel = difficultySelect ? difficultySelect.value || '未选择' : '未选择';

        // 使用组合键删除对应配置的榜单
        const storageKey = `chordLeaderboard_${currentFunction}_${currentScale}_${currentLevel}`;
        localStorage.removeItem(storageKey);
        chordAppState.leaderboard = [];
        renderChordLeaderboard();
        alert('榜单已清空');
    }
}

function init() {
    // 初始不自动加载本地学生信息，保持默认空白状态
    // 若需要恢复上次保存的信息，请使用“加载/恢复”按钮手动触发
    initHomePage();
    initChordPage();
    initWindowControls();
    initEndPage();
    window.addEventListener('resize', () => { invalidatePianoMetrics(); positionBlackKeys(); });
    setupAudioUnlock();

    // 初始化学习功能
    initLearningFeatures();

    // 像 Web Piano 一样：不在页面加载时初始化 MIDI，等待用户首次交互
    console.log('⏳ MIDI 将在用户首次点击或触摸时初始化');
    updateMidiStatus(false, '等待连接');
    initMidiConnectButtons();

    // 在用户首次点击或触摸时初始化 MIDI（与 Web Piano 完全一致）
    document.body.addEventListener('touchstart', () => {
        console.log('👆 检测到触摸事件，初始化 MIDI...');
        initMIDI();
    }, { once: true });

    document.body.addEventListener('click', () => {
        console.log('🖱️ 检测到点击事件，初始化 MIDI...');
        initMIDI();
    }, { once: true });

    console.log('系统初始化完成');
}

function initHomePage() {
    document.querySelectorAll('.mode-card').forEach(card => {
        card.addEventListener('click', function () {
            if (!this.classList.contains('active')) return;
            const mode = this.dataset.mode;
            if (!chordAppState.userInfo.saved) { userManager.showSaveStatus('请先填写并保存学生信息，才能进入练习模式', 'error'); setTimeout(() => userManager.hideSaveStatus(), 3000); return; }
            switch (mode) {
                case 'pitch': pageManager.switchToPage('single-page'); break;
                case 'interval': pageManager.switchToPage('interval-page'); break;
                case 'chord': pageManager.switchToPage('chord-page'); break;
                case 'rhythm': pageManager.switchToPage('rhythm-page'); break;
                case 'melody': pageManager.switchToPage('melody-page'); break;
                case 'comprehensive-exam': alert('📊 综合考试功能正在开发中，敬请期待！'); break;
            }
        });
    });
    const saveBtn = document.getElementById('save-user'); if (saveBtn) saveBtn.addEventListener('click', function () { userManager.saveUserInfo(); });
}

// 初始化调式选择器
function initChordScaleSelector() {
    const scaleSelect = document.getElementById('scale-difficulty-chord');
    if (!scaleSelect) return;

    scaleSelect.innerHTML = '';

    // 级别作为可选项，具体调式作为灰色说明
    Object.entries(scaleDifficultyConfig).forEach(([level, config]) => {
        // 级别作为可点击的选项
        const levelOption = document.createElement('option');
        levelOption.value = `level-${level}`;
        levelOption.textContent = config.name;
        levelOption.style.fontWeight = 'bold';
        scaleSelect.appendChild(levelOption);

        // 具体调式作为灰色不可选的说明
        Object.keys(config.scales).forEach(scaleName => {
            const scaleOption = document.createElement('option');
            scaleOption.value = scaleName;
            scaleOption.textContent = `  └ ${scaleName}`; // 缩进显示
            scaleOption.disabled = true; // 灰色不可选
            scaleOption.style.color = '#888';
            scaleSelect.appendChild(scaleOption);
        });
    });

    // 默认选择第一个级别
    scaleSelect.value = 'level-1';
    updateChordScaleNotesByLevel(1);

    // 监听调式变化
    scaleSelect.addEventListener('change', (e) => {
        const value = e.target.value;
        if (value.startsWith('level-')) {
            // 选择了级别
            const level = parseInt(value.replace('level-', ''));
            updateChordScaleNotesByLevel(level);

            // 如果在风云榜单模式，重新渲染榜单
            if (chordAppState.currentMode === 'leaderboard') {
                renderChordLeaderboard();
            }
        }
    });
}

// 根据级别更新音符（和弦听辨）
function updateChordScaleNotesByLevel(level) {
    const config = scaleDifficultyConfig[level];
    if (!config) {
        updateChordStatus('未找到该级别配置');
        return;
    }

    chordAppState.scaleDifficulty = level;
    chordAppState.currentScale = config.name;
    chordAppState.scaleNotes = config.notes || [];
    updateChordStatus(`已选择：${config.name}，可用音符 ${chordAppState.scaleNotes.length} 个`);

    // 应用调式限制到钢琴琴键
    applyChordScaleRestrictions();
}

// 应用调式限制到和弦听辨的钢琴琴键
function applyChordScaleRestrictions() {
    const allowed = enrichAllowedNotes(chordAppState.scaleNotes);
    const piano = document.getElementById('piano-chord');
    if (!piano) return;

    piano.querySelectorAll('.white-key, .black-key').forEach(key => {
        const note = key.dataset.note;
        if (!allowed.has(note)) {
            key.classList.add('disabled');
            key.dataset.disabled = 'true';
        } else {
            key.classList.remove('disabled');
            delete key.dataset.disabled;
        }
    });
}

// 初始化级别选项
function updateChordLevelOptions() {
    const select = document.getElementById('difficulty-chord');
    if (!select) return;

    select.innerHTML = '';
    Object.entries(difficultyConfig).forEach(([level, config]) => {
        const option = document.createElement('option');
        option.value = level;
        option.textContent = config.name;
        select.appendChild(option);
    });

    // 设置默认值
    select.value = chordAppState.difficulty;
}

function initChordPage() {
    const backHomeBtn = document.getElementById('back-home-chord');
    if (backHomeBtn) backHomeBtn.addEventListener('click', function () { pageManager.switchToPage('home-page'); });

    // 绑定截屏按钮
    const screenshotBtn = document.getElementById('screenshot-btn-chord');
    if (screenshotBtn) screenshotBtn.addEventListener('click', captureChordPageScreenshot);

    // 绑定模式切换按钮
    const practiceBtn = document.getElementById('practice-btn-chord');
    const testBtn = document.getElementById('test-btn-chord');
    const leaderboardBtn = document.getElementById('leaderboard-btn-chord');
    const endTestBtn = document.getElementById('end-test-btn-chord');

    if (practiceBtn) practiceBtn.addEventListener('click', startChordPracticeMode);
    if (testBtn) testBtn.addEventListener('click', startChordTestMode);
    if (leaderboardBtn) leaderboardBtn.addEventListener('click', showChordLeaderboard);
    if (endTestBtn) endTestBtn.addEventListener('click', endChordTestMode);

    // 绑定功能标签切换
    const pitchBtn = document.getElementById('pitch-identification-btn-chord');
    const qualityBtn = document.getElementById('quality-identification-btn-chord');

    if (pitchBtn) pitchBtn.addEventListener('click', switchToPitchIdentificationChord);
    if (qualityBtn) qualityBtn.addEventListener('click', switchToQualityIdentificationChord);

    // 注意：钢琴初始化移到了 initializeChordPage() 中（页面可见时才调用）

    // 初始化调式选择器
    initChordScaleSelector();

    // 初始化级别选项
    updateChordLevelOptions();

    // 绑定级别选择器变化事件
    const difficultySelect = document.getElementById('difficulty-chord');
    if (difficultySelect) {
        difficultySelect.addEventListener('change', (e) => {
            chordAppState.difficulty = parseInt(e.target.value);
            const config = difficultyConfig[chordAppState.difficulty];
            if (config) {
                updateChordStatus(`已选择：${config.description}`);
            }

            // 如果在风云榜单模式，重新渲染榜单
            if (chordAppState.currentMode === 'leaderboard') {
                renderChordLeaderboard();
            }
        });
    }

    // 绑定播放控制按钮
    const randomPlayBtn = document.getElementById('random-play-btn-chord');
    const playBtn = document.getElementById('play-btn-chord');
    const melodicPlayBtn = document.getElementById('play-melodic-btn-chord');
    const submitBtn = document.getElementById('submit-btn-chord');
    const showAnswerBtn = document.getElementById('show-answer-btn-chord');

    if (randomPlayBtn) randomPlayBtn.addEventListener('click', playRandomChord);
    if (playBtn) playBtn.addEventListener('click', playCurrentChord);
    if (melodicPlayBtn) melodicPlayBtn.addEventListener('click', () => {
        if (chordAppState.currentChord && chordAppState.currentChord.notes && chordAppState.currentChord.notes.length >= 1) {
            // 按音高从低到高排序
            const notes = chordAppState.currentChord.notes.map(n => n.note);
            const sortedNotes = [...notes].sort((a, b) => getNoteIndex(a) - getNoteIndex(b));
            playChordMelodic(sortedNotes);
        } else {
            updateChordStatus('请先播放或生成和弦');
        }
    });
    if (submitBtn) submitBtn.addEventListener('click', submitAnswer);
    if (showAnswerBtn) showAnswerBtn.addEventListener('click', showAnswer);

    // 绑定风云榜单按钮
    const clearLeaderboardBtn = document.getElementById('clear-leaderboard-btn-chord');
    const backFromLeaderboardBtn = document.getElementById('back-from-leaderboard-btn-chord');

    if (clearLeaderboardBtn) clearLeaderboardBtn.addEventListener('click', clearChordLeaderboard);
    if (backFromLeaderboardBtn) backFromLeaderboardBtn.addEventListener('click', () => {
        // 返回练习模式
        startChordPracticeMode();
    });
}

function initEndPage() {
    const viewDetailsBtn = document.getElementById('view-details-btn-chord'); if (viewDetailsBtn) viewDetailsBtn.addEventListener('click', function () { exportTestReport('chord'); });
    const restartBtn = document.getElementById('restart-test-btn-chord'); if (restartBtn) restartBtn.addEventListener('click', function () { startChordTestMode(); });
    const backHomeBtn = document.getElementById('back-to-home-btn-chord'); if (backHomeBtn) backHomeBtn.addEventListener('click', function () { pageManager.switchToPage('home-page'); });
}

function initSingleEndPage() {
    // Deleted:const viewDetailsBtn = document.getElementById('view-details-btn-single');
    // Deleted:const restartBtn = document.getElementById('restart-test-btn-single');
    // Deleted:const backHomeBtn = document.getElementById('back-to-home-btn-single');
    // Deleted:
    // Deleted:if (viewDetailsBtn) viewDetailsBtn.addEventListener('click', function () { exportTestReport('single'); });
    // Deleted:if (restartBtn) restartBtn.addEventListener('click', function () { startSingleTestMode(); });
    // Deleted:if (backHomeBtn) backHomeBtn.addEventListener('click', function () { 
    // Deleted:    // 恢复钢琴和按钮显示
    // Deleted:    const pianoContainer = document.getElementById('piano-container-single');
    // Deleted:    const playControls = document.getElementById('play-controls-single');
    // Deleted:    const testEndContent = document.getElementById('single-test-end-content');
    // Deleted:    
    // Deleted:    if (pianoContainer) pianoContainer.style.display = 'block';
    // Deleted:    if (playControls) playControls.style.display = 'flex';
    // Deleted:    if (testEndContent) testEndContent.style.display = 'none';
    // Deleted:    
    // Deleted:    // 解锁声部选择按钮
    // Deleted:    unlockVoiceButtons();
    // Deleted:    
    // Deleted:    pageManager.switchToPage('home-page'); 
    // Deleted:});

    // 锁死声部选择按钮
    lockVoiceButtons();
}

// 锁死声部选择按钮 - 只锁定其他声部，当前声部保持激活
function lockVoiceButtons() {
    const singleVoiceBtn = document.getElementById('single-voice-btn');
    const twoVoiceBtn = document.getElementById('two-voice-btn');
    const threeVoiceBtn = document.getElementById('three-voice-btn');

    // 根据当前测试的声部，只锁定其他声部按钮
    const currentVoices = singleAppState.currentVoices;

    console.log('=== 开始锁定声部按钮 ===');
    console.log('当前测试声部:', currentVoices);

    if (singleVoiceBtn) {
        if (currentVoices === 1) {
            // 当前是单声部测试，单声部按钮保持激活
            singleVoiceBtn.disabled = false;
            singleVoiceBtn.style.opacity = '';
            singleVoiceBtn.style.cursor = '';
            singleVoiceBtn.style.pointerEvents = '';
            console.log('单声部按钮: 激活');
        } else {
            // 其他声部测试，单声部按钮锁定
            singleVoiceBtn.disabled = true;
            singleVoiceBtn.style.opacity = '0.4';
            singleVoiceBtn.style.cursor = 'not-allowed';
            singleVoiceBtn.style.pointerEvents = 'none';
            console.log('单声部按钮: 已锁定');
        }
    }

    if (twoVoiceBtn) {
        if (currentVoices === 2) {
            // 当前是双声部测试，双声部按钮保持激活
            twoVoiceBtn.disabled = false;
            twoVoiceBtn.style.opacity = '';
            twoVoiceBtn.style.cursor = '';
            twoVoiceBtn.style.pointerEvents = '';
            console.log('双声部按钮: 激活');
        } else {
            // 其他声部测试，双声部按钮锁定
            twoVoiceBtn.disabled = true;
            twoVoiceBtn.style.opacity = '0.4';
            twoVoiceBtn.style.cursor = 'not-allowed';
            twoVoiceBtn.style.pointerEvents = 'none';
            console.log('双声部按钮: 已锁定');
        }
    }

    if (threeVoiceBtn) {
        if (currentVoices === 3) {
            // 当前是三声部测试，三声部按钮保持激活
            threeVoiceBtn.disabled = false;
            threeVoiceBtn.style.opacity = '';
            threeVoiceBtn.style.cursor = '';
            threeVoiceBtn.style.pointerEvents = '';
            console.log('三声部按钮: 激活');
        } else {
            // 其他声部测试，三声部按钮锁定
            threeVoiceBtn.disabled = true;
            threeVoiceBtn.style.opacity = '0.4';
            threeVoiceBtn.style.cursor = 'not-allowed';
            threeVoiceBtn.style.pointerEvents = 'none';
            console.log('三声部按钮: 已锁定');
        }
    }

    console.log('=== 声部按钮锁定完成 ===');
}

// 解锁声部选择按钮
function unlockVoiceButtons() {
    const singleVoiceBtn = document.getElementById('single-voice-btn');
    const twoVoiceBtn = document.getElementById('two-voice-btn');
    const threeVoiceBtn = document.getElementById('three-voice-btn');

    // 练习模式和榜单模式下，所有声部按钮都激活
    if (singleVoiceBtn) {
        singleVoiceBtn.disabled = false;
        singleVoiceBtn.style.opacity = '';
        singleVoiceBtn.style.cursor = '';
        singleVoiceBtn.style.pointerEvents = '';
    }
    if (twoVoiceBtn) {
        twoVoiceBtn.disabled = false;
        twoVoiceBtn.style.opacity = '';
        twoVoiceBtn.style.cursor = '';
        twoVoiceBtn.style.pointerEvents = '';
    }
    if (threeVoiceBtn) {
        threeVoiceBtn.disabled = false;
        threeVoiceBtn.style.opacity = '';
        threeVoiceBtn.style.cursor = '';
        threeVoiceBtn.style.pointerEvents = '';
    }
}

// 锁定音程功能按钮（测试结束页）
function lockIntervalFunctionButtons() {
    const pitchBtn = document.getElementById('pitch-identification-btn-interval');
    const qualityBtn = document.getElementById('quality-identification-btn-interval');

    console.log('=== 开始锁定音程功能按钮 ===');
    console.log('当前测试功能:', intervalAppState.currentFunction);

    if (intervalAppState.currentFunction === 'pitch') {
        // 当前是音程音高测试，音程音高按钮保持激活，音程性质按钮锁定
        if (pitchBtn) {
            pitchBtn.disabled = false;
            pitchBtn.classList.add('active');
            pitchBtn.style.opacity = '';
            pitchBtn.style.cursor = '';
            pitchBtn.style.pointerEvents = '';
            console.log('音程音高按钮: 激活');
        }
        if (qualityBtn) {
            qualityBtn.disabled = true;
            qualityBtn.classList.remove('active');
            qualityBtn.style.opacity = '0.4';
            qualityBtn.style.cursor = 'not-allowed';
            qualityBtn.style.pointerEvents = 'none';
            console.log('音程性质按钮: 已锁定');
        }
    } else if (intervalAppState.currentFunction === 'quality') {
        // 当前是音程性质测试，音程性质按钮保持激活，音程音高按钮锁定
        if (pitchBtn) {
            pitchBtn.disabled = true;
            pitchBtn.classList.remove('active');
            pitchBtn.style.opacity = '0.4';
            pitchBtn.style.cursor = 'not-allowed';
            pitchBtn.style.pointerEvents = 'none';
            console.log('音程音高按钮: 已锁定');
        }
        if (qualityBtn) {
            qualityBtn.disabled = false;
            qualityBtn.classList.add('active');
            qualityBtn.style.opacity = '';
            qualityBtn.style.cursor = '';
            qualityBtn.style.pointerEvents = '';
            console.log('音程性质按钮: 激活');
        }
    }

    console.log('=== 音程功能按钮锁定完成 ===');
}

// 解锁音程功能按钮（练习模式）
function unlockIntervalFunctionButtons() {
    const pitchBtn = document.getElementById('pitch-identification-btn-interval');
    const qualityBtn = document.getElementById('quality-identification-btn-interval');

    // 练习模式下，两个按钮都激活
    if (pitchBtn) {
        pitchBtn.disabled = false;
        pitchBtn.style.opacity = '';
        pitchBtn.style.cursor = '';
        pitchBtn.style.pointerEvents = '';
    }
    if (qualityBtn) {
        qualityBtn.disabled = false;
        qualityBtn.style.opacity = '';
        qualityBtn.style.cursor = '';
        qualityBtn.style.pointerEvents = '';
    }
}

function initWindowControls() {
    const fullscreenBtn = document.getElementById('fullscreen-btn-chord'); if (fullscreenBtn) fullscreenBtn.addEventListener('click', function () { if (!document.fullscreenElement) { document.documentElement.requestFullscreen().catch(err => { console.log(`全屏请求错误: ${err.message}`); }); } else { if (document.exitFullscreen) document.exitFullscreen(); } });
    const closeBtn = document.getElementById('close-btn-chord'); if (closeBtn) closeBtn.addEventListener('click', function () { if (confirm('确定要关闭应用吗？')) { window.close(); } });
}

// 单音听辨练习功能
// 更新状态信息
function updateSingleStatus(message) {
    const statusEl = document.getElementById('status-single');
    if (statusEl) {
        statusEl.textContent = message;
    }
}

// 音程听辨练习功能
// 更新状态信息
function updateIntervalStatus(message) {
    const statusEl = document.getElementById('status-interval');
    if (statusEl) {
        statusEl.textContent = message;
    }
}

// 初始化音程调式调性选择器（复制自单音听辨）
function initIntervalScaleSelector() {
    const scaleSelect = document.getElementById('scale-difficulty-interval');
    if (!scaleSelect) return;

    scaleSelect.innerHTML = '';

    // 级别作为可选项，具体调式作为灰色说明
    Object.entries(scaleDifficultyConfig).forEach(([level, config]) => {
        // 级别作为可点击的选项
        const levelOption = document.createElement('option');
        levelOption.value = `level-${level}`;
        levelOption.textContent = config.name;
        levelOption.style.fontWeight = 'bold';
        scaleSelect.appendChild(levelOption);

        // 具体调式作为灰色不可选的说明
        Object.keys(config.scales).forEach(scaleName => {
            const scaleOption = document.createElement('option');
            scaleOption.value = scaleName;
            scaleOption.textContent = `  └ ${scaleName}`; // 缩进显示
            scaleOption.disabled = true; // 灰色不可选
            scaleOption.style.color = '#888';
            scaleSelect.appendChild(scaleOption);
        });
    });

    // 默认选择第一个级别
    scaleSelect.value = 'level-1';
    updateIntervalScaleNotesByLevel(1);

    // 监听调式变化
    scaleSelect.addEventListener('change', (e) => {
        const value = e.target.value;
        if (value.startsWith('level-')) {
            // 选择了级别
            const level = parseInt(value.replace('level-', ''));
            updateIntervalScaleNotesByLevel(level);

            // 如果在风云榜单模式，重新渲染榜单
            if (intervalAppState.currentMode === 'leaderboard') {
                renderIntervalLeaderboard();
            }
        }
    });
}

// 根据级别更新音符（音程听辨）
function updateIntervalScaleNotesByLevel(level) {
    const config = scaleDifficultyConfig[level];
    if (!config) {
        updateIntervalStatus('未找到该级别配置');
        return;
    }

    intervalAppState.currentScale = config.name;
    intervalAppState.scaleNotes = config.notes || [];
    updateIntervalStatus(`已选择：${config.name}，可用音符 ${intervalAppState.scaleNotes.length} 个`);

    // 应用调式限制到钢琴琴键
    applyIntervalScaleRestrictions();
}

// 应用调式限制到音程听辨的钢琴琴键
function applyIntervalScaleRestrictions() {
    const allowed = enrichAllowedNotes(intervalAppState.scaleNotes);
    const piano = document.getElementById('piano-interval');
    if (!piano) return;

    piano.querySelectorAll('.white-key, .black-key').forEach(key => {
        const note = key.dataset.note;
        if (!allowed.has(note)) {
            key.classList.add('disabled');
            key.dataset.disabled = 'true';
        } else {
            key.classList.remove('disabled');
            delete key.dataset.disabled;
        }
    });
}

// 更新音程级别选项
function updateIntervalLevelOptions() {
    const levelSelect = document.getElementById('difficulty-interval');
    if (!levelSelect) return;

    levelSelect.innerHTML = '';

    // 添加3个级别选项
    Object.entries(intervalLevelConfig).forEach(([level, config]) => {
        const option = document.createElement('option');
        option.value = level;
        option.textContent = config.name;
        levelSelect.appendChild(option);
    });

    // 默认选择1级
    levelSelect.value = '1';
    intervalAppState.currentLevel = 1;
    updateIntervalStatus(`已选择：${intervalLevelConfig[1].description}`);
}

// 更新级别选项
function updateSingleLevelOptions() {
    const levelSelect = document.getElementById('difficulty-single');
    if (!levelSelect) return;

    levelSelect.innerHTML = '';

    if (singleAppState.currentVoices === 1) {
        // 单声部：锁死，显示"—"
        levelSelect.disabled = true;
        const option = document.createElement('option');
        option.value = '';
        option.textContent = '—';
        levelSelect.appendChild(option);
    } else if (singleAppState.currentVoices === 2) {
        // 双声部：只有听高音和听低音
        levelSelect.disabled = false;
        const levels = ['听高音', '听低音'];
        levels.forEach(level => {
            const option = document.createElement('option');
            option.value = level;
            option.textContent = level;
            levelSelect.appendChild(option);
        });
    } else {
        // 三声部：听高音、听中音、听低音
        levelSelect.disabled = false;
        const levels = ['听高音', '听中音', '听低音'];
        levels.forEach(level => {
            const option = document.createElement('option');
            option.value = level;
            option.textContent = level;
            levelSelect.appendChild(option);
        });
    }
}

// 更新声部选项卡 UI
function updateSingleVoiceTabsUI() {
    const tabs = {
        1: document.getElementById('single-voice-btn'),
        2: document.getElementById('two-voice-btn'),
        3: document.getElementById('three-voice-btn')
    };

    Object.entries(tabs).forEach(([voice, tab]) => {
        if (tab) {
            if (parseInt(voice) === singleAppState.currentVoices) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        }
    });
}

// 初始化声部选项卡
function initSingleVoiceTabs() {
    const singleVoiceBtn = document.getElementById('single-voice-btn');
    const twoVoiceBtn = document.getElementById('two-voice-btn');
    const threeVoiceBtn = document.getElementById('three-voice-btn');

    if (singleVoiceBtn) {
        singleVoiceBtn.addEventListener('click', () => {
            // 如果按钮被禁用，不执行任何操作
            if (singleVoiceBtn.disabled) return;

            singleAppState.currentVoices = 1;
            updateSingleLevelOptions();
            updateSingleVoiceTabsUI();
            updateSingleStatus('已切换至单声部模式');

            // 如果在榜单模式，重新渲染榜单
            if (singleAppState.currentMode === 'leaderboard') {
                renderLeaderboard();
            }
        });
    }

    if (twoVoiceBtn) {
        twoVoiceBtn.addEventListener('click', () => {
            // 如果按钮被禁用，不执行任何操作
            if (twoVoiceBtn.disabled) return;

            singleAppState.currentVoices = 2;
            updateSingleLevelOptions();
            updateSingleVoiceTabsUI();
            updateSingleStatus('已切换至双声部模式');

            // 如果在榜单模式，重新渲染榜单
            if (singleAppState.currentMode === 'leaderboard') {
                renderLeaderboard();
            }
        });
    }

    if (threeVoiceBtn) {
        threeVoiceBtn.addEventListener('click', () => {
            // 如果按钮被禁用，不执行任何操作
            if (threeVoiceBtn.disabled) return;

            singleAppState.currentVoices = 3;
            updateSingleLevelOptions();
            updateSingleVoiceTabsUI();
            updateSingleStatus('已切换至三声部模式');

            // 如果在榜单模式，重新渲染榜单
            if (singleAppState.currentMode === 'leaderboard') {
                renderLeaderboard();
            }
        });
    }
}

// 随机播放功能
function handleSingleRandomPlay() {
    ensureAudioReady();

    if (singleAppState.scaleNotes.length === 0) {
        updateSingleStatus('请先选择调式调性');
        return;
    }

    // 从当前调式的音符中随机选择
    const availableNotes = singleAppState.scaleNotes;
    let questionNotes = [];
    let isDuplicate = true;
    let attempts = 0;
    const maxAttempts = 100; // 最多尝试100次避免死循环

    // 生成不重复的题目
    while (isDuplicate && attempts < maxAttempts) {
        questionNotes = [];

        // 多声部模式下，需要确保不出现重复音符
        if (singleAppState.currentVoices >= 2) {
            let validQuestion = false;
            let innerAttempts = 0;
            const maxInnerAttempts = 50;

            while (!validQuestion && innerAttempts < maxInnerAttempts) {
                questionNotes = [];

                // 随机选择音符
                for (let i = 0; i < singleAppState.currentVoices; i++) {
                    const randomIndex = Math.floor(Math.random() * availableNotes.length);
                    questionNotes.push(availableNotes[randomIndex]);
                }

                // 检查是否有重复音符
                const uniqueNotes = new Set(questionNotes);
                const hasDuplicates = uniqueNotes.size !== questionNotes.length;

                if (hasDuplicates) {
                    innerAttempts++;
                    continue;
                }

                // 三声部模式下，额外检查音程是否在8度以内
                if (singleAppState.currentVoices === 3) {
                    const frequencies = questionNotes.map(note => getFrequency(note));
                    const minFreq = Math.min(...frequencies);
                    const maxFreq = Math.max(...frequencies);

                    // 8度的频率比是2:1
                    if (maxFreq / minFreq <= 2.0) {
                        validQuestion = true;
                    } else {
                        innerAttempts++;
                    }
                } else {
                    validQuestion = true;
                }
            }
        } else {
            // 单声部模式，直接随机选择
            const randomIndex = Math.floor(Math.random() * availableNotes.length);
            questionNotes.push(availableNotes[randomIndex]);
        }

        // 检查是否与上一题重复
        if (singleAppState.lastQuestion && singleAppState.lastQuestion.length === questionNotes.length) {
            const isSame = singleAppState.lastQuestion.every((note, index) => note === questionNotes[index]);
            isDuplicate = isSame;
        } else {
            // 第一次出题或声部数不同，不重复
            isDuplicate = false;
        }

        attempts++;
    }

    if (isDuplicate && attempts >= maxAttempts) {
        console.warn('无法生成不重复的题目，使用当前生成');
    }

    // 保存上一题
    singleAppState.previousQuestion = singleAppState.lastQuestion ? [...singleAppState.lastQuestion] : null;

    // 保存题目
    singleAppState.lastQuestion = questionNotes;
    singleAppState.pianoSelection = null;
    singleAppState.lastSubmittedAnswer = null;

    // 移除之前的高亮
    document.querySelectorAll('.white-key.active, .black-key.active').forEach(key => {
        key.classList.remove('active');
    });

    // 播放声音（不出题时高亮，避免漏题）
    questionNotes.forEach(note => {
        playNoteWithWebAudio(note, 2.5);
    });

    // 测试模式下不显示提示，避免泄露信息
    if (singleAppState.currentMode === 'practice') {
        updateSingleStatus(`已出题：${singleAppState.currentVoices}声部，请听题后在琴键上选择答案`);
    }
}

// 重复播放功能
function handleSingleRepeatPlay() {
    if (!singleAppState.lastQuestion) {
        updateSingleStatus('请先点击"随机播放"出题');
        return;
    }

    ensureAudioReady();
    singleAppState.lastQuestion.forEach(note => {
        playNoteWithWebAudio(note, 2.5);
    });
}

// 旋律播放功能
function handleSingleMelodicPlay() {
    if (!singleAppState.lastQuestion) {
        updateSingleStatus('请先点击"随机播放"出题');
        return;
    }

    if (singleAppState.currentVoices === 1) {
        updateSingleStatus('单声部无需旋律播放');
        return;
    }

    ensureAudioReady();

    // 从低到高排序
    const sortedNotes = [...singleAppState.lastQuestion].sort((a, b) => {
        return getFrequency(a) - getFrequency(b);
    });

    // 逐个播放，间隔 500ms（只出声，不高亮）
    sortedNotes.forEach((note, index) => {
        setTimeout(() => {
            playNoteWithWebAudio(note, 1.5);
        }, index * 500);
    });
}

// ==================== 音程听辨练习功能 ====================

// 切换到音程音高模式
function switchToPitchIdentificationInterval() {
    intervalAppState.currentFunction = 'pitch';

    // 更新按钮状态
    const pitchBtn = document.getElementById('pitch-identification-btn-interval');
    const qualityBtn = document.getElementById('quality-identification-btn-interval');
    if (pitchBtn) pitchBtn.classList.add('active');
    if (qualityBtn) qualityBtn.classList.remove('active');

    // 隐藏音程按钮容器，显示钢琴键盘
    const buttonsContainer = document.getElementById('interval-buttons-container');
    const pianoContainer = document.getElementById('piano-container-interval');
    if (buttonsContainer) buttonsContainer.style.display = 'none';

    // 如果在榜单模式，不显示钢琴键盘
    if (intervalAppState.currentMode === 'leaderboard') {
        if (pianoContainer) pianoContainer.style.display = 'none';
    } else {
        if (pianoContainer) pianoContainer.style.display = 'block';
    }

    // 如果在榜单模式，重新渲染榜单
    if (intervalAppState.currentMode === 'leaderboard') {
        renderIntervalLeaderboard();
    }

    updateIntervalStatus('已切换到音程音高模式，请点击"随机播放"开始练习');
}

// 切换到音程性质模式
function switchToQualityIdentificationInterval() {
    intervalAppState.currentFunction = 'quality';

    // 更新按钮状态
    const pitchBtn = document.getElementById('pitch-identification-btn-interval');
    const qualityBtn = document.getElementById('quality-identification-btn-interval');
    if (pitchBtn) pitchBtn.classList.remove('active');
    if (qualityBtn) qualityBtn.classList.add('active');

    // 显示音程按钮容器
    const buttonsContainer = document.getElementById('interval-buttons-container');

    // 如果在榜单模式，不显示按钮容器和钢琴键盘
    if (intervalAppState.currentMode === 'leaderboard') {
        if (buttonsContainer) buttonsContainer.style.display = 'none';
    } else {
        if (buttonsContainer) buttonsContainer.style.display = 'block';
    }

    // 练习模式显示钢琴键盘，测试模式和榜单模式隐藏钢琴键盘
    const pianoContainer = document.getElementById('piano-container-interval');
    if (intervalAppState.currentMode === 'test' || intervalAppState.currentMode === 'leaderboard') {
        // 测试模式和榜单模式：隐藏钢琴键盘
        if (pianoContainer) pianoContainer.style.display = 'none';
    } else {
        // 练习模式：显示钢琴键盘，供学生点击出声
        if (pianoContainer) pianoContainer.style.display = 'block';
    }

    // 生成音程性质按钮
    initIntervalQualityButtons();

    // 如果在榜单模式，重新渲染榜单
    if (intervalAppState.currentMode === 'leaderboard') {
        renderIntervalLeaderboard();
    }

    updateIntervalStatus('已切换到音程性质模式，请点击"随机播放"开始练习');
}

// 初始化音程性质按钮
function initIntervalQualityButtons() {
    const layer = document.getElementById('interval-layer');
    if (!layer) return;

    layer.innerHTML = '';

    // 根据当前级别生成对应的音程按钮
    const currentLevel = intervalAppState.currentLevel || 1;
    const levelConfig = intervalLevelConfig[currentLevel];
    if (!levelConfig) return;

    // 为每个允许的半音数创建按钮
    levelConfig.intervals.forEach(semitones => {
        const interval = intervalTypes.find(iv => iv.semitones === semitones);
        if (!interval) return;

        const btn = document.createElement('button');
        btn.className = 'chord-btn';
        btn.textContent = interval.name;
        btn.dataset.interval = interval.name;
        btn.addEventListener('click', () => selectIntervalQuality(interval.name));
        layer.appendChild(btn);
    });
}

// 选择音程性质
function selectIntervalQuality(qualityName) {
    // 移除其他按钮的激活状态
    document.querySelectorAll('#interval-layer .chord-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 激活当前按钮
    const activeBtn = document.querySelector(`#interval-layer .chord-btn[data-interval="${qualityName}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    intervalAppState.selectedIntervalQuality = qualityName;
    updateIntervalStatus(`已选择：${qualityName}，点击“提交答案”确认`);
}

// 随机播放功能 - 音程听辨
function handleIntervalRandomPlay() {
    ensureAudioReady();

    if (intervalAppState.scaleNotes.length === 0) {
        updateIntervalStatus('请先选择调式调性');
        return;
    }

    // 获取当前级别的音程范围
    const currentLevel = intervalAppState.currentLevel || 1;
    const levelConfig = intervalLevelConfig[currentLevel];
    if (!levelConfig) {
        updateIntervalStatus('未找到级别配置');
        return;
    }

    const allowedIntervals = levelConfig.intervals; // 允许的半音数列表
    const availableNotes = intervalAppState.scaleNotes;

    let questionNotes = [];
    let isDuplicate = true;
    let attempts = 0;
    const maxAttempts = 100;

    // 生成符合要求的音程题目
    while (isDuplicate && attempts < maxAttempts) {
        questionNotes = [];

        // 随机选择第一个音符
        const firstIndex = Math.floor(Math.random() * availableNotes.length);
        const firstNote = availableNotes[firstIndex];

        // 从允许的音程中随机选择一个半音数
        const intervalIndex = Math.floor(Math.random() * allowedIntervals.length);
        const semitones = allowedIntervals[intervalIndex];

        // 计算第二个音符的频率
        const firstFreq = getFrequency(firstNote);
        const secondFreq = firstFreq * Math.pow(2, semitones / 12);

        // 在可用音符中找到最接近的音符
        let closestNote = null;
        let minDiff = Infinity;

        for (const note of availableNotes) {
            const freq = getFrequency(note);
            const diff = Math.abs(freq - secondFreq);
            if (diff < minDiff) {
                minDiff = diff;
                closestNote = note;
            }
        }

        // 如果找到了合适的第二个音符
        if (closestNote && closestNote !== firstNote) {
            questionNotes = [firstNote, closestNote];

            // 检查是否与上一题重复
            if (intervalAppState.lastQuestion && intervalAppState.lastQuestion.length === 2) {
                const isSame = (
                    (intervalAppState.lastQuestion[0] === questionNotes[0] &&
                        intervalAppState.lastQuestion[1] === questionNotes[1]) ||
                    (intervalAppState.lastQuestion[0] === questionNotes[1] &&
                        intervalAppState.lastQuestion[1] === questionNotes[0])
                );
                isDuplicate = isSame;
            } else {
                isDuplicate = false;
            }
        } else {
            attempts++;
            continue;
        }

        attempts++;
    }

    if (isDuplicate && attempts >= maxAttempts) {
        console.warn('无法生成不重复的音程题目，使用当前生成');
    }

    // 保存上一题
    intervalAppState.previousQuestion = intervalAppState.lastQuestion ? [...intervalAppState.lastQuestion] : null;

    // 保存题目
    intervalAppState.lastQuestion = questionNotes;
    intervalAppState.pianoSelection = [];
    intervalAppState.selectedIntervalQuality = null;

    // 移除之前的高亮
    document.querySelectorAll('#piano-interval .white-key.active, #piano-interval .black-key.active').forEach(key => {
        key.classList.remove('active');
    });

    // 如果是音程性质模式，清除按钮高亮
    if (intervalAppState.currentFunction === 'quality') {
        document.querySelectorAll('#interval-layer .chord-btn.active').forEach(btn => {
            btn.classList.remove('active');
        });
    }

    // 同时播放两个音符（音程）
    questionNotes.forEach(note => {
        playNoteWithWebAudio(note, 2.5);
    });

    // 显示状态信息
    // 在测试模式和练习模式下都不显示答案，只显示提示
    updateIntervalStatus('请听题后在琴键上选择两个音');
}

// 重复播放功能 - 音程听辨
function handleIntervalRepeatPlay() {
    if (!intervalAppState.lastQuestion || intervalAppState.lastQuestion.length === 0) {
        updateIntervalStatus('请先点击"随机播放"出题');
        return;
    }

    ensureAudioReady();
    intervalAppState.lastQuestion.forEach(note => {
        playNoteWithWebAudio(note, 2.5);
    });
}

// 旋律播放功能 - 音程听辨
function handleIntervalMelodicPlay() {
    if (!intervalAppState.lastQuestion || intervalAppState.lastQuestion.length === 0) {
        updateIntervalStatus('请先点击"随机播放"出题');
        return;
    }

    ensureAudioReady();

    // 从低到高排序
    const sortedNotes = [...intervalAppState.lastQuestion].sort((a, b) => {
        return getFrequency(a) - getFrequency(b);
    });

    // 逐个播放，间隔 500ms（只出声，不高亮）
    sortedNotes.forEach((note, index) => {
        setTimeout(() => {
            playNoteWithWebAudio(note, 1.5);
        }, index * 500);
    });
}

// 提交答案功能 - 音程听辨
function handleIntervalSubmitAnswer() {
    // 根据当前功能模式处理
    if (intervalAppState.currentFunction === 'pitch') {
        submitIntervalPitchAnswer();
    } else if (intervalAppState.currentFunction === 'quality') {
        submitIntervalQualityAnswer();
    }
}

// 提交音程音高答案
function submitIntervalPitchAnswer() {
    if (!intervalAppState.pianoSelection || intervalAppState.pianoSelection.length !== 2) {
        updateIntervalStatus('请在琴键上选择两个音');
        return;
    }

    if (!intervalAppState.lastQuestion || intervalAppState.lastQuestion.length === 0) {
        updateIntervalStatus('请先点击"随机播放"出题');
        return;
    }

    // 对用户选择的音符进行排序（从低到高）
    const userNotes = [...intervalAppState.pianoSelection].sort((a, b) => {
        return getFrequency(a) - getFrequency(b);
    });

    // 对正确答案进行排序
    const correctNotes = [...intervalAppState.lastQuestion].sort((a, b) => {
        return getFrequency(a) - getFrequency(b);
    });

    // 比较两个音符是否相同（考虑等音）
    const isCorrect = (
        (userNotes[0] === correctNotes[0] || areEnharmonic(userNotes[0], correctNotes[0])) &&
        (userNotes[1] === correctNotes[1] || areEnharmonic(userNotes[1], correctNotes[1]))
    );

    // 提交答案后出声+高亮（练习和测试模式都适用）
    playNoteWithWebAudio(correctNotes[0], 3.0);
    playNoteWithWebAudio(correctNotes[1], 3.0);
    highlightKey(userNotes[0]);
    highlightKey(userNotes[1]);

    // 2秒后移除高亮
    setTimeout(() => {
        removeHighlightKey(userNotes[0]);
        removeHighlightKey(userNotes[1]);
    }, 2000);

    // 记录学习数据（练习模式和测试模式都记录）
    learningManager.recordResult('interval', {
        question: `${correctNotes[0]} + ${correctNotes[1]}`,
        correct: isCorrect,
        userAnswer: userNotes.join(' + '),
        correctAnswer: correctNotes.join(' + '),
        mode: 'pitch',
        difficulty: intervalAppState.currentLevel || 1
    });

    // 测试模式下记录成绩并自动出下一题
    if (intervalAppState.currentMode === 'test') {
        intervalAppState.totalQuestions++;

        if (isCorrect) {
            intervalAppState.correct++;
            intervalAppState.score += 5; // 每题5分，满分100分（20题）
            updateIntervalStatus(`✅ 答对了！+5分`);
        } else {
            intervalAppState.wrong++;
            // 记录错题
            intervalAppState.errorQuestions.push({
                question: intervalAppState.lastQuestion,
                correctAnswer: correctNotes,
                userAnswer: userNotes
            });
            const correctInterval = getIntervalName(getIntervalSemitones(correctNotes[0], correctNotes[1]));
            updateIntervalStatus(` 答错了！正确答案：${correctNotes[0]} + ${correctNotes[1]}（${correctInterval}）`);
        }

        updateIntervalStats();

        // 检查是否达到20题
        if (intervalAppState.totalQuestions >= 20) {
            // 20题结束，自动结束测试
            setTimeout(() => {
                endIntervalTestMode();
            }, 2000);
        } else {
            // 测试模式下自动出下一题（2秒后）
            setTimeout(() => {
                handleIntervalRandomPlay();
            }, 2000);
        }
    } else {
        // 练习模式下显示反馈
        if (isCorrect) {
            updateIntervalStatus('✅ 回答正确！');
        } else {
            const correctInterval = getIntervalName(getIntervalSemitones(correctNotes[0], correctNotes[1]));
            updateIntervalStatus(`❌ 回答错误。正确答案是：${correctNotes[0]} + ${correctNotes[1]}（${correctInterval}）`);
        }
    }
}

// 提交音程性质答案
function submitIntervalQualityAnswer() {
    if (!intervalAppState.selectedIntervalQuality) {
        updateIntervalStatus('请选择一个音程性质');
        return;
    }

    if (!intervalAppState.lastQuestion || intervalAppState.lastQuestion.length === 0) {
        updateIntervalStatus('请先点击"随机播放"出题');
        return;
    }

    // 计算正确答案的音程名称
    const correctSemitones = getIntervalSemitones(intervalAppState.lastQuestion[0], intervalAppState.lastQuestion[1]);
    const correctQuality = getIntervalName(correctSemitones);

    // 比较用户选择的答案
    const isCorrect = intervalAppState.selectedIntervalQuality === correctQuality;

    // 播放答案声音（练习和测试模式都适用）
    intervalAppState.lastQuestion.forEach(note => {
        playNoteWithWebAudio(note, 3.0);
    });

    // 测试模式下记录成绩并自动出下一题
    if (intervalAppState.currentMode === 'test') {
        intervalAppState.totalQuestions++;

        if (isCorrect) {
            intervalAppState.correct++;
            intervalAppState.score += 5; // 每题5分，满分100分（20题）
            updateIntervalStatus(`✅ 答对了！+5分`);
        } else {
            intervalAppState.wrong++;
            // 记录错题
            intervalAppState.errorQuestions.push({
                question: intervalAppState.lastQuestion,
                correctAnswer: correctQuality,
                userAnswer: intervalAppState.selectedIntervalQuality
            });
            updateIntervalStatus(`❌ 答错了！正确答案：${correctQuality}`);
        }

        updateIntervalStats();

        // 检查是否达到20题
        if (intervalAppState.totalQuestions >= 20) {
            // 20题结束，自动结束测试
            setTimeout(() => {
                endIntervalTestMode();
            }, 2000);
        } else {
            // 测试模式下自动出下一题（2秒后）
            setTimeout(() => {
                // 清除当前选择
                intervalAppState.selectedIntervalQuality = null;
                document.querySelectorAll('#interval-layer .chord-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                handleIntervalRandomPlay();
            }, 2000);
        }
    } else {
        // 练习模式下显示反馈
        if (isCorrect) {
            updateIntervalStatus('✅ 回答正确！');
        } else {
            updateIntervalStatus(`❌ 回答错误。正确答案是：${correctQuality}`);
        }
    }
}

// 显示答案功能 - 音程听辨
function handleIntervalShowAnswer() {
    if (!intervalAppState.lastQuestion || intervalAppState.lastQuestion.length === 0) {
        updateIntervalStatus('请先点击"随机播放"出题');
        return;
    }

    ensureAudioReady();

    const answerNotes = intervalAppState.lastQuestion;
    const intervalName = getIntervalName(getIntervalSemitones(answerNotes[0], answerNotes[1]));
    const answerText = `${answerNotes[0]} + ${answerNotes[1]}（${intervalName}）`;

    // 根据当前功能模式显示答案
    if (intervalAppState.currentFunction === 'pitch') {
        // 音程音高模式：高亮琴键
        document.querySelectorAll('#piano-interval .white-key.active, #piano-interval .black-key.active').forEach(key => {
            key.classList.remove('active');
        });

        // 播放答案声音 3 秒
        answerNotes.forEach(note => {
            playNoteWithWebAudio(note, 3.0);
            highlightKey(note);
        });

        // 3 秒后移除高亮
        setTimeout(() => {
            answerNotes.forEach(note => removeHighlightKey(note));
        }, 3000);

        updateIntervalStatus(`正确答案：${answerText}`);
    } else if (intervalAppState.currentFunction === 'quality') {
        // 音程性质模式：高亮对应的按钮
        document.querySelectorAll('#interval-layer .chord-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        const correctBtn = document.querySelector(`#interval-layer .chord-btn[data-interval="${intervalName}"]`);
        if (correctBtn) {
            correctBtn.classList.add('active');
        }

        // 播放答案声音
        answerNotes.forEach(note => {
            playNoteWithWebAudio(note, 2.0);
        });

        updateIntervalStatus(`正确答案：${intervalName}`);
    }
}


// 显示答案功能
function handleSingleShowAnswer() {
    if (!singleAppState.lastQuestion) {
        updateSingleStatus('请先点击"随机播放"出题');
        return;
    }

    ensureAudioReady();

    const answerNotes = singleAppState.lastQuestion;
    const answerText = answerNotes.join(' + ');

    // 移除之前的高亮
    document.querySelectorAll('.white-key.active, .black-key.active').forEach(key => {
        key.classList.remove('active');
    });

    // 播放答案声音 3 秒
    answerNotes.forEach(note => {
        playNoteWithWebAudio(note, 3.0);
        highlightKey(note);
    });

    // 3 秒后移除高亮
    setTimeout(() => {
        answerNotes.forEach(note => removeHighlightKey(note));
    }, 3000);

    updateSingleStatus(`正确答案：${answerText}`);
}

// ==================== 单音听辨测试模式功能 ====================

// 开始测试模式
function startSingleTestMode() {
    // 同步用户信息从 chordAppState 到 singleAppState
    if (chordAppState.userInfo && chordAppState.userInfo.saved) {
        singleAppState.userInfo = {
            school: chordAppState.userInfo.school || '',
            majorClass: chordAppState.userInfo.majorClass || '',
            name: chordAppState.userInfo.name || '',
            teacher: chordAppState.userInfo.teacher || '',
            saved: true
        };
    }

    if (!singleAppState.userInfo.saved) {
        userManager.showSaveStatus('未保存学生信息（可跳过）', 'error');
        setTimeout(() => userManager.hideSaveStatus(), 1800);
    }

    singleAppState.currentMode = 'test';
    singleAppState.testInProgress = true;
    singleAppState.score = 0;
    singleAppState.correct = 0;
    singleAppState.wrong = 0;
    singleAppState.totalQuestions = 0;
    singleAppState.errorQuestions = [];
    singleAppState.testStartTime = new Date();
    singleAppState.elapsedTime = 0; // 重置用时

    // 启动计时器
    startTimeUpdateSingle();
    startElapsedTimeTimer(); // 启动用时计时器

    // 更新 UI
    updateSingleStats();
    updateSingleButtonStates();

    // 隐藏练习说明（单音和音程），显示计分板
    document.querySelectorAll('#practice-test-content-single .practice-instructions, #practice-test-content-interval .practice-instructions').forEach(el => {
        el.style.display = 'none';
    });

    const statsPanel = document.getElementById('stats-panel-single');
    if (statsPanel) statsPanel.style.display = 'flex';

    const timePanel = document.getElementById('time-panel-single');
    if (timePanel) timePanel.style.display = 'flex';

    // 隐藏风云榜单
    const leaderboardContent = document.getElementById('leaderboard-content-single');
    if (leaderboardContent) leaderboardContent.style.display = 'none';

    // 显示钢琴和按钮，隐藏测试结束区域
    const pianoContainer = document.getElementById('piano-container-single');
    const playControls = document.getElementById('play-controls-single');
    const testEndContent = document.getElementById('single-test-end-content');

    if (pianoContainer) pianoContainer.style.display = 'block';
    if (playControls) playControls.style.display = 'flex';
    if (testEndContent) testEndContent.style.display = 'none';

    // 锁定其他声部按钮（只保留当前测试的声部按钮激活）
    lockVoiceButtons();

    // 自动出第一题
    handleSingleRandomPlay();

    updateSingleStatus('测试已开始，请认真听题并点击琴键作答');
}

// 结束测试模式
function endSingleTestMode() {
    singleAppState.currentMode = 'practice';
    singleAppState.testInProgress = false;
    singleAppState.testEndTime = new Date(); // 记录测试结束时间

    const endBtn = document.getElementById('end-test-btn-single');
    if (endBtn) endBtn.style.display = 'none';

    updateSingleStatus('测试已结束');

    // 隐藏计分板和计时器
    const statsPanel = document.getElementById('stats-panel-single');
    if (statsPanel) statsPanel.style.display = 'none';

    const timePanel = document.getElementById('time-panel-single');
    if (timePanel) timePanel.style.display = 'none';

    // 停止计时器
    stopTimeUpdateSingle();
    stopElapsedTimeTimer(); // 停止用时计时器

    // 更新风云榜单
    updateLeaderboard();

    // 隐藏钢琴和按钮，显示测试结果
    const pianoContainer = document.getElementById('piano-container-single');
    const playControls = document.getElementById('play-controls-single');
    const testEndContent = document.getElementById('single-test-end-content');

    if (pianoContainer) pianoContainer.style.display = 'none';
    if (playControls) playControls.style.display = 'none';
    if (testEndContent) testEndContent.style.display = 'block';

    // 隐藏风云榜单
    const leaderboardContent = document.getElementById('leaderboard-content-single');
    if (leaderboardContent) leaderboardContent.style.display = 'none';

    // 隐藏练习说明（确保测试结束页不显示）
    document.querySelectorAll('#practice-test-content-single .practice-instructions, #practice-test-content-interval .practice-instructions').forEach(el => {
        el.style.display = 'none';
    });

    // 显示测试结果分析
    showSingleTestAnalysis();

    // 填充测试结束数据
    showSingleTestEndPage();

    // 锁死其他声部选择按钮
    lockVoiceButtons();
}

// 显示测试结束页面
function showSingleTestEndPage() {
    console.log('=== 显示测试结束页面 ===');
    console.log('singleAppState:', singleAppState);

    // 学生信息 - 确保从 chordAppState 同步
    const userInfo = singleAppState.userInfo && singleAppState.userInfo.saved ? singleAppState.userInfo : chordAppState.userInfo;

    const schoolEl = document.getElementById('end-school-single');
    const majorEl = document.getElementById('end-major-class-single');
    const nameEl = document.getElementById('end-name-single');
    const teacherEl = document.getElementById('end-teacher-single');

    if (schoolEl) schoolEl.textContent = (userInfo && userInfo.school) || '未填写';
    if (majorEl) majorEl.textContent = (userInfo && userInfo.majorClass) || '未填写';
    if (nameEl) nameEl.textContent = (userInfo && userInfo.name) || '未填写';
    if (teacherEl) teacherEl.textContent = (userInfo && userInfo.teacher) || '未填写';

    console.log('学生信息已设置');

    // 测试结束时间
    const endTimeEl = document.getElementById('end-time-single');
    if (endTimeEl && singleAppState.testEndTime) {
        const endTime = singleAppState.testEndTime;
        const year = endTime.getFullYear();
        const month = String(endTime.getMonth() + 1).padStart(2, '0');
        const day = String(endTime.getDate()).padStart(2, '0');
        const hours = String(endTime.getHours()).padStart(2, '0');
        const minutes = String(endTime.getMinutes()).padStart(2, '0');
        const seconds = String(endTime.getSeconds()).padStart(2, '0');
        endTimeEl.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        console.log('测试结束时间:', endTimeEl.textContent);
    }

    // 测试结果（总分）
    const scoreEl = document.getElementById('end-total-score-single');
    if (scoreEl) scoreEl.textContent = singleAppState.score;

    console.log('测试结果已设置:', { score: singleAppState.score, correct: singleAppState.correct, wrong: singleAppState.wrong, total: singleAppState.totalQuestions });

    generateSingleAnalysisContent();
    console.log('=== 测试结束页面显示完成 ===');
}

// 生成测试评语
function generateSingleTestComment() {
    const total = singleAppState.totalQuestions;
    const correct = singleAppState.correct;
    const accuracy = total > 0 ? (correct / total * 100) : 0;

    // 未答题情况
    if (total === 0) {
        return '测试尚未开始。请点击上面“测试模式”开始重新答题';
    }

    if (accuracy >= 90) {
        return '优秀！音准听辨能力出色，继续保持！';
    } else if (accuracy >= 70) {
        return '良好！基础扎实，建议加强难点音程的练习。';
    } else if (accuracy >= 60) {
        return '及格！需要加强音高听辨训练，建议从单声部开始逐步提升。';
    } else {
        return '需要努力！建议从基础音阶听辨开始，每天坚持练习，逐步提高音准感。';
    }
}

// 生成单音测试分析内容
function generateSingleAnalysisContent() {
    const analysisContent = document.getElementById('analysis-content-single');
    if (!analysisContent) return;

    let analysisHTML = '';

    // 成绩统计
    analysisHTML += `<div class="analysis-section">`;
    analysisHTML += `<h4>成绩统计</h4>`;

    // 第一行：总题数 + 正确题数 + 错误题数
    analysisHTML += `<div class="stats-row">`;
    analysisHTML += `<span><strong>总题数：</strong>${singleAppState.totalQuestions} 题</span>`;
    analysisHTML += `<span><strong>正确题数：</strong>${singleAppState.correct} 题</span>`;
    analysisHTML += `<span><strong>错误题数：</strong>${singleAppState.wrong} 题</span>`;
    analysisHTML += `</div>`;

    // 第二行：正确率 + 用时
    const accuracy = singleAppState.totalQuestions > 0
        ? ((singleAppState.correct / singleAppState.totalQuestions) * 100).toFixed(1)
        : 0;
    const elapsedSeconds = singleAppState.elapsedTime;
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = (elapsedSeconds % 60).toFixed(2);
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.padStart(5, '0')}`;

    analysisHTML += `<div class="stats-row">`;
    analysisHTML += `<span><strong>正确率：</strong>${accuracy}%</span>`;
    analysisHTML += `<span><strong>用时：</strong>${timeStr}</span>`;
    analysisHTML += `</div>`;

    analysisHTML += `</div>`;

    // 错题列表
    if (singleAppState.totalQuestions === 0) {
        // 未答题情况
        analysisHTML += `<div class="analysis-section">`;
        analysisHTML += `<h4>提示</h4>`;
        analysisHTML += `<p>您尚未答题。请点击上面“测试模式”重新开始测试。</p>`;
        analysisHTML += `</div>`;
    } else if (singleAppState.errorQuestions.length > 0) {
        // 有错题情况
        analysisHTML += `<div class="analysis-section">`;
        analysisHTML += `<h4>错题回顾（共${singleAppState.errorQuestions.length}题）</h4>`;
        analysisHTML += `<ul>`;
        singleAppState.errorQuestions.forEach((q, index) => {
            // 检查是否为等音情况
            const isEnharmonicCase = q.correctAnswer.length === 1 && areEnharmonic(q.correctAnswer[0], q.userAnswer);

            if (isEnharmonicCase) {
                // 等音情况，显示两个名称
                const noteInfo = allNotes.find(n => n.note === q.correctAnswer[0]);
                const displayName = noteInfo ? noteInfo.display.replace(/<br>/g, '/') : q.correctAnswer[0];
                analysisHTML += `<li>第${index + 1}题：正确答案 <strong>${displayName}</strong>（等音），你的答案 ${q.userAnswer} ✓</li>`;
            } else {
                analysisHTML += `<li>第${index + 1}题：正确答案 <strong>${q.correctAnswer.join(' + ')}</strong>，你的答案 ${q.userAnswer}</li>`;
            }
        });
        analysisHTML += `</ul>`;
        analysisHTML += `</div>`;
    } else {
        // 全部答对情况
        analysisHTML += `<div class="analysis-section">`;
        analysisHTML += `<h4> 恭喜！全部答对，没有错题！</h4>`;
        analysisHTML += `<p>您在本次测试中表现优异，所有题目都回答正确！</p>`;
        analysisHTML += `</div>`;
    }

    // 评语（整合到分析中）
    const comment = generateSingleTestComment();
    analysisHTML += `<div class="analysis-section">`;
    analysisHTML += `<h4>评语</h4>`;
    analysisHTML += `<p>${comment}</p>`;
    analysisHTML += `</div>`;

    analysisContent.innerHTML = analysisHTML;
}

// 返回练习模式
function startSinglePracticeMode() {
    singleAppState.currentMode = 'practice';
    singleAppState.testInProgress = false;
    singleAppState.lastQuestion = null;
    singleAppState.pianoSelection = null;

    // 清除高亮
    document.querySelectorAll('.white-key.active, .black-key.active').forEach(key => {
        key.classList.remove('active');
    });

    // 恢复钢琴和按钮显示，隐藏测试结束区域
    const pianoContainer = document.getElementById('piano-container-single');
    const playControls = document.getElementById('play-controls-single');
    const testEndContent = document.getElementById('single-test-end-content');

    if (pianoContainer) pianoContainer.style.display = 'block';
    if (playControls) playControls.style.display = 'flex';
    if (testEndContent) testEndContent.style.display = 'none';

    // 解锁声部选择按钮
    unlockVoiceButtons();

    // 隐藏计分板和计时器
    const statsPanel = document.getElementById('stats-panel-single');
    if (statsPanel) statsPanel.style.display = 'none';

    const timePanel = document.getElementById('time-panel-single');
    if (timePanel) timePanel.style.display = 'none';

    // 隐藏风云榜单
    const leaderboardContent = document.getElementById('leaderboard-content-single');
    if (leaderboardContent) leaderboardContent.style.display = 'none';

    // 显示练习说明（单音和音程）
    document.querySelectorAll('#practice-test-content-single .practice-instructions, #practice-test-content-interval .practice-instructions').forEach(el => {
        el.style.display = 'block';
    });

    // 停止计时器
    stopTimeUpdateSingle();

    updateSingleButtonStates();
    updateSingleStatus('已切换到练习模式');
}

// 开始音程测试模式
function startIntervalTestMode() {
    // 检查学生信息是否保存
    if (!intervalAppState.userInfo.saved) {
        userManager.showSaveStatus('未保存学生信息（可跳过）', 'error');
        setTimeout(() => userManager.hideSaveStatus(), 1800);
    }

    intervalAppState.currentMode = 'test';
    intervalAppState.testInProgress = true;
    intervalAppState.score = 0;
    intervalAppState.correct = 0;
    intervalAppState.wrong = 0;
    intervalAppState.totalQuestions = 0;
    intervalAppState.errorQuestions = [];
    intervalAppState.testStartTime = new Date();
    intervalAppState.elapsedTime = 0; // 重置用时

    // 启动计时器
    startTimeUpdateInterval();
    startIntervalElapsedTimeTimer(); // 启动用时计时器

    // 更新 UI
    updateIntervalStats();
    updateIntervalButtonStates();

    // 隐藏练习说明（单音和音程），显示计分板
    document.querySelectorAll('#practice-test-content-single .practice-instructions, #practice-test-content-interval .practice-instructions').forEach(el => {
        el.style.display = 'none';
    });

    const statsPanel = document.getElementById('stats-panel-interval');
    if (statsPanel) statsPanel.style.display = 'flex';

    const timePanel = document.getElementById('time-panel-interval');
    if (timePanel) timePanel.style.display = 'flex';

    // 隐藏风云榜单
    const leaderboardContent = document.getElementById('leaderboard-content-interval');
    if (leaderboardContent) leaderboardContent.style.display = 'none';

    // 显示钢琴和按钮，隐藏测试结束区域
    const pianoContainer = document.getElementById('piano-container-interval');
    const playControls = document.getElementById('play-controls-interval');
    const testEndContent = document.getElementById('interval-test-end-content');

    // 音程性质测试模式不显示钢琴键盘
    if (intervalAppState.currentFunction === 'quality') {
        if (pianoContainer) pianoContainer.style.display = 'none';
    } else {
        // 音程音高测试模式显示钢琴键盘
        if (pianoContainer) pianoContainer.style.display = 'block';
    }

    if (playControls) playControls.style.display = 'flex';
    if (testEndContent) testEndContent.style.display = 'none';

    // 自动出第一题
    handleIntervalRandomPlay();

    updateIntervalStatus('测试已开始，请认真听题并点击琴键作答');
}

// 结束音程测试模式
function endIntervalTestMode() {
    intervalAppState.currentMode = 'practice';
    intervalAppState.testInProgress = false;
    intervalAppState.testEndTime = new Date(); // 记录测试结束时间

    const endBtn = document.getElementById('end-test-btn-interval');
    if (endBtn) endBtn.style.display = 'none';

    updateIntervalStatus('测试已结束');

    // 隐藏计分板和计时器
    const statsPanel = document.getElementById('stats-panel-interval');
    if (statsPanel) statsPanel.style.display = 'none';

    const timePanel = document.getElementById('time-panel-interval');
    if (timePanel) timePanel.style.display = 'none';

    // 停止计时器
    stopTimeUpdateInterval();
    stopIntervalElapsedTimeTimer(); // 停止用时计时器

    // 更新风云榜单
    updateIntervalLeaderboard();

    // 隐藏钢琴和按钮，显示测试结果
    const pianoContainer = document.getElementById('piano-container-interval');
    const playControls = document.getElementById('play-controls-interval');
    const testEndContent = document.getElementById('interval-test-end-content');
    const buttonsContainer = document.getElementById('interval-buttons-container');

    if (pianoContainer) pianoContainer.style.display = 'none';
    if (playControls) playControls.style.display = 'none';
    if (buttonsContainer) buttonsContainer.style.display = 'none'; // 隐藏性质选择按钮
    if (testEndContent) testEndContent.style.display = 'block';

    // 隐藏风云榜单
    const leaderboardContent = document.getElementById('leaderboard-content-interval');
    if (leaderboardContent) leaderboardContent.style.display = 'none';

    // 隐藏练习说明（确保测试结束页不显示）
    document.querySelectorAll('#practice-test-content-single .practice-instructions, #practice-test-content-interval .practice-instructions').forEach(el => {
        el.style.display = 'none';
    });

    // 锁死非当前功能模式的按钮
    lockIntervalFunctionButtons();

    // 填充测试结束数据（包含分析内容生成）
    showIntervalTestEndPage();
}

// 开始音程练习模式
function startIntervalPracticeMode() {
    intervalAppState.currentMode = 'practice';
    intervalAppState.testInProgress = false;

    const endBtn = document.getElementById('end-test-btn-interval');
    if (endBtn) endBtn.style.display = 'none';

    // 隐藏计分板和计时器
    const statsPanel = document.getElementById('stats-panel-interval');
    if (statsPanel) statsPanel.style.display = 'none';

    const timePanel = document.getElementById('time-panel-interval');
    if (timePanel) timePanel.style.display = 'none';

    // 隐藏风云榜单
    const leaderboardContent = document.getElementById('leaderboard-content-interval');
    if (leaderboardContent) leaderboardContent.style.display = 'none';

    // 隐藏测试结束页，恢复钢琴和按钮显示
    const testEndContent = document.getElementById('interval-test-end-content');
    const pianoContainer = document.getElementById('piano-container-interval');
    const playControls = document.getElementById('play-controls-interval');
    const buttonsContainer = document.getElementById('interval-buttons-container');

    if (testEndContent) testEndContent.style.display = 'none';
    if (playControls) playControls.style.display = 'flex';

    // 根据当前功能模式显示/隐藏钢琴和按钮容器
    if (intervalAppState.currentFunction === 'quality') {
        // 音程性质模式：显示按钮容器，根据模式决定是否显示钢琴
        if (buttonsContainer) buttonsContainer.style.display = 'block';
        if (pianoContainer) pianoContainer.style.display = 'block'; // 练习模式显示钢琴
    } else {
        // 音程音高模式：隐藏按钮容器，显示钢琴
        if (buttonsContainer) buttonsContainer.style.display = 'none';
        if (pianoContainer) pianoContainer.style.display = 'block';
    }

    // 显示练习说明（单音和音程）
    document.querySelectorAll('#practice-test-content-single .practice-instructions, #practice-test-content-interval .practice-instructions').forEach(el => {
        el.style.display = 'block';
    });

    // 停止计时器
    stopTimeUpdateInterval();
    stopIntervalElapsedTimeTimer();

    // 解锁音程功能按钮
    unlockIntervalFunctionButtons();

    // 更新按钮状态
    updateIntervalButtonStates();

    // 根据当前功能模式更新状态信息
    if (intervalAppState.currentFunction === 'quality') {
        updateIntervalStatus('已切换到音程性质练习模式');
    } else {
        updateIntervalStatus('已切换到音程音高练习模式');
    }
}

// 更新按钮状态
function updateSingleButtonStates() {
    const practiceBtn = document.getElementById('practice-btn-single');
    const testBtn = document.getElementById('test-btn-single');
    const leaderboardBtn = document.getElementById('leaderboard-btn-single');
    const endTestBtn = document.getElementById('end-test-btn-single');
    const randomPlayBtn = document.getElementById('random-play-btn-single');
    const melodicPlayBtn = document.getElementById('play-melodic-btn-single');
    const showAnswerBtn = document.getElementById('show-answer-btn-single');

    if (singleAppState.currentMode === 'test') {
        if (practiceBtn) practiceBtn.classList.remove('active');
        if (testBtn) testBtn.classList.add('active');
        if (leaderboardBtn) leaderboardBtn.classList.remove('active');
        if (endTestBtn) endTestBtn.style.display = 'inline-block';
        // 测试模式下锁死随机播放、旋律播放和显示答案按钮
        if (randomPlayBtn) randomPlayBtn.disabled = true;
        if (melodicPlayBtn) melodicPlayBtn.disabled = true;
        if (showAnswerBtn) showAnswerBtn.disabled = true;
    } else if (singleAppState.currentMode === 'leaderboard') {
        if (practiceBtn) practiceBtn.classList.remove('active');
        if (testBtn) testBtn.classList.remove('active');
        if (leaderboardBtn) leaderboardBtn.classList.add('active');
        if (endTestBtn) endTestBtn.style.display = 'none';
        // 榜单模式下锁死所有播放按钮
        if (randomPlayBtn) randomPlayBtn.disabled = true;
        if (melodicPlayBtn) melodicPlayBtn.disabled = true;
        if (showAnswerBtn) showAnswerBtn.disabled = true;
    } else {
        // 练习模式
        if (practiceBtn) practiceBtn.classList.add('active');
        if (testBtn) testBtn.classList.remove('active');
        if (leaderboardBtn) leaderboardBtn.classList.remove('active');
        if (endTestBtn) endTestBtn.style.display = 'none';
        // 练习模式下启用所有按钮
        if (randomPlayBtn) randomPlayBtn.disabled = false;
        if (melodicPlayBtn) melodicPlayBtn.disabled = false;
        if (showAnswerBtn) showAnswerBtn.disabled = false;
    }
}

// 更新音程按钮状态
function updateIntervalButtonStates() {
    const practiceBtn = document.getElementById('practice-btn-interval');
    const testBtn = document.getElementById('test-btn-interval');
    const leaderboardBtn = document.getElementById('leaderboard-btn-interval');
    const endTestBtn = document.getElementById('end-test-btn-interval');
    const randomPlayBtn = document.getElementById('random-play-btn-interval');
    const melodicPlayBtn = document.getElementById('play-melodic-btn-interval');
    const showAnswerBtn = document.getElementById('show-answer-btn-interval');

    if (intervalAppState.currentMode === 'test') {
        if (practiceBtn) practiceBtn.classList.remove('active');
        if (testBtn) testBtn.classList.add('active');
        if (leaderboardBtn) leaderboardBtn.classList.remove('active');
        if (endTestBtn) endTestBtn.style.display = 'inline-block';
        // 测试模式下锁死随机播放、旋律播放和显示答案按钮
        if (randomPlayBtn) randomPlayBtn.disabled = true;
        if (melodicPlayBtn) melodicPlayBtn.disabled = true;
        if (showAnswerBtn) showAnswerBtn.disabled = true;

        // 测试模式下锁死非当前功能模式的按钮
        const pitchBtn = document.getElementById('pitch-identification-btn-interval');
        const qualityBtn = document.getElementById('quality-identification-btn-interval');
        if (intervalAppState.currentFunction === 'pitch') {
            // 音程音高测试模式：音程音高按钮激活，音程性质按钮锁死
            if (pitchBtn) {
                pitchBtn.disabled = false;
                pitchBtn.style.opacity = '';
                pitchBtn.style.cursor = '';
                pitchBtn.style.pointerEvents = '';
            }
            if (qualityBtn) {
                qualityBtn.disabled = true;
                qualityBtn.style.opacity = '0.4';
                qualityBtn.style.cursor = 'not-allowed';
                qualityBtn.style.pointerEvents = 'none';
            }
        } else if (intervalAppState.currentFunction === 'quality') {
            // 音程性质测试模式：音程性质按钮激活，音程音高按钮锁死
            if (pitchBtn) {
                pitchBtn.disabled = true;
                pitchBtn.style.opacity = '0.4';
                pitchBtn.style.cursor = 'not-allowed';
                pitchBtn.style.pointerEvents = 'none';
            }
            if (qualityBtn) {
                qualityBtn.disabled = false;
                qualityBtn.style.opacity = '';
                qualityBtn.style.cursor = '';
                qualityBtn.style.pointerEvents = '';
            }
        }
    } else if (intervalAppState.currentMode === 'leaderboard') {
        // 榜单模式
        if (practiceBtn) practiceBtn.classList.remove('active');
        if (testBtn) testBtn.classList.remove('active');
        if (leaderboardBtn) leaderboardBtn.classList.add('active');
        if (endTestBtn) endTestBtn.style.display = 'none';
        // 榜单模式下锁死所有播放按钮
        if (randomPlayBtn) randomPlayBtn.disabled = true;
        if (melodicPlayBtn) melodicPlayBtn.disabled = true;
        if (showAnswerBtn) showAnswerBtn.disabled = true;

        // 注意：功能按钮的锁定状态由 lockIntervalFunctionButtons() 控制，此处不重复处理
    } else {
        // 练习模式
        if (practiceBtn) practiceBtn.classList.add('active');
        if (testBtn) testBtn.classList.remove('active');
        if (leaderboardBtn) leaderboardBtn.classList.remove('active');
        if (endTestBtn) endTestBtn.style.display = 'none';
        // 练习模式下启用所有按钮
        if (randomPlayBtn) randomPlayBtn.disabled = false;
        if (melodicPlayBtn) melodicPlayBtn.disabled = false;
        if (showAnswerBtn) showAnswerBtn.disabled = false;

        // 练习模式下解锁功能切换按钮
        const pitchBtn = document.getElementById('pitch-identification-btn-interval');
        const qualityBtn = document.getElementById('quality-identification-btn-interval');
        if (pitchBtn) {
            pitchBtn.disabled = false;
            pitchBtn.style.opacity = '';
            pitchBtn.style.cursor = '';
            pitchBtn.style.pointerEvents = '';
        }
        if (qualityBtn) {
            qualityBtn.disabled = false;
            qualityBtn.style.opacity = '';
            qualityBtn.style.cursor = '';
            qualityBtn.style.pointerEvents = '';
        }
    }
}

// 更新音程风云榜单
function updateIntervalLeaderboard() {
    const userInfo = intervalAppState.userInfo;

    // 如果没有学生信息，不记录
    if (!userInfo || !userInfo.name) {
        return;
    }

    // 获取当前设置
    const currentFunction = intervalAppState.currentFunction || 'pitch';
    const currentScale = intervalAppState.currentScale || '未选择';
    const difficultySelect = document.getElementById('difficulty-interval');
    const currentLevel = difficultySelect ? difficultySelect.value || '未选择' : '未选择';

    // 使用组合键存储不同配置的榜单
    const storageKey = `intervalLeaderboard_${currentFunction}_${currentScale}_${currentLevel}`;

    // 从 localStorage 加载榜单
    const savedLeaderboard = localStorage.getItem(storageKey);
    intervalAppState.leaderboard = savedLeaderboard ? JSON.parse(savedLeaderboard) : [];

    // 添加新记录
    const newRecord = {
        name: userInfo.name,
        school: userInfo.school || '未填写',
        majorClass: userInfo.majorClass || '未填写',
        score: intervalAppState.score,
        time: intervalAppState.elapsedTime,
        function: currentFunction,
        scale: currentScale,
        level: currentLevel,
        date: intervalAppState.testEndTime ? intervalAppState.testEndTime.toLocaleString('zh-CN') : new Date().toLocaleString('zh-CN')
    };

    intervalAppState.leaderboard.push(newRecord);

    // 排序：先按分数降序，再按用时升序
    intervalAppState.leaderboard.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score; // 分数高的排前面
        }
        return a.time - b.time; // 用时短的排前面
    });

    // 只保留前 10 名
    intervalAppState.leaderboard = intervalAppState.leaderboard.slice(0, 10);

    // 保存到 localStorage
    localStorage.setItem(storageKey, JSON.stringify(intervalAppState.leaderboard));
}

// 显示音程风云榜单
function showIntervalLeaderboard() {
    intervalAppState.currentMode = 'leaderboard';

    const leaderboardContent = document.getElementById('leaderboard-content-interval');
    const pianoContainer = document.getElementById('piano-container-interval');
    const playControls = document.getElementById('play-controls-interval');
    const testEndContent = document.getElementById('interval-test-end-content');
    const buttonsContainer = document.getElementById('interval-buttons-container');
    const instructions = document.querySelectorAll('#practice-test-content-single .practice-instructions, #practice-test-content-interval .practice-instructions');
    const statsPanel = document.getElementById('stats-panel-interval');
    const timePanel = document.getElementById('time-panel-interval');
    const statusMessage = document.getElementById('status-interval');

    // 隐藏其他内容（包括钢琴琴键）
    if (pianoContainer) pianoContainer.style.display = 'none';
    if (playControls) playControls.style.display = 'none';
    if (testEndContent) testEndContent.style.display = 'none';
    if (buttonsContainer) buttonsContainer.style.display = 'none';
    instructions.forEach(el => { el.style.display = 'none'; });
    if (statsPanel) statsPanel.style.display = 'none';
    if (timePanel) timePanel.style.display = 'none';
    if (statusMessage) statusMessage.style.display = 'none';

    // 显示榜单
    if (leaderboardContent) leaderboardContent.style.display = 'block';

    // 解锁功能按钮，允许自由切换查看不同榜单
    unlockIntervalFunctionButtons();

    // 更新按钮状态
    updateIntervalButtonStates();

    // 渲染榜单数据
    renderIntervalLeaderboard();
}

// 渲染音程榜单数据
function renderIntervalLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list-interval');
    if (!leaderboardList) return;

    // 获取当前设置
    const currentFunction = intervalAppState.currentFunction || 'pitch';
    const currentScale = intervalAppState.currentScale || '未选择';
    const difficultySelect = document.getElementById('difficulty-interval');
    const currentLevel = difficultySelect ? difficultySelect.value || '未选择' : '未选择';

    // 使用组合键加载对应配置的榜单
    const storageKey = `intervalLeaderboard_${currentFunction}_${currentScale}_${currentLevel}`;

    const savedLeaderboard = localStorage.getItem(storageKey);
    const leaderboard = savedLeaderboard ? JSON.parse(savedLeaderboard) : [];

    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = '<div style="text-align: center; padding: 40px; color: rgba(255, 255, 255, 0.5);">暂无榜单数据</div>';
        return;
    }

    let html = '';
    leaderboard.forEach((record, index) => {
        const rank = index + 1;
        const rankClass = rank <= 3 ? `lb-rank-${rank}` : '';
        const timeStr = formatElapsedTime(record.time);

        html += `
            <div class="leaderboard-row ${rankClass}">
                <div class="lb-rank-value">${rank}</div>
                <div class="lb-name-value">${record.name}</div>
                <div class="lb-score-value">${record.score}</div>
                <div class="lb-time-value">${timeStr}</div>
            </div>
        `;
    });

    leaderboardList.innerHTML = html;
}

// 清空音程榜单
function clearIntervalLeaderboard() {
    if (confirm('确定要清空风云榜单吗？此操作不可恢复！')) {
        // 获取当前设置
        const currentFunction = intervalAppState.currentFunction || 'pitch';
        const currentScale = intervalAppState.currentScale || '未选择';
        const difficultySelect = document.getElementById('difficulty-interval');
        const currentLevel = difficultySelect ? difficultySelect.value || '未选择' : '未选择';

        // 使用组合键删除对应配置的榜单
        const storageKey = `intervalLeaderboard_${currentFunction}_${currentScale}_${currentLevel}`;
        localStorage.removeItem(storageKey);
        intervalAppState.leaderboard = [];
        renderIntervalLeaderboard();
        alert('榜单已清空');
    }
}

// 更新统计数据
function updateSingleStats() {
    const scoreEl = document.getElementById('score-single');
    const correctEl = document.getElementById('correct-single');
    const wrongEl = document.getElementById('wrong-single');
    const progressEl = document.getElementById('progress-single');

    if (scoreEl) scoreEl.textContent = singleAppState.score;
    if (correctEl) correctEl.textContent = singleAppState.correct;
    if (wrongEl) wrongEl.textContent = singleAppState.wrong;
    if (progressEl) progressEl.textContent = `${singleAppState.totalQuestions}题`;
}

// 更新音程统计数据
function updateIntervalStats() {
    const scoreEl = document.getElementById('score-interval');
    const correctEl = document.getElementById('correct-interval');
    const wrongEl = document.getElementById('wrong-interval');
    const progressEl = document.getElementById('progress-interval');

    if (scoreEl) scoreEl.textContent = intervalAppState.score;
    if (correctEl) correctEl.textContent = intervalAppState.correct;
    if (wrongEl) wrongEl.textContent = intervalAppState.wrong;
    if (progressEl) progressEl.textContent = `${intervalAppState.totalQuestions}题`;
}

// 时间管理
function startTimeUpdateSingle() {
    if (singleAppState.testTimer) clearInterval(singleAppState.testTimer);
    singleAppState.testTimer = setInterval(() => {
        updateCurrentTimeSingle();
    }, 1000);
    updateCurrentTimeSingle();
}

function stopTimeUpdateSingle() {
    if (singleAppState.testTimer) {
        clearInterval(singleAppState.testTimer);
        singleAppState.testTimer = null;
    }
}

// 启动用时计时器
function startElapsedTimeTimer() {
    // 先停止之前的计时器（防止重复启动）
    stopElapsedTimeTimer();

    singleAppState.elapsedTime = 0;
    updateElapsedTimeDisplay();

    singleAppState.elapsedTimeTimer = setInterval(() => {
        singleAppState.elapsedTime += 0.01; // 每 10 毫秒增加

        // 保护机制：如果用时超过 60 分钟（3600秒），自动停止
        if (singleAppState.elapsedTime > 3600) {
            console.warn('⚠️ 测试用时超过60分钟，自动停止计时器');
            stopElapsedTimeTimer();
            updateSingleStatus('测试时间过长，已自动结束。请重新开始测试。');
            setTimeout(() => endSingleTestMode(), 2000);
            return;
        }

        updateElapsedTimeDisplay();
    }, 10);
}

// 停止用时计时器
function stopElapsedTimeTimer() {
    if (singleAppState.elapsedTimeTimer) {
        clearInterval(singleAppState.elapsedTimeTimer);
        singleAppState.elapsedTimeTimer = null;
    }
}

// 更新用时显示
function updateElapsedTimeDisplay() {
    const elapsedTimeDisplay = document.getElementById('elapsed-time-single');
    if (elapsedTimeDisplay) {
        const totalSeconds = singleAppState.elapsedTime;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const display = `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`;
        elapsedTimeDisplay.textContent = display;
    }
}

// 音程计时器函数
function startTimeUpdateInterval() {
    if (intervalAppState.testTimer) clearInterval(intervalAppState.testTimer);
    intervalAppState.testTimer = setInterval(() => {
        updateCurrentTimeInterval();
    }, 1000);
    updateCurrentTimeInterval();
}

function stopTimeUpdateInterval() {
    if (intervalAppState.testTimer) {
        clearInterval(intervalAppState.testTimer);
        intervalAppState.testTimer = null;
    }
}

// 启动音程用时计时器
function startIntervalElapsedTimeTimer() {
    // 先停止之前的计时器（防止重复启动）
    stopIntervalElapsedTimeTimer();

    intervalAppState.elapsedTime = 0;
    updateIntervalElapsedTimeDisplay();

    intervalAppState.elapsedTimeTimer = setInterval(() => {
        intervalAppState.elapsedTime += 0.01; // 每 10 毫秒增加

        // 保护机制：如果用时超过 60 分钟（3600秒），自动停止
        if (intervalAppState.elapsedTime > 3600) {
            console.warn('⚠️ 测试用时超过60分钟，自动停止计时器');
            stopIntervalElapsedTimeTimer();
            updateIntervalStatus('测试时间过长，已自动结束。请重新开始测试。');
            setTimeout(() => endIntervalTestMode(), 2000);
            return;
        }

        updateIntervalElapsedTimeDisplay();
    }, 10);
}

// 停止音程用时计时器
function stopIntervalElapsedTimeTimer() {
    if (intervalAppState.elapsedTimeTimer) {
        clearInterval(intervalAppState.elapsedTimeTimer);
        intervalAppState.elapsedTimeTimer = null;
    }
}

// 更新音程用时显示
function updateIntervalElapsedTimeDisplay() {
    const elapsedTimeDisplay = document.getElementById('elapsed-time-interval');
    if (elapsedTimeDisplay) {
        const totalSeconds = intervalAppState.elapsedTime;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const display = `${String(minutes).padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`;
        elapsedTimeDisplay.textContent = display;
    }
}

// 更新风云榜单
function updateLeaderboard() {
    const userInfo = singleAppState.userInfo;

    // 如果没有学生信息，不记录
    if (!userInfo || !userInfo.name) {
        console.log('无学生信息，跳过榜单更新');
        return;
    }

    // 获取当前设置
    const currentVoices = singleAppState.currentVoices || 1;
    const currentScale = singleAppState.currentScale || '未选择';
    const difficultySelect = document.getElementById('difficulty-single');
    const currentLevel = difficultySelect ? difficultySelect.value || '未选择' : '未选择';

    // 使用组合键存储不同配置的榜单
    const storageKey = `singlePitchLeaderboard_v${currentVoices}_${currentScale}_${currentLevel}`;

    // 从 localStorage 加载榜单
    const savedLeaderboard = localStorage.getItem(storageKey);
    singleAppState.leaderboard = savedLeaderboard ? JSON.parse(savedLeaderboard) : [];

    // 添加新记录
    const newRecord = {
        name: userInfo.name,
        school: userInfo.school || '未填写',
        majorClass: userInfo.majorClass || '未填写',
        score: singleAppState.score,
        time: singleAppState.elapsedTime,
        voices: currentVoices,
        scale: currentScale,
        level: currentLevel,
        date: singleAppState.testEndTime ? singleAppState.testEndTime.toLocaleString('zh-CN') : new Date().toLocaleString('zh-CN')
    };

    singleAppState.leaderboard.push(newRecord);

    // 排序：先按分数降序，再按用时升序
    singleAppState.leaderboard.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score; // 分数高的排前面
        }
        return a.time - b.time; // 用时短的排前面
    });

    // 只保留前 10 名
    singleAppState.leaderboard = singleAppState.leaderboard.slice(0, 10);

    // 保存到 localStorage
    localStorage.setItem(storageKey, JSON.stringify(singleAppState.leaderboard));

    console.log('风云榜单已更新', singleAppState.leaderboard);
}

// 显示风云榜单
function showLeaderboard() {
    singleAppState.currentMode = 'leaderboard';

    const leaderboardContent = document.getElementById('leaderboard-content-single');
    const pianoContainer = document.getElementById('piano-container-single');
    const playControls = document.getElementById('play-controls-single');
    const testEndContent = document.getElementById('single-test-end-content');
    const instructions = document.querySelectorAll('#practice-test-content-single .practice-instructions, #practice-test-content-interval .practice-instructions');
    const statsPanel = document.getElementById('stats-panel-single');
    const timePanel = document.getElementById('time-panel-single');
    const statusMessage = document.getElementById('status-single');

    // 隐藏其他内容
    if (pianoContainer) pianoContainer.style.display = 'none';
    if (playControls) playControls.style.display = 'none';
    if (testEndContent) testEndContent.style.display = 'none';
    instructions.forEach(el => { el.style.display = 'none'; });
    if (statsPanel) statsPanel.style.display = 'none';
    if (timePanel) timePanel.style.display = 'none';
    if (statusMessage) statusMessage.style.display = 'none';

    // 显示榜单
    if (leaderboardContent) leaderboardContent.style.display = 'block';

    // 解锁所有声部按钮（榜单模式下所有声部按钮都可用）
    unlockVoiceButtons();

    // 更新按钮状态
    updateSingleButtonStates();

    // 渲染榜单数据
    renderLeaderboard();
}

// 渲染榜单数据
function renderLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list-single');
    if (!leaderboardList) return;

    // 获取当前设置
    const currentVoices = singleAppState.currentVoices || 1;
    const currentScale = singleAppState.currentScale || '未选择';
    const difficultySelect = document.getElementById('difficulty-single');
    const currentLevel = difficultySelect ? difficultySelect.value || '未选择' : '未选择';

    // 使用组合键加载对应配置的榜单
    const storageKey = `singlePitchLeaderboard_v${currentVoices}_${currentScale}_${currentLevel}`;
    const savedLeaderboard = localStorage.getItem(storageKey);
    const leaderboard = savedLeaderboard ? JSON.parse(savedLeaderboard) : [];

    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = '<div style="text-align: center; padding: 40px; color: rgba(255, 255, 255, 0.5);">暂无榜单数据</div>';
        return;
    }

    let html = '';
    leaderboard.forEach((record, index) => {
        const rank = index + 1;
        const rankClass = rank <= 3 ? `lb-rank-${rank}` : '';
        const timeStr = formatElapsedTime(record.time);

        html += `
            <div class="leaderboard-row ${rankClass}">
                <div class="lb-rank-value">${rank}</div>
                <div class="lb-name-value">${record.name}</div>
                <div class="lb-score-value">${record.score}</div>
                <div class="lb-time-value">${timeStr}</div>
            </div>
        `;
    });

    leaderboardList.innerHTML = html;
}

// 格式化用时显示
function formatElapsedTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${secs.toFixed(2).padStart(5, '0')}`;
}

// 清空榜单
function clearLeaderboard() {
    if (confirm('确定要清空风云榜单吗？此操作不可恢复！')) {
        // 获取当前设置
        const currentVoices = singleAppState.currentVoices || 1;
        const currentScale = singleAppState.currentScale || '未选择';
        const difficultySelect = document.getElementById('difficulty-single');
        const currentLevel = difficultySelect ? difficultySelect.value || '未选择' : '未选择';

        // 使用组合键删除对应配置的榜单
        const storageKey = `singlePitchLeaderboard_v${currentVoices}_${currentScale}_${currentLevel}`;
        localStorage.removeItem(storageKey);
        singleAppState.leaderboard = [];
        renderLeaderboard();
        alert('榜单已清空');
    }
}

function updateCurrentTimeSingle() {
    const timeDisplay = document.getElementById('current-time-single');
    if (timeDisplay) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}

function updateCurrentTimeInterval() {
    const timeDisplay = document.getElementById('current-time-interval');
    if (timeDisplay) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
}

// 显示测试分析
function showSingleTestAnalysis() {
    const analysisContent = document.getElementById('analysis-content-single');
    if (!analysisContent) return;

    let analysisHTML = '';
    const modeName = '单音听辨';

    // 基本信息
    analysisHTML += `<div class="analysis-section">`;
    analysisHTML += `<h3>${modeName} - 测试分析</h3>`;
    analysisHTML += `<p><strong>学校：</strong>${singleAppState.userInfo.school || '未填写'}</p>`;
    analysisHTML += `<p><strong>专业班级：</strong>${singleAppState.userInfo.majorClass || '未填写'}</p>`;
    analysisHTML += `<p><strong>姓名：</strong>${singleAppState.userInfo.name || '未填写'}</p>`;
    analysisHTML += `<p><strong>教师：</strong>${singleAppState.userInfo.teacher || '未填写'}</p>`;
    analysisHTML += `</div>`;

    // 成绩统计
    analysisHTML += `<div class="analysis-section">`;
    analysisHTML += `<h4>成绩统计</h4>`;

    // 第一行：总题数 + 正确题数 + 错误题数
    analysisHTML += `<div class="stats-row">`;
    analysisHTML += `<p><strong>总题数：</strong>${singleAppState.totalQuestions}</p>`;
    analysisHTML += `<p><strong>正确题数：</strong>${singleAppState.correct}</p>`;
    analysisHTML += `<p><strong>错误题数：</strong>${singleAppState.wrong}</p>`;
    analysisHTML += `</div>`;

    // 第二行：正确率 + 用时
    const accuracy = singleAppState.totalQuestions > 0
        ? ((singleAppState.correct / singleAppState.totalQuestions) * 100).toFixed(1)
        : 0;
    const elapsedSeconds = singleAppState.elapsedTime;
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = (elapsedSeconds % 60).toFixed(2);
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.padStart(5, '0')}`;

    analysisHTML += `<div class="stats-row">`;
    analysisHTML += `<p><strong>正确率：</strong>${accuracy}%</p>`;
    analysisHTML += `<p><strong>用时：</strong>${timeStr}</p>`;
    analysisHTML += `</div>`;

    analysisHTML += `</div>`;

    // 错题列表
    if (singleAppState.errorQuestions.length > 0) {
        analysisHTML += `<div class="analysis-section">`;
        analysisHTML += `<h4>错题回顾</h4>`;
        analysisHTML += `<ul>`;
        singleAppState.errorQuestions.forEach((q, index) => {
            analysisHTML += `<li>第${index + 1}题：正确答案 ${q.correctAnswer.join(' + ')}，你的答案 ${q.userAnswer}</li>`;
        });
        analysisHTML += `</ul>`;
        analysisHTML += `</div>`;
    }

    analysisContent.innerHTML = analysisHTML;
}

// 显示音程测试分析
function showIntervalTestAnalysis() {
    const analysisContent = document.getElementById('analysis-content-interval');
    if (!analysisContent) return;

    let analysisHTML = '';
    const modeName = '音程听辨';

    // 基本信息
    analysisHTML += `<div class="analysis-section">`;
    analysisHTML += `<h3>${modeName} - 测试分析</h3>`;
    analysisHTML += `<p><strong>学校：</strong>${intervalAppState.userInfo.school || '未填写'}</p>`;
    analysisHTML += `<p><strong>专业班级：</strong>${intervalAppState.userInfo.majorClass || '未填写'}</p>`;
    analysisHTML += `<p><strong>姓名：</strong>${intervalAppState.userInfo.name || '未填写'}</p>`;
    analysisHTML += `<p><strong>教师：</strong>${intervalAppState.userInfo.teacher || '未填写'}</p>`;
    analysisHTML += `</div>`;

    // 成绩统计
    analysisHTML += `<div class="analysis-section">`;
    analysisHTML += `<h4>成绩统计</h4>`;

    // 第一行：总题数 + 正确题数 + 错误题数
    analysisHTML += `<div class="stats-row">`;
    analysisHTML += `<p><strong>总题数：</strong>${intervalAppState.totalQuestions}</p>`;
    analysisHTML += `<p><strong>正确题数：</strong>${intervalAppState.correct}</p>`;
    analysisHTML += `<p><strong>错误题数：</strong>${intervalAppState.wrong}</p>`;
    analysisHTML += `</div>`;

    // 第二行：正确率 + 用时
    const accuracy = intervalAppState.totalQuestions > 0
        ? ((intervalAppState.correct / intervalAppState.totalQuestions) * 100).toFixed(1)
        : 0;
    const elapsedSeconds = intervalAppState.elapsedTime;
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = (elapsedSeconds % 60).toFixed(2);
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.padStart(5, '0')}`;

    analysisHTML += `<div class="stats-row">`;
    analysisHTML += `<p><strong>正确率：</strong>${accuracy}%</p>`;
    analysisHTML += `<p><strong>用时：</strong>${timeStr}</p>`;
    analysisHTML += `</div>`;

    analysisHTML += `</div>`;

    // 错题列表
    if (intervalAppState.errorQuestions.length > 0) {
        analysisHTML += `<div class="analysis-section">`;
        analysisHTML += `<h4>错题回顾</h4>`;
        analysisHTML += `<ul>`;
        intervalAppState.errorQuestions.forEach((q, index) => {
            analysisHTML += `<li>第${index + 1}题：正确答案 ${q.correctAnswer.join(' + ')}，你的答案 ${q.userAnswer}</li>`;
        });
        analysisHTML += `</ul>`;
        analysisHTML += `</div>`;
    }

    analysisContent.innerHTML = analysisHTML;
}

// 显示音程测试结束页面
function showIntervalTestEndPage() {
    console.log('=== 显示音程测试结束页面 ===');
    console.log('intervalAppState:', intervalAppState);

    // 学生信息 - 确保从 chordAppState 同步
    const userInfo = intervalAppState.userInfo && intervalAppState.userInfo.saved ? intervalAppState.userInfo : chordAppState.userInfo;

    const schoolEl = document.getElementById('end-school-interval');
    const majorEl = document.getElementById('end-major-class-interval');
    const nameEl = document.getElementById('end-name-interval');
    const teacherEl = document.getElementById('end-teacher-interval');

    if (schoolEl) schoolEl.textContent = (userInfo && userInfo.school) || '未填写';
    if (majorEl) majorEl.textContent = (userInfo && userInfo.majorClass) || '未填写';
    if (nameEl) nameEl.textContent = (userInfo && userInfo.name) || '未填写';
    if (teacherEl) teacherEl.textContent = (userInfo && userInfo.teacher) || '未填写';

    console.log('学生信息已设置');

    // 测试结束时间
    const endTimeEl = document.getElementById('end-time-interval');
    if (endTimeEl && intervalAppState.testEndTime) {
        const endTime = intervalAppState.testEndTime;
        const year = endTime.getFullYear();
        const month = String(endTime.getMonth() + 1).padStart(2, '0');
        const day = String(endTime.getDate()).padStart(2, '0');
        const hours = String(endTime.getHours()).padStart(2, '0');
        const minutes = String(endTime.getMinutes()).padStart(2, '0');
        const seconds = String(endTime.getSeconds()).padStart(2, '0');
        endTimeEl.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        console.log('测试结束时间:', endTimeEl.textContent);
    }

    // 调式和级别
    const scaleEl = document.getElementById('end-scale-interval');
    const difficultyEl = document.getElementById('end-difficulty-interval');

    if (scaleEl) scaleEl.textContent = intervalAppState.currentScale || 'C大调';
    if (difficultyEl) difficultyEl.textContent = `L${intervalAppState.currentLevel}`;

    // 测试结果（总分）
    const scoreEl = document.getElementById('end-total-score-interval');
    if (scoreEl) scoreEl.textContent = intervalAppState.score;

    // 统计数据
    const correctEl = document.getElementById('end-correct-interval');
    const wrongEl = document.getElementById('end-wrong-interval');
    const totalEl = document.getElementById('end-total-interval');

    if (correctEl) correctEl.textContent = intervalAppState.correct;
    if (wrongEl) wrongEl.textContent = intervalAppState.wrong;
    if (totalEl) totalEl.textContent = intervalAppState.totalQuestions;

    // 评语
    generateIntervalTestComment();

    console.log('测试结果已设置:', { score: intervalAppState.score, correct: intervalAppState.correct, wrong: intervalAppState.wrong, total: intervalAppState.totalQuestions });

    generateIntervalAnalysisContent();
    console.log('=== 音程测试结束页面显示完成 ===');
}

// 生成音程测试评语
function generateIntervalTestComment() {
    const total = intervalAppState.totalQuestions;
    const correct = intervalAppState.correct;
    const accuracy = total > 0 ? (correct / total * 100) : 0;

    const commentEl = document.getElementById('end-comment-interval');
    if (!commentEl) return;

    // 未答题情况
    if (total === 0) {
        commentEl.textContent = '测试尚未开始。请点击上面"测试模式"开始重新答题';
        return;
    }

    if (accuracy >= 90) {
        commentEl.textContent = '优秀！音程听辨能力出色，继续保持！';
    } else if (accuracy >= 70) {
        commentEl.textContent = '良好！基础扎实，建议加强难点音程的练习。';
    } else if (accuracy >= 60) {
        commentEl.textContent = '及格！需要加强音程听辨训练，建议从简单音程开始逐步提升。';
    } else {
        commentEl.textContent = '需要努力！建议从基础音程听辨开始，每天坚持练习，逐步提高听辨能力。';
    }
}

// 生成音程测试分析内容
function generateIntervalAnalysisContent() {
    const analysisContent = document.getElementById('analysis-content-interval');
    if (!analysisContent) return;

    let analysisHTML = '';

    // 成绩统计
    analysisHTML += `<div class="analysis-section">`;
    analysisHTML += `<h4>成绩统计</h4>`;

    // 第一行：总题数 + 正确题数 + 错误题数
    analysisHTML += `<div class="stats-row">`;
    analysisHTML += `<span><strong>总题数：</strong>${intervalAppState.totalQuestions} 题</span>`;
    analysisHTML += `<span><strong>正确题数：</strong>${intervalAppState.correct} 题</span>`;
    analysisHTML += `<span><strong>错误题数：</strong>${intervalAppState.wrong} 题</span>`;
    analysisHTML += `</div>`;

    // 第二行：正确率 + 用时
    const accuracy = intervalAppState.totalQuestions > 0
        ? ((intervalAppState.correct / intervalAppState.totalQuestions) * 100).toFixed(1)
        : 0;
    const elapsedSeconds = intervalAppState.elapsedTime;
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = (elapsedSeconds % 60).toFixed(2);
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.padStart(5, '0')}`;

    analysisHTML += `<div class="stats-row">`;
    analysisHTML += `<span><strong>正确率：</strong>${accuracy}%</span>`;
    analysisHTML += `<span><strong>用时：</strong>${timeStr}</span>`;
    analysisHTML += `</div>`;

    analysisHTML += `</div>`;

    // 错题列表
    if (intervalAppState.totalQuestions === 0) {
        analysisHTML += `<div class="analysis-section">`;
        analysisHTML += `<h4>练习建议</h4>`;
        analysisHTML += `<p>尚未答题。请进入测试模式开始练习。</p>`;
        analysisHTML += `</div>`;
    } else if (intervalAppState.errorQuestions.length > 0) {
        analysisHTML += `<div class="analysis-section">`;
        analysisHTML += `<h4>错题回顾</h4>`;
        analysisHTML += `<ul>`;
        intervalAppState.errorQuestions.forEach((q, index) => {
            analysisHTML += `<li>第${index + 1}题：正确答案 ${q.correctAnswer.join(' + ')}，你的答案 ${q.userAnswer}</li>`;
        });
        analysisHTML += `</ul>`;
        analysisHTML += `</div>`;
    } else {
        analysisHTML += `<div class="analysis-section">`;
        analysisHTML += `<h4>表现优秀</h4>`;
        analysisHTML += `<p>恭喜！所有题目回答正确！🎉</p>`;
        analysisHTML += `</div>`;
    }

    analysisContent.innerHTML = analysisHTML;
}

// 修改提交答案函数以支持测试模式
function handleSingleSubmitAnswer() {
    if (!singleAppState.pianoSelection) {
        updateSingleStatus('请先在琴键上选择一个音');
        return;
    }

    if (!singleAppState.lastQuestion) {
        updateSingleStatus('请先点击“随机播放”出题');
        return;
    }

    singleAppState.lastSubmittedAnswer = singleAppState.pianoSelection;

    // 判断答案是否正确 - 支持单声部和多声部，支持等音
    let isCorrect = false;

    if (singleAppState.currentVoices === 1) {
        // 单声部：直接比较（包括等音）
        const correctAnswer = singleAppState.lastQuestion[0];
        const userAnswer = singleAppState.pianoSelection;
        isCorrect = areEnharmonic(correctAnswer, userAnswer);

        console.log('=== 答案对比（单声部）===');
        console.log('正确答案:', correctAnswer);
        console.log('用户答案:', userAnswer);
        console.log('是否匹配:', isCorrect);
    } else {
        // 多声部：检查用户选择是否在正确答案数组中（包括等音）
        isCorrect = singleAppState.lastQuestion.some(correctNote => areEnharmonic(correctNote, singleAppState.pianoSelection));

        console.log('=== 答案对比（多声部）===');
        console.log('正确答案数组:', singleAppState.lastQuestion);
        console.log('用户答案:', singleAppState.pianoSelection);
        console.log('是否匹配:', isCorrect);
    }

    // 提交答案后出声+高亮（练习和测试模式都适用）
    playNoteWithWebAudio(singleAppState.pianoSelection, 3.0);
    highlightKey(singleAppState.pianoSelection);

    // 记录学习数据（练习模式和测试模式都记录）
    learningManager.recordResult('single', {
        question: singleAppState.lastQuestion.join(' + '),
        correct: isCorrect,
        userAnswer: singleAppState.pianoSelection,
        correctAnswer: singleAppState.lastQuestion.join(' + '),
        mode: 'pitch',
        difficulty: singleAppState.currentLevel || 1
    });

    // 测试模式下记录成绩
    if (singleAppState.currentMode === 'test') {
        singleAppState.totalQuestions++;

        if (isCorrect) {
            singleAppState.correct++;
            singleAppState.score += 5; // 每题 5 分，满分 100 分（20题）
            updateSingleStatus(` 答对了！+5分`);
        } else {
            singleAppState.wrong++;
            // 记录错题
            singleAppState.errorQuestions.push({
                question: singleAppState.lastQuestion,
                correctAnswer: singleAppState.lastQuestion,
                userAnswer: singleAppState.pianoSelection
            });
            const correctAnswer = singleAppState.lastQuestion.join(' + ');
            updateSingleStatus(` 答错了！正确答案：${correctAnswer}`);
        }

        updateSingleStats();

        // 检查是否达到20题
        if (singleAppState.totalQuestions >= 20) {
            // 20题结束，自动结束测试
            setTimeout(() => {
                endSingleTestMode();
            }, 2000);
        } else {
            // 测试模式下自动出下一题
            setTimeout(() => {
                handleSingleRandomPlay();
            }, 2000);
        }
    } else {
        // 练习模式下显示详细反馈
        if (isCorrect) {
            updateSingleStatus(`🎉 恭喜你答对了！正确答案：${singleAppState.pianoSelection}`);
        } else {
            const correctAnswer = singleAppState.lastQuestion.join(' + ');
            updateSingleStatus(`❌ 答错了！你的答案：${singleAppState.pianoSelection}，正确答案：${correctAnswer}`);
        }
    }
}

// 初始化调式调性选择器
function initSingleScaleSelector() {
    const scaleSelect = document.getElementById('scale-difficulty-single');
    if (!scaleSelect) return;

    scaleSelect.innerHTML = '';

    // 级别作为可选项，具体调式作为灰色说明
    Object.entries(scaleDifficultyConfig).forEach(([level, config]) => {
        // 级别作为可点击的选项
        const levelOption = document.createElement('option');
        levelOption.value = `level-${level}`;
        levelOption.textContent = config.name;
        levelOption.style.fontWeight = 'bold';
        scaleSelect.appendChild(levelOption);

        // 具体调式作为灰色不可选的说明
        Object.keys(config.scales).forEach(scaleName => {
            const scaleOption = document.createElement('option');
            scaleOption.value = scaleName;
            scaleOption.textContent = `  └ ${scaleName}`; // 缩进显示
            scaleOption.disabled = true; // 灰色不可选
            scaleOption.style.color = '#888';
            scaleSelect.appendChild(scaleOption);
        });
    });

    // 默认选择第一个级别
    scaleSelect.value = 'level-1';
    updateSingleScaleNotesByLevel(1);

    // 监听调式变化
    scaleSelect.addEventListener('change', (e) => {
        const value = e.target.value;
        if (value.startsWith('level-')) {
            // 选择了级别
            const level = parseInt(value.replace('level-', ''));
            updateSingleScaleNotesByLevel(level);

            // 如果在榜单模式，重新渲染榜单
            if (singleAppState.currentMode === 'leaderboard') {
                renderLeaderboard();
            }
        }
    });
}

// 根据级别更新音符
function updateSingleScaleNotesByLevel(level) {
    const config = scaleDifficultyConfig[level];
    if (!config) {
        updateSingleStatus('未找到该级别配置');
        return;
    }

    singleAppState.currentScale = config.name;
    singleAppState.scaleNotes = config.notes || [];
    updateSingleStatus(`已选择：${config.name}，可用音符 ${singleAppState.scaleNotes.length} 个`);

    // 应用调式限制到钢琴琴键
    applySingleScaleRestrictions();
}

// 应用调式限制到单音练习的钢琴琴键
function applySingleScaleRestrictions() {
    const allowed = enrichAllowedNotes(singleAppState.scaleNotes);
    const piano = document.getElementById('piano-single');
    if (!piano) return;

    piano.querySelectorAll('.white-key, .black-key').forEach(key => {
        const note = key.dataset.note;
        if (!allowed.has(note)) {
            key.classList.add('disabled');
            key.dataset.disabled = 'true';
        } else {
            key.classList.remove('disabled');
            delete key.dataset.disabled;
        }
    });
}

// 更新单音练习的调式音符
function updateSingleScaleNotes(scaleName) {
    singleAppState.currentScale = scaleName;

    // 从配置中查找对应的音符
    for (const level of Object.values(scaleDifficultyConfig)) {
        if (level.scales[scaleName]) {
            singleAppState.scaleNotes = level.notes || [];
            updateSingleStatus(`已选择：${scaleName}，可用音符 ${singleAppState.scaleNotes.length} 个`);
            return;
        }
    }

    updateSingleStatus(`未找到调式：${scaleName}`);
}

// 初始化单音练习播放控制按钮
function initSinglePlayControls() {
    const randomPlayBtn = document.getElementById('random-play-btn-single');
    const repeatPlayBtn = document.getElementById('play-btn-single');
    const melodicPlayBtn = document.getElementById('play-melodic-btn-single');
    const submitBtn = document.getElementById('submit-btn-single');
    const showAnswerBtn = document.getElementById('show-answer-btn-single');

    if (randomPlayBtn) randomPlayBtn.addEventListener('click', handleSingleRandomPlay);
    if (repeatPlayBtn) repeatPlayBtn.addEventListener('click', handleSingleRepeatPlay);
    if (melodicPlayBtn) melodicPlayBtn.addEventListener('click', handleSingleMelodicPlay);
    if (submitBtn) submitBtn.addEventListener('click', handleSingleSubmitAnswer);
    if (showAnswerBtn) showAnswerBtn.addEventListener('click', handleSingleShowAnswer);
}

// 其他页面的初始化函数（简化版）
function initSinglePage() {
    const back = document.getElementById('back-home-single');
    if (back) back.addEventListener('click', () => pageManager.switchToPage('home-page'));

    // 绑定模式切换按钮
    const practiceBtn = document.getElementById('practice-btn-single');
    const testBtn = document.getElementById('test-btn-single');
    const leaderboardBtn = document.getElementById('leaderboard-btn-single');
    const endTestBtn = document.getElementById('end-test-btn-single');

    if (practiceBtn) practiceBtn.addEventListener('click', startSinglePracticeMode);
    if (testBtn) testBtn.addEventListener('click', startSingleTestMode);
    if (leaderboardBtn) leaderboardBtn.addEventListener('click', showLeaderboard);
    if (endTestBtn) endTestBtn.addEventListener('click', endSingleTestMode);

    // 绑定截屏按钮
    const screenshotBtn = document.getElementById('screenshot-btn-single');
    if (screenshotBtn) screenshotBtn.addEventListener('click', captureSinglePageScreenshot);

    // 初始化调式选择器
    initSingleScaleSelector();

    // 绑定级别选择器变化事件
    const difficultySelect = document.getElementById('difficulty-single');
    if (difficultySelect) {
        difficultySelect.addEventListener('change', () => {
            // 如果在榜单模式，重新渲染榜单
            if (singleAppState.currentMode === 'leaderboard') {
                renderLeaderboard();
            }
        });
    }

    // 初始化级别选项
    updateSingleLevelOptions();

    // 绑定声部切换按钮
    initSingleVoiceTabs();

    // 绑定播放控制按钮
    initSinglePlayControls();

    // 初始化状态信息
    updateSingleStatus('请选择调式调性开始练习');

    // 初始化钢琴键盘
    if (!window.singlePianoInitialized) {
        initSinglePiano();
        window.singlePianoInitialized = true;
    }

    // 绑定风云榜单按钮
    const clearLeaderboardBtn = document.getElementById('clear-leaderboard-btn-single');
    const backFromLeaderboardBtn = document.getElementById('back-from-leaderboard-btn-single');

    if (clearLeaderboardBtn) clearLeaderboardBtn.addEventListener('click', clearLeaderboard);
    if (backFromLeaderboardBtn) backFromLeaderboardBtn.addEventListener('click', () => {
        // 返回练习模式
        startSinglePracticeMode();
    });
}

function initIntervalPage() {
    const back = document.getElementById('back-home-interval');
    if (back) back.addEventListener('click', () => pageManager.switchToPage('home-page'));

    // 绑定截屏按钮
    const screenshotBtn = document.getElementById('screenshot-btn-interval');
    if (screenshotBtn) screenshotBtn.addEventListener('click', captureIntervalPageScreenshot);

    // 绑定功能标签切换
    const pitchBtn = document.getElementById('pitch-identification-btn-interval');
    const qualityBtn = document.getElementById('quality-identification-btn-interval');

    if (pitchBtn) {
        pitchBtn.addEventListener('click', () => switchToPitchIdentificationInterval());
    }
    if (qualityBtn) {
        qualityBtn.addEventListener('click', () => switchToQualityIdentificationInterval());
    }

    // 绑定模式切换按钮
    const practiceBtn = document.getElementById('practice-btn-interval');
    const testBtn = document.getElementById('test-btn-interval');
    const leaderboardBtn = document.getElementById('leaderboard-btn-interval');
    const endTestBtn = document.getElementById('end-test-btn-interval');

    if (practiceBtn) practiceBtn.addEventListener('click', startIntervalPracticeMode);
    if (testBtn) testBtn.addEventListener('click', startIntervalTestMode);
    if (leaderboardBtn) leaderboardBtn.addEventListener('click', showIntervalLeaderboard);
    if (endTestBtn) endTestBtn.addEventListener('click', endIntervalTestMode);

    // 初始化调式选择器
    initIntervalScaleSelector();

    // 初始化级别选项
    updateIntervalLevelOptions();

    // 绑定级别选择器变化事件
    const difficultySelect = document.getElementById('difficulty-interval');
    if (difficultySelect) {
        difficultySelect.addEventListener('change', (e) => {
            intervalAppState.currentLevel = parseInt(e.target.value);
            const config = intervalLevelConfig[intervalAppState.currentLevel];
            if (config) {
                updateIntervalStatus(`已选择：${config.description}`);
            }

            // 如果在性质听辨模式，重新初始化性质按钮
            if (intervalAppState.currentFunction === 'quality') {
                initIntervalQualityButtons();
            }

            // 如果在风云榜单模式，重新渲染榜单
            if (intervalAppState.currentMode === 'leaderboard') {
                renderIntervalLeaderboard();
            }
        });
    }

    // 绑定播放控制按钮
    const randomPlayBtn = document.getElementById('random-play-btn-interval');
    const repeatPlayBtn = document.getElementById('play-btn-interval');
    const melodicPlayBtn = document.getElementById('play-melodic-btn-interval');
    const submitBtn = document.getElementById('submit-btn-interval');
    const showAnswerBtn = document.getElementById('show-answer-btn-interval');

    if (randomPlayBtn) randomPlayBtn.addEventListener('click', handleIntervalRandomPlay);
    if (repeatPlayBtn) repeatPlayBtn.addEventListener('click', handleIntervalRepeatPlay);
    if (melodicPlayBtn) melodicPlayBtn.addEventListener('click', handleIntervalMelodicPlay);
    if (submitBtn) submitBtn.addEventListener('click', handleIntervalSubmitAnswer);
    if (showAnswerBtn) showAnswerBtn.addEventListener('click', handleIntervalShowAnswer);

    // 初始化钢琴键盘
    if (!window.intervalPianoInitialized) {
        initIntervalPiano();
        window.intervalPianoInitialized = true;
    }

    // 绑定风云榜单按钮
    const clearLeaderboardBtn = document.getElementById('clear-leaderboard-btn-interval');
    const backFromLeaderboardBtn = document.getElementById('back-from-leaderboard-btn-interval');

    if (clearLeaderboardBtn) clearLeaderboardBtn.addEventListener('click', clearIntervalLeaderboard);
    if (backFromLeaderboardBtn) backFromLeaderboardBtn.addEventListener('click', () => {
        // 返回练习模式
        startIntervalPracticeMode();
    });

    // Deleted:// 绑定测试结束页按钮
    // Deleted:const viewDetailsBtn = document.getElementById('view-details-btn-interval');
    // Deleted:const restartBtn = document.getElementById('restart-test-btn-interval');
    // Deleted:const backHomeBtn = document.getElementById('back-to-home-btn-interval');
    // Deleted:
    // Deleted:if (viewDetailsBtn) viewDetailsBtn.addEventListener('click', function () { exportTestReport('interval'); });
    // Deleted:if (restartBtn) restartBtn.addEventListener('click', function () { startIntervalTestMode(); });
    // Deleted:if (backHomeBtn) backHomeBtn.addEventListener('click', function () { 
    // Deleted:    // 恢复钢琴和按钮显示
    // Deleted:    const pianoContainer = document.getElementById('piano-container-interval');
    // Deleted:    const playControls = document.getElementById('play-controls-interval');
    // Deleted:    const testEndContent = document.getElementById('interval-test-end-content');
    // Deleted:    
    // Deleted:    if (pianoContainer) pianoContainer.style.display = 'block';
    // Deleted:    if (playControls) playControls.style.display = 'flex';
    // Deleted:    if (testEndContent) testEndContent.style.display = 'none';
    // Deleted:    
    // Deleted:    // 切换回练习模式
    // Deleted:    startIntervalPracticeMode();
    // Deleted:    
    // Deleted:    pageManager.switchToPage('home-page'); 
    // Deleted:});

    // 默认切换到音程音高模式
    switchToPitchIdentificationInterval();
}

function initMelodyPage() {
    const back = document.getElementById('back-home-melody'); if (back) back.addEventListener('click', () => pageManager.switchToPage('home-page'));
    alert('旋律听辨功能正在开发中，敬请期待！');
}

function initRhythmPage() {
    console.log(' initRhythmPage 被调用, initialized:', initRhythmPage.initialized);
    // 防止重复初始化
    if (initRhythmPage.initialized) {
        console.log('⚠️ initRhythmPage 已经初始化过，跳过');
        return;
    }
    initRhythmPage.initialized = true;
    console.log('✅ initRhythmPage 初始化开始');

    const back = document.getElementById('back-home-rhythm');
    if (back) back.addEventListener('click', () => pageManager.switchToPage('home-page'));

    // 绑定模式切换按钮
    const practiceBtn = document.getElementById('practice-btn-rhythm');
    const testBtn = document.getElementById('test-btn-rhythm');
    const leaderboardBtn = document.getElementById('leaderboard-btn-rhythm');
    const endTestBtn = document.getElementById('end-test-btn-rhythm');

    if (practiceBtn) practiceBtn.addEventListener('click', startRhythmPracticeMode);
    if (testBtn) testBtn.addEventListener('click', startRhythmTestMode);
    if (leaderboardBtn) leaderboardBtn.addEventListener('click', showRhythmLeaderboard);
    if (endTestBtn) endTestBtn.addEventListener('click', endRhythmTestMode);

    // 绑定功能切换按钮
    const rhythmBtn = document.getElementById('rhythm-identify-btn');
    const meterBtn = document.getElementById('rhythm-meter-btn');

    if (rhythmBtn) rhythmBtn.addEventListener('click', () => switchToRhythmFunction('rhythm'));
    if (meterBtn) meterBtn.addEventListener('click', () => switchToRhythmFunction('meter'));

    // 绑定控制按钮
    const randomPlayBtn = document.getElementById('random-play-btn-rhythm');
    const playBtn = document.getElementById('play-btn-rhythm');
    const playMelodicBtn = document.getElementById('play-melodic-btn-rhythm');
    const submitBtn = document.getElementById('submit-btn-rhythm');
    const showAnswerBtn = document.getElementById('show-answer-btn-rhythm');

    if (randomPlayBtn) randomPlayBtn.addEventListener('click', playRandomRhythm);
    if (playBtn) playBtn.addEventListener('click', repeatRhythm);
    if (playMelodicBtn) playMelodicBtn.addEventListener('click', playSelectedRhythm);
    if (submitBtn) submitBtn.addEventListener('click', submitRhythmAnswer);
    if (showAnswerBtn) showAnswerBtn.addEventListener('click', showRhythmAnswer);

    // 绑定节拍器控制
    const metronomeBtn = document.getElementById('toggle-metronome-rhythm');
    const bpmSlider = document.getElementById('rhythm-bpm');
    const resetBtn = document.getElementById('reset-test-btn-rhythm');

    if (metronomeBtn) metronomeBtn.addEventListener('click', toggleMetronome);
    if (bpmSlider) {
        bpmSlider.addEventListener('input', (e) => {
            rhythmAppState.bpm = parseInt(e.target.value);
            const bpmDisplay = document.getElementById('bpm-display-rhythm');
            if (bpmDisplay) bpmDisplay.textContent = rhythmAppState.bpm;
        });
    }
    if (resetBtn) resetBtn.addEventListener('click', captureRhythmPageScreenshot);

    // 绑定节奏类型选项卡
    const rhythmTabs = document.querySelectorAll('.rhythm-tab-btn');
    console.log('🔍 找到节奏类型选项卡数量:', rhythmTabs.length);
    rhythmTabs.forEach((tab, index) => {
        console.log(`  绑定选项卡 ${index}:`, tab.getAttribute('data-type'), tab.textContent);
        tab.addEventListener('click', () => {
            console.log('👆 选项卡被点击');
            const type = tab.getAttribute('data-type');
            switchRhythmType(type);
        });
    });

    // 绑定节奏按钮
    const rhythmButtons = document.querySelectorAll('.rhythm-btn');
    rhythmButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const rhythm = btn.getAttribute('data-rhythm');
            selectRhythm(rhythm, btn);
        });
    });

    // 绑定拍型选择器变化事件
    const beatTypeSelectInit = document.getElementById('beat-type-rhythm');
    if (beatTypeSelectInit) {
        beatTypeSelectInit.addEventListener('change', () => {
            initRhythmAnswerArea(); // 拍型变化时重新初始化答案槽位
            // 如果在风云榜单模式，重新渲染榜单
            if (rhythmAppState.currentMode === 'leaderboard') {
                loadRhythmLeaderboard();
            }
        });
    }

    // 绑定数量选择器变化事件
    const quantitySelect = document.getElementById('quantity-rhythm');
    if (quantitySelect) {
        quantitySelect.addEventListener('change', () => {
            initRhythmAnswerArea(); // 数量变化时重新初始化答案槽位
            // 如果在风云榜单模式，重新渲染榜单
            if (rhythmAppState.currentMode === 'leaderboard') {
                loadRhythmLeaderboard();
            }
        });
    }

    // 绑定风云榜单返回按钮
    const backFromLeaderboardBtn = document.getElementById('back-from-leaderboard-btn-rhythm');
    if (backFromLeaderboardBtn) {
        backFromLeaderboardBtn.addEventListener('click', () => {
            startRhythmPracticeMode();
        });
    }

    // 绑定清空榜单按钮
    const clearLeaderboardBtn = document.getElementById('clear-leaderboard-btn-rhythm');
    if (clearLeaderboardBtn) {
        clearLeaderboardBtn.addEventListener('click', clearRhythmLeaderboard);
    }

    // 设置初始状态
    updateRhythmButtonStates();

    // 初始化答案区（参考项目方案：在播放题目时创建槽位）
    // 注意：这里不直接创建槽位，而是等待用户点击“随机播放”或“播放题目”时再创建
}



// 切换到节奏或节拍功能
function switchToRhythmFunction(func) {
    rhythmAppState.currentFunction = func;

    const rhythmBtn = document.getElementById('rhythm-identify-btn');
    const meterBtn = document.getElementById('rhythm-meter-btn');

    // 获取参数选择区域的DOM元素
    const paramsSection = document.querySelector('.rhythm-params-section');
    const beatTypeLabel = paramsSection ? paramsSection.querySelector('label[for="beat-type-rhythm"]') : null;
    const beatTypeSelect = document.getElementById('beat-type-rhythm');
    const quantityLabel = paramsSection ? paramsSection.querySelector('label[for="quantity-rhythm"]') : null;
    const quantitySelect = document.getElementById('quantity-rhythm');

    // 获取练习说明列表
    const instructionsList = document.getElementById('rhythm-instructions-list');

    if (func === 'rhythm') {
        // 节奏型听辨模式
        if (rhythmBtn) rhythmBtn.classList.add('active');
        if (meterBtn) meterBtn.classList.remove('active');

        // 恢复节奏型听辨的参数设置
        if (beatTypeLabel) beatTypeLabel.textContent = '拍型';
        if (beatTypeSelect) {
            beatTypeSelect.innerHTML = `
                <option value="1">一拍（四分）</option>
                <option value="2">二拍（二分）</option>
            `;
        }
        if (quantityLabel) quantityLabel.textContent = '数量';
        if (quantitySelect) {
            quantitySelect.innerHTML = `
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="12">12</option>
            `;
        }

        // 更新练习说明
        if (instructionsList) {
            instructionsList.innerHTML = `
                <li><strong>随机播放：</strong>根据所选拍型和数量随机出题，播放节奏音响</li>
                <li><strong>选择答案：</strong>点击下方的节奏型按钮，答案会自动填入上方的答案槽位</li>
                <li><strong>提交验证：</strong>填写完所有答案后，点击"提交答案"验证正确性</li>
                <li><strong>重播题目：</strong>如需再次听题，点击"重复播放"按钮</li>
            `;
        }

        updateRhythmStatus('已切换到节奏型听辨模式');

        // 重新初始化答案区
        initRhythmAnswerArea();
    } else {
        // 节拍听辨模式
        if (rhythmBtn) rhythmBtn.classList.remove('active');
        if (meterBtn) meterBtn.classList.add('active');

        // 切换为节拍听辨的参数设置
        if (beatTypeLabel) beatTypeLabel.textContent = '节拍';
        if (beatTypeSelect) {
            beatTypeSelect.innerHTML = `
                <option value="2">2/4拍</option>
                <option value="3">3/4拍</option>
            `;
        }
        if (quantityLabel) quantityLabel.textContent = '小节数';
        if (quantitySelect) {
            quantitySelect.innerHTML = `
                <option value="2">2</option>
                <option value="4">4</option>
            `;
        }

        // 更新练习说明
        if (instructionsList) {
            instructionsList.innerHTML = `
                <li><strong>随机播放：</strong>根据所选节拍和小节数随机出题，播放节拍音响</li>
                <li><strong>选择答案：</strong>每个小节可以包含1个2拍节奏型，或2-3个1拍节奏型</li>
                <li><strong>小节填满：</strong>当小节的总拍数达到节拍要求时，自动跳到下一小节</li>
                <li><strong>提交验证：</strong>填写完所有小节后，点击"提交答案"验证正确性</li>
                <li><strong>修改答案：</strong>点击已填写的小节可重置，重新选择节奏型</li>
                <li><strong>重播题目：</strong>如需再次听题，点击"重复播放"按钮</li>
            `;
        }

        updateRhythmStatus('已切换到节拍听辨模式');

        // 重新初始化答案区
        initRhythmAnswerArea();
    }

    // 如果在风云榜单模式，重新渲染榜单
    if (rhythmAppState.currentMode === 'leaderboard') {
        loadRhythmLeaderboard();
    }
}

// 切换节奏类型选项卡
function switchRhythmType(type) {
    console.log(' switchRhythmType 被调用, type:', type);
    // 更新选项卡状态
    const tabs = document.querySelectorAll('.rhythm-tab-btn');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-type') === type) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // 更新内容显示
    const contents = document.querySelectorAll('.rhythm-type-content');
    contents.forEach(content => {
        if (content.id === `rhythm-type-${type}`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });

    // 注意：不清空答案区，保持槽位激活状态
    // 用户可以自由切换选项卡而不丢失已选择的答案
    // clearRhythmAnswer(); // 已移除

    updateRhythmStatus(`已切换到${type}拍节奏型`);
}

// 获取节奏型的总时值（拍数）
function getRhythmBeats(rhythmName) {
    const pattern = RHYTHM_DURATION_MAP[rhythmName];
    if (!pattern) return 0;
    return pattern.reduce((sum, note) => sum + note.beats, 0);
}

// 获取当前节拍参数（每小节拍数）
function getMeterBeatsPerMeasure() {
    const beatTypeSelect = document.getElementById('beat-type-rhythm');
    return beatTypeSelect ? parseInt(beatTypeSelect.value) : 2;
}

// 初始化答案区
function initRhythmAnswerArea() {
    console.log('🎵 initRhythmAnswerArea 被调用');
    const answerArea = document.getElementById('rhythm-answer-area');
    if (!answerArea) return;

    answerArea.innerHTML = '';

    const quantity = document.getElementById('quantity-rhythm');
    const count = quantity ? parseInt(quantity.value) : 4;

    // 根据当前功能模式确定标签文字
    const isMeterMode = rhythmAppState.currentFunction === 'meter';
    const labelPrefix = isMeterMode ? '小节' : '节奏';

    // 如果是节拍听辨模式，初始化小节数据结构
    if (isMeterMode) {
        rhythmAppState.meterBeatsPerMeasure = getMeterBeatsPerMeasure();
        rhythmAppState.measureRhythms = new Array(count).fill(null).map(() => []);
        rhythmAppState.measureBeatsFilled = new Array(count).fill(0);
    }

    for (let i = 0; i < count; i++) {
        const slot = document.createElement('div');
        slot.className = 'rhythm-answer-slot';
        slot.textContent = `点击选择第 ${i + 1} 个${labelPrefix}`;
        slot.dataset.index = i;

        // 为每个槽位添加点击事件
        slot.addEventListener('click', () => {
            activateSlot(i);
        });

        answerArea.appendChild(slot);
    }

    rhythmAppState.selectedRhythms = new Array(count).fill(null);
    rhythmAppState.activeSlotIndex = -1; // 重置激活状态
}

// 激活槽位
function activateSlot(index) {
    const slots = document.querySelectorAll('.rhythm-answer-slot');
    const isMeterMode = rhythmAppState.currentFunction === 'meter';
    const labelPrefix = isMeterMode ? '小节' : '节奏';

    // 移除所有槽位的激活样式
    slots.forEach(slot => slot.classList.remove('slot-active'));

    // 激活当前槽位
    if (index >= 0 && index < slots.length) {
        // 判断该槽位是否已填写
        const isFilled = isMeterMode
            ? rhythmAppState.measureRhythms[index] && rhythmAppState.measureRhythms[index].length > 0
            : rhythmAppState.selectedRhythms[index] !== null;

        if (isFilled) {
            // 槽位已填写，重置为未答题状态
            resetSlot(index);

            // 重置后激活该槽位
            rhythmAppState.activeSlotIndex = index;
            slots[index].classList.add('slot-active');
            updateRhythmStatus(`✅ 第 ${index + 1} 个${labelPrefix}已重置，请重新选择`);
        } else {
            // 槽位未填写，直接激活
            rhythmAppState.activeSlotIndex = index;
            slots[index].classList.add('slot-active');
            updateRhythmStatus(`已激活第 ${index + 1} 个${labelPrefix}，请点击下方节奏型按钮`);
        }
    }
}

// 重置单个槽位
function resetSlot(index) {
    const slots = document.querySelectorAll('.rhythm-answer-slot');
    const isMeterMode = rhythmAppState.currentFunction === 'meter';
    const labelPrefix = isMeterMode ? '小节' : '节奏';

    if (index < 0 || index >= slots.length) return;

    const slot = slots[index];

    // 重置槽位显示
    slot.textContent = `点击选择第 ${index + 1} 个${labelPrefix}`;
    slot.classList.remove('filled');

    // 清除样式（如果之前提交过答案会有背景色）
    slot.style.background = '';
    slot.style.borderColor = '';

    // 重置数据
    if (isMeterMode) {
        rhythmAppState.measureRhythms[index] = [];
        rhythmAppState.measureBeatsFilled[index] = 0;
        rhythmAppState.selectedRhythms[index] = null;
    } else {
        rhythmAppState.selectedRhythms[index] = null;
    }
}

// 清空答案区
function clearRhythmAnswer() {
    const slots = document.querySelectorAll('.rhythm-answer-slot');
    const isMeterMode = rhythmAppState.currentFunction === 'meter';
    const labelPrefix = isMeterMode ? '小节' : '节奏';

    slots.forEach((slot, index) => {
        slot.textContent = `点击选择第 ${index + 1} 个${labelPrefix}`;
        slot.classList.remove('filled');
        slot.classList.remove('slot-active'); // 移除激活状态
    });

    // 清除按钮状态
    document.querySelectorAll('.rhythm-btn.selected').forEach(b => b.classList.remove('selected'));

    const quantity = document.getElementById('quantity-rhythm');
    const count = quantity ? parseInt(quantity.value) : 4;
    rhythmAppState.selectedRhythms = new Array(count).fill(null);
    rhythmAppState.activeSlotIndex = -1; // 重置激活状态

    // 清空节拍听辨数据
    if (isMeterMode) {
        rhythmAppState.measureRhythms = new Array(count).fill(null).map(() => []);
        rhythmAppState.measureBeatsFilled = new Array(count).fill(0);
    }
}


// 开始练习模式
function startRhythmPracticeMode() {
    console.log('🎵 startRhythmPracticeMode 被调用');
    rhythmAppState.currentMode = 'practice';
    rhythmAppState.testInProgress = false;

    // 练习模式隐藏测试相关的元素
    const statsPanel = document.getElementById('stats-panel-rhythm');
    const timePanel = document.getElementById('time-panel-rhythm');
    const leaderboardContent = document.getElementById('leaderboard-content-rhythm');
    const testEndContent = document.getElementById('rhythm-test-end-content');

    if (statsPanel) statsPanel.style.display = 'none';
    if (timePanel) timePanel.style.display = 'none';
    if (leaderboardContent) leaderboardContent.style.display = 'none';
    // 隐藏测试结束内容（从测试结束页返回练习模式时）
    if (testEndContent) testEndContent.style.display = 'none';

    // 显示练习控制元素
    const practiceContent = document.getElementById('practice-test-content-rhythm');
    if (practiceContent) practiceContent.style.display = 'block';

    // 显示练习说明
    const practiceInstructions = document.getElementById('practice-instructions-rhythm');
    if (practiceInstructions) practiceInstructions.style.display = 'block';

    // 显示节奏型选项卡区域
    const rhythmTabsSection = document.querySelector('.rhythm-tabs-section');
    if (rhythmTabsSection) rhythmTabsSection.style.display = 'block';

    // 显示答案槽位区域（由initRhythmAnswerArea创建后会自动显示）
    const answerArea = document.getElementById('rhythm-answer-area');
    if (answerArea) answerArea.style.display = 'grid';

    // 显示控制按钮区域
    const playControls = document.getElementById('play-controls-rhythm');
    if (playControls) playControls.style.display = 'flex';

    // 显示状态消息
    const statusMessage = document.getElementById('status-rhythm');
    if (statusMessage) statusMessage.style.display = 'block';

    // 隐藏结束测试按钮
    const endTestBtn = document.getElementById('end-test-btn-rhythm');
    if (endTestBtn) endTestBtn.style.display = 'none';

    // 初始化答案区（创建答题槽位）
    initRhythmAnswerArea();

    // 更新模式按钮状态
    const practiceBtn = document.getElementById('practice-btn-rhythm');
    const testBtn = document.getElementById('test-btn-rhythm');
    const leaderboardBtn = document.getElementById('leaderboard-btn-rhythm');

    if (practiceBtn) practiceBtn.classList.add('active');
    if (testBtn) testBtn.classList.remove('active');
    if (leaderboardBtn) leaderboardBtn.classList.remove('active');

    // 练习模式下启用所有按钮
    const randomPlayBtn = document.getElementById('random-play-btn-rhythm');
    const playBtn = document.getElementById('play-btn-rhythm');
    const playMelodicBtn = document.getElementById('play-melodic-btn-rhythm');
    const showAnswerBtn = document.getElementById('show-answer-btn-rhythm');

    if (randomPlayBtn) randomPlayBtn.disabled = false;
    if (playBtn) playBtn.disabled = false;
    if (playMelodicBtn) playMelodicBtn.disabled = false;
    if (showAnswerBtn) showAnswerBtn.disabled = false;

    updateRhythmStatus('练习模式已开始，请点击“随机播放”开始练习');
}

// 显示节奏听辨风云榜单
function showRhythmLeaderboard() {
    rhythmAppState.currentMode = 'leaderboard';

    const leaderboardContent = document.getElementById('leaderboard-content-rhythm');
    const practiceContent = document.getElementById('practice-test-content-rhythm');
    const practiceInstructions = document.getElementById('practice-instructions-rhythm');
    const endTestBtn = document.getElementById('end-test-btn-rhythm');

    const rhythmTestEndContent = document.getElementById('rhythm-test-end-content');

    // 隐藏练习内容、练习说明、测试结束内容和结束测试按钮
    if (practiceContent) practiceContent.style.display = 'none';
    if (practiceInstructions) practiceInstructions.style.display = 'none';
    if (rhythmTestEndContent) rhythmTestEndContent.style.display = 'none';
    if (endTestBtn) endTestBtn.style.display = 'none';

    // 显示风云榜单
    if (leaderboardContent) leaderboardContent.style.display = 'block';

    // 更新模式按钮状态
    const practiceBtn = document.getElementById('practice-btn-rhythm');
    const testBtn = document.getElementById('test-btn-rhythm');
    const leaderboardBtn = document.getElementById('leaderboard-btn-rhythm');

    if (practiceBtn) practiceBtn.classList.remove('active');
    if (testBtn) testBtn.classList.remove('active');
    if (leaderboardBtn) leaderboardBtn.classList.add('active');

    // 加载榜单数据
    loadRhythmLeaderboard();

    updateRhythmStatus('风云榜单');
}

// 加载节奏听辨榜单数据
function loadRhythmLeaderboard() {
    const configInfo = document.getElementById('leaderboard-config-rhythm');
    const leaderboardList = document.getElementById('leaderboard-list-rhythm');

    if (!configInfo || !leaderboardList) return;

    // 判断当前模式
    const isMeterMode = rhythmAppState.currentFunction === 'meter';

    // 获取当前配置
    const beatType = document.getElementById('beat-type-rhythm');
    const quantity = document.getElementById('quantity-rhythm');

    const beatTypeText = beatType ? beatType.options[beatType.selectedIndex].text : '—';
    const quantityText = quantity ? quantity.value : '—';

    // 根据模式显示不同的配置信息
    if (isMeterMode) {
        // 节拍听辨模式
        configInfo.innerHTML = `
            <div style="text-align: center; color: rgba(255, 255, 255, 0.7); font-size: 14px;">
                <div><strong>节拍：</strong>${beatTypeText} | <strong>小节数：</strong>${quantityText}</div>
            </div>
        `;
    } else {
        // 节奏型听辨模式
        configInfo.innerHTML = `
            <div style="text-align: center; color: rgba(255, 255, 255, 0.7); font-size: 14px;">
                <div><strong>拍型：</strong>${beatTypeText} | <strong>数量：</strong>${quantityText}</div>
            </div>
        `;
    }

    // 从localStorage获取数据
    const key = `rhythm_leaderboard_${isMeterMode ? 'meter' : 'rhythm'}_${beatTypeText}_${quantityText}`;
    const data = JSON.parse(localStorage.getItem(key) || '[]');

    if (data.length === 0) {
        leaderboardList.innerHTML = '<div style="text-align:center;padding:40px;color:rgba(255,255,255,0.5);">暂无数据</div>';
        return;
    }

    // 按得分降序、用时升序排序
    data.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.time - b.time;
    });

    // 只显示前10名
    const top10 = data.slice(0, 10);

    leaderboardList.innerHTML = top10.map((item, index) => {
        const rank = index + 1;
        const rankClass = rank <= 3 ? `lb-rank-${rank}` : '';
        const timeStr = formatElapsedTime(item.time);

        return `
            <div class="leaderboard-row ${rankClass}">
                <div class="lb-rank-value">${rank}</div>
                <div class="lb-name-value">${item.name || '匿名'}</div>
                <div class="lb-score-value">${item.score}</div>
                <div class="lb-time-value">${timeStr}</div>
            </div>
        `;
    }).join('');
}

// 更新节奏听辨风云榜单
function updateRhythmLeaderboard() {
    const userInfo = rhythmAppState.userInfo;

    // 如果没有学生信息，不记录
    if (!userInfo || !userInfo.name) {
        console.log('无学生信息，跳过榜单更新');
        return;
    }

    // 判断当前模式
    const isMeterMode = rhythmAppState.currentFunction === 'meter';

    // 获取当前设置
    const beatTypeSelect = document.getElementById('beat-type-rhythm');
    const quantitySelect = document.getElementById('quantity-rhythm');
    const beatTypeText = beatTypeSelect ? beatTypeSelect.options[beatTypeSelect.selectedIndex].text : '未选择';
    const quantityText = quantitySelect ? quantitySelect.value : '未选择';

    // 使用组合键存储不同配置的榜单
    const storageKey = `rhythm_leaderboard_${isMeterMode ? 'meter' : 'rhythm'}_${beatTypeText}_${quantityText}`;

    // 从 localStorage 加载榜单
    const savedLeaderboard = localStorage.getItem(storageKey);
    const leaderboard = savedLeaderboard ? JSON.parse(savedLeaderboard) : [];

    // 添加新记录
    const newRecord = {
        name: userInfo.name,
        school: userInfo.school || '未填写',
        majorClass: userInfo.majorClass || '未填写',
        score: rhythmAppState.score,
        time: rhythmAppState.elapsedTime,
        function: isMeterMode ? 'meter' : 'rhythm',
        beatType: beatTypeText,
        quantity: quantityText,
        date: rhythmAppState.testEndTime ? rhythmAppState.testEndTime.toLocaleString('zh-CN') : new Date().toLocaleString('zh-CN')
    };

    leaderboard.push(newRecord);

    // 排序：先按分数降序，再按用时升序
    leaderboard.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score; // 分数高的排前面
        }
        return a.time - b.time; // 用时短的排前面
    });

    // 只保留前 10 名
    const top10 = leaderboard.slice(0, 10);

    // 保存到 localStorage
    localStorage.setItem(storageKey, JSON.stringify(top10));

    console.log('风云榜单已更新', top10);
}

// 清空节奏听辨榜单
function clearRhythmLeaderboard() {
    if (confirm('确定要清空风云榜单吗？此操作不可恢复！')) {
        // 判断当前模式
        const isMeterMode = rhythmAppState.currentFunction === 'meter';

        // 获取当前设置
        const beatTypeSelect = document.getElementById('beat-type-rhythm');
        const quantitySelect = document.getElementById('quantity-rhythm');
        const beatTypeText = beatTypeSelect ? beatTypeSelect.options[beatTypeSelect.selectedIndex].text : '未选择';
        const quantityText = quantitySelect ? quantitySelect.value : '未选择';

        // 使用组合键删除对应配置的榜单
        const storageKey = `rhythm_leaderboard_${isMeterMode ? 'meter' : 'rhythm'}_${beatTypeText}_${quantityText}`;
        localStorage.removeItem(storageKey);

        // 重新加载榜单
        loadRhythmLeaderboard();
        alert('榜单已清空');
    }
}

// 开始测试模式
function startRhythmTestMode() {
    if (!rhythmAppState.userInfo.saved) {
        userManager.showSaveStatus('未保存学生信息（可跳过）', 'error');
        setTimeout(() => userManager.hideSaveStatus(), 1800);
    }

    rhythmAppState.currentMode = 'test';
    rhythmAppState.testInProgress = true;
    rhythmAppState.score = 0;
    rhythmAppState.correct = 0;
    rhythmAppState.wrong = 0;
    rhythmAppState.totalQuestions = 0;
    rhythmAppState.errorQuestions = [];
    rhythmAppState.testStartTime = new Date();

    // 隐藏练习说明
    const practiceInstructions = document.getElementById('practice-instructions-rhythm');
    if (practiceInstructions) practiceInstructions.style.display = 'none';

    // 显示计分板和时间面板
    const statsPanel = document.getElementById('stats-panel-rhythm');
    if (statsPanel) statsPanel.style.display = 'flex';

    const timePanel = document.getElementById('time-panel-rhythm');
    if (timePanel) timePanel.style.display = 'block';

    // 隐藏测试结束内容
    const testEndContent = document.getElementById('rhythm-test-end-content');
    if (testEndContent) testEndContent.style.display = 'none';

    // 显示结束测试按钮
    const endTestBtn = document.getElementById('end-test-btn-rhythm');
    if (endTestBtn) endTestBtn.style.display = 'block';

    // 初始化答案区（创建答题槽位）
    initRhythmAnswerArea();

    // 启动计时器
    startRhythmElapsedTimeTimer();
    startTimeUpdate();

    updateRhythmStats();
    updateRhythmButtonStates();

    // 自动出第一题
    playRandomRhythm();

    updateRhythmStatus('测试已开始，请认真听题并作答');
}

// 结束测试模式
function endRhythmTestMode() {
    rhythmAppState.currentMode = 'practice';
    rhythmAppState.testInProgress = false;
    rhythmAppState.testEndTime = new Date();

    const endBtn = document.getElementById('end-test-btn-rhythm');
    if (endBtn) endBtn.style.display = 'none';

    // 隐藏计分板和计时器
    const statsPanel = document.getElementById('stats-panel-rhythm');
    if (statsPanel) statsPanel.style.display = 'none';

    const timePanel = document.getElementById('time-panel-rhythm');
    if (timePanel) timePanel.style.display = 'none';

    // 停止计时器
    stopRhythmElapsedTimeTimer();
    stopTimeUpdate();

    updateRhythmStatus('测试已结束');

    // 更新风云榜单
    updateRhythmLeaderboard();

    // 隐藏钢琴、按钮和练习说明，显示测试结果
    const playControls = document.getElementById('play-controls-rhythm');
    const testEndContent = document.getElementById('rhythm-test-end-content');
    const rhythmTabs = document.querySelector('.rhythm-tabs-section');

    if (playControls) playControls.style.display = 'none';
    if (rhythmTabs) rhythmTabs.style.display = 'none';
    if (testEndContent) testEndContent.style.display = 'block';

    // 显示测试结果分析
    showRhythmTestEndPage();
}

// 更新节奏听辨按钮状态
function updateRhythmButtonStates() {
    const practiceBtn = document.getElementById('practice-btn-rhythm');
    const testBtn = document.getElementById('test-btn-rhythm');
    const endTestBtn = document.getElementById('end-test-btn-rhythm');
    const randomPlayBtn = document.getElementById('random-play-btn-rhythm');
    const playBtn = document.getElementById('play-btn-rhythm');
    const playMelodicBtn = document.getElementById('play-melodic-btn-rhythm');
    const showAnswerBtn = document.getElementById('show-answer-btn-rhythm');

    if (rhythmAppState.currentMode === 'test') {
        if (practiceBtn) practiceBtn.classList.remove('active');
        if (testBtn) testBtn.classList.add('active');
        if (endTestBtn) endTestBtn.style.display = 'block';
        // 测试模式下锁死随机播放、播放上屏和显示答案按钮
        // 注意：重复播放按钮保持可用，允许用户重复听题
        if (randomPlayBtn) randomPlayBtn.disabled = true;
        if (playBtn) playBtn.disabled = false;  // 重复播放按钮保持可用
        if (playMelodicBtn) playMelodicBtn.disabled = true;
        if (showAnswerBtn) showAnswerBtn.disabled = true;
    } else {
        if (practiceBtn) practiceBtn.classList.add('active');
        if (testBtn) testBtn.classList.remove('active');
        if (endTestBtn) endTestBtn.style.display = 'none';
        // 练习模式下启用所有按钮
        if (randomPlayBtn) randomPlayBtn.disabled = false;
        if (playBtn) playBtn.disabled = false;
        if (playMelodicBtn) playMelodicBtn.disabled = false;
        if (showAnswerBtn) showAnswerBtn.disabled = false;
    }
}

// 更新节奏听辨状态消息
function updateRhythmStatus(msg) {
    const statusEl = document.getElementById('status-rhythm');
    if (statusEl) statusEl.textContent = msg;
}

// 显示节奏听辨测试结束页
function showRhythmTestEndPage() {
    console.log('=== 显示节奏听辨测试结束页面 ===');
    console.log('rhythmAppState:', rhythmAppState);

    // 根据当前功能模式更新标题
    const isMeterMode = rhythmAppState.currentFunction === 'meter';
    const testEndTitle = document.getElementById('rhythm-test-end-title');
    if (testEndTitle) {
        testEndTitle.textContent = isMeterMode ? '🎉 节拍听辨测试完成！' : '🎉 节奏型听辨测试完成！';
    }

    // 学生信息 - 从chordAppState同步
    const userInfo = rhythmAppState.userInfo && rhythmAppState.userInfo.saved ? rhythmAppState.userInfo : chordAppState.userInfo;

    const schoolEl = document.getElementById('end-school-rhythm');
    const majorEl = document.getElementById('end-major-class-rhythm');
    const nameEl = document.getElementById('end-name-rhythm');
    const teacherEl = document.getElementById('end-teacher-rhythm');

    if (schoolEl) schoolEl.textContent = (userInfo && userInfo.school) || '未填写';
    if (majorEl) majorEl.textContent = (userInfo && userInfo.majorClass) || '未填写';
    if (nameEl) nameEl.textContent = (userInfo && userInfo.name) || '未填写';
    if (teacherEl) teacherEl.textContent = (userInfo && userInfo.teacher) || '未填写';

    // 总分
    const scoreEl = document.getElementById('end-total-score-rhythm');
    if (scoreEl) scoreEl.textContent = rhythmAppState.score;

    // 填充测试结束时间
    const endTimeEl = document.getElementById('end-time-rhythm');
    if (endTimeEl && rhythmAppState.testEndTime) {
        const endTime = rhythmAppState.testEndTime;
        const year = endTime.getFullYear();
        const month = String(endTime.getMonth() + 1).padStart(2, '0');
        const day = String(endTime.getDate()).padStart(2, '0');
        const hours = String(endTime.getHours()).padStart(2, '0');
        const minutes = String(endTime.getMinutes()).padStart(2, '0');
        const seconds = String(endTime.getSeconds()).padStart(2, '0');
        endTimeEl.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    // 生成分析内容
    generateRhythmAnalysisContent();

    // 隐藏按钮、练习说明和状态消息
    const playControls = document.getElementById('play-controls-rhythm');
    if (playControls) playControls.style.display = 'none';

    const instructions = document.querySelector('#practice-test-content-rhythm .practice-instructions');
    if (instructions) instructions.style.display = 'none';

    // 隐藏状态消息
    const statusMessage = document.getElementById('status-rhythm');
    if (statusMessage) statusMessage.style.display = 'none';

    // 隐藏记分板和时间面板
    const statsPanel = document.getElementById('stats-panel-rhythm');
    if (statsPanel) statsPanel.style.display = 'none';

    const timePanel = document.getElementById('time-panel-rhythm');
    if (timePanel) timePanel.style.display = 'none';

    // 隐藏节奏型选项卡区域
    const rhythmTabsSection = document.querySelector('.rhythm-tabs-section');
    if (rhythmTabsSection) rhythmTabsSection.style.display = 'none';

    // 隐藏答案槽位区域
    const answerArea = document.getElementById('rhythm-answer-area');
    if (answerArea) answerArea.style.display = 'none';

    // 显示测试结束内容
    const testEndContent = document.getElementById('rhythm-test-end-content');
    if (testEndContent) testEndContent.style.display = 'block';

    console.log('测试结果已设置:', {
        score: rhythmAppState.score,
        correct: rhythmAppState.correct,
        wrong: rhythmAppState.wrong,
        total: rhythmAppState.totalQuestions
    });

    console.log('=== 节奏听辨测试结束页面显示完成 ===');
}

// 生成节奏听辨测试分析内容
function generateRhythmAnalysisContent() {
    const analysisContent = document.getElementById('analysis-content-rhythm');
    if (!analysisContent) return;

    let analysisHTML = '';

    // 根据当前功能模式确定名称
    const isMeterMode = rhythmAppState.currentFunction === 'meter';
    const featureName = isMeterMode ? '节拍听辨' : '节奏型听辨';

    // 成绩统计
    analysisHTML += `<div class="analysis-section">`;
    analysisHTML += `<h4>成绩统计</h4>`;

    // 第一行：总题数 + 正确题数 + 错误题数
    analysisHTML += `<div class="stats-row">`;
    analysisHTML += `<span><strong>总题数：</strong>${rhythmAppState.totalQuestions} 题</span>`;
    analysisHTML += `<span><strong>正确题数：</strong>${rhythmAppState.correct} 题</span>`;
    analysisHTML += `<span><strong>错误题数：</strong>${rhythmAppState.wrong} 题</span>`;
    analysisHTML += `</div>`;

    // 第二行：正确率 + 用时
    const accuracy = rhythmAppState.totalQuestions > 0
        ? ((rhythmAppState.correct / rhythmAppState.totalQuestions) * 100).toFixed(1)
        : 0;
    const elapsedSeconds = rhythmAppState.elapsedTime || 0;
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = (elapsedSeconds % 60).toFixed(2);
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.padStart(5, '0')}`;

    analysisHTML += `<div class="stats-row">`;
    analysisHTML += `<span><strong>正确率：</strong>${accuracy}%</span>`;
    analysisHTML += `<span><strong>用时：</strong>${timeStr}</span>`;
    analysisHTML += `</div>`;

    analysisHTML += `</div>`;

    // 测试评语（根据得分生成）
    if (rhythmAppState.score === 100) {
        analysisHTML += `
            <div class="analysis-section">
                <h4>🎉 完美表现！</h4>
                <p>您在本次${featureName}测试中获得了满分！表现非常出色！</p>
                <p>建议您可以尝试更复杂的${isMeterMode ? '节拍组合' : '节奏型'}，继续挑战自己。</p>
            </div>
        `;
    } else if (rhythmAppState.score >= 80) {
        analysisHTML += `
            <div class="analysis-section">
                <h4>👍 优秀表现</h4>
                <p>您在本次${featureName}测试中表现优秀，得分 ${rhythmAppState.score} 分。</p>
                <p>建议继续练习，争取获得更高分数。</p>
            </div>
        `;
    } else if (rhythmAppState.score >= 60) {
        analysisHTML += `
            <div class="analysis-section">
                <h4>✅ 良好基础</h4>
                <p>您在本次${featureName}测试中表现良好，得分 ${rhythmAppState.score} 分。</p>
                <p>建议加强练习，特别是对容易混淆的${isMeterMode ? '节拍组合' : '节奏型'}进行专项训练。</p>
            </div>
        `;
    } else {
        analysisHTML += `
            <div class="analysis-section">
                <h4>💪 需要加强</h4>
                <p>您在本次${featureName}测试中得分 ${rhythmAppState.score} 分，需要加强练习。</p>
                <p>${isMeterMode ? '节拍听辨是音乐学习的重要基础，建议从简单的2/4拍开始练习，逐步过渡到3/4拍。' : '节奏听辨是音乐学习的基础，建议从简单的一拍节奏型开始练习。'}</p>
                <p>坚持每天练习，您的${isMeterMode ? '节拍' : '节奏'}听辨能力会逐步提高。</p>
            </div>
        `;
    }

    // 错误分析
    if (rhythmAppState.errorQuestions && rhythmAppState.errorQuestions.length > 0) {
        analysisHTML += `
            <div class="analysis-section">
                <h4>📝 错误分析</h4>
                <p>您在 ${rhythmAppState.errorQuestions.length} 道题目中出现了错误，以下是详细分析：</p>
            </div>
        `;

        rhythmAppState.errorQuestions.forEach((error, index) => {
            // 根据模式获取正确的数据结构
            let correctPattern, userAnswer;

            if (isMeterMode) {
                // 节拍听辨模式：error.correct是题目对象，error.selected是二维数组
                correctPattern = error.correct.pattern || error.correct;
                userAnswer = error.selected;
            } else {
                // 节奏型听辨模式：error.correct是题目对象，error.selected是一维数组
                correctPattern = error.correct.pattern || error.correct;
                userAnswer = error.selected;
            }

            // 根据模式格式化显示
            let correctText, userText;
            if (isMeterMode) {
                // 节拍听辨模式：二维数组
                correctText = correctPattern.map(m => m.join(' + ')).join(' | ');
                userText = userAnswer.map(m => m.join(' + ')).join(' | ');
            } else {
                // 节奏型听辨模式：一维数组
                correctText = correctPattern.join(' | ');
                userText = userAnswer.join(' | ');
            }

            analysisHTML += `
                <div class="wrong-answer-item" style="margin: 8px 0; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 5px;">
                    <div style="color: #FFB74D; margin-bottom: 4px;"><strong>第${index + 1}题：</strong></div>
                    <div style="color: #ef5350; margin-bottom: 2px;">您的答案: ${userText}</div>
                    <div style="color: #66bb6a;">正确答案: ${correctText}</div>
                </div>
            `;
        });
    }

    // 鼓励语
    let encouragement = '';
    if (rhythmAppState.score === 100) {
        encouragement = '🎉 太棒了！您已接近完美，继续保持！';
    } else if (rhythmAppState.score >= 80) {
        encouragement = '👍 优秀表现，请继续巩固与提高！';
    } else if (rhythmAppState.score >= 60) {
        encouragement = '📈 良好基础，继续练习会更稳固成绩！';
    } else {
        encouragement = '💪 别气馁，多练习、分步骤攻克弱项！';
    }
    analysisHTML += `<div class="analysis-section"><h4>鼓励语</h4><p>${encouragement}</p></div>`;

    analysisContent.innerHTML = analysisHTML;
}

// 选择节奏
// 选择节奏型（点击节奏按钮时调用）
async function selectRhythm(rhythm, btn) {
    // 立即高亮按钮（无论练习还是测试模式）
    if (btn) {
        btn.classList.add('active-highlight');
        setTimeout(() => {
            btn.classList.remove('active-highlight');
        }, 300); // 300ms后移除高亮
    }

    // 练习模式：播放节奏声音
    if (rhythmAppState.currentMode === 'practice') {
        try {
            await Tone.start();

            // 获取节奏型的音符序列
            const rhythmNotes = getRhythmNotesByName(rhythm);
            if (rhythmNotes) {
                // 构建节奏对象
                const rhythmObj = {
                    notes: rhythmNotes,
                    pattern: rhythmNotes
                };

                // 播放节奏（异步播放，不阻塞UI）
                playRhythmSequence(rhythmObj);
            }
        } catch (error) {
            console.error('播放节奏失败:', error);
        }
    }

    // 只有在有激活槽位时才记录答案
    if (rhythmAppState.activeSlotIndex >= 0) {
        const slots = document.querySelectorAll('.rhythm-answer-slot');
        const targetIndex = rhythmAppState.activeSlotIndex;

        if (targetIndex >= slots.length) {
            updateRhythmStatus('槽位索引无效，请重新点击槽位');
            return;
        }

        // 判断是否为节拍听辨模式
        const isMeterMode = rhythmAppState.currentFunction === 'meter';

        if (isMeterMode) {
            // 节拍听辨模式：支持一个小节选择多个节奏型
            const targetSlot = slots[targetIndex];
            const currentBeats = rhythmAppState.measureBeatsFilled[targetIndex];
            const rhythmBeats = getRhythmBeats(rhythm);
            const maxBeats = rhythmAppState.meterBeatsPerMeasure;

            // 检查是否超出小节容量
            if (currentBeats + rhythmBeats > maxBeats) {
                updateRhythmStatus(`️ 超出小节容量！当前小节已${currentBeats}拍，选择的节奏型为${rhythmBeats}拍，总共${maxBeats}拍`);
                return;
            }

            // 添加节奏型到当前小节
            rhythmAppState.measureRhythms[targetIndex].push(rhythm);
            rhythmAppState.measureBeatsFilled[targetIndex] += rhythmBeats;

            // 更新槽位显示
            const rhythmsInMeasure = rhythmAppState.measureRhythms[targetIndex];
            const displayText = `您：${rhythmsInMeasure.join(' + ')}`;
            targetSlot.textContent = displayText;
            targetSlot.classList.add('filled');

            // 更新状态提示
            const filledBeats = rhythmAppState.measureBeatsFilled[targetIndex];
            if (filledBeats === maxBeats) {
                // 小节填满，自动跳到下一个槽位
                updateRhythmStatus(`✅ 第 ${targetIndex + 1} 小节已完成（${filledBeats}拍）`);

                // 尝试激活下一个槽位
                if (targetIndex + 1 < slots.length) {
                    setTimeout(() => {
                        activateSlot(targetIndex + 1);
                    }, 300);
                } else {
                    // 所有小节都填满了
                    rhythmAppState.activeSlotIndex = -1;
                    slots.forEach(slot => slot.classList.remove('slot-active'));
                    updateRhythmStatus('🎉 所有小节已完成，请提交答案！');
                }
            } else {
                // 小节未填满，保持激活状态
                updateRhythmStatus(`已选择：${rhythm}（当前小节${filledBeats}/${maxBeats}拍）`);
            }

            // 更新selectedRhythms用于提交验证
            rhythmAppState.selectedRhythms[targetIndex] = rhythmAppState.measureRhythms[targetIndex];
        } else {
            // 节奏型听辨模式：一个槽位一个节奏型
            const targetSlot = slots[targetIndex];
            targetSlot.textContent = `您：${rhythm}`;
            targetSlot.classList.add('filled');
            rhythmAppState.selectedRhythms[targetIndex] = rhythm;
            updateRhythmStatus(`已选择：${rhythm}`);

            // 重置激活状态
            rhythmAppState.activeSlotIndex = -1;
            // 移除所有槽位的激活样式
            slots.forEach(slot => slot.classList.remove('slot-active'));
        }
    } else {
        updateRhythmStatus('请先点击一个答案槽位以激活上屏记录');
    }
}

// 更新节奏听辨统计
function updateRhythmStats() {
    const scoreEl = document.getElementById('score-rhythm');
    const correctEl = document.getElementById('correct-rhythm');
    const wrongEl = document.getElementById('wrong-rhythm');
    const progressEl = document.getElementById('progress-rhythm');

    if (scoreEl) scoreEl.textContent = rhythmAppState.score;
    if (correctEl) correctEl.textContent = rhythmAppState.correct;
    if (wrongEl) wrongEl.textContent = rhythmAppState.wrong;
    if (progressEl) progressEl.textContent = `${rhythmAppState.totalQuestions}题`;
}

// 启动用时计时器
function startRhythmElapsedTimeTimer() {
    rhythmAppState.elapsedTime = 0;
    rhythmAppState.elapsedTimeTimer = setInterval(() => {
        rhythmAppState.elapsedTime += 0.01;
    }, 10);
}

// 停止用时计时器
function stopRhythmElapsedTimeTimer() {
    if (rhythmAppState.elapsedTimeTimer) {
        clearInterval(rhythmAppState.elapsedTimeTimer);
        rhythmAppState.elapsedTimeTimer = null;
    }
}

// 五线谱渲染已移除 — 使用文本上屏显示替代。
// （保留占位以便未来按需恢复复杂渲染）

// ==================== 节奏播放功能 ====================

// 播放用户已选择的节奏（上屏节奏）
async function playSelectedRhythm() {
    console.log('🎵 playSelectedRhythm 被调用');
    if (rhythmAppState.isPlaying) return;

    // 检查是否有已选择的节奏
    if (!rhythmAppState.selectedRhythms || rhythmAppState.selectedRhythms.every(r => r === null)) {
        updateRhythmStatus('请先选择节奏型！');
        return;
    }

    try {
        // 确保 AudioContext 已激活
        await Tone.start();

        rhythmAppState.isPlaying = true;

        // 构建要播放的节奏序列（只播放非空的节奏）
        const selectedRhythms = rhythmAppState.selectedRhythms.filter(r => r !== null);

        if (selectedRhythms.length === 0) {
            updateRhythmStatus('没有可播放的节奏！');
            rhythmAppState.isPlaying = false;
            return;
        }

        // 播放所有已选择的节奏（节奏名称数组）
        for (const rhythmName of selectedRhythms) {
            // 从映射表获取音符序列
            const rhythmNotes = getRhythmNotesByName(rhythmName);
            if (rhythmNotes) {
                const rhythmObj = {
                    notes: rhythmNotes,
                    pattern: [rhythmName]
                };
                await playRhythmSequence(rhythmObj);
            }
        }

        updateRhythmStatus(`已播放上屏节奏：${selectedRhythms.join(' + ')}`);

    } catch (error) {
        console.error('播放上屏节奏失败:', error);
        updateRhythmStatus('播放失败，请重试');
    } finally {
        rhythmAppState.isPlaying = false;
    }
}

// 播放随机节奏
async function playRandomRhythm() {
    if (rhythmAppState.isPlaying) return;

    try {
        // 确保 AudioContext 已激活
        await Tone.start();

        rhythmAppState.isPlaying = true;

        // 生成随机节奏
        const rhythm = generateRandomRhythm();
        rhythmAppState.currentRhythm = rhythm;

        // 初始化答案区（清空之前的答案）
        initRhythmAnswerArea();

        // （已移除五线谱渲染，保持界面简洁）

        // 播放节奏
        await playRhythmSequence(rhythm);

        updateRhythmStatus('节奏已播放，请选择对应的节奏型');

    } catch (error) {
        console.error('播放节奏失败:', error);
        updateRhythmStatus('播放失败，请重试');
    } finally {
        rhythmAppState.isPlaying = false;
    }
}

// 生成随机节奏（根据拍型和数量）
function generateRandomRhythm() {
    // 获取用户选择的参数
    const beatType = document.getElementById('beat-type-rhythm')?.value || '1';
    const quantity = parseInt(document.getElementById('quantity-rhythm')?.value) || 4;

    // 判断是否为节拍听辨模式
    const isMeterMode = rhythmAppState.currentFunction === 'meter';

    let pattern; // 正确答案的节奏型序列

    if (isMeterMode) {
        // 节拍听辨模式：生成小节的节奏型组合
        const beatsPerMeasure = parseInt(beatType); // 2或3
        const measureCount = quantity; // 2或4

        // 1拍节奏型列表
        const oneBeatRhythms = [
            '四分', '2个八分', '4个十六分', '前十六', '后十六',
            '小切分', '小附点', '小后附点', '三连音'
        ];

        // 2拍节奏型列表
        const twoBeatRhythms = [
            '二分', '八分大切分', '十六分大切分', '前十六大切分', '后十六大切分',
            '八分大附点', '八分大后附点', '十六分大附点', '十六分大后附点'
        ];

        // 为每个小节生成节奏型组合
        const measures = [];
        for (let m = 0; m < measureCount; m++) {
            const measureRhythms = [];
            let remainingBeats = beatsPerMeasure;

            while (remainingBeats > 0) {
                // 决定使用1拍还是2拍节奏型
                // 如果剩余2拍或以上，有50%概率使用2拍节奏型
                if (remainingBeats >= 2 && Math.random() > 0.5) {
                    // 使用2拍节奏型
                    const randomIndex = Math.floor(Math.random() * twoBeatRhythms.length);
                    measureRhythms.push(twoBeatRhythms[randomIndex]);
                    remainingBeats -= 2;
                } else {
                    // 使用1拍节奏型
                    const randomIndex = Math.floor(Math.random() * oneBeatRhythms.length);
                    measureRhythms.push(oneBeatRhythms[randomIndex]);
                    remainingBeats -= 1;
                }
            }

            measures.push(measureRhythms);
        }

        // 合并所有小节的节奏型为音符序列
        const allNotes = [];
        measures.forEach(measureRhythms => {
            measureRhythms.forEach(rhythmName => {
                const notes = RHYTHM_DURATION_MAP[rhythmName];
                if (notes) {
                    allNotes.push(...notes);
                }
            });
        });

        pattern = measures; // 二维数组：[[小节1的节奏型], [小节2的节奏型], ...]

        return {
            beatType: beatType,
            quantity: measureCount,
            measures: measureCount,
            timeSignature: `${beatsPerMeasure}/4`,
            name: measures.map(m => m.join(' + ')).join(' | '),
            notes: allNotes,
            pattern: pattern
        };
    } else {
        // 节奏型听辨模式：原有逻辑
        // 根据拍型选择对应的节奏型
        let rhythmNames;
        if (beatType === '1') {
            // 一拍节奏型（9种）
            rhythmNames = [
                '四分', '2个八分', '4个十六分', '前十六', '后十六',
                '小切分', '小附点', '小后附点', '三连音'
            ];
        } else if (beatType === '2') {
            // 二拍节奏型（9种）
            rhythmNames = [
                '二分', '八分大切分', '十六分大切分', '前十六大切分', '后十六大切分',
                '八分大附点', '八分大后附点', '十六分大附点', '十六分大后附点'
            ];
        } else {
            // 默认使用一拍节奏型
            rhythmNames = [
                '四分', '2个八分', '4个十六分', '前十六', '后十六',
                '小切分', '小附点', '小后附点', '三连音'
            ];
        }

        // 根据数量随机选择节奏型（可以重复）
        const selectedRhythms = [];
        for (let i = 0; i < quantity; i++) {
            const randomIndex = Math.floor(Math.random() * rhythmNames.length);
            selectedRhythms.push(rhythmNames[randomIndex]);
        }

        // 从映射表获取所有节奏型的音符序列
        const allNotes = [];
        selectedRhythms.forEach(rhythmName => {
            const notes = RHYTHM_DURATION_MAP[rhythmName];
            if (notes) {
                allNotes.push(...notes);
            }
        });

        return {
            beatType: beatType,
            quantity: quantity,
            measures: 1,
            timeSignature: '4/4',
            name: selectedRhythms.join(' + '), // 显示所有节奏型名称
            notes: allNotes, // 所有音符序列
            pattern: selectedRhythms // 节奏名称数组，用于答案比较
        };
    }
}

// ==================== 节奏型时值规则映射表 ====================
// 以四分音符为1拍基准
const RHYTHM_DURATION_MAP = {
    // ===== 一、1拍节奏型（每个节奏型总时值 = 1拍）=====

    // 1. 四分 = 1拍（单个四分音符）
    '四分': [
        { duration: 'q', beats: 1, description: '四分音符' }
    ],

    // 2. 2个八分 = 0.5拍 + 0.5拍 = 1拍（两个八分音符）
    '2个八分': [
        { duration: '8', beats: 0.5, description: '八分音符' },
        { duration: '8', beats: 0.5, description: '八分音符' }
    ],

    // 3. 4个十六分 = 0.25拍 × 4 = 1拍（四个十六分音符）
    '4个十六分': [
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' }
    ],

    // 4. 前十六 = 0.25拍 + 0.25拍 + 0.5拍 = 1拍（两个十六分音符 + 一个八分音符）
    '前十六': [
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: '8', beats: 0.5, description: '八分音符' }
    ],

    // 5. 后十六 = 0.5拍 + 0.25拍 + 0.25拍 = 1拍（一个八分音符 + 两个十六分音符）
    '后十六': [
        { duration: '8', beats: 0.5, description: '八分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' }
    ],

    // 6. 小切分 = 0.25拍 + 0.5拍 + 0.25拍 = 1拍（十六分 + 八分 + 十六分）
    '小切分': [
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: '8', beats: 0.5, description: '八分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' }
    ],

    // 7. 小附点 = 0.75拍 + 0.25拍 = 1拍（附点八分（0.5拍+ 0.25拍=0.75拍）+ 十六分（0.25拍））
    '小附点': [
        { duration: '8', beats: 0.75, dots: 1, description: '附点八分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' }
    ],

    // 8. 小后附点 = 0.25拍 + 0.75拍 = 1拍（十六分（0.25拍）+ 附点八分（0.5拍+ 0.25拍=0.75拍））
    '小后附点': [
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: '8', beats: 0.75, dots: 1, description: '附点八分音符' }
    ],

    // 9. 三连音 = 1/3拍 × 3 = 1拍（三个均等的音符，每个占1/3拍）
    '三连音': [
        { duration: 'triplet', beats: 1 / 3, description: '三连音音符' },
        { duration: 'triplet', beats: 1 / 3, description: '三连音音符' },
        { duration: 'triplet', beats: 1 / 3, description: '三连音音符' }
    ],

    // ===== 二、2拍节奏型（每个节奏型总时值 = 2拍）=====

    // 1. 二分 = 2拍（单个二分音符）
    '二分': [
        { duration: 'h', beats: 2, description: '二分音符' }
    ],

    // 2. 八分大切分 = 0.5拍 + 1拍 + 0.5拍 = 2拍（八分 + 四分 + 八分）
    '八分大切分': [
        { duration: '8', beats: 0.5, description: '八分音符' },
        { duration: 'q', beats: 1, description: '四分音符' },
        { duration: '8', beats: 0.5, description: '八分音符' }
    ],

    // 3. 十六分大切分 = 0.25拍 + 0.25拍 + 1拍 + 0.25拍 + 0.25拍 = 2拍（两个十六分 + 四分 + 两个十六分）
    '十六分大切分': [
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: 'q', beats: 1, description: '四分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' }
    ],

    // 4. 前十六大切分 = 0.25拍 + 0.25拍 + 1拍 + 0.5拍 = 2拍（两个十六分 + 四分 + 八分）
    '前十六大切分': [
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: 'q', beats: 1, description: '四分音符' },
        { duration: '8', beats: 0.5, description: '八分音符' }
    ],

    // 5. 后十六大切分 = 0.5拍 + 1拍 + 0.25拍 + 0.25拍 = 2拍（八分 + 四分 + 两个十六分）
    '后十六大切分': [
        { duration: '8', beats: 0.5, description: '八分音符' },
        { duration: 'q', beats: 1, description: '四分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' }
    ],

    // 6. 八分大附点 = 1.5拍 + 0.5拍 = 2拍（附点四分（1拍 + 0.5拍=1.5拍）+ 八分（0.5拍））
    '八分大附点': [
        { duration: 'q', beats: 1.5, dots: 1, description: '附点四分音符' },
        { duration: '8', beats: 0.5, description: '八分音符' }
    ],

    // 7. 八分大后附点 = 0.5拍 + 1.5拍 = 2拍（八分（0.5拍）+ 附点四分（1拍 + 0.5拍=1.5拍））
    '八分大后附点': [
        { duration: '8', beats: 0.5, description: '八分音符' },
        { duration: 'q', beats: 1.5, dots: 1, description: '附点四分音符' }
    ],

    // 8. 十六分大附点 = 1.5拍 + 0.25拍 + 0.25拍 = 2拍（附点四分（1拍 + 0.5拍=1.5拍）+ 两个十六分（0.25拍 + 0.25拍））
    '十六分大附点': [
        { duration: 'q', beats: 1.5, dots: 1, description: '附点四分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' }
    ],

    // 9. 十六分大后附点 = 0.25拍 + 0.25拍 + 1.5拍 = 2拍（两个十六分（0.25拍 + 0.25拍）+ 附点四分（1拍 + 0.5拍=1.5拍））
    '十六分大后附点': [
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: '16', beats: 0.25, description: '十六分音符' },
        { duration: 'q', beats: 1.5, dots: 1, description: '附点四分音符' }
    ]
};

// 根据节奏型名称获取音符序列
function getRhythmNotesByName(rhythmName) {
    const pattern = RHYTHM_DURATION_MAP[rhythmName];
    if (!pattern) {
        console.warn(`未找到节奏型: ${rhythmName}`);
        return null;
    }

    // 转换为播放格式
    return pattern.map(note => ({
        duration: note.duration,
        beats: note.beats,
        dots: note.dots || 0,
        keys: ['b/4'], // 默认使用C4音高
        description: note.description
    }));
}

// 播放节奏序列
async function playRhythmSequence(rhythm) {
    const bpm = rhythmAppState.bpm || 90;
    const beatDuration = 60 / bpm; // 每拍的时长（秒）

    // 计算总时长
    let currentTime = 0;

    // 播放每个音符
    for (const note of rhythm.notes) {
        let noteDuration;

        // 优先使用 beats 属性（如果存在）
        if (note.beats !== undefined) {
            noteDuration = beatDuration * note.beats;
        } else {
            // 否则使用 duration 解析
            let durationMultiplier = 1;
            switch (note.duration) {
                case 'w': durationMultiplier = 4; break;
                case 'h': durationMultiplier = 2; break;
                case 'q': durationMultiplier = 1; break;
                case '8': durationMultiplier = 0.5; break;
                case '16': durationMultiplier = 0.25; break;
                case 'triplet': durationMultiplier = 1 / 3; break; // 三连音：每个音符占1/3拍
                default: durationMultiplier = 1;
            }

            // 如果有附点，增加50%
            if (note.dots) {
                durationMultiplier *= 1.5;
            }

            noteDuration = beatDuration * durationMultiplier;
        }

        // 使用钢琴音色播放（与单音、音程、和弦听辨一致）
        playNoteWithWebAudio('C4', noteDuration, 0.8);

        // 更新当前时间
        currentTime += noteDuration;

        // 等待音符播放完成
        await new Promise(resolve => setTimeout(resolve, noteDuration * 1000));
    }

    // 额外等待一点时间确保声音完全播放
    await new Promise(resolve => setTimeout(resolve, 100));
}

// 重复播放节奏
async function repeatRhythm() {
    if (!rhythmAppState.currentRhythm) {
        updateRhythmStatus('请先点击“随机播放”生成题目');
        return;
    }

    await playRhythmSequence(rhythmAppState.currentRhythm);
    updateRhythmStatus('节奏已重复播放');
}

// 提交节奏答案
function submitRhythmAnswer() {
    if (!rhythmAppState.currentRhythm) {
        updateRhythmStatus('请先播放一个节奏！');
        return;
    }

    // 清除所有槽位的样式（如果之前提交过答案）
    const allSlots = document.querySelectorAll('.rhythm-answer-slot');
    allSlots.forEach(slot => {
        slot.style.background = '';
        slot.style.borderColor = '';
    });

    // 判断是否为节拍听辨模式
    const isMeterMode = rhythmAppState.currentFunction === 'meter';

    if (isMeterMode) {
        // 节拍听辨模式：检查每个小节的节奏型数组是否匹配
        // 检查是否所有小节都已填写
        const allMeasuresFilled = rhythmAppState.measureRhythms.every(measure => measure.length > 0);
        if (!allMeasuresFilled) {
            updateRhythmStatus('请先填写所有小节！');
            return;
        }

        // 获取正确答案（当前题目的pattern）
        const correctPattern = rhythmAppState.currentRhythm.pattern;

        // 比较每个小节的节奏型
        let allCorrect = true;
        const slots = document.querySelectorAll('.rhythm-answer-slot');

        rhythmAppState.measureRhythms.forEach((userMeasure, index) => {
            const correctMeasure = correctPattern[index]; // 正确答案的节奏型数组

            // 比较两个数组是否相同（顺序和内容都要匹配）
            const isMeasureCorrect = JSON.stringify(userMeasure) === JSON.stringify(correctMeasure);

            if (!isMeasureCorrect) {
                allCorrect = false;
            }

            // 显示对比结果
            const slot = slots[index];
            const userText = userMeasure.join(' + ');
            const correctText = correctMeasure.join(' + ');
            slot.textContent = `您：${userText} → 正确：${correctText}`;

            // 根据正确性设置样式
            if (isMeasureCorrect) {
                slot.style.background = 'rgba(76, 175, 80, 0.15)';
                slot.style.borderColor = '#4CAF50';
            } else {
                slot.style.background = 'rgba(244, 67, 54, 0.15)';
                slot.style.borderColor = '#F44336';
            }
        });

        // 更新状态和统计
        if (rhythmAppState.currentMode === 'test') {
            rhythmAppState.totalQuestions++;

            if (allCorrect) {
                rhythmAppState.correct++;
                rhythmAppState.score += 5;
                updateRhythmStatus(`✅ 回答正确！+5分`);
            } else {
                rhythmAppState.wrong++;
                rhythmAppState.errorQuestions.push({
                    correct: rhythmAppState.currentRhythm,
                    selected: rhythmAppState.measureRhythms
                });
                updateRhythmStatus(`❌ 回答错误`);
            }

            updateRhythmStats();

            // 检查是否达到20题
            if (rhythmAppState.totalQuestions >= 20) {
                setTimeout(() => {
                    endRhythmTestMode();
                }, 3000);
            } else {
                // 自动出下一题
                setTimeout(() => {
                    playRandomRhythm();
                }, 3000);
            }
        } else {
            // 练习模式
            if (allCorrect) {
                updateRhythmStatus('✅ 回答正确！');
            } else {
                updateRhythmStatus('❌ 回答错误，请再试一次');
            }
        }
    } else {
        // 节奏型听辨模式：原有逻辑
        // 检查是否已选择所有节奏
        if (!rhythmAppState.selectedRhythms || rhythmAppState.selectedRhythms.some(r => r === null)) {
            updateRhythmStatus('请先选择所有节奏！');
            return;
        }

        // 比较答案
        const correctPattern = rhythmAppState.currentRhythm.pattern;
        const isAllCorrect = rhythmAppState.selectedRhythms.every((selected, index) => selected === correctPattern[index]);

        if (rhythmAppState.currentMode === 'test') {
            rhythmAppState.totalQuestions++;

            if (isAllCorrect) {
                rhythmAppState.correct++;
                rhythmAppState.score += 5;
                updateRhythmStatus(`✅ 回答正确！+5分`);
            } else {
                rhythmAppState.wrong++;
                rhythmAppState.errorQuestions.push({
                    correct: rhythmAppState.currentRhythm,
                    selected: rhythmAppState.selectedRhythms
                });
                updateRhythmStatus(`❌ 回答错误`);
            }

            updateRhythmStats();

            // 显示每个槽位的对比结果
            const slots = document.querySelectorAll('.rhythm-answer-slot');
            slots.forEach((slot, index) => {
                const userAnswer = rhythmAppState.selectedRhythms[index];
                const correctAnswer = correctPattern[index];
                slot.textContent = `您：${userAnswer} → 正确：${correctAnswer}`;

                // 根据正确性设置样式（柔和的颜色，与桔色主题协调）
                if (userAnswer === correctAnswer) {
                    // 正确：柔和的绿色
                    slot.style.background = 'rgba(76, 175, 80, 0.15)';
                    slot.style.borderColor = '#4CAF50';
                } else {
                    // 错误：柔和的红色
                    slot.style.background = 'rgba(244, 67, 54, 0.15)';
                    slot.style.borderColor = '#F44336';
                }
            });

            // 检查是否达到20题
            if (rhythmAppState.totalQuestions >= 20) {
                setTimeout(() => {
                    endRhythmTestMode();
                }, 3000);
            } else {
                // 自动出下一题
                setTimeout(() => {
                    playRandomRhythm();
                }, 3000);
            }
        } else {
            // 练习模式
            if (isAllCorrect) {
                updateRhythmStatus('✅ 回答正确！');
            } else {
                updateRhythmStatus('❌ 回答错误，请再试一次');
            }

            // 显示每个槽位的对比结果
            const slots = document.querySelectorAll('.rhythm-answer-slot');
            slots.forEach((slot, index) => {
                const userAnswer = rhythmAppState.selectedRhythms[index];
                const correctAnswer = correctPattern[index];
                slot.textContent = `您：${userAnswer} → 正确：${correctAnswer}`;

                // 根据正确性设置样式（柔和的颜色，与桔色主题协调）
                if (userAnswer === correctAnswer) {
                    // 正确：柔和的绿色
                    slot.style.background = 'rgba(76, 175, 80, 0.15)';
                    slot.style.borderColor = '#4CAF50';
                } else {
                    // 错误：柔和的红色
                    slot.style.background = 'rgba(244, 67, 54, 0.15)';
                    slot.style.borderColor = '#F44336';
                }
            });
        }
    }
}

// 显示答案
function showRhythmAnswer() {
    if (!rhythmAppState.currentRhythm) {
        updateRhythmStatus('请先播放一个节奏！');
        return;
    }

    // 在状态栏显示正确答案
    const correctPattern = rhythmAppState.currentRhythm.pattern;
    const answerText = correctPattern.join('；');
    updateRhythmStatus(`正确答案：${answerText}`);
}

// 切换节拍器
function toggleMetronome() {
    rhythmAppState.metronomeOn = !rhythmAppState.metronomeOn;

    const metronomeBtn = document.getElementById('toggle-metronome-rhythm');
    if (metronomeBtn) {
        metronomeBtn.textContent = rhythmAppState.metronomeOn ? '节拍器 关' : '节拍器 开';

        // 切换按钮样式（桔色active状态）
        if (rhythmAppState.metronomeOn) {
            metronomeBtn.classList.add('active');
        } else {
            metronomeBtn.classList.remove('active');
        }
    }

    if (rhythmAppState.metronomeOn) {
        startMetronome();
    } else {
        stopMetronome();
    }
}

// 启动节拍器
let metronomeInterval = null;
function startMetronome() {
    const bpm = rhythmAppState.bpm || 90;
    const interval = 60000 / bpm; // 转换为毫秒

    console.log(`🥁 节拍器启动，BPM: ${bpm}, 间隔: ${interval}ms`);

    // 立即播放一次
    playWoodBlockSound();

    // 设置定时器
    metronomeInterval = setInterval(() => {
        playWoodBlockSound();
    }, interval);
}

// 木鱼声音（使用Web Audio API）
function playWoodBlockSound() {
    const ctx = window.audioContext;
    if (!ctx) return;

    const now = ctx.currentTime;

    // 创建振荡器（高频短促的声音）
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // 木鱼音色：高频正弦波
    osc.type = 'sine';
    osc.frequency.value = 1200; // 高频，类似木鱼

    // 快速衰减包络
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05); // 50ms快速衰减

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
}

// 停止节拍器
function stopMetronome() {
    if (metronomeInterval) {
        clearInterval(metronomeInterval);
        metronomeInterval = null;
    }
    console.log('⏹️ 节拍器已停止');
}

// 钢琴键盘点击处理函数 - Note On（按下时）
function handlePianoNoteOnSingle(note) {
    // 检查音符是否在调式范围内
    const allowed = enrichAllowedNotes(singleAppState.scaleNotes);
    if (!allowed.has(note.note)) {
        updateSingleStatus(`该音不在所选调式调性范围内，无法选择`);
        return;
    }

    // 测试模式下点击琴键不出声，但高亮（让用户知道点上了）
    if (singleAppState.currentMode === 'test') {
        highlightKey(note.note);
        singleAppState.pianoSelection = note.note;
        return;
    }

    // 练习模式下正常发声和高亮
    ensureAudioReady();
    startNoteWithWebAudio(note.note);
    highlightKey(note.note);

    // 记录琴键选择
    singleAppState.pianoSelection = note.note;
}

function handlePianoNoteOnInterval(note) {
    // 检查音符是否在调式范围内
    const allowed = enrichAllowedNotes(intervalAppState.scaleNotes);
    if (!allowed.has(note.note)) {
        updateIntervalStatus(`该音不在所选调式调性范围内，无法选择`);
        return;
    }

    // 测试模式下点击琴键不出声，但高亮（让用户知道点上了）
    if (intervalAppState.currentMode === 'test') {
        highlightKey(note.note);

        // 记录琴键选择（最多2个音符）
        if (!intervalAppState.pianoSelection) {
            intervalAppState.pianoSelection = [];
        }

        // 如果已经选择了这个音符，取消选择
        const existingIndex = intervalAppState.pianoSelection.indexOf(note.note);
        if (existingIndex !== -1) {
            intervalAppState.pianoSelection.splice(existingIndex, 1);
            removeHighlightKey(note.note);
        } else {
            // 如果已经有2个音符，移除第一个
            if (intervalAppState.pianoSelection.length >= 2) {
                const removedNote = intervalAppState.pianoSelection.shift();
                removeHighlightKey(removedNote);
            }
            // 添加新选择的音符
            intervalAppState.pianoSelection.push(note.note);
        }

        // 显示当前选择状态
        if (intervalAppState.pianoSelection.length === 0) {
            updateIntervalStatus('请在琴键上选择两个音');
        } else if (intervalAppState.pianoSelection.length === 1) {
            updateIntervalStatus(`已选择：${intervalAppState.pianoSelection[0]}，请再选择一个音`);
        } else {
            const intervalName = getIntervalName(getIntervalSemitones(
                intervalAppState.pianoSelection[0],
                intervalAppState.pianoSelection[1]
            ));
            updateIntervalStatus(`已选择：${intervalAppState.pianoSelection.join(' + ')}（${intervalName}），点击"提交答案"确认`);
        }
        return;
    }

    // 练习模式下正常发声和高亮
    ensureAudioReady();
    startNoteWithWebAudio(note.note);
    highlightKey(note.note);

    // 记录琴键选择（最多2个音符）
    if (!intervalAppState.pianoSelection) {
        intervalAppState.pianoSelection = [];
    }

    // 如果已经选择了这个音符，取消选择
    const existingIndex = intervalAppState.pianoSelection.indexOf(note.note);
    if (existingIndex !== -1) {
        intervalAppState.pianoSelection.splice(existingIndex, 1);
        removeHighlightKey(note.note);
    } else {
        // 如果已经有2个音符，移除第一个
        if (intervalAppState.pianoSelection.length >= 2) {
            const removedNote = intervalAppState.pianoSelection.shift();
            removeHighlightKey(removedNote);
        }
        // 添加新选择的音符
        intervalAppState.pianoSelection.push(note.note);
    }

    // 显示当前选择状态
    if (intervalAppState.pianoSelection.length === 0) {
        updateIntervalStatus('请在琴键上选择两个音');
    } else if (intervalAppState.pianoSelection.length === 1) {
        updateIntervalStatus(`已选择：${intervalAppState.pianoSelection[0]}，请再选择一个音`);
    } else {
        const intervalName = getIntervalName(getIntervalSemitones(
            intervalAppState.pianoSelection[0],
            intervalAppState.pianoSelection[1]
        ));
        updateIntervalStatus(`已选择：${intervalAppState.pianoSelection.join(' + ')}（${intervalName}），点击“提交答案”确认`);
    }
}

function handlePianoNoteOnChord(noteObj) {
    // 检查音符是否在调式范围内
    const allowed = enrichAllowedNotes(chordAppState.scaleNotes);
    if (!allowed.has(noteObj.note)) {
        updateChordStatus(`该音不在所选调式调性范围内，无法选择`);
        return;
    }

    // 测试模式下点击琴键不出声，但高亮（让用户知道点上了）
    if (chordAppState.currentMode === 'test') {
        // 记录琴键选择（最多3个音符）
        if (!chordAppState.selectedNotes) {
            chordAppState.selectedNotes = [];
        }

        // 如果已经选择了这个音符，取消选择
        const existingIndex = chordAppState.selectedNotes.indexOf(noteObj.note);
        if (existingIndex !== -1) {
            chordAppState.selectedNotes.splice(existingIndex, 1);
        } else {
            // 如果已经有3个音符，移除第一个
            if (chordAppState.selectedNotes.length >= 3) {
                chordAppState.selectedNotes.shift();
            }
            // 添加新选择的音符
            chordAppState.selectedNotes.push(noteObj.note);
        }

        // 清除所有高亮，只高亮最后三个音
        clearAllHighlights();
        chordAppState.selectedNotes.forEach(note => {
            highlightKey(note);
        });

        // 显示当前选择状态
        if (chordAppState.selectedNotes.length === 0) {
            updateChordStatus('请在琴键上选择三个音');
        } else if (chordAppState.selectedNotes.length === 1) {
            updateChordStatus(`已选择：${chordAppState.selectedNotes[0]}，请再选择两个音`);
        } else if (chordAppState.selectedNotes.length === 2) {
            updateChordStatus(`已选择：${chordAppState.selectedNotes.join(' + ')}，请再选择一个音`);
        } else {
            updateChordStatus(`已选择：${chordAppState.selectedNotes.join(' + ')}，点击“提交答案”确认`);
        }
        return;
    }

    // 练习模式下正常发声和高亮
    ensureAudioReady();
    startNoteWithWebAudio(noteObj.note);

    // 记录琴键选择（最多3个音符）
    if (!chordAppState.selectedNotes) {
        chordAppState.selectedNotes = [];
    }

    // 如果已经选择了这个音符，取消选择
    const existingIndex = chordAppState.selectedNotes.indexOf(noteObj.note);
    if (existingIndex !== -1) {
        chordAppState.selectedNotes.splice(existingIndex, 1);
    } else {
        // 如果已经有3个音符，移除第一个
        if (chordAppState.selectedNotes.length >= 3) {
            chordAppState.selectedNotes.shift();
        }
        // 添加新选择的音符
        chordAppState.selectedNotes.push(noteObj.note);
    }

    // 清除所有高亮，只高亮最后三个音
    clearAllHighlights();
    chordAppState.selectedNotes.forEach(note => {
        highlightKey(note);
    });

    // 显示当前选择状态
    if (chordAppState.selectedNotes.length === 0) {
        updateChordStatus('请在琴键上选择三个音');
    } else if (chordAppState.selectedNotes.length === 1) {
        updateChordStatus(`已选择：${chordAppState.selectedNotes[0]}，请再选择两个音`);
    } else if (chordAppState.selectedNotes.length === 2) {
        updateChordStatus(`已选择：${chordAppState.selectedNotes.join(' + ')}，请再选择一个音`);
    } else {
        updateChordStatus(`已选择：${chordAppState.selectedNotes.join(' + ')}，点击“提交答案”确认`);
    }
}

// 钢琴键盘点击处理函数 - Note Off（释放时）
function handlePianoNoteOffSingle(note) {
    stopNoteWithWebAudio(note.note);
    removeHighlightKey(note.note);
}

function handlePianoNoteOffInterval(note) {
    // 停止声音
    stopNoteWithWebAudio(note.note);
    // 注意：不移除高亮，保持选择状态直到提交答案或显示答案
}

function handlePianoNoteOffChord(noteObj) {
    // 停止声音
    stopNoteWithWebAudio(noteObj.note);
    // 注意：不移除高亮，保持选择状态直到提交答案或显示答案
}

// 保留旧的点击处理函数（用于兼容）
function handlePianoClickSingle(note) {
    ensureAudioReady();
    playNoteWithWebAudio(note.note);
    highlightKey(note.note);
}

function handlePianoClickInterval(note) {
    ensureAudioReady();
    playNoteWithWebAudio(note.note);
    highlightKey(note.note);
}

// 钢琴键盘初始化函数
function initSinglePiano() {
    const piano = document.getElementById('piano-single');
    if (!piano) return;
    piano.innerHTML = '';
    const whiteNotes = allNotes.filter(n => n.type === 'white');
    whiteNotes.forEach((note, index) => {
        const key = document.createElement('div');
        key.className = 'white-key';
        key.innerHTML = `<span class="note-name">${note.display}</span>`;
        key.dataset.note = note.note;
        key.dataset.index = index;
        const octaveLabel = document.createElement('div');
        octaveLabel.className = `octave-label ${note.group}`;
        if (note.group === 'group1') octaveLabel.textContent = '小字组';
        else if (note.group === 'group2') octaveLabel.textContent = '小字一组';
        else if (note.group === 'group3') octaveLabel.textContent = '小字二组';
        key.appendChild(octaveLabel);
        // 桌面端事件（添加触摸锁检查，防止移动端双响）
        key.addEventListener('mousedown', (e) => {
            // 如果是触摸事件触发的合成mousedown，跳过执行
            if (Date.now() - lastPianoTouchTime < PIANO_TOUCH_LOCK_MS) return;
            e.preventDefault();
            handlePianoNoteOnSingle(note);
        });
        key.addEventListener('mouseup', () => handlePianoNoteOffSingle(note));
        key.addEventListener('mouseleave', () => handlePianoNoteOffSingle(note));

        // 移动端触摸事件（按下立即发声，支持滚动）
        let touchStartX = 0;
        let touchStartY = 0;
        let isScrolling = false;
        let hasPlayed = false;

        key.addEventListener('touchstart', (e) => {
            // 记录触摸时间，用于防止合成mousedown双响
            lastPianoTouchTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isScrolling = false;
            hasPlayed = false;

            // 按下时立即发声
            handlePianoNoteOnSingle(note);
            hasPlayed = true;
        }, { passive: false });

        key.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const diffX = Math.abs(touchX - touchStartX);
            const diffY = Math.abs(touchY - touchStartY);

            // 如果水平移动距离大于垂直移动，认为是滚动
            if (diffX > diffY && diffX > 10) {
                isScrolling = true;
                // 滚动时停止发声
                if (hasPlayed) {
                    handlePianoNoteOffSingle(note);
                    hasPlayed = false;
                }
            }
        }, { passive: false });

        key.addEventListener('touchend', (e) => {
            if (!isScrolling && hasPlayed) {
                // 点击结束，停止发声
                handlePianoNoteOffSingle(note);
            }
        }, { passive: true });
        piano.appendChild(key);
    });
    invalidatePianoMetrics();
    updatePianoMetrics('piano-single');
    const blackNotes = allNotes.filter(n => n.type === 'black');
    blackNotes.forEach(note => {
        const key = document.createElement('div');
        key.className = 'black-key';
        key.innerHTML = note.display;
        key.dataset.note = note.note;
        key.style.left = calculateBlackKeyLeft(note.position);
        // 桌面端事件（添加触摸锁检查，防止移动端双响）
        key.addEventListener('mousedown', (e) => {
            // 如果是触摸事件触发的合成mousedown，跳过执行
            if (Date.now() - lastPianoTouchTime < PIANO_TOUCH_LOCK_MS) return;
            e.preventDefault();
            handlePianoNoteOnSingle(note);
        });
        key.addEventListener('mouseup', () => handlePianoNoteOffSingle(note));
        key.addEventListener('mouseleave', () => handlePianoNoteOffSingle(note));

        // 移动端触摸事件（按下立即发声，支持滚动）
        let touchStartX = 0;
        let touchStartY = 0;
        let isScrolling = false;
        let hasPlayed = false;

        key.addEventListener('touchstart', (e) => {
            // 记录触摸时间，用于防止合成mousedown双响
            lastPianoTouchTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isScrolling = false;
            hasPlayed = false;

            // 按下时立即发声
            handlePianoNoteOnSingle(note);
            hasPlayed = true;
        }, { passive: false });

        key.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const diffX = Math.abs(touchX - touchStartX);
            const diffY = Math.abs(touchY - touchStartY);

            // 如果水平移动距离大于垂直移动，认为是滚动
            if (diffX > diffY && diffX > 10) {
                isScrolling = true;
                // 滚动时停止发声
                if (hasPlayed) {
                    handlePianoNoteOffSingle(note);
                    hasPlayed = false;
                }
            }
        }, { passive: false });

        key.addEventListener('touchend', (e) => {
            if (!isScrolling && hasPlayed) {
                // 点击结束，停止发声
                handlePianoNoteOffSingle(note);
            }
        }, { passive: true });
        piano.appendChild(key);
    });
    applyScaleRestrictionsToPiano();
    positionBlackKeys('piano-single');
}

function initIntervalPiano() {
    const piano = document.getElementById('piano-interval');
    if (!piano) return;
    piano.innerHTML = '';
    const whiteNotes = allNotes.filter(n => n.type === 'white');
    whiteNotes.forEach((note, index) => {
        const key = document.createElement('div');
        key.className = 'white-key';
        key.innerHTML = `<span class="note-name">${note.display}</span>`;
        key.dataset.note = note.note;
        key.dataset.index = index;
        const octaveLabel = document.createElement('div');
        octaveLabel.className = `octave-label ${note.group}`;
        if (note.group === 'group1') octaveLabel.textContent = '小字组';
        else if (note.group === 'group2') octaveLabel.textContent = '小字一组';
        else if (note.group === 'group3') octaveLabel.textContent = '小字二组';
        key.appendChild(octaveLabel);
        // 桌面端事件（添加触摸锁检查，防止移动端双响）
        key.addEventListener('mousedown', (e) => {
            // 如果是触摸事件触发的合成mousedown，跳过执行
            if (Date.now() - lastPianoTouchTime < PIANO_TOUCH_LOCK_MS) return;
            e.preventDefault();
            handlePianoNoteOnInterval(note);
        });
        key.addEventListener('mouseup', () => handlePianoNoteOffInterval(note));
        key.addEventListener('mouseleave', () => handlePianoNoteOffInterval(note));

        // 移动端触摸事件（按下立即发声，支持滚动）
        let touchStartX = 0;
        let touchStartY = 0;
        let isScrolling = false;
        let hasPlayed = false;

        key.addEventListener('touchstart', (e) => {
            // 记录触摸时间，用于防止合成mousedown双响
            lastPianoTouchTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isScrolling = false;
            hasPlayed = false;

            // 按下时立即发声和选择
            handlePianoNoteOnInterval(note);
            hasPlayed = true;
        }, { passive: false });

        key.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const diffX = Math.abs(touchX - touchStartX);
            const diffY = Math.abs(touchY - touchStartY);

            // 如果水平移动距离大于垂直移动，认为是滚动
            if (diffX > diffY && diffX > 10) {
                isScrolling = true;
                // 滚动时停止发声
                if (hasPlayed) {
                    handlePianoNoteOffInterval(note);
                    hasPlayed = false;
                }
            }
        }, { passive: false });

        key.addEventListener('touchend', (e) => {
            if (!isScrolling && hasPlayed) {
                // 点击结束，停止发声
                handlePianoNoteOffInterval(note);
            }
        }, { passive: true });
        piano.appendChild(key);
    });
    invalidatePianoMetrics();
    updatePianoMetrics('piano-interval');
    const blackNotes = allNotes.filter(n => n.type === 'black');
    blackNotes.forEach(note => {
        const key = document.createElement('div');
        key.className = 'black-key';
        key.innerHTML = `<span class="note-name">${note.display}</span>`;
        key.dataset.note = note.note;
        key.style.left = calculateBlackKeyLeft(note.position);
        // 桌面端事件（添加触摸锁检查，防止移动端双响）
        key.addEventListener('mousedown', (e) => {
            // 如果是触摸事件触发的合成mousedown，跳过执行
            if (Date.now() - lastPianoTouchTime < PIANO_TOUCH_LOCK_MS) return;
            e.preventDefault();
            handlePianoNoteOnInterval(note);
        });
        key.addEventListener('mouseup', () => handlePianoNoteOffInterval(note));
        key.addEventListener('mouseleave', () => handlePianoNoteOffInterval(note));

        // 移动端触摸事件（按下立即发声，支持滚动）
        let touchStartX = 0;
        let touchStartY = 0;
        let isScrolling = false;
        let hasPlayed = false;

        key.addEventListener('touchstart', (e) => {
            // 记录触摸时间，用于防止合成mousedown双响
            lastPianoTouchTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isScrolling = false;
            hasPlayed = false;

            // 按下时立即发声和选择
            handlePianoNoteOnInterval(note);
            hasPlayed = true;
        }, { passive: false });

        key.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const diffX = Math.abs(touchX - touchStartX);
            const diffY = Math.abs(touchY - touchStartY);

            // 如果水平移动距离大于垂直移动，认为是滚动
            if (diffX > diffY && diffX > 10) {
                isScrolling = true;
                // 滚动时停止发声
                if (hasPlayed) {
                    handlePianoNoteOffInterval(note);
                    hasPlayed = false;
                }
            }
        }, { passive: false });

        key.addEventListener('touchend', (e) => {
            if (!isScrolling && hasPlayed) {
                // 点击结束，停止发声
                handlePianoNoteOffInterval(note);
            }
        }, { passive: true });
        piano.appendChild(key);
    });
    applyScaleRestrictionsToPiano();
    positionBlackKeys('piano-interval');
}

// 截屏功能 - 单音听辨页面
let isScreenshotting = false; // 防止重复截屏

function captureSinglePageScreenshot() {
    // 如果正在截屏，直接返回
    if (isScreenshotting) {
        console.log('正在截屏中，请勿重复点击');
        return;
    }

    isScreenshotting = true;
    console.log('开始截屏...');

    // 使用 html2canvas 库进行截屏
    if (typeof html2canvas === 'undefined') {
        // 动态加载 html2canvas 库
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        script.onload = () => {
            performScreenshot();
        };
        script.onerror = () => {
            alert('截屏功能加载失败，请检查网络连接');
            isScreenshotting = false;
        };
        document.head.appendChild(script);
    } else {
        performScreenshot();
    }

    function performScreenshot() {
        // 获取整个页面容器
        const element = document.querySelector('.container') || document.body;

        html2canvas(element, {
            scale: 2, // 提高清晰度
            useCORS: true,
            backgroundColor: '#1a1a1a',
            logging: false
        }).then(canvas => {
            // 创建下载链接
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            link.download = `单音听辨测试_${timestamp}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            console.log('截屏成功！');
            updateSingleStatus('截屏已保存！');
            isScreenshotting = false;
        }).catch(err => {
            console.error('截屏失败:', err);
            alert('截屏失败：' + err.message);
            isScreenshotting = false;
        });
    }
}

// 截屏功能 - 音程听辨页面
function captureIntervalPageScreenshot() {
    // 如果正在截屏，直接返回
    if (isScreenshotting) {
        console.log('正在截屏中，请勿重复点击');
        return;
    }

    isScreenshotting = true;
    console.log('开始截屏...');

    // 使用 html2canvas 库进行截屏
    if (typeof html2canvas === 'undefined') {
        // 动态加载 html2canvas 库
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        script.onload = () => {
            performIntervalScreenshot();
        };
        script.onerror = () => {
            alert('截屏功能加载失败，请检查网络连接');
            isScreenshotting = false;
        };
        document.head.appendChild(script);
    } else {
        performIntervalScreenshot();
    }

    function performIntervalScreenshot() {
        // 获取整个页面容器
        const element = document.querySelector('.container') || document.body;

        html2canvas(element, {
            scale: 2, // 提高清晰度
            useCORS: true,
            backgroundColor: '#1a1a1a',
            logging: false
        }).then(canvas => {
            // 创建下载链接
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            link.download = `音程听辨测试_${timestamp}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            console.log('截屏成功！');
            updateIntervalStatus('截屏已保存！');
            isScreenshotting = false;
        }).catch(err => {
            console.error('截屏失败:', err);
            alert('截屏失败：' + err.message);
            isScreenshotting = false;
        });
    }
}

// 截屏功能 - 节奏听辨页面
function captureRhythmPageScreenshot() {
    if (isScreenshotting) {
        console.log('正在截屏中，请勿重复点击');
        return;
    }

    isScreenshotting = true;
    console.log('开始截屏...');

    if (typeof html2canvas === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        script.onload = () => {
            performRhythmScreenshot();
        };
        script.onerror = () => {
            alert('截屏功能加载失败，请检查网络连接');
            isScreenshotting = false;
        };
        document.head.appendChild(script);
    } else {
        performRhythmScreenshot();
    }

    function performRhythmScreenshot() {
        const element = document.querySelector('#rhythm-page .exercise-page') || document.querySelector('.container') || document.body;
        html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#1a1a1a',
            logging: false
        }).then(canvas => {
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            link.download = `节奏听辨_${timestamp}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            console.log('截屏成功！');
            updateRhythmStatus('截屏已保存！');
            isScreenshotting = false;
        }).catch(err => {
            console.error('截屏失败:', err);
            alert('截屏失败：' + err.message);
            isScreenshotting = false;
        });
    }
}

// 和弦听辨截屏功能
function captureChordPageScreenshot() {
    // 如果正在截屏，直接返回
    if (isScreenshotting) {
        console.log('正在截屏中，请勿重复点击');
        return;
    }

    isScreenshotting = true;
    console.log('开始截屏...');

    // 使用 html2canvas 库进行截屏
    if (typeof html2canvas === 'undefined') {
        // 动态加载 html2canvas 库
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
        script.onload = () => {
            performChordScreenshot();
        };
        script.onerror = () => {
            alert('截屏功能加载失败，请检查网络连接');
            isScreenshotting = false;
        };
        document.head.appendChild(script);
    } else {
        performChordScreenshot();
    }

    function performChordScreenshot() {
        // 获取整个页面容器
        const element = document.querySelector('.container') || document.body;

        html2canvas(element, {
            scale: 2, // 提高清晰度
            useCORS: true,
            backgroundColor: '#1a1a1a',
            logging: false
        }).then(canvas => {
            // 创建下载链接
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            link.download = `和弦听辨测试_${timestamp}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            console.log('截屏成功！');
            updateChordStatus('截屏已保存！');
            isScreenshotting = false;
        }).catch(err => {
            console.error('截屏失败:', err);
            alert('截屏失败：' + err.message);
            isScreenshotting = false;
        });
    }
}

// ==================== 智能学习数据管理系统 ====================

// 学习数据管理器 - 实现智能体的"环境感知"、"动态规划"、"决策执行"、"交互反馈"能力
const learningManager = {
    STORAGE_KEY: 'earTraining_learningData',

    // 初始化学习数据结构
    init() {
        let data = this.loadData();
        if (!data) {
            data = {
                userInfo: null,
                learningRecords: {
                    single: [],      // 单音练习记录
                    interval: [],    // 音程练习记录
                    chord: [],       // 和弦练习记录
                    rhythm: [],      // 节奏练习记录
                    melody: []       // 旋律练习记录
                },
                weakPoints: {
                    single: {},      // 单音薄弱点
                    interval: {},    // 音程薄弱点
                    chord: {}        // 和弦薄弱点
                },
                errorBook: {     // 错题本
                    single: [],
                    interval: [],
                    chord: []
                },
                stats: {
                    totalStudyTime: 0,  // 总学习时间（秒）
                    totalSessions: 0,   // 总学习次数
                    lastStudyDate: null // 最后学习日期
                },
                adaptiveLevel: {    // 自适应难度记录
                    single: { currentLevel: 1, accuracy: 0 },
                    interval: { currentLevel: 1, accuracy: 0 },
                    chord: { currentLevel: 1, accuracy: 0 }
                }
            };
            this.saveData(data);
        }
        return data;
    },

    // 加载数据
    loadData() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('加载学习数据失败:', e);
            return null;
        }
    },

    // 保存数据
    saveData(data) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('保存学习数据失败:', e);
            return false;
        }
    },

    // 记录一次练习结果
    recordResult(type, record) {
        const data = this.init();
        const newRecord = {
            timestamp: Date.now(),
            date: new Date().toLocaleDateString('zh-CN'),
            ...record
        };
        data.learningRecords[type].push(newRecord);

        // 保留最近500条记录
        if (data.learningRecords[type].length > 500) {
            data.learningRecords[type] = data.learningRecords[type].slice(-500);
        }

        // 更新薄弱点
        this.updateWeakPoints(data, type, record);

        // 更新错题本
        if (!record.correct) {
            this.addToErrorBook(data, type, record);
        } else {
            this.removeFromErrorBook(data, type, record);
        }

        // 更新统计
        data.stats.lastStudyDate = newRecord.date;

        // 更新自适应难度
        this.updateAdaptiveLevel(data, type, record);

        this.saveData(data);
    },

    // 更新薄弱点分析
    updateWeakPoints(data, type, record) {
        const weakPoints = data.weakPoints[type];
        if (!weakPoints) return;

        const key = record.question || record.chordType || record.note || 'unknown';
        if (!weakPoints[key]) {
            weakPoints[key] = { total: 0, wrong: 0, correct: 0, lastWrongDate: null };
        }
        weakPoints[key].total++;
        if (record.correct) {
            weakPoints[key].correct++;
        } else {
            weakPoints[key].wrong++;
            weakPoints[key].lastWrongDate = Date.now();
        }
    },

    // 添加到错题本
    addToErrorBook(data, type, record) {
        const errorBook = data.errorBook[type];
        const key = record.question || record.chordType || record.note;

        // 检查是否已存在
        const existing = errorBook.find(item => item.key === key);
        if (existing) {
            existing.errorCount = (existing.errorCount || 1) + 1;
            existing.lastErrorDate = Date.now();
        } else {
            errorBook.push({
                key: key,
                record: record,
                errorCount: 1,
                lastErrorDate: Date.now()
            });
        }

        // 按错误次数排序，保留前50个
        errorBook.sort((a, b) => b.errorCount - a.errorCount);
        if (errorBook.length > 50) {
            data.errorBook[type] = errorBook.slice(0, 50);
        }
    },

    // 从错题本移除（当用户答对后）
    removeFromErrorBook(data, type, record) {
        const errorBook = data.errorBook[type];
        const key = record.question || record.chordType || record.note;
        const index = errorBook.findIndex(item => item.key === key);
        if (index !== -1) {
            errorBook.splice(index, 1);
        }
    },

    // 更新自适应难度
    updateAdaptiveLevel(data, type, record) {
        const adaptive = data.adaptiveLevel[type];
        if (!adaptive) return;

        // 计算最近20题的正确率
        const records = data.learningRecords[type].slice(-20);
        if (records.length >= 5) {
            const correctCount = records.filter(r => r.correct).length;
            adaptive.accuracy = correctCount / records.length;

            // 自适应难度调整规则
            if (adaptive.accuracy >= 0.85 && adaptive.currentLevel < 8) {
                // 正确率≥85%，提升难度
                adaptive.currentLevel = Math.min(8, adaptive.currentLevel + 1);
            } else if (adaptive.accuracy < 0.5 && adaptive.currentLevel > 1) {
                // 正确率<50%，降低难度
                adaptive.currentLevel = Math.max(1, adaptive.currentLevel - 1);
            }
        }
    },

    // 获取推荐难度级别
    getRecommendedLevel(type) {
        const data = this.init();
        const adaptive = data.adaptiveLevel[type];
        return adaptive ? adaptive.currentLevel : 1;
    },

    // 获取薄弱环节列表
    getWeakAreas(type, limit = 5) {
        const data = this.init();
        const weakPoints = data.weakPoints[type];
        if (!weakPoints) return [];

        return Object.entries(weakPoints)
            .filter(([_, v]) => v.total >= 3 && (v.wrong / v.total) > 0.3)
            .sort((a, b) => (b[1].wrong / b[1].total) - (a[1].wrong / a[1].total))
            .slice(0, limit)
            .map(([key, stats]) => ({
                key: key,
                errorRate: Math.round((stats.wrong / stats.total) * 100),
                total: stats.total,
                wrong: stats.wrong
            }));
    },

    // 获取错题本
    getErrorBook(type, limit = 10) {
        const data = this.init();
        const errorBook = data.errorBook[type];
        return errorBook ? errorBook.slice(0, limit) : [];
    },

    // 获取学习统计
    getLearningStats() {
        const data = this.init();
        const stats = {
            totalRecords: 0,
            accuracyByType: {},
            weakAreasByType: {},
            totalStudyDays: 0,
            recentProgress: []
        };

        // 统计各类型数据
        for (const type of ['single', 'interval', 'chord']) {
            const records = data.learningRecords[type];
            if (records.length > 0) {
                const correctCount = records.filter(r => r.correct).length;
                stats.accuracyByType[type] = {
                    total: records.length,
                    correct: correctCount,
                    rate: Math.round((correctCount / records.length) * 100)
                };
                stats.totalRecords += records.length;
                stats.weakAreasByType[type] = this.getWeakAreas(type, 3);
            } else {
                stats.accuracyByType[type] = { total: 0, correct: 0, rate: 0 };
                stats.weakAreasByType[type] = [];
            }
        }

        // 计算学习天数
        const dates = new Set();
        for (const type of ['single', 'interval', 'chord']) {
            data.learningRecords[type].forEach(r => dates.add(r.date));
        }
        stats.totalStudyDays = dates.size;

        // 最近7天进度
        stats.recentProgress = this.getRecentProgress(data, 7);

        return stats;
    },

    // 获取最近N天的进步数据
    getRecentProgress(data, days) {
        const progress = [];
        const today = new Date();
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toLocaleDateString('zh-CN');

            let dayRecords = [];
            for (const type of ['single', 'interval', 'chord']) {
                dayRecords = dayRecords.concat(
                    data.learningRecords[type].filter(r => r.date === dateStr)
                );
            }

            const correct = dayRecords.filter(r => r.correct).length;
            progress.push({
                date: dateStr,
                total: dayRecords.length,
                correct: correct,
                accuracy: dayRecords.length > 0 ? Math.round((correct / dayRecords.length) * 100) : 0
            });
        }
        return progress;
    },

    // 生成学习报告
    generateReport() {
        const data = this.init();
        const stats = this.getLearningStats();

        // 获取学习建议
        const suggestions = this.generateSuggestions(stats);

        return {
            summary: {
                totalStudyDays: stats.totalStudyDays,
                totalQuestions: stats.totalRecords,
                overallAccuracy: this.calculateOverallAccuracy(data)
            },
            accuracyByType: stats.accuracyByType,
            weakAreas: stats.weakAreasByType,
            recentProgress: stats.recentProgress,
            suggestions: suggestions
        };
    },

    // 计算总体正确率
    calculateOverallAccuracy(data) {
        let total = 0;
        let correct = 0;
        for (const type of ['single', 'interval', 'chord']) {
            const records = data.learningRecords[type];
            total += records.length;
            correct += records.filter(r => r.correct).length;
        }
        return total > 0 ? Math.round((correct / total) * 100) : 0;
    },

    // 生成学习建议
    generateSuggestions(stats) {
        const suggestions = [];

        // 分析各类型表现
        const typeNames = { single: '单音', interval: '音程', chord: '和弦' };
        for (const [type, name] of Object.entries(typeNames)) {
            const acc = stats.accuracyByType[type];
            if (acc.total >= 5) {
                if (acc.rate >= 85) {
                    suggestions.push({
                        type: 'success',
                        text: `${name}练习表现优秀（正确率${acc.rate}%），建议挑战更高难度`
                    });
                } else if (acc.rate >= 60) {
                    suggestions.push({
                        type: 'info',
                        text: `${name}练习基础扎实（正确率${acc.rate}%），继续保持并加强薄弱环节`
                    });
                } else {
                    suggestions.push({
                        type: 'warning',
                        text: `${name}练习需要加强（正确率${acc.rate}%），建议从基础级别开始复习`
                    });
                }
            }
        }

        // 薄弱环节建议
        for (const [type, weakAreas] of Object.entries(stats.weakAreasByType)) {
            if (weakAreas && weakAreas.length > 0) {
                const areaNames = weakAreas.map(w => w.key).join('、');
                suggestions.push({
                    type: 'focus',
                    text: `重点加强${typeNames[type]}中的：${areaNames}（错误率较高）`
                });
            }
        }

        // 自适应难度建议
        const data = this.init();
        for (const [type, levelInfo] of Object.entries(data.adaptiveLevel)) {
            const typeName = typeNames[type];
            if (typeName) {
                suggestions.push({
                    type: 'adaptive',
                    text: `${typeName}推荐难度：${levelInfo.currentLevel}级（当前正确率：${Math.round(levelInfo.accuracy * 100)}%）`
                });
            }
        }

        return suggestions;
    },

    // 清除所有学习数据
    clearAllData() {
        localStorage.removeItem(this.STORAGE_KEY);
    },

    // 导出学习数据
    exportData() {
        const data = this.init();
        return JSON.stringify(data, null, 2);
    },

    // 导入学习数据
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            this.saveData(data);
            return true;
        } catch (e) {
            console.error('导入数据失败:', e);
            return false;
        }
    }
};

// ==================== 学习报告页面功能 ====================

// 显示学习报告
function showLearningReport() {
    const report = learningManager.generateReport();
    const container = document.getElementById('learning-report-content');
    if (!container) return;

    let html = `
        <div class="report-header">
            <h3>📊 学习报告</h3>
            <div class="report-summary">
                <div class="summary-item">
                    <span class="summary-label">学习天数</span>
                    <span class="summary-value">${report.summary.totalStudyDays} 天</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">总题数</span>
                    <span class="summary-value">${report.summary.totalQuestions} 题</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">总体正确率</span>
                    <span class="summary-value">${report.summary.overallAccuracy}%</span>
                </div>
            </div>
        </div>
    `;

    // 各类型准确率
    html += '<div class="report-section"><h4>📈 各模块表现</h4><div class="accuracy-bars">';
    const typeNames = { single: '单音', interval: '音程', chord: '和弦' };
    for (const [type, name] of Object.entries(typeNames)) {
        const acc = report.accuracyByType[type];
        const barColor = acc.rate >= 85 ? '#4CAF50' : acc.rate >= 60 ? '#FF9800' : '#f44336';
        html += `
            <div class="accuracy-bar-item">
                <span class="bar-label">${name}</span>
                <div class="bar-container">
                    <div class="bar-fill" style="width: ${acc.rate}%; background: ${barColor};"></div>
                </div>
                <span class="bar-value">${acc.rate}% (${acc.correct}/${acc.total})</span>
            </div>
        `;
    }
    html += '</div></div>';

    // 薄弱环节
    const hasWeakAreas = Object.values(report.weakAreas).some(v => v.length > 0);
    if (hasWeakAreas) {
        html += '<div class="report-section"><h4>⚠️ 薄弱环节分析</h4>';
        for (const [type, weakAreas] of Object.entries(report.weakAreas)) {
            if (weakAreas.length > 0) {
                html += `<div class="weak-area-group"><strong>${typeNames[type]}：</strong>`;
                html += weakAreas.map(w =>
                    `<span class="weak-area-tag">${w.key} (错误率${w.errorRate}%)</span>`
                ).join('');
                html += '</div>';
            }
        }
        html += '</div>';
    }

    // 进步趋势
    html += '<div class="report-section"><h4>📅 最近7天学习趋势</h4><div class="trend-chart">';
    report.recentProgress.forEach(day => {
        const height = day.accuracy > 0 ? Math.max(10, day.accuracy) : 5;
        const color = day.total === 0 ? '#ddd' :
            day.accuracy >= 85 ? '#4CAF50' : day.accuracy >= 60 ? '#FF9800' : '#f44336';
        html += `
            <div class="trend-bar-wrapper">
                <div class="trend-bar" style="height: ${height}%; background: ${color};"></div>
                <div class="trend-label">${day.date.slice(5)}</div>
                <div class="trend-value">${day.total > 0 ? day.accuracy + '%' : '-'}</div>
                <div class="trend-count">${day.total}题</div>
            </div>
        `;
    });
    html += '</div></div>';

    // 学习建议
    html += '<div class="report-section"><h4>💡 智能学习建议</h4><div class="suggestions-list">';
    report.suggestions.forEach(s => {
        const icon = { success: '✅', info: '📝', warning: '⚠️', focus: '🎯', adaptive: '🤖' }[s.type] || '📌';
        html += `<div class="suggestion-item suggestion-${s.type}">${icon} ${s.text}</div>`;
    });
    html += '</div></div>';

    container.innerHTML = html;
}

// 显示错题本
function showErrorBook(type) {
    const container = document.getElementById('error-book-content');
    if (!container) return;

    const errors = learningManager.getErrorBook(type, 20);
    if (errors.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>🎉 太棒了！没有错题记录</p><p class="empty-hint">继续练习保持好成绩！</p></div>';
        return;
    }

    let html = '<div class="error-book-header"><h4>📝 错题本</h4><p class="error-book-hint">以下是您答错的题目，建议重点复习</p></div>';
    html += '<div class="error-book-list">';
    errors.forEach((item, index) => {
        html += `
            <div class="error-item" data-key="${item.key}">
                <div class="error-index">#${index + 1}</div>
                <div class="error-content">
                    <div class="error-question">${item.key}</div>
                    <div class="error-meta">错误次数：${item.errorCount} 次</div>
                </div>
                <button class="review-btn" onclick="reviewErrorQuestion('${type}', '${item.key.replace(/'/g, "\\'")}')">练习</button>
            </div>
        `;
    });
    html += '</div>';

    container.innerHTML = html;
}

// 切换错题本类型
function switchErrorBookType(type, btn) {
    // 更新按钮状态
    const tabBtns = document.querySelectorAll('#error-book-page .tab-btn');
    tabBtns.forEach(b => b.classList.remove('active'));
    if (btn) {
        btn.classList.add('active');
    }

    // 重新加载错题本
    showErrorBook(type);
}

// 复习错题
function reviewErrorQuestion(type, key) {
    const typeNames = { single: '单音', interval: '音程', chord: '和弦' };
    alert(`即将为您生成"${key}"的专项练习，请在${typeNames[type]}练习模式中选择对应难度进行针对性训练。`);
}

// 显示自适应难度推荐
function showAdaptiveRecommendation() {
    const container = document.getElementById('adaptive-content');
    if (!container) return;

    const data = learningManager.init();
    const typeNames = { single: '单音', interval: '音程', chord: '和弦' };

    let html = '<div class="adaptive-header"><h4>🤖 智能难度推荐</h4><p class="adaptive-hint">基于您的学习表现，系统为您推荐以下难度级别</p></div>';
    html += '<div class="adaptive-list">';

    for (const [type, name] of Object.entries(typeNames)) {
        const adaptive = data.adaptiveLevel[type];
        const accuracy = Math.round((adaptive.accuracy || 0) * 100);
        const statusText = adaptive.accuracy >= 0.85 ? '表现优秀，可以挑战更高难度' :
            adaptive.accuracy >= 0.5 ? '表现稳定，继续当前难度' : '基础待加强，建议降低难度';
        const statusIcon = adaptive.accuracy >= 0.85 ? '📈' : adaptive.accuracy >= 0.5 ? '➡️' : '📉';

        html += `
            <div class="adaptive-item">
                <div class="adaptive-icon">${statusIcon}</div>
                <div class="adaptive-info">
                    <div class="adaptive-name">${name}练习</div>
                    <div class="adaptive-level">推荐难度：<strong>${adaptive.currentLevel}级</strong></div>
                    <div class="adaptive-accuracy">最近正确率：${accuracy}%</div>
                    <div class="adaptive-status">${statusText}</div>
                </div>
                <button class="apply-level-btn" onclick="applyAdaptiveLevel('${type}', ${adaptive.currentLevel})">应用此难度</button>
            </div>
        `;
    }

    html += '</div>';
    container.innerHTML = html;
}

// 应用自适应难度
function applyAdaptiveLevel(type, level) {
    const typeNames = { single: '单音', interval: '音程', chord: '和弦' };
    const levelSelect = document.getElementById(`scale-difficulty-${type}`);
    if (levelSelect) {
        levelSelect.value = level;
        levelSelect.dispatchEvent(new Event('change'));
        alert(`已将${typeNames[type]}练习难度调整为${level}级`);
    }
}

// 学习数据管理入口
function initLearningFeatures() {
    // 初始化学习数据
    learningManager.init();

    // 更新首页学习状态
    updateLearningStatus();

    // 绑定学习路径推荐按钮
    const reportBtn = document.getElementById('learning-report-btn');
    if (reportBtn) {
        reportBtn.addEventListener('click', () => {
            showLearningPathModal();
        });
    }

    // 绑定错题分析按钮
    const errorBookBtn = document.getElementById('error-book-btn');
    if (errorBookBtn) {
        errorBookBtn.addEventListener('click', () => {
            showErrorbookModal('chord');
        });
    }

    // 绑定AI答疑按钮
    const qaBtn = document.getElementById('music-qa-btn');
    if (qaBtn) {
        qaBtn.addEventListener('click', () => {
            document.getElementById('qa-modal').style.display = 'flex';
        });
    }

    // 绑定导出/导入按钮
    const exportBtn = document.getElementById('export-data-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const data = learningManager.exportData();
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ear-training-data-${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    const importBtn = document.getElementById('import-data-btn');
    if (importBtn) {
        importBtn.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        if (learningManager.importData(evt.target.result)) {
                            alert('数据导入成功！');

                        } else {
                            alert('数据导入失败，请检查文件格式');
                        }
                    };
                    reader.readAsText(file);
                }
            };
            input.click();
        });
    }

    const clearDataBtn = document.getElementById('clear-data-btn');
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', () => {
            if (confirm('确定要清除所有学习数据吗？此操作不可恢复！')) {
                learningManager.clearAllData();
                alert('数据已清除！');
                updateLearningStatus();
            }
        });
    }
}

// ==================== AI学习助手弹窗功能 ====================

// 关闭弹窗
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// 更新首页学习状态
function updateLearningStatus() {
    const data = learningManager.init();
    const totalRecords = Object.values(data.learningRecords).reduce((sum, arr) => sum + arr.length, 0);
    const correctRecords = Object.values(data.learningRecords).flat().filter(r => r.correct);
    const accuracy = totalRecords > 0 ? Math.round((correctRecords.length / totalRecords) * 100) : 0;

    const level = accuracy >= 80 ? '高级' : accuracy >= 60 ? '中级' : '初级';

    const levelEl = document.getElementById('user-level');
    const accuracyEl = document.getElementById('user-accuracy');

    if (levelEl) levelEl.textContent = level;
    if (accuracyEl) accuracyEl.textContent = totalRecords > 0 ? accuracy + '%' : '--';
}

// 显示学习路径推荐弹窗
function showLearningPathModal() {
    const data = learningManager.init();
    const report = learningManager.generateReport();
    const container = document.getElementById('report-modal-content');
    if (!container) return;

    const typeNames = { single: '单音', interval: '音程', chord: '和弦' };
    let html = '';

    // 生成学习路径建议
    const suggestions = [];

    // 找出薄弱环节
    for (const [type, weakAreas] of Object.entries(report.weakAreas)) {
        if (weakAreas.length > 0) {
            const acc = report.accuracyByType[type];
            suggestions.push({
                title: `${typeNames[type]} - ${weakAreas[0].key}`,
                details: `${weakAreas[0].key}`,
                accuracy: acc.rate,
                priority: '重点',
                priorityClass: 'path-item-badge'
            });
        }
    }

    // 如果没有薄弱点，添加一个综合建议
    if (suggestions.length === 0) {
        for (const [type, name] of Object.entries(typeNames)) {
            const acc = report.accuracyByType[type];
            if (acc.total > 0 && acc.rate < 85) {
                suggestions.push({
                    title: `${name} - 加强基础`,
                    details: `基础${name}练习`,
                    accuracy: acc.rate,
                    priority: acc.rate < 60 ? '重点' : '建议',
                    priorityClass: acc.rate < 60 ? 'path-item-badge' : 'path-item-badge',
                    style: acc.rate < 60 ? 'background: rgba(231, 76, 60, 0.9)' : 'background: rgba(255, 179, 71, 0.9)'
                });
            }
        }
    }

    // 如果还是空，显示鼓励信息
    if (suggestions.length === 0) {
        html = '<div style="text-align:center; padding:30px; color:rgba(200,220,230,0.7);"><p>🎉 太棒了！暂无薄弱环节</p><p>继续保持良好的学习状态！</p><p style="margin-top:16px; color:#80cbc4;">建议练习时长：60分钟</p></div>';
    } else {
        // 排序：重点在前
        suggestions.sort((a, b) => {
            if (a.priority === '重点' && b.priority !== '重点') return -1;
            if (b.priority === '重点' && a.priority !== '重点') return 1;
            return b.accuracy - a.accuracy;
        });

        suggestions.slice(0, 3).forEach((s, i) => {
            const style = s.style || (s.priority === '重点' ? 'background: rgba(231, 76, 60, 0.9)' : 'background: rgba(255, 179, 71, 0.9)');
            html += `
                <div class="path-item">
                    <div class="path-item-header">
                        <span class="path-item-title">${s.title}</span>
                        <span class="path-item-badge" style="${style}">${s.priority}</span>
                    </div>
                    <div class="path-item-info">
                        <span>🎯 ${s.details}</span>
                        <span>📊 当前正确率：${s.accuracy}%</span>
                        <span>⏱️ 建议练习：${3 - i}0分钟</span>
                    </div>
                </div>
            `;
        });
    }

    container.innerHTML = html;
    document.getElementById('report-modal').style.display = 'flex';
}

// 开始推荐练习
function startRecommendedPractice() {
    closeModal('report-modal');
    const data = learningManager.init();

    // 找到最薄弱的类型
    let weakestType = 'chord';
    let lowestAccuracy = 100;

    for (const type of ['chord', 'interval', 'single']) {
        const records = data.learningRecords[type] || [];
        if (records.length > 0) {
            const correct = records.filter(r => r.correct).length;
            const accuracy = (correct / records.length) * 100;
            if (accuracy < lowestAccuracy) {
                lowestAccuracy = accuracy;
                weakestType = type;
            }
        }
    }

    // 跳转到对应的练习页面
    const pageMap = { chord: 'chord-page', interval: 'interval-page', single: 'single-page' };
    if (pageMap[weakestType]) {
        pageManager.switchToPage(pageMap[weakestType]);
    }
}

// 显示错题分析弹窗
let currentErrorbookType = 'chord';
function showErrorbookModal(type) {
    currentErrorbookType = type;
    renderErrorbookContent();
    document.getElementById('errorbook-modal').style.display = 'flex';
}

// 切换错题本类型
function switchErrorbookModalTab(type, btn) {
    currentErrorbookType = type;
    const tabs = btn.parentElement.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderErrorbookContent();
}

// 渲染错题本内容
function renderErrorbookContent() {
    const container = document.getElementById('errorbook-modal-content');
    if (!container) return;

    const errors = learningManager.getErrorBook(currentErrorbookType, 20);
    if (errors.length === 0) {
        container.innerHTML = `
            <div class="errorbook-empty">
                <p>🎉 暂无错题记录</p>
                <p>继续练习，系统将自动分析您的错误</p>
            </div>
        `;
        return;
    }

    let html = '<div class="errorbook-list">';
    errors.forEach((item, index) => {
        html += `
            <div class="errorbook-item">
                <div class="errorbook-item-info">
                    <div class="errorbook-item-question">${item.key}</div>
                    <div class="errorbook-item-meta">错误次数：${item.errorCount} 次</div>
                </div>
                <button class="modal-btn primary" style="padding:6px 14px; font-size:0.8rem;" onclick="practiceSingleError('${item.key.replace(/'/g, "\\'")}')">练习</button>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

// 练习单个错题
function practiceSingleError(key) {
    alert(`即将为您生成"${key}"的专项练习。建议在对应练习模式中选择相近难度进行针对性训练。`);
}

// 开始专项练习
function startErrorbookPractice() {
    closeModal('errorbook-modal');
    const pageMap = { chord: 'chord-page', interval: 'interval-page', single: 'single-page' };
    if (pageMap[currentErrorbookType]) {
        pageManager.switchToPage(pageMap[currentErrorbookType]);
    }
}

// AI答疑功能
const musicKnowledgeBase = {
    '大三和弦': {
        title: '大三和弦',
        content: `
            <p><strong>定义：</strong>大三和弦是根音与三音构成大三度、三音与五音构成小三度的和弦。</p>
            <p><strong>结构：</strong>根音 + 大三度 + 纯五度（大三度+小三度）</p>
            <p><strong>示例：</strong>C大三和弦 = C + E + G</p>
            <p><strong>听觉特点：</strong>明亮、稳定、协和，是最常用的和弦类型之一。</p>
            <p><strong>应用场景：</strong>大调主和弦、终止和弦，常用于歌曲的开头和结尾。</p>
        `
    },
    '小三和弦': {
        title: '小三和弦',
        content: `
            <p><strong>定义：</strong>小三和弦是根音与三音构成小三度、三音与五音构成大三度的和弦。</p>
            <p><strong>结构：</strong>根音 + 小三度 + 纯五度（小三度+大三度）</p>
            <p><strong>示例：</strong>C小三和弦 = C + Eb + G</p>
            <p><strong>听觉特点：</strong>柔和、含蓄、略带忧伤色彩。</p>
            <p><strong>应用场景：</strong>小调主和弦，常用于营造情感氛围。</p>
        `
    },
    '纯五度': {
        title: '纯五度音程',
        content: `
            <p><strong>音程距离：</strong>7个半音</p>
            <p><strong>示例：</strong>C-G、D-A、E-B</p>
            <p><strong>听觉特点：</strong>非常协和、稳定，是音乐中最基础的音程之一。</p>
            <p><strong>识别技巧：</strong>听起来像钟声或钟声般空旷的感觉，两个音融合度高。</p>
            <p><strong>测试方法：</strong>可以先听低音，再听高音，感受其和谐程度。</p>
        `
    },
    'C大调': {
        title: 'C自然大调',
        content: `
            <p><strong>音阶组成：</strong>C D E F G A B C</p>
            <p><strong>特点：</strong>没有升降号，是最简单的大调式。</p>
            <p><strong>调式结构：</strong>全全半全全全半</p>
            <p><strong>主和弦：</strong>C大三和弦 (C-E-G)</p>
            <p><strong>常用和弦：</strong>C、Am、F、G、Dm、Em</p>
        `
    },
    '听辨技巧': {
        title: '听辨练习技巧',
        content: `
            <p><strong>1. 建立音程基准：</strong></p>
            <p>• 熟悉常用音程（大三度、纯五度、八度）的音响特征</p>
            <p>• 可以用熟悉的歌曲来记忆音程，如《小星星》开头是纯五度</p>
            
            <p><strong>2. 和弦识别步骤：</strong></p>
            <p>• 先听根音，确定低音位置</p>
            <p>• 再听三音，判断大小三和弦（三音高低）</p>
            <p>• 最后确认五音是否为纯五度</p>
            
            <p><strong>3. 练习方法：</strong></p>
            <p>• 从简单的开始：先听音程，再听和弦</p>
            <p>• 每天坚持15-20分钟的集中练习</p>
            <p>• 错的题目要反复听，建立听觉记忆</p>
        `
    }
};

// AI答疑功能
function askAIQuestion() {
    const input = document.getElementById('qa-input');
    const question = input ? input.value.trim() : '';
    if (!question) return;
    renderQAResult(question);
}

// 快速提问
function quickAsk(topic) {
    renderQAResult(topic);
}

// 渲染问答结果
function renderQAResult(question) {
    const content = document.getElementById('qa-modal-content');
    if (!content) return;

    // 从知识库查找
    const knowledge = musicKnowledgeBase[question];

    if (knowledge) {
        content.innerHTML = `
            <div class="qa-answer">
                <h4><i class="fas fa-book"></i> ${knowledge.title}</h4>
                ${knowledge.content}
            </div>
        `;
    } else {
        // 通用回答
        content.innerHTML = `
            <div class="qa-answer">
                <h4><i class="fas fa-search"></i> 关于"${question}"</h4>
                <p>您询问的"${question}"是一个很好的音乐学习主题。</p>
                <p><strong>建议学习路径：</strong></p>
                <p>1. 从基础乐理开始，理解相关概念</p>
                <p>2. 通过听辨练习来加深理解</p>
                <p>3. 在实际作品中体会其应用</p>
                <p style="margin-top:12px; color:#80cbc4;"><strong>提示：</strong>您也可以尝试点击下方的热门问题获取更多帮助！</p>
            </div>
        `;
    }
}

// ==================== 确保DOM加载后初始化 ====================
if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', function () { init(); }); } else { init(); }

// 后续：其余模块（音程/单音/节奏/旋律）定义与实现保留在此文件（已提取）
