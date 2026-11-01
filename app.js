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
    measureBeatsFilled: [], // 每个小节已填充的拍数
    restModeOn: false // 节拍听辨：休止开关
};

// 旋律听辨状态管理
const melodyAppState = {
    currentMode: 'practice', // 'practice' | 'test'
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
    // 旋律相关状态
    currentMelody: null, // 当前旋律题目 {title, key, timeSignature, notes, musicxml}
    selectedKey: null, // 用户选择的调性
    selectedTimeSignature: null, // 用户选择的拍号
    inputNotes: [], // 用户输入的音符 [{pitch, duration, dots}]
    currentPitch: null, // 当前选中的音高（钢琴键）
    currentDuration: 'q', // 当前选中的时值
    currentDots: 0, // 当前附点数
    isPlaying: false,
    stopRequested: false, // 请求停止播放的标志
    bpm: 72,
    osmd: null, // OSMD实例
    vexflowRenderer: null, // VexFlow渲染器
    vexflowContext: null,
    vexflowStave: null,
    loadedMelodies: [], // 从melodies/文件夹加载的预置曲目
    leaderboard: [],
    testAnalysis: [], // 测试结果分析记录
    activeAudioNodes: [] // 当前活跃的音频节点（用于立即停止）
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
        console.warn('⚠️ MIDI 初始化失败（若无MIDI设备可忽略）:', error.message);
        updateMidiStatus(false);
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

    // 追踪活跃音频节点，用于立即停止
    const allOsc = [...oscillators, noise];
    allOsc.forEach(osc => {
        melodyAppState.activeAudioNodes.push(osc);
        osc.onended = () => {
            const idx = melodyAppState.activeAudioNodes.indexOf(osc);
            if (idx >= 0) melodyAppState.activeAudioNodes.splice(idx, 1);
        };
    });
}

// 立即停止所有旋律播放的音频
function stopMelodyAudio() {
    melodyAppState.stopRequested = true;
    melodyAppState.isPlaying = false;
    // 立即停止所有活跃的音频节点
    melodyAppState.activeAudioNodes.forEach(osc => {
        try { osc.stop(0); } catch (e) { /* already stopped */ }
        try { osc.disconnect(); } catch (e) { /* ignore */ }
    });
    melodyAppState.activeAudioNodes = [];
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
        else if (pageId === 'comprehensive-exam-page') initExamPage();
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
            'melody-test-end-page': '旋律听辨结果 - 音乐听觉综合训练系统',
            'learning-report-page': '学习报告 - 音乐听觉综合训练系统',
            'error-book-page': '错题本 - 音乐听觉综合训练系统',
            'adaptive-page': '智能推荐 - 音乐听觉综合训练系统',
            'comprehensive-exam-page': '综合考试 - 音乐听觉综合训练系统'
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
        rhythmAppState.userInfo = { ...userInfo };
        melodyAppState.userInfo = { ...userInfo };

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
                rhythmAppState.userInfo = { ...userInfo, saved: true };
                melodyAppState.userInfo = { ...userInfo, saved: true };

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
    const piano = document.getElementById(pianoId); if (!piano) return; const whiteKeys = piano.querySelectorAll('.white-key'); if (!whiteKeys.length) return;
    // 使用offsetWidth/offsetLeft（元素内部坐标系，不受zoom影响）
    const firstRectLeft = whiteKeys[0].offsetLeft;
    pianoMetrics.offset = firstRectLeft;
    pianoMetrics.whiteWidth = whiteKeys[0].offsetWidth;
    if (whiteKeys.length > 1) {
        pianoMetrics.spacing = whiteKeys[1].offsetLeft - whiteKeys[0].offsetLeft;
    } else {
        const whiteKeyStyle = window.getComputedStyle(whiteKeys[0]);
        const marginRight = parseFloat(whiteKeyStyle.marginRight || 0);
        pianoMetrics.spacing = pianoMetrics.whiteWidth + marginRight;
    }
    // 读取实际黑键宽度（从CSS），不要硬编码
    const sampleBlack = piano.querySelector('.black-key');
    pianoMetrics.blackWidth = sampleBlack ? sampleBlack.offsetWidth : 30;
}

function calculateBlackKeyLeft(position) {
    if (pianoMetrics.spacing === null || pianoMetrics.offset === null || pianoMetrics.whiteWidth === null) updatePianoMetrics();
    const blackWidth = pianoMetrics.blackWidth || 30;
    if (pianoMetrics.spacing === null || pianoMetrics.offset === null || pianoMetrics.whiteWidth === null) return '0px';
    const halfWhite = pianoMetrics.whiteWidth / 2;
    const halfBlack = blackWidth / 2;
    const offsetAdjustment = 0;
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

    // 仅高亮用户提交的答案，不播放答案声音
    lastThreeNotes.forEach(note => {
        highlightKey(note);
    });

    // 记录学习数据（练习模式和测试模式都记录）
    learningManager.recordResult('chord', {
        question: chordAppState.currentChord.chord.name,
        chordType: chordAppState.currentChord.chord.name,
        correct: isCorrect,
        userAnswer: sortedUserNotes.join(' + '),
        correctAnswer: sortedCorrectNotes.join(' + '),
        mode: 'pitch',
        difficulty: chordAppState.scaleDifficulty || 1,
        learningMode: chordAppState.currentMode || 'practice'
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
        difficulty: chordAppState.difficulty || 1,
        learningMode: chordAppState.currentMode || 'practice'
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

// 练习说明折叠/展开（移动端优先：包裹内容用于平滑过渡 + 提升触控体验）
function initPracticeInstructionsToggle() {
    document.querySelectorAll('.practice-instructions').forEach(function (box) {
        const h4 = box.querySelector('h4');
        if (!h4 || h4._toggleBound) return;
        h4._toggleBound = true;

        // 将除标题之外的内容包裹进 .pi-content，以便用 max-height 做平滑过渡
        let content = box.querySelector('.pi-content');
        if (!content) {
            content = document.createElement('div');
            content.className = 'pi-content';
            while (h4.nextSibling) {
                content.appendChild(h4.nextSibling);
            }
            box.appendChild(content);
        }

        h4.addEventListener('click', function (e) {
            // 避免移动端触发默认行为（如文本选择/双击缩放干扰）
            e.preventDefault();
            box.classList.toggle('collapsed');
        });

        // 默认收起，点击标题时展开，节省垂直空间
        box.classList.add('collapsed');
    });
}

function init() {
    // 默认自动加载上次保存的学生信息，避免每次重复输入
    userManager.loadUserInfo();
    initHomePage();
    initPracticeInstructionsToggle();
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
                case 'comprehensive-exam': pageManager.switchToPage('comprehensive-exam-page'); break;
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

    // 提交答案后仅高亮，不播放答案声音
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
        difficulty: intervalAppState.currentLevel || 1,
        learningMode: intervalAppState.currentMode || 'practice'
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

    // 提交性质答案时不播放答案声音，保持所选性质按钮高亮即可

    // 记录学习数据（练习模式和测试模式都记录）
    learningManager.recordResult('interval', {
        question: `${intervalAppState.lastQuestion[0]} + ${intervalAppState.lastQuestion[1]}`,
        correct: isCorrect,
        userAnswer: intervalAppState.selectedIntervalQuality,
        correctAnswer: correctQuality,
        mode: 'quality',
        difficulty: intervalAppState.currentLevel || 1,
        learningMode: intervalAppState.currentMode || 'practice'
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

    // 提交答案后仅高亮琴键，不播放用户答案声音
    highlightKey(singleAppState.pianoSelection);

    // 记录学习数据（练习模式和测试模式都记录）
    learningManager.recordResult('single', {
        question: singleAppState.lastQuestion.join(' + '),
        correct: isCorrect,
        userAnswer: singleAppState.pianoSelection,
        correctAnswer: singleAppState.lastQuestion.join(' + '),
        mode: 'pitch',
        difficulty: singleAppState.currentLevel || 1,
        learningMode: singleAppState.currentMode || 'practice'
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

// ==================== 旋律听辨模块 ====================

// 内置示例旋律数据（notes: {pitch, duration, dots}，duration: w/h/q/8/16）
const MELODY_SAMPLES = [
    {
        title: 'C大调练习曲',
        key: 'C',
        keyName: 'C大调',
        timeSignature: '4/4',
        notes: [
            { pitch: 'C4', duration: 'q', dots: 0 }, { pitch: 'E4', duration: 'q', dots: 0 },
            { pitch: 'G4', duration: 'q', dots: 0 }, { pitch: 'E4', duration: 'q', dots: 0 },
            { pitch: 'F4', duration: 'q', dots: 0 }, { pitch: 'A4', duration: 'q', dots: 0 },
            { pitch: 'C5', duration: 'q', dots: 0 }, { pitch: 'A4', duration: 'q', dots: 0 },
            { pitch: 'G4', duration: 'q', dots: 0 }, { pitch: 'B4', duration: 'q', dots: 0 },
            { pitch: 'D5', duration: 'q', dots: 0 }, { pitch: 'B4', duration: 'q', dots: 0 },
            { pitch: 'C5', duration: 'h', dots: 0 }, { pitch: 'G4', duration: 'h', dots: 0 },
            { pitch: 'E4', duration: 'q', dots: 0 }, { pitch: 'G4', duration: 'q', dots: 0 },
            { pitch: 'C5', duration: 'q', dots: 0 }, { pitch: 'G4', duration: 'q', dots: 0 },
            { pitch: 'F4', duration: 'q', dots: 0 }, { pitch: 'D4', duration: 'q', dots: 0 },
            { pitch: 'B3', duration: 'q', dots: 0 }, { pitch: 'D4', duration: 'q', dots: 0 },
            { pitch: 'C4', duration: 'q', dots: 0 }, { pitch: 'E4', duration: 'q', dots: 0 },
            { pitch: 'G4', duration: 'q', dots: 0 }, { pitch: 'E4', duration: 'q', dots: 0 },
            { pitch: 'C4', duration: 'w', dots: 0 }
        ]
    },
    {
        title: 'G大调民谣',
        key: 'G',
        keyName: 'G大调',
        timeSignature: '4/4',
        notes: [
            { pitch: 'G4', duration: 'q', dots: 0 }, { pitch: 'B4', duration: 'q', dots: 0 },
            { pitch: 'D5', duration: 'q', dots: 0 }, { pitch: 'B4', duration: 'q', dots: 0 },
            { pitch: 'A4', duration: 'q', dots: 0 }, { pitch: 'C5', duration: 'q', dots: 0 },
            { pitch: 'E5', duration: 'q', dots: 0 }, { pitch: 'C5', duration: 'q', dots: 0 },
            { pitch: 'D5', duration: 'q', dots: 0 }, { pitch: 'B4', duration: 'q', dots: 0 },
            { pitch: 'G4', duration: 'q', dots: 0 }, { pitch: 'B4', duration: 'q', dots: 0 },
            { pitch: 'A4', duration: 'q', dots: 0 }, { pitch: 'F#4', duration: 'q', dots: 0 },
            { pitch: 'G4', duration: 'h', dots: 0 }, { pitch: 'G4', duration: 'q', dots: 0 },
            { pitch: 'B4', duration: 'q', dots: 0 }, { pitch: 'D5', duration: 'q', dots: 0 },
            { pitch: 'G5', duration: 'q', dots: 0 }, { pitch: 'D5', duration: 'q', dots: 0 },
            { pitch: 'C5', duration: 'q', dots: 0 }, { pitch: 'A4', duration: 'q', dots: 0 },
            { pitch: 'F#4', duration: 'q', dots: 0 }, { pitch: 'A4', duration: 'q', dots: 0 },
            { pitch: 'G4', duration: 'q', dots: 0 }, { pitch: 'B4', duration: 'q', dots: 0 },
            { pitch: 'D5', duration: 'q', dots: 0 }, { pitch: 'B4', duration: 'q', dots: 0 },
            { pitch: 'G4', duration: 'w', dots: 0 }
        ]
    },
    {
        title: 'a小调旋律',
        key: 'a',
        keyName: 'a小调',
        timeSignature: '3/4',
        notes: [
            { pitch: 'A4', duration: 'q', dots: 0 }, { pitch: 'C5', duration: 'q', dots: 0 },
            { pitch: 'E5', duration: 'q', dots: 0 }, { pitch: 'D5', duration: 'h', dots: 0 },
            { pitch: 'B4', duration: 'q', dots: 0 }, { pitch: 'C5', duration: 'q', dots: 0 },
            { pitch: 'E5', duration: 'q', dots: 0 }, { pitch: 'A5', duration: 'q', dots: 0 },
            { pitch: 'G5', duration: 'h', dots: 0 }, { pitch: 'F5', duration: 'q', dots: 0 },
            { pitch: 'E5', duration: 'q', dots: 0 }, { pitch: 'D5', duration: 'q', dots: 0 },
            { pitch: 'C5', duration: 'q', dots: 0 }, { pitch: 'B4', duration: 'h', dots: 0 },
            { pitch: 'A4', duration: 'q', dots: 0 }, { pitch: 'G4', duration: 'q', dots: 0 },
            { pitch: 'A4', duration: 'q', dots: 0 }, { pitch: 'B4', duration: 'q', dots: 0 },
            { pitch: 'A4', duration: 'h', dots: 0 }, { pitch: 'G4', duration: 'q', dots: 0 },
            { pitch: 'A4', duration: 'h', dots: 0 }, { pitch: 'E4', duration: 'q', dots: 0 },
            { pitch: 'A4', duration: 'h', dots: 0 }, { pitch: 'A4', duration: 'q', dots: 0 }
        ]
    }
];

// 时值描述映射
const MELODY_DURATION_DESC = {
    'w': '全音', 'h': '二分', 'q': '四分', '8': '八分', '16': '十六分',
    'q.': '附点四分', '8.': '附点八分', 'h.': '附点二分', 'triplet': '三连音'
};

// 时值对应的拍数（以四分音符为1拍）
const MELODY_DURATION_BEATS = {
    'w': 4, 'h': 2, 'q': 1, '8': 0.5, '16': 0.25
};

// 调性对应的fifths（MusicXML用）
const KEY_FIFTHS = {
    'C': 0, 'G': 1, 'D': 2, 'A': 3, 'F': -1, 'Bb': -2, 'Eb': -3,
    'a': 0, 'e': 1, 'd': -1, 'b': 2, 'g': -1
};

// 将音高字符串解析为 {step, alter, octave}
function parsePitch(pitchStr) {
    const match = pitchStr.match(/^([A-G])(#|b)?(\d)$/);
    if (!match) return null;
    const [, step, accidental, octave] = match;
    let alter = 0;
    if (accidental === '#') alter = 1;
    else if (accidental === 'b') alter = -1;
    return { step, alter, octave: parseInt(octave) };
}

// 将音高转为VexFlow键格式（如 C4 -> c/4, F#4 -> f#/4）
function pitchToVexFlowKey(pitchStr) {
    const p = parsePitch(pitchStr);
    if (!p) return 'c/4';
    return p.step.toLowerCase() + (p.alter === 1 ? '#' : p.alter === -1 ? 'b' : '') + '/' + p.octave;
}

// 将duration转为MusicXML type
function durationToXmlType(duration) {
    const map = { 'w': 'whole', 'h': 'half', 'q': 'quarter', '8': 'eighth', '16': '16th' };
    return map[duration.replace('.', '')] || 'quarter';
}

// 获取时值的拍数（含附点）
function getNoteBeats(duration, dots) {
    const base = duration.replace('.', '');
    const beats = MELODY_DURATION_BEATS[base] || 1;
    return beats * (dots ? 1.5 : 1);
}

// 生成MusicXML字符串
function generateMusicXML(melody) {
    const fifths = KEY_FIFTHS[melody.key] !== undefined ? KEY_FIFTHS[melody.key] : 0;
    const [beats, beatType] = melody.timeSignature.split('/');
    const divisions = 4; // 每四分音符4个division

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">\n';
    xml += '<score-partwise version="3.1">\n';
    xml += '  <part-list>\n    <score-part id="P1">\n      <part-name>旋律</part-name>\n    </score-part>\n  </part-list>\n';
    xml += '  <part id="P1">\n';

    // 按小节切分音符
    const beatsPerMeasure = parseInt(beats);
    let measureNum = 1;
    let currentMeasureBeats = 0;
    let measureNotes = [];

    function writeMeasure(isLast) {
        xml += `    <measure number="${measureNum}">\n`;
        if (measureNum === 1) {
            xml += '      <attributes>\n';
            xml += `        <divisions>${divisions}</divisions>\n`;
            xml += `        <key><fifths>${fifths}</fifths></key>\n`;
            xml += `        <time><beats>${beats}</beats><beat-type>${beatType}</beat-type></time>\n`;
            xml += '        <clef><sign>G</sign><line>2</line></clef>\n';
            xml += '      </attributes>\n';
        }
        measureNotes.forEach(n => {
            xml += '      <note>';
            if (n.pitch === 'rest') {
                xml += '<rest/>';
            } else {
                const p = parsePitch(n.pitch);
                xml += `<pitch><step>${p.step}</step>`;
                if (p.alter !== 0) xml += `<alter>${p.alter}</alter>`;
                xml += `<octave>${p.octave}</octave></pitch>`;
            }
            const dur = Math.round(getNoteBeats(n.duration, n.dots) * divisions);
            xml += `<duration>${dur}</duration>`;
            xml += `<type>${durationToXmlType(n.duration)}</type>`;
            if (n.dots) xml += '<dot/>';
            xml += '</note>\n';
        });
        if (isLast) {
            xml += '      <barline location="right"><bar-style>light-heavy</bar-style></barline>\n';
        }
        xml += '    </measure>\n';
        measureNum++;
    }

    melody.notes.forEach(note => {
        measureNotes.push(note);
        currentMeasureBeats += getNoteBeats(note.duration, note.dots);
        if (currentMeasureBeats >= beatsPerMeasure - 0.01) {
            writeMeasure(false);
            measureNotes = [];
            currentMeasureBeats = 0;
        }
    });
    if (measureNotes.length > 0) writeMeasure(true);

    xml += '  </part>\n</score-partwise>';
    return xml;
}

// 解析MusicXML文件为旋律数据
function parseMusicXML(xmlText) {
    try {
        // 去除DOCTYPE声明（某些浏览器会因DTD验证失败）
        const cleanXml = xmlText.replace(/<!DOCTYPE[^>]*>/, '').replace(/<\?xml[^?]*\?>/, '');
        const parser = new DOMParser();
        const doc = parser.parseFromString(cleanXml, 'text/xml');
        // 检查解析错误
        const parseError = doc.querySelector('parsererror');
        if (parseError) {
            console.error('MusicXML解析错误:', parseError.textContent);
            return null;
        }
        const part = doc.querySelector('part');
        if (!part) {
            console.error('MusicXML: part元素未找到');
            return null;
        }

        // 获取调性和拍号
        let key = 'C', timeSignature = '4/4';
        const fifthsEl = doc.querySelector('fifths');
        if (fifthsEl) {
            const fifths = parseInt(fifthsEl.textContent);
            const majorKeys = { 0: 'C', 1: 'G', 2: 'D', 3: 'A', '-1': 'F', '-2': 'Bb', '-3': 'Eb' };
            const minorKeys = { 0: 'a', 1: 'e', 2: 'b', '-1': 'd', '-2': 'g' };
            key = majorKeys[fifths] || minorKeys[fifths] || 'C';
        }
        const beatsEl = doc.querySelector('beats');
        const beatTypeEl = doc.querySelector('beat-type');
        if (beatsEl && beatTypeEl) {
            timeSignature = beatsEl.textContent + '/' + beatTypeEl.textContent;
        }

        // 解析音符
        const notes = [];
        const noteEls = part.querySelectorAll('note');
        noteEls.forEach(noteEl => {
            const pitchEl = noteEl.querySelector('pitch');
            const typeEl = noteEl.querySelector('type');
            const dotEl = noteEl.querySelector('dot');
            let pitch = 'rest';
            if (pitchEl) {
                const stepEl = pitchEl.querySelector('step');
                const octaveEl = pitchEl.querySelector('octave');
                if (!stepEl || !octaveEl) return;
                const step = stepEl.textContent;
                const alterEl = pitchEl.querySelector('alter');
                const octave = octaveEl.textContent;
                const alter = alterEl ? parseInt(alterEl.textContent) : 0;
                pitch = step + (alter === 1 ? '#' : alter === -1 ? 'b' : '') + octave;
            }
            if (pitch === 'rest') return; // 跳过休止符
            let duration = 'q';
            if (typeEl) {
                const typeMap = { 'whole': 'w', 'half': 'h', 'quarter': 'q', 'eighth': '8', '16th': '16' };
                duration = typeMap[typeEl.textContent] || 'q';
            }
            const dots = dotEl ? 1 : 0;
            notes.push({ pitch, duration, dots });
        });

        return {
            title: '上传曲目',
            key: key,
            keyName: key + (['a', 'e', 'd', 'b', 'g'].includes(key) ? '小调' : '大调'),
            timeSignature: timeSignature,
            notes: notes
        };
    } catch (e) {
        console.error('解析MusicXML失败:', e);
        return null;
    }
}

function initMelodyPage() {
    console.log('initMelodyPage 被调用');
    if (initMelodyPage.initialized) {
        // 已初始化，确保是练习模式
        startMelodyPracticeMode();
        return;
    }
    initMelodyPage.initialized = true;

    const back = document.getElementById('back-home-melody');
    if (back) back.addEventListener('click', () => pageManager.switchToPage('home-page'));

    // 模式切换按钮
    const practiceBtn = document.getElementById('practice-btn-melody');
    const testBtn = document.getElementById('test-btn-melody');
    const leaderboardBtn = document.getElementById('leaderboard-btn-melody');
    const endTestBtn = document.getElementById('end-test-btn-melody');

    if (practiceBtn) practiceBtn.addEventListener('click', startMelodyPracticeMode);
    if (testBtn) testBtn.addEventListener('click', startMelodyTestMode);
    if (leaderboardBtn) leaderboardBtn.addEventListener('click', showMelodyLeaderboard);
    if (endTestBtn) endTestBtn.addEventListener('click', endMelodyTestMode);

    // 全屏和关闭按钮
    const fullscreenBtn = document.getElementById('fullscreen-btn-melody');
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => {
        const elem = document.getElementById('melody-page');
        if (elem) {
            if (!document.fullscreenElement) elem.requestFullscreen?.();
            else document.exitFullscreen?.();
        }
    });
    const closeBtn = document.getElementById('close-btn-melody');
    if (closeBtn) closeBtn.addEventListener('click', () => pageManager.switchToPage('home-page'));

    // 初始化钢琴键盘
    initMelodyPiano();

    // 初始化时值按钮
    initMelodyDurationButtons();

    // 控制按钮
    const randomPlayBtn = document.getElementById('random-play-btn-melody');
    const playBtn = document.getElementById('play-btn-melody');
    const submitBtn = document.getElementById('submit-btn-melody');
    const showAnswerBtn = document.getElementById('show-answer-btn-melody');
    if (randomPlayBtn) randomPlayBtn.addEventListener('click', playRandomMelody);
    if (playBtn) playBtn.addEventListener('click', repeatMelody);
    if (submitBtn) submitBtn.addEventListener('click', submitMelodyAnswer);
    if (showAnswerBtn) showAnswerBtn.addEventListener('click', showAnswerMelody);

    // 音符操作按钮
    const addNoteBtn = document.getElementById('add-note-btn-melody');
    const deleteNoteBtn = document.getElementById('delete-note-btn-melody');
    const clearNotesBtn = document.getElementById('clear-notes-btn-melody');
    if (addNoteBtn) addNoteBtn.addEventListener('click', addMelodyNote);
    if (deleteNoteBtn) deleteNoteBtn.addEventListener('click', deleteLastMelodyNote);
    if (clearNotesBtn) clearNotesBtn.addEventListener('click', clearMelodyNotes);

    // BPM滑块
    const bpmSlider = document.getElementById('melody-bpm');
    const bpmDisplay = document.getElementById('bpm-display-melody');
    const bpmLabel = document.querySelector('label[for="melody-bpm"]');
    if (bpmSlider) bpmSlider.addEventListener('input', (e) => {
        melodyAppState.bpm = parseInt(e.target.value);
        if (bpmDisplay) bpmDisplay.textContent = melodyAppState.bpm;
        if (bpmLabel) bpmLabel.textContent = `节拍器 (${melodyAppState.bpm})`;
        // 同步到节拍器
        rhythmAppState.bpm = melodyAppState.bpm;
    });

    // 节拍器开关（复用节奏听辨的节拍器逻辑）
    const metronomeBtn = document.getElementById('toggle-metronome-melody');
    if (metronomeBtn) metronomeBtn.addEventListener('click', () => {
        rhythmAppState.metronomeOn = !rhythmAppState.metronomeOn;
        if (rhythmAppState.metronomeOn) {
            // 同步BPM到节奏听辨的节拍器
            rhythmAppState.bpm = melodyAppState.bpm || 72;
            metronomeBtn.textContent = '关';
            metronomeBtn.classList.add('active');
            startMetronome();
        } else {
            metronomeBtn.textContent = '开';
            metronomeBtn.classList.remove('active');
            stopMetronome();
        }
    });

    // 截屏按钮（导出旋律听辨页面为图片）
    const resetBtn = document.getElementById('reset-test-btn-melody');
    if (resetBtn) resetBtn.addEventListener('click', captureMelodyPageScreenshot);

    // 曲目选择
    const melodySelector = document.getElementById('melody-selector');
    if (melodySelector) melodySelector.addEventListener('change', () => {
        melodyAppState.currentMelody = null;
        melodyAppState.inputNotes = [];
        renderMelodyInput();
        updateMelodyStatus('已切换曲目，请点击"随机播放"');
    });

    // 预置曲目加载：从melodies/文件夹加载MusicXML文件
    loadPresetMelodies();

    // 调性/拍号选择
    const keySelector = document.getElementById('key-selector-melody');
    const timesigSelector = document.getElementById('timesig-selector-melody');
    if (keySelector) keySelector.addEventListener('change', (e) => {
        melodyAppState.selectedKey = e.target.value || null;
    });
    if (timesigSelector) timesigSelector.addEventListener('change', (e) => {
        melodyAppState.selectedTimeSignature = e.target.value || null;
    });

    // 风云榜单按钮
    const clearLbBtn = document.getElementById('clear-leaderboard-btn-melody');
    const backLbBtn = document.getElementById('back-from-leaderboard-btn-melody');
    if (clearLbBtn) clearLbBtn.addEventListener('click', () => {
        melodyAppState.leaderboard = [];
        saveMelodyLeaderboard();
        showMelodyLeaderboard();
    });
    if (backLbBtn) backLbBtn.addEventListener('click', startMelodyPracticeMode);

    // 测试结束页按钮
    const restartBtn = document.getElementById('restart-test-btn-melody');
    const backHomeBtn = document.getElementById('back-to-home-btn-melody');
    const viewDetailsBtn = document.getElementById('view-details-btn-melody');
    if (restartBtn) restartBtn.addEventListener('click', () => {
        pageManager.switchToPage('melody-page');
        startMelodyTestMode();
    });
    if (backHomeBtn) backHomeBtn.addEventListener('click', () => pageManager.switchToPage('home-page'));
    if (viewDetailsBtn) viewDetailsBtn.addEventListener('click', () => {
        // 滚动到分析区域
        const analysisPanel = document.querySelector('#melody-test-end-page .test-analysis-panel');
        if (analysisPanel) analysisPanel.scrollIntoView({ behavior: 'smooth' });
    });

    // 加载风云榜单
    loadMelodyLeaderboard();

    // 初始化VexFlow
    initVexFlowMelody();

    // 确保进入练习模式
    startMelodyPracticeMode();

    updateMelodyStatus('请点击"随机播放"开始旋律听辨');
}

// 初始化旋律钢琴键盘
function initMelodyPiano() {
    const piano = document.getElementById('piano-melody');
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
        key.addEventListener('mousedown', (e) => {
            if (Date.now() - lastPianoTouchTime < PIANO_TOUCH_LOCK_MS) return;
            e.preventDefault();
            handlePianoNoteOnMelody(note);
        });
        key.addEventListener('mouseup', () => handlePianoNoteOffMelody(note));
        key.addEventListener('mouseleave', () => handlePianoNoteOffMelody(note));
        let touchStartX = 0, touchStartY = 0, isScrolling = false, hasPlayed = false;
        key.addEventListener('touchstart', (e) => {
            lastPianoTouchTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isScrolling = false;
            hasPlayed = false;
            handlePianoNoteOnMelody(note);
            hasPlayed = true;
        }, { passive: false });
        key.addEventListener('touchmove', (e) => {
            const diffX = Math.abs(e.touches[0].clientX - touchStartX);
            const diffY = Math.abs(e.touches[0].clientY - touchStartY);
            if (diffX > diffY && diffX > 10) {
                isScrolling = true;
                if (hasPlayed) { handlePianoNoteOffMelody(note); hasPlayed = false; }
            }
        }, { passive: false });
        key.addEventListener('touchend', () => {
            if (!isScrolling && hasPlayed) handlePianoNoteOffMelody(note);
        }, { passive: true });
        piano.appendChild(key);
    });
    invalidatePianoMetrics();
    updatePianoMetrics('piano-melody');
    const blackNotes = allNotes.filter(n => n.type === 'black');
    blackNotes.forEach(note => {
        const key = document.createElement('div');
        key.className = 'black-key';
        key.innerHTML = note.display;
        key.dataset.note = note.note;
        key.style.left = calculateBlackKeyLeft(note.position);
        key.addEventListener('mousedown', (e) => {
            if (Date.now() - lastPianoTouchTime < PIANO_TOUCH_LOCK_MS) return;
            e.preventDefault();
            handlePianoNoteOnMelody(note);
        });
        key.addEventListener('mouseup', () => handlePianoNoteOffMelody(note));
        key.addEventListener('mouseleave', () => handlePianoNoteOffMelody(note));
        let touchStartX = 0, touchStartY = 0, isScrolling = false, hasPlayed = false;
        key.addEventListener('touchstart', (e) => {
            lastPianoTouchTime = Date.now();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isScrolling = false;
            hasPlayed = false;
            handlePianoNoteOnMelody(note);
            hasPlayed = true;
        }, { passive: false });
        key.addEventListener('touchmove', (e) => {
            const diffX = Math.abs(e.touches[0].clientX - touchStartX);
            const diffY = Math.abs(e.touches[0].clientY - touchStartY);
            if (diffX > diffY && diffX > 10) {
                isScrolling = true;
                if (hasPlayed) { handlePianoNoteOffMelody(note); hasPlayed = false; }
            }
        }, { passive: false });
        key.addEventListener('touchend', () => {
            if (!isScrolling && hasPlayed) handlePianoNoteOffMelody(note);
        }, { passive: true });
        piano.appendChild(key);
    });
}

// 旋律钢琴按键处理
function handlePianoNoteOnMelody(note) {
    // 测试模式下点击琴键不出声，但高亮（防漏题）
    if (melodyAppState.currentMode === 'test') {
        highlightKey(note.note);
        melodyAppState.currentPitch = note.note;
        return;
    }
    // 练习模式下正常发声
    ensureAudioReady();
    startNoteWithWebAudio(note.note);
    highlightKey(note.note);
    melodyAppState.currentPitch = note.note;
}

function handlePianoNoteOffMelody(note) {
    stopNoteWithWebAudio(note.note);
    // 测试模式下保持高亮，直到提交答案或下一题
    if (melodyAppState.currentMode !== 'test') {
        removeHighlightKey(note.note);
    }
}

// 初始化时值按钮
function initMelodyDurationButtons() {
    const buttons = document.querySelectorAll('.melody-duration-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            melodyAppState.currentDuration = btn.dataset.duration;
            melodyAppState.currentDots = parseInt(btn.dataset.dots || '0');
        });
    });
}

// ==================== Canvas五线谱渲染（替代VexFlow，借鉴APP_WebPiano） ====================

// 将音高转为五线谱位置（基于E4=position0，每行半音=position+1）
function noteToStaffPosition(pitch) {
    let noteName, octaveStr;
    if (pitch.includes('#') || pitch.includes('b')) {
        noteName = pitch.charAt(0);
        octaveStr = pitch.slice(-1);
    } else {
        noteName = pitch.slice(0, -1);
        octaveStr = pitch.slice(-1);
    }
    const octave = parseInt(octaveStr);
    const pitchIndex = { 'C': 0, 'D': 1, 'E': 2, 'F': 3, 'G': 4, 'A': 5, 'B': 6 }[noteName];
    if (pitchIndex === undefined) return 0;
    // E4 = position 0
    return (octave - 4) * 7 + (pitchIndex - 2);
}

// 时值对应的拍数（以四分音符为1拍）
function getNoteBeatsForDuration(duration, dots) {
    const baseMap = { 'w': 4, 'h': 2, 'q': 1, '8': 0.5, '16': 0.25, 'triplet': 1 / 3 };
    const base = baseMap[duration.replace('.', '')] || 1;
    return dots ? base * 1.5 : base;
}

// 时值信息
const DURATION_INFO = {
    'w': { label: '全音', dur: 4, headW: 8, headH: 6, fill: 'hollow', stem: false, flag: 0 },
    'h': { label: '二分', dur: 2, headW: 8, headH: 6, fill: 'hollow', stem: true, flag: 0 },
    'q': { label: '四分', dur: 1, headW: 8, headH: 6, fill: 'solid', stem: true, flag: 0 },
    '8': { label: '八分', dur: 0.5, headW: 8, headH: 6, fill: 'solid', stem: true, flag: 1 },
    '16': { label: '十六分', dur: 0.25, headW: 8, headH: 6, fill: 'solid', stem: true, flag: 2 },
    'triplet': { label: '三连音', dur: 1 / 3, headW: 8, headH: 6, fill: 'solid', stem: true, flag: 1 }
};

// 初始化Canvas渲染器
function initVexFlowMelody() {
    const container = document.getElementById('vexflow-container-melody');
    if (!container) return;
    // 确保Canvas已创建
    ensureMelodyCanvas();
    // 延迟渲染确保容器可见
    setTimeout(() => { renderMelodyInput(); }, 100);
}

// 确保Canvas元素存在
function ensureMelodyCanvas() {
    const container = document.getElementById('vexflow-container-melody');
    if (!container) return;
    if (container.querySelector('canvas.melody-canvas')) return;

    // 清空并创建Canvas
    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.className = 'melody-canvas';
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    canvas.style.display = 'block';
    canvas.style.background = '#fffef7';
    canvas.style.borderRadius = '6px';
    canvas.style.minHeight = '120px';
    container.appendChild(canvas);
    melodyAppState.vexflowCanvas = canvas;
}

// 渲染用户输入的音符（Canvas版本）
function renderMelodyInput() {
    const container = document.getElementById('vexflow-container-melody');
    if (!container) return;
    ensureMelodyCanvas();
    const canvas = melodyAppState.vexflowCanvas;
    if (!canvas) return;

    const notes = melodyAppState.inputNotes;
    const dpr = window.devicePixelRatio || 1;
    const containerWidth = container.clientWidth || 780;

    // 单行横向滚动布局
    const leftMargin = 150;
    const rightMargin = 40;
    const noteSpacing = 50; // 每个音符占用的水平间距
    const staffTopY = 50;
    const lineSpacing = 12;
    const paddingTop = 20;
    const paddingBottom = 20;
    const cssHeight = paddingTop + staffTopY + 4 * lineSpacing + 60 + paddingBottom; // 谱表+符干/符尾空间

    // 画布宽度：至少撑满容器，音符多时自动加宽
    const notesWidth = notes.length > 0 ? notes.length * noteSpacing : 0;
    const cssWidth = Math.max(containerWidth, leftMargin + notesWidth + rightMargin);

    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;
    canvas.style.width = cssWidth + 'px';
    canvas.style.height = cssHeight + 'px';

    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    // 背景
    ctx.fillStyle = '#fffef7';
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    // 绘制五线谱（单行）
    drawStaffLines(ctx, 60, paddingTop + staffTopY, cssWidth - 80, lineSpacing);
    drawClef(ctx, 60, paddingTop + staffTopY, paddingTop + staffTopY, 'treble', lineSpacing);
    if (melodyAppState.selectedTimeSignature) {
        drawTimeSignature(ctx, melodyAppState.selectedTimeSignature, 110, paddingTop + staffTopY, lineSpacing);
    }
    if (melodyAppState.selectedKey) {
        drawKeySignature(ctx, melodyAppState.selectedKey, 140, paddingTop + staffTopY);
    }

    // 绘制音符
    if (notes.length === 0) {
        ctx.fillStyle = '#999';
        ctx.font = '14px sans-serif';
        ctx.fillText('请选择音高和时值后点击"添加音符"', 160, paddingTop + staffTopY + 40);
        return;
    }

    const startX = leftMargin;
    const actualStaffTopY = paddingTop + staffTopY;

    // 计算连音组及符干方向
    const timeSig = melodyAppState.selectedTimeSignature;
    const beamGroups = calculateBeamGroups(notes, timeSig);
    const beamedNoteSet = new Set();
    const beamGroupDirs = {}; // noteIdx -> 'up'/'down'
    const beamYMap = {}; // noteIdx -> beamY (横梁Y坐标，用于符干弹性延长)
    beamGroups.forEach(g => {
        g.forEach(idx => beamedNoteSet.add(idx));
        const avgPos = g.reduce((s, idx) => s + noteToStaffPosition(notes[idx].pitch), 0) / g.length;
        const dir = avgPos <= 4 ? 'up' : 'down';
        g.forEach(idx => beamGroupDirs[idx] = dir);

        // 计算每个音符的beamY（与drawBeams一致，支持斜向横梁）
        const stemUp = dir === 'up';
        const beamOffset = stemUp ? -3.5 * lineSpacing : 3.5 * lineSpacing;
        const stemTops = g.map(idx => {
            const note = notes[idx];
            const durKey = note.duration.replace('.', '');
            const durInfo = DURATION_INFO[durKey] || DURATION_INFO['q'];
            const pos = noteToStaffPosition(note.pitch);
            const noteY = actualStaffTopY + (8 - pos) * (lineSpacing / 2);
            return {
                x: startX + idx * noteSpacing + (stemUp ? durInfo.headW : -durInfo.headW),
                y: noteY + beamOffset
            };
        });

        // 找极值音符索引
        const extremeIdx = stemUp
            ? stemTops.reduce((best, p, i) => p.y < stemTops[best].y ? i : best, 0)
            : stemTops.reduce((best, p, i) => p.y > stemTops[best].y ? i : best, 0);
        const isSlanted = extremeIdx === 0 || extremeIdx === stemTops.length - 1;

        if (!isSlanted) {
            const flatBeamY = stemTops[extremeIdx].y;
            g.forEach(idx => { beamYMap[idx] = flatBeamY; });
        } else {
            const startNote = stemTops[extremeIdx];
            const endNote = stemTops[extremeIdx === 0 ? stemTops.length - 1 : 0];
            g.forEach((idx, i) => {
                const t = (stemTops[i].x - startNote.x) / (endNote.x - startNote.x);
                beamYMap[idx] = startNote.y + (endNote.y - startNote.y) * t;
            });
        }
    });

    // 绘制音符（连音的音符跳过单独旗绘制，使用组方向）
    notes.forEach((note, noteIdx) => {
        const noteX = startX + noteIdx * noteSpacing;
        drawMelodyNote(ctx, noteX, note, actualStaffTopY, lineSpacing, beamedNoteSet.has(noteIdx), beamGroupDirs[noteIdx] || null, beamYMap[noteIdx] || null);
    });

    // 绘制连音横梁
    drawBeams(ctx, notes, beamGroups, startX, noteSpacing, actualStaffTopY, lineSpacing);

    // 绘制小节线
    drawBarLines(ctx, notes, startX, noteSpacing, actualStaffTopY, lineSpacing, timeSig);
}

// 绘制五线谱线
function drawStaffLines(ctx, x, topY, width, lineSpacing) {
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
        const y = topY + i * lineSpacing;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.stroke();
    }
    // 左边竖线
    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x, topY + 4 * lineSpacing);
    ctx.stroke();
    // 右边竖线
    ctx.beginPath();
    ctx.moveTo(x + width, topY);
    ctx.lineTo(x + width, topY + 4 * lineSpacing);
    ctx.stroke();
}

// 绘制谱号
function drawClef(ctx, x, y, staffTopY, type, lineSpacing) {
    ctx.save();
    ctx.font = "128px 'Times New Roman', serif";
    ctx.fillStyle = '#222';
    ctx.textBaseline = 'middle';
    if (type === 'treble') {
        // 高音谱号 𝄞
        const clefY = staffTopY + (lineSpacing || 12) + 14; // 第二线
        ctx.fillText('\u{1D11E}', x + 5, clefY);
    }
    ctx.restore();
}

// 绘制拍号（拍号中心位于三线）
function drawTimeSignature(ctx, timeSig, x, staffTopY, lineSpacing) {
    const [beats, beatType] = timeSig.split('/');
    const thirdLineY = staffTopY + 2 * lineSpacing;
    ctx.save();
    ctx.font = 'bold 32px serif';
    ctx.fillStyle = '#222';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const fontSize = 32;
    const gap = 2;
    ctx.fillText(beats, x, thirdLineY - fontSize / 2 - gap / 2);
    ctx.fillText(beatType, x, thirdLineY + fontSize / 2 + gap / 2);
    ctx.restore();
}

// 调性级别映射表
// 级别 → { keys: 该级别包含的调, drawKey: 用于绘制调号的代表调, name: 级别名称 }
const KEY_LEVEL_MAP = {
    '1': { keys: ['C', 'a'], drawKey: 'C', name: '无升降号调' },
    '2': { keys: ['G', 'e'], drawKey: 'G', name: '一升调' },
    '3': { keys: ['F', 'd'], drawKey: 'F', name: '一降调' },
    '4': { keys: ['D'], drawKey: 'D', name: '两升调' },
    '5': { keys: ['Bb'], drawKey: 'Bb', name: '两降调' },
    '6': { keys: ['A'], drawKey: 'A', name: '三升调' },
    '7': { keys: ['Eb'], drawKey: 'Eb', name: '三降调' },
    '8': { keys: ['C', 'G', 'D', 'A', 'F', 'Bb', 'Eb', 'a', 'e', 'd'], drawKey: null, name: '随机调（综合）' }
};

// 调性 → 级别 反查表
const KEY_TO_LEVEL = {
    'C': '1', 'a': '1',
    'G': '2', 'e': '2',
    'F': '3', 'd': '3',
    'D': '4',
    'Bb': '5',
    'A': '6',
    'Eb': '7'
};

// 绘制调性记号（简化版：C大调不显示）
// 支持传入级别编号（1-8）或传统调名（C, G, a等）
function drawKeySignature(ctx, key, x, staffTopY) {
    // 级别编号转换为代表调
    if (KEY_LEVEL_MAP[key]) {
        key = KEY_LEVEL_MAP[key].drawKey;
        if (!key) return; // 8级随机调不绘制调号
    }
    // C大调 / a小调 无升降号
    if (key === 'C' || key === 'a') return;
    const sharpKeys = { 'G': 1, 'D': 2, 'A': 3, 'E': 4 };
    const flatKeys = { 'F': 1, 'Bb': 2, 'Eb': 3 };
    const sharps = sharpKeys[key] || 0;
    const flats = flatKeys[key] || 0;

    if (sharps > 0) {
        ctx.save();
        ctx.font = "16px 'Times New Roman', serif";
        ctx.fillStyle = '#222';
        ctx.textAlign = 'center';
        const sharpPositions = [4, 1, 3, 0, 2]; // 升号在五线谱上的位置
        for (let i = 0; i < sharps; i++) {
            const pos = sharpPositions[i];
            const y = staffTopY + pos * 6;
            ctx.fillText('♯', x + i * 14, y);
        }
        ctx.restore();
    } else if (flats > 0) {
        ctx.save();
        ctx.font = "16px 'Times New Roman', serif";
        ctx.fillStyle = '#222';
        ctx.textAlign = 'center';
        const flatPositions = [1, 3];
        for (let i = 0; i < flats; i++) {
            const pos = flatPositions[i] || 4;
            const y = staffTopY + pos * 6;
            ctx.fillText('♭', x + i * 14, y);
        }
        ctx.restore();
    }
}

// 绘制单个音符（带时值处理）
// stemDir: null=自动, 'up'=强制向上, 'down'=强制向下（用于连音组统一方向）
// beamY: 连音组横梁的Y坐标（null=不延伸），用于让组内所有符干紧贴横梁
function drawMelodyNote(ctx, x, note, staffTopY, lineSpacing, isBeamed = false, stemDir = null, beamY = null) {
    const position = noteToStaffPosition(note.pitch);
    // 计算音符Y坐标（高音谱表）
    // 五条线从上到下：F5 D5 B4 G4 E4（position 8 6 4 2 0）
    // position 0 = E4 (最底下线), Y = staffTopY + 4*lineSpacing
    // position 8 = F5 (最顶上线), Y = staffTopY
    // position 2 = G4 (第二线), Y = staffTopY + 3*lineSpacing
    const noteY = staffTopY + (8 - position) * (lineSpacing / 2);
    const isOnLine = position % 2 === 0;

    // 绘制加线
    drawLedgerLines(ctx, x, noteY, position, staffTopY, lineSpacing);

    // 获取时值信息
    const durInfo = DURATION_INFO[note.duration.replace('.', '')] || DURATION_INFO['q'];

    // 绘制符头
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, noteY, durInfo.headW, durInfo.headH, -0.3, 0, 2 * Math.PI);
    if (durInfo.fill === 'solid') {
        ctx.fillStyle = '#222';
        ctx.fill();
    } else {
        ctx.fillStyle = 'transparent';
        ctx.fill();
    }
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();

    // 绘制附点：
    //  - 间上的音符：附点保留在本间中心 noteY
    //  - 线上的音符：附点放入该线视觉上方一间（屏幕Y更小的方向），避免压到谱线
    //      例外：第五线 (position == 8 谱表最顶线 F5) 放入下方一间，保持在五谱线范围内不外飘
    if (note.dots) {
        ctx.fillStyle = '#222';
        for (let d = 0; d < note.dots; d++) {
            let dotY;
            if (!isOnLine) {
                dotY = noteY;
            } else if (position === 8) {
                dotY = noteY + lineSpacing / 4;
            } else {
                dotY = noteY - lineSpacing / 4;
            }
            ctx.beginPath();
            ctx.arc(x + durInfo.headW + 4 + d * 8, dotY, 2, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // 绘制符干
    if (durInfo.stem) {
        // 符干方向：符头低于三线(position<4)向上→符干在右侧；高于三线(position>4)向下→符干在左侧；三线默认向上
        const stemUp = stemDir === 'up' ? true : stemDir === 'down' ? false : position <= 4;
        const stemX = stemUp ? x + durInfo.headW : x - durInfo.headW;
        // 连音组内的音符：符干延伸至横梁高度（弹性延长，紧贴横梁）
        // 非连音或无beamY：使用默认长度
        const stemEnd = (isBeamed && beamY !== null)
            ? beamY
            : (stemUp ? noteY - 3.5 * lineSpacing : noteY + 3.5 * lineSpacing);
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(stemX, noteY);
        ctx.lineTo(stemX, stemEnd);
        ctx.stroke();
    }

    // 绘制旗（连音时不绘制单独的旗，由 drawBeams 统一绘制横梁）
    if (durInfo.flag > 0 && !isBeamed) {
        const stemUp = stemDir === 'up' ? true : stemDir === 'down' ? false : position <= 4;
        const stemEndX = stemUp ? x + durInfo.headW : x - durInfo.headW;
        const flagY = stemUp ? noteY - 3.5 * lineSpacing : noteY + 3.5 * lineSpacing;
        ctx.fillStyle = '#222';
        ctx.beginPath();
        if (stemUp) {
            // 旗向上：从符干顶部向右下弯曲
            ctx.moveTo(stemEndX, flagY);
            ctx.quadraticCurveTo(stemEndX + 15, flagY + 8, stemEndX + 12, flagY + 20);
            if (durInfo.flag === 2) {
                ctx.moveTo(stemEndX, flagY + 12);
                ctx.quadraticCurveTo(stemEndX + 18, flagY + 20, stemEndX + 15, flagY + 32);
            }
        } else {
            // 旗向下：从符干底部向右上弯曲
            ctx.moveTo(stemEndX, flagY);
            ctx.quadraticCurveTo(stemEndX + 15, flagY - 8, stemEndX + 12, flagY - 20);
            if (durInfo.flag === 2) {
                ctx.moveTo(stemEndX, flagY - 12);
                ctx.quadraticCurveTo(stemEndX + 18, flagY - 20, stemEndX + 15, flagY - 32);
            }
        }
        ctx.fill();
    }

    // 绘制变音记号
    if (note.pitch.includes('#')) {
        ctx.save();
        ctx.font = "bold 14px 'Times New Roman', serif";
        ctx.fillStyle = '#222';
        ctx.textBaseline = 'middle';
        ctx.fillText('♯', x - 18, noteY);
        ctx.restore();
    } else if (note.pitch.includes('b')) {
        ctx.save();
        ctx.font = "bold 14px 'Times New Roman', serif";
        ctx.fillStyle = '#222';
        ctx.textBaseline = 'middle';
        ctx.fillText('♭', x - 18, noteY);
        ctx.restore();
    }
}

// 绘制加线
function drawLedgerLines(ctx, x, noteY, position, staffTopY, lineSpacing) {
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;

    // 上方加线（position > 8：谱表上方，音更高，屏幕Y更小）
    // 例如 position=10 (A5) 需要 上加一线
    if (position > 8) {
        for (let p = 10; p <= position; p += 2) {
            const ly = staffTopY + (8 - p) * (lineSpacing / 2);
            ctx.beginPath();
            ctx.moveTo(x - 14, ly);
            ctx.lineTo(x + 14, ly);
            ctx.stroke();
        }
    }
    // 下方加线（position < 0：谱表下方，音更低，屏幕Y更大）
    // 例如 position=-2 (C4) 需要 下加一线
    if (position < 0) {
        for (let p = -2; p >= position; p -= 2) {
            const ly = staffTopY + (8 - p) * (lineSpacing / 2);
            ctx.beginPath();
            ctx.moveTo(x - 14, ly);
            ctx.lineTo(x + 14, ly);
            ctx.stroke();
        }
    }
}

// ==================== 连音横梁与小节线 ====================

// 计算连音组：将同一拍内的八分/十六分/三连音音符分组（支持混合时值：切分、附点、三连音等）
function calculateBeamGroups(notes, timeSignature) {
    let beatUnit = 1.0; // 默认每拍 = 1个四分音符
    if (timeSignature) {
        const beatType = parseInt(timeSignature.split('/')[1]);
        if (beatType === 8) beatUnit = 1.5; // 拍子单位为附点四分（如6/8）
    }

    // 预计算每个音符的拍位和时值
    let cumulativeBeats = 0;
    const noteBeatInfo = notes.map(note => {
        const dur = note.duration.replace('.', '');
        const isBeamable = dur === '8' || dur === '16' || dur === 'triplet';
        const noteBeats = getNoteBeatsForDuration(note.duration, note.dots);
        const beatNum = Math.floor(cumulativeBeats / beatUnit + 0.001);
        cumulativeBeats += noteBeats;
        return { isBeamable, beatNum, dur };
    });

    const groups = [];
    let currentGroup = [];

    for (let i = 0; i < noteBeatInfo.length; i++) {
        const info = noteBeatInfo[i];
        if (info.isBeamable) {
            if (currentGroup.length === 0) {
                currentGroup.push(i);
            } else {
                const prev = noteBeatInfo[currentGroup[currentGroup.length - 1]];
                // 同一拍内的可连音音符都连音（不再要求时值相同）
                if (info.beatNum === prev.beatNum) {
                    currentGroup.push(i);
                } else {
                    if (currentGroup.length >= 2) groups.push([...currentGroup]);
                    currentGroup = [i];
                }
            }
        } else {
            if (currentGroup.length >= 2) groups.push([...currentGroup]);
            currentGroup = [];
        }
    }
    if (currentGroup.length >= 2) groups.push([...currentGroup]);
    return groups;
}

// 绘制连音横梁
// 规则：
// - 主横梁：水平（最高音在中间）或斜向（最高音在两侧）
// - 第二横梁：与主横梁平行
// - 连续16分音符的第二横梁贯穿不断开；单个16分音符的第二横梁为短横
// - 横梁边缘对齐符干末端，无缝紧贴
function drawBeams(ctx, notes, beamGroups, startX, noteSpacing, staffTopY, lineSpacing) {
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 6;
    ctx.lineCap = 'butt';
    const beamHalfW = ctx.lineWidth / 2;

    beamGroups.forEach(group => {
        const avgPos = group.reduce((s, idx) => s + noteToStaffPosition(notes[idx].pitch), 0) / group.length;
        const stemUp = avgPos <= 4;
        const beamOffset = stemUp ? -3.5 * lineSpacing : 3.5 * lineSpacing;
        const secondBeamGap = stemUp ? 10 : -10;

        // 获取每个音符的符干顶部坐标
        const stemTops = group.map(idx => {
            const note = notes[idx];
            const durKey = note.duration.replace('.', '');
            const durInfo = DURATION_INFO[durKey] || DURATION_INFO['q'];
            const pos = noteToStaffPosition(note.pitch);
            const noteY = staffTopY + (8 - pos) * (lineSpacing / 2);
            return {
                x: startX + idx * noteSpacing + (stemUp ? durInfo.headW : -durInfo.headW),
                y: noteY + beamOffset,
                level: durKey === '16' ? 2 : (durKey === '8' || durKey === 'triplet' ? 1 : 0)
            };
        });

        // 找组内极值音符索引（最高/最低音）
        const extremeIdx = stemUp
            ? stemTops.reduce((best, p, i) => p.y < stemTops[best].y ? i : best, 0)
            : stemTops.reduce((best, p, i) => p.y > stemTops[best].y ? i : best, 0);

        // 判断主横梁是否斜向：极值音符在组的两端
        const isSlanted = extremeIdx === 0 || extremeIdx === stemTops.length - 1;

        // 计算每个音符的beamY（符干末端Y）
        // 水平：所有音符共用极值Y；斜向：按X线性插值
        let beamYPerNote;
        if (!isSlanted) {
            const flatBeamY = stemTops[extremeIdx].y;
            beamYPerNote = stemTops.map(() => flatBeamY);
        } else {
            const startNote = stemTops[extremeIdx];
            const endNote = stemTops[extremeIdx === 0 ? stemTops.length - 1 : 0];
            beamYPerNote = stemTops.map(p => {
                const t = (p.x - startNote.x) / (endNote.x - startNote.x);
                return startNote.y + (endNote.y - startNote.y) * t;
            });
        }

        // 主横梁绘制路径
        const first = stemTops[0];
        const last = stemTops[stemTops.length - 1];

        if (!isSlanted) {
            // 水平横梁
            const beamY = beamYPerNote[0];
            const mainStrokeY = stemUp ? beamY + beamHalfW : beamY - beamHalfW;
            ctx.beginPath();
            ctx.moveTo(first.x, mainStrokeY);
            ctx.lineTo(last.x, mainStrokeY);
            ctx.stroke();
        } else {
            // 斜向横梁：从极值音符符干顶端连到对端音符符干顶端
            const startNote = stemTops[extremeIdx];
            const endNote = stemTops[extremeIdx === 0 ? stemTops.length - 1 : 0];
            const startStrokeY = stemUp ? startNote.y + beamHalfW : startNote.y - beamHalfW;
            const endStrokeY = stemUp ? endNote.y + beamHalfW : endNote.y - beamHalfW;
            ctx.beginPath();
            ctx.moveTo(startNote.x, startStrokeY);
            ctx.lineTo(endNote.x, endStrokeY);
            ctx.stroke();
        }

        // 计算每个音符的beamLevel
        const levels = stemTops.map(p => p.level);

        // 第二横梁（level 2）：与主横梁平行
        // 找出连续level>=2子分组，每组绘制一条连续横梁
        const subGroups = [];
        let subStart = -1;
        for (let i = 0; i < stemTops.length; i++) {
            if (levels[i] >= 2) {
                if (subStart === -1) subStart = i;
            } else {
                if (subStart !== -1) {
                    subGroups.push({ start: subStart, end: i - 1 });
                    subStart = -1;
                }
            }
        }
        if (subStart !== -1) {
            subGroups.push({ start: subStart, end: stemTops.length - 1 });
        }

        subGroups.forEach(sub => {
            if (sub.start === sub.end) {
                // 单个16分音符：绘制短横梁
                const cur = stemTops[sub.start];
                const leftX = sub.start > 0 ? (stemTops[sub.start - 1].x + cur.x) / 2 : cur.x;
                const rightX = sub.start < stemTops.length - 1 ? (cur.x + stemTops[sub.start + 1].x) / 2 : cur.x;

                // 在该X位置处的主横梁Y + 偏移
                const midX = (leftX + rightX) / 2;
                const subBeamY = getBeamYAtX(midX, beamYPerNote, stemTops);
                const secondStrokeY = stemUp ? subBeamY + secondBeamGap + beamHalfW
                    : subBeamY + secondBeamGap - beamHalfW;
                ctx.beginPath();
                ctx.moveTo(leftX, secondStrokeY);
                ctx.lineTo(rightX, secondStrokeY);
                ctx.stroke();
            } else {
                // 多个连续16分音符：绘制贯穿的横梁
                const subFirst = stemTops[sub.start];
                const subLast = stemTops[sub.end];

                // 在首尾X处分别计算主横梁Y + secondBeamGap
                const firstBeamY = getBeamYAtX(subFirst.x, beamYPerNote, stemTops) + secondBeamGap;
                const lastBeamY = getBeamYAtX(subLast.x, beamYPerNote, stemTops) + secondBeamGap;
                const firstStrokeY = stemUp ? firstBeamY + beamHalfW : firstBeamY - beamHalfW;
                const lastStrokeY = stemUp ? lastBeamY + beamHalfW : lastBeamY - beamHalfW;
                ctx.beginPath();
                ctx.moveTo(subFirst.x, firstStrokeY);
                ctx.lineTo(subLast.x, lastStrokeY);
                ctx.stroke();
            }
        });

        // 三连音数字
        const hasTriplet = group.some(idx => notes[idx].duration.replace('.', '') === 'triplet');
        if (hasTriplet) {
            const midIdx = group[Math.floor(group.length / 2)];
            const mid = stemTops[group.indexOf(midIdx)] || stemTops[0];
            const midBeamY = getBeamYAtX(mid.x, beamYPerNote, stemTops);
            const numY = stemUp ? midBeamY - 12 : midBeamY + 18;
            ctx.save();
            ctx.font = 'bold 14px serif';
            ctx.fillStyle = '#222';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('3', mid.x, numY);
            ctx.restore();
        }
    });
}

// 辅助函数：根据X位置获取横梁Y坐标（线性插值）
function getBeamYAtX(x, beamYPerNote, stemTops) {
    if (stemTops.length === 1) return beamYPerNote[0];
    // 找到x所在的区间
    for (let i = 0; i < stemTops.length - 1; i++) {
        if (x >= stemTops[i].x && x <= stemTops[i + 1].x) {
            const t = (x - stemTops[i].x) / (stemTops[i + 1].x - stemTops[i].x);
            return beamYPerNote[i] + (beamYPerNote[i + 1] - beamYPerNote[i]) * t;
        }
    }
    // 超出范围，返回最近的
    if (x < stemTops[0].x) return beamYPerNote[0];
    return beamYPerNote[beamYPerNote.length - 1];
}

// 绘制小节线
function drawBarLines(ctx, notes, startX, noteSpacing, staffTopY, lineSpacing, timeSignature) {
    if (!timeSignature) return;
    const [beats, beatType] = timeSignature.split('/').map(Number);
    // 每小节的拍数（以四分音符为1拍）
    const measureBeats = beatType === 8 ? beats * 0.5 : beats;

    let cumulativeBeats = 0;
    for (let i = 0; i < notes.length - 1; i++) {
        const noteBeats = getNoteBeatsForDuration(notes[i].duration, notes[i].dots);
        cumulativeBeats += noteBeats;

        const remainder = cumulativeBeats % measureBeats;
        if (remainder < 0.01 || remainder > measureBeats - 0.01) {
            const barX = startX + (i + 0.5) * noteSpacing;
            ctx.strokeStyle = '#777';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(barX, staffTopY);
            ctx.lineTo(barX, staffTopY + 4 * lineSpacing);
            ctx.stroke();
        }
    }
}

// 渲染正确答案（Canvas版，当OSMD不可用时使用）
function renderMelodyAnswerCanvas(melody, container) {
    if (!container) return;
    container.innerHTML = '';

    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.background = '#fffef7';
    canvas.style.borderRadius = '6px';
    canvas.style.minHeight = '120px';
    container.appendChild(canvas);

    const notes = melody.notes;
    const dpr = window.devicePixelRatio || 1;
    const containerWidth = container.clientWidth - 20 || 760;

    // 单行横向滚动布局
    const leftMargin = 150;
    const rightMargin = 40;
    const noteSpacing = 50;
    const staffTopY = 50;
    const lineSpacing = 12;
    const paddingTop = 20;
    const paddingBottom = 20;
    const cssHeight = paddingTop + staffTopY + 4 * lineSpacing + 60 + paddingBottom;

    const notesWidth = notes.length > 0 ? notes.length * noteSpacing : 0;
    const cssWidth = Math.max(containerWidth, leftMargin + notesWidth + rightMargin);

    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;
    canvas.style.width = cssWidth + 'px';
    canvas.style.height = cssHeight + 'px';

    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    ctx.fillStyle = '#fffef7';
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    const actualStaffTopY = paddingTop + staffTopY;
    drawStaffLines(ctx, 60, actualStaffTopY, cssWidth - 80, lineSpacing);
    drawClef(ctx, 60, actualStaffTopY, actualStaffTopY, 'treble', lineSpacing);

    if (melody.timeSignature) {
        drawTimeSignature(ctx, melody.timeSignature, 110, actualStaffTopY, lineSpacing);
    }
    if (melody.key) {
        drawKeySignature(ctx, melody.key, 140, actualStaffTopY);
    }

    const startX = leftMargin;

    // 计算连音组及符干方向
    const beamGroups = calculateBeamGroups(notes, melody.timeSignature);
    const beamedNoteSet = new Set();
    const beamGroupDirs = {};
    const beamYMap = {};
    beamGroups.forEach(g => {
        g.forEach(idx => beamedNoteSet.add(idx));
        const avgPos = g.reduce((s, idx) => s + noteToStaffPosition(notes[idx].pitch), 0) / g.length;
        const dir = avgPos <= 4 ? 'up' : 'down';
        g.forEach(idx => beamGroupDirs[idx] = dir);

        // 计算每个音符的beamY（支持斜向横梁）
        const stemUp = dir === 'up';
        const beamOffset = stemUp ? -3.5 * lineSpacing : 3.5 * lineSpacing;
        const stemTops = g.map(idx => {
            const note = notes[idx];
            const durKey = note.duration.replace('.', '');
            const durInfo = DURATION_INFO[durKey] || DURATION_INFO['q'];
            const pos = noteToStaffPosition(note.pitch);
            const noteY = actualStaffTopY + (8 - pos) * (lineSpacing / 2);
            return {
                x: startX + idx * noteSpacing + (stemUp ? durInfo.headW : -durInfo.headW),
                y: noteY + beamOffset
            };
        });

        const extremeIdx = stemUp
            ? stemTops.reduce((best, p, i) => p.y < stemTops[best].y ? i : best, 0)
            : stemTops.reduce((best, p, i) => p.y > stemTops[best].y ? i : best, 0);
        const isSlanted = extremeIdx === 0 || extremeIdx === stemTops.length - 1;

        if (!isSlanted) {
            const flatBeamY = stemTops[extremeIdx].y;
            g.forEach(idx => { beamYMap[idx] = flatBeamY; });
        } else {
            const startNote = stemTops[extremeIdx];
            const endNote = stemTops[extremeIdx === 0 ? stemTops.length - 1 : 0];
            g.forEach((idx, i) => {
                const t = (stemTops[i].x - startNote.x) / (endNote.x - startNote.x);
                beamYMap[idx] = startNote.y + (endNote.y - startNote.y) * t;
            });
        }
    });

    // 绘制音符
    notes.forEach((note, noteIdx) => {
        const noteX = startX + noteIdx * noteSpacing;
        drawMelodyNote(ctx, noteX, note, actualStaffTopY, lineSpacing, beamedNoteSet.has(noteIdx), beamGroupDirs[noteIdx] || null, beamYMap[noteIdx] || null);
    });

    // 绘制连音横梁
    drawBeams(ctx, notes, beamGroups, startX, noteSpacing, actualStaffTopY, lineSpacing);

    // 绘制小节线
    drawBarLines(ctx, notes, startX, noteSpacing, actualStaffTopY, lineSpacing, melody.timeSignature);
}

// 添加音符
function addMelodyNote() {
    if (!melodyAppState.currentPitch) {
        updateMelodyStatus('请先在钢琴键盘上选择音高');
        return;
    }
    const note = {
        pitch: melodyAppState.currentPitch,
        duration: melodyAppState.currentDuration,
        dots: melodyAppState.currentDots
    };
    melodyAppState.inputNotes.push(note);
    renderMelodyInput();
    updateMelodyStatus(`已添加音符: ${note.pitch} (${MELODY_DURATION_DESC[note.duration] || note.duration})，共${melodyAppState.inputNotes.length}个音符`);
}

// 删除末音
function deleteLastMelodyNote() {
    if (melodyAppState.inputNotes.length === 0) {
        updateMelodyStatus('没有可删除的音符');
        return;
    }
    melodyAppState.inputNotes.pop();
    renderMelodyInput();
    updateMelodyStatus(`已删除末音，剩余${melodyAppState.inputNotes.length}个音符`);
}

// 清空音符
function clearMelodyNotes() {
    melodyAppState.inputNotes = [];
    renderMelodyInput();
    updateMelodyStatus('已清空所有音符');
}

// 预置曲目文件列表（放在melodies/文件夹下，同时嵌入XML数据作为file://协议的兜底）
const PRESET_MELODY_FILES = [
    {
        file: 'melodies/c_major_etude.xml', title: 'C大调练习曲', key: 'C', keyName: 'C大调',
        xmlContent: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <part-list><score-part id="P1"><part-name>C大调练习曲</part-name></score-part></part-list>
  <part id="P1">
    <measure number="1"><attributes><divisions>4</divisions><key><fifths>0</fifths></key><time><beats>4</beats><beat-type>4</beat-type></time><clef><sign>G</sign><line>2</line></clef></attributes>
      <note><pitch><step>C</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="2"><note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>C</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="3"><note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="4"><note><pitch><step>C</step><octave>5</octave></pitch><duration>8</duration><type>half</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>8</duration><type>half</type></note></measure>
    <measure number="5"><note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>C</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="6"><note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>B</step><octave>3</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="7"><note><pitch><step>C</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="8"><note><pitch><step>C</step><octave>4</octave></pitch><duration>16</duration><type>whole</type></note>
      <barline location="right"><bar-style>light-heavy</bar-style></barline></measure>
  </part>
</score-partwise>`
    },
    {
        file: 'melodies/g_major_folk.xml', title: 'G大调民谣', key: 'G', keyName: 'G大调',
        xmlContent: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <part-list><score-part id="P1"><part-name>G大调民谣</part-name></score-part></part-list>
  <part id="P1">
    <measure number="1"><attributes><divisions>4</divisions><key><fifths>1</fifths></key><time><beats>4</beats><beat-type>4</beat-type></time><clef><sign>G</sign><line>2</line></clef></attributes>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="2"><note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>C</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>C</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="3"><note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="4"><note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>F</step><alter>1</alter><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="5"><note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>G</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="6"><note><pitch><step>C</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>F</step><alter>1</alter><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="7"><note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="8"><note><pitch><step>G</step><octave>4</octave></pitch><duration>16</duration><type>whole</type></note>
      <barline location="right"><bar-style>light-heavy</bar-style></barline></measure>
  </part>
</score-partwise>`
    },
    {
        file: 'melodies/a_minor_melody.xml', title: 'a小调旋律', key: 'a', keyName: 'a小调',
        xmlContent: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <part-list><score-part id="P1"><part-name>a小调旋律</part-name></score-part></part-list>
  <part id="P1">
    <measure number="1"><attributes><divisions>4</divisions><key><fifths>0</fifths></key><time><beats>3</beats><beat-type>4</beat-type></time><clef><sign>G</sign><line>2</line></clef></attributes>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>C</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="2"><note><pitch><step>D</step><octave>5</octave></pitch><duration>8</duration><type>half</type></note>
      <note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="3"><note><pitch><step>C</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>A</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="4"><note><pitch><step>G</step><octave>5</octave></pitch><duration>8</duration><type>half</type></note>
      <note><pitch><step>F</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="5"><note><pitch><step>E</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>D</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>C</step><octave>5</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="6"><note><pitch><step>B</step><octave>4</octave></pitch><duration>8</duration><type>half</type></note>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="7"><note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>B</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="8"><note><pitch><step>A</step><octave>4</octave></pitch><duration>8</duration><type>half</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="9"><note><pitch><step>A</step><octave>4</octave></pitch><duration>8</duration><type>half</type></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="10"><note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <barline location="right"><bar-style>light-heavy</bar-style></barline></measure>
  </part>
</score-partwise>`
    },
    {
        file: 'melodies/test01.musicxml', title: 'test01', key: 'C', keyName: 'C大调',
        xmlContent: `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <part-list><score-part id="P1"><part-name>test01</part-name></score-part></part-list>
  <part id="P1">
    <measure number="1"><attributes><divisions>4</divisions><key><fifths>0</fifths></key><time><beats>2</beats><beat-type>4</beat-type></time><clef><sign>G</sign><line>2</line></clef></attributes>
      <note><pitch><step>C</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>C</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="2"><note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="3"><note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>A</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="4"><note><pitch><step>G</step><octave>4</octave></pitch><duration>8</duration><type>half</type></note></measure>
    <measure number="5"><note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="6"><note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="7"><note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>G</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="8"><note><pitch><step>F</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="9"><note><pitch><step>E</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note>
      <note><pitch><step>D</step><octave>4</octave></pitch><duration>4</duration><type>quarter</type></note></measure>
    <measure number="10"><note><pitch><step>C</step><octave>4</octave></pitch><duration>8</duration><type>half</type></note>
      <barline location="right"><bar-style>light-heavy</bar-style></barline></measure>
  </part>
</score-partwise>`
    }
];

// 从melodies/文件夹加载预置曲目（尝试fetch，失败则用嵌入数据兜底）
// 曲目显示名称使用文件名（去扩展名），与文件夹内文件名保持一致
async function loadPresetMelodies() {
    melodyAppState.loadedMelodies = [];
    const selector = document.getElementById('melody-selector');
    if (!selector) return;

    selector.innerHTML = '';

    for (const preset of PRESET_MELODY_FILES) {
        let xmlText = null;
        try {
            const response = await fetch(preset.file + '?t=' + Date.now());
            if (response.ok) xmlText = await response.text();
        } catch (e) {
            // fetch失败（如file://协议），使用嵌入数据
        }
        // 兜底：使用嵌入的xmlContent
        if (!xmlText && preset.xmlContent) {
            xmlText = preset.xmlContent;
        }
        if (xmlText) {
            const melody = parseMusicXML(xmlText, preset.file);
            if (melody && melody.notes.length > 0) {
                melody.filePath = preset.file;
                melody.key = preset.key;
                melody.keyName = preset.keyName;
                melodyAppState.loadedMelodies.push(melody);
                const opt = document.createElement('option');
                opt.value = 'file_' + melody.filePath;
                // 从文件路径提取文件名（去扩展名）作为显示名
                const fileName = preset.file.split('/').pop().replace(/\.[^.]+$/, '');
                opt.textContent = fileName;
                selector.appendChild(opt);
            }
        }
    }

    // 更新信息显示
    if (melodyAppState.loadedMelodies.length > 0) {
        const fileInfo = document.getElementById('melody-file-info');
        const fileInfoText = document.getElementById('melody-file-info-text');
        if (fileInfo && fileInfoText) {
            fileInfo.style.display = 'block';
            fileInfoText.textContent = `${melodyAppState.loadedMelodies.length}首预置曲目`;
        }
    }
}

// 获取当前旋律
// 测试模式：从曲目库随机抽取；练习模式：按用户选择的曲目
function getCurrentMelody() {
    // 测试模式：随机抽取
    if (melodyAppState.currentMode === 'test') {
        const pool = melodyAppState.loadedMelodies.length > 0
            ? melodyAppState.loadedMelodies
            : MELODY_SAMPLES;
        // 避免连续抽取同一首
        let candidates = pool;
        if (melodyAppState.currentMelody && pool.length > 1) {
            candidates = pool.filter(m => m !== melodyAppState.currentMelody);
        }
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    // 练习模式：按用户选择的曲目
    const selector = document.getElementById('melody-selector');
    const value = selector ? selector.value : '0';

    if (value.startsWith('file_')) {
        const filePath = value.substring(5);
        return melodyAppState.loadedMelodies.find(m => m.filePath === filePath) || MELODY_SAMPLES[0];
    }
    if (value.startsWith('sample_')) {
        const idx = parseInt(value.substring(7));
        return MELODY_SAMPLES[idx] || MELODY_SAMPLES[0];
    }
    const idx = parseInt(value);
    return MELODY_SAMPLES[idx] || MELODY_SAMPLES[0];
}

// 随机播放旋律
async function playRandomMelody() {
    if (melodyAppState.isPlaying) return;
    try {
        await Tone.start();
        melodyAppState.isPlaying = true;
        const melody = getCurrentMelody();
        melodyAppState.currentMelody = melody;
        // 清空输入
        melodyAppState.inputNotes = [];
        melodyAppState.selectedKey = null;
        melodyAppState.selectedTimeSignature = null;
        const keySel = document.getElementById('key-selector-melody');
        const tsSel = document.getElementById('timesig-selector-melody');
        if (keySel) keySel.value = '';
        if (tsSel) tsSel.value = '';
        renderMelodyInput();
        // 隐藏答案区和评分详情
        const answerDisplay = document.getElementById('melody-answer-display');
        if (answerDisplay) answerDisplay.style.display = 'none';
        const analysisEl = document.getElementById('test-analysis-melody');
        if (analysisEl) analysisEl.style.display = 'none';

        await playMelodySequence(melody);
        updateMelodyStatus(`已播放: ${melody.title}，请逐音输入您的答案`);
    } catch (error) {
        console.error('播放旋律失败:', error);
        updateMelodyStatus('播放失败，请重试');
    } finally {
        melodyAppState.isPlaying = false;
    }
}

// 播放旋律序列
async function playMelodySequence(melody) {
    const bpm = melodyAppState.bpm || 90;
    const beatDuration = 60 / bpm;
    const beatsPerMeasure = parseInt((melody.timeSignature || '4/4').split('/')[0]) || 4;
    let currentBeat = 0; // 当前累计拍
    melodyAppState.stopRequested = false;
    for (const note of melody.notes) {
        if (melodyAppState.stopRequested) return;
        const noteBeats = getNoteBeats(note.duration, note.dots);
        const noteDuration = beatDuration * noteBeats;
        const volume = getRhythmAccentVolume(currentBeat, beatsPerMeasure, noteBeats);
        playNoteWithWebAudio(note.pitch, noteDuration, volume);
        currentBeat += noteBeats;
        await new Promise(resolve => setTimeout(resolve, noteDuration * 1000));
    }
    if (melodyAppState.stopRequested) return;
    await new Promise(resolve => setTimeout(resolve, 200));
}

// 重复播放
async function repeatMelody() {
    if (!melodyAppState.currentMelody) {
        updateMelodyStatus('请先点击"随机播放"生成题目');
        return;
    }
    if (melodyAppState.isPlaying) return;
    try {
        await Tone.start();
        melodyAppState.isPlaying = true;
        await playMelodySequence(melodyAppState.currentMelody);
        updateMelodyStatus('旋律已重复播放');
    } catch (e) {
        console.error('重复播放失败:', e);
    } finally {
        melodyAppState.isPlaying = false;
    }
}

// 提交旋律答案
function submitMelodyAnswer() {
    if (!melodyAppState.currentMelody) {
        updateMelodyStatus('请先点击"随机播放"听题');
        return;
    }
    const correctMelody = melodyAppState.currentMelody;
    const userKey = melodyAppState.selectedKey;
    const userTimeSig = melodyAppState.selectedTimeSignature;
    const userNotes = melodyAppState.inputNotes;

    if (!userKey) {
        updateMelodyStatus('请选择调');
        return;
    }
    if (!userTimeSig) {
        updateMelodyStatus('请选择拍号');
        return;
    }
    if (userNotes.length === 0) {
        updateMelodyStatus('请输入旋律音符');
        return;
    }

    // 评分
    const result = scoreMelody(userNotes, correctMelody, userKey, userTimeSig);

    // 记录学习数据
    const userLevelName = KEY_LEVEL_MAP[userKey] ? KEY_LEVEL_MAP[userKey].name : userKey;
    learningManager.recordResult('melody', {
        question: `${correctMelody.title} - ${correctMelody.keyName} ${correctMelody.timeSignature}`,
        correct: result.totalScore >= 15,
        userAnswer: `${userLevelName} ${userTimeSig} ${userNotes.map(n => n.pitch + n.duration).join(' ')}`,
        correctAnswer: `${correctMelody.keyName || correctMelody.key} ${correctMelody.timeSignature} ${correctMelody.notes.map(n => n.pitch + n.duration).join(' ')}`,
        mode: 'melody',
        difficulty: 1,
        learningMode: melodyAppState.currentMode || 'practice',
        score: result.totalScore
    });

    // 显示评分结果
    const analysisEl = document.getElementById('test-analysis-melody');
    if (analysisEl) {
        analysisEl.innerHTML = result.detailHtml;
        analysisEl.style.display = 'block';
    }

    // 渲染正确答案五线谱（在用户答案下方）
    showAnswerMelody();

    if (melodyAppState.currentMode === 'test') {
        melodyAppState.totalQuestions++;
        melodyAppState.score += result.totalScore;
        // 满分题数（20分为满分）
        if (result.totalScore >= 20) {
            melodyAppState.correct++;
        }
        // ≥70%题数（14分及以上，70% of 20 = 14）
        if (result.totalScore >= 14) {
            melodyAppState.wrong++;
        } else {
            melodyAppState.errorQuestions.push({
                correct: correctMelody,
                user: { key: userKey, timeSig: userTimeSig, notes: [...userNotes] },
                score: result.totalScore
            });
        }
        // 每题正确率 = 得分 / 20 * 100
        const questionAccuracy = (result.totalScore / 20 * 100).toFixed(1);
        melodyAppState.testAnalysis.push({
            title: correctMelody.title,
            score: result.totalScore,
            accuracy: parseFloat(questionAccuracy),
            keyCorrect: result.keyCorrect,
            timeSigCorrect: result.timeSigCorrect,
            melodyScore: result.melodyScore
        });
        updateMelodyStats();

        if (melodyAppState.totalQuestions >= 5) {
            updateMelodyStatus(`本题得分: ${result.totalScore}/20（正确率${questionAccuracy}%），测试完成！`);
            setTimeout(() => endMelodyTestMode(), 3000);
        } else {
            updateMelodyStatus(`本题得分: ${result.totalScore}/20（正确率${questionAccuracy}%），即将播放下一题...`);
            setTimeout(() => playRandomMelody(), 3000);
        }
    } else {
        updateMelodyStatus(`本题得分: ${result.totalScore}/20 (调性${result.keyScore}+拍号${result.timeSigScore}+旋律${result.melodyScore})`);
    }
}

// 旋律评分：调性1分 + 拍号1分 + 旋律18分（按小节平均）
function scoreMelody(userNotes, correctMelody, userKey, userTimeSig) {
    let keyScore = 0, timeSigScore = 0, melodyScore = 0;
    // 调性按级别判定：用户选择的级别包含正确曲目的调性即为正确
    const correctKeyLevel = KEY_TO_LEVEL[correctMelody.key] || '1';
    const keyCorrect = userKey === correctKeyLevel ||
        (userKey === '8') || // 8级随机调（综合）始终算正确
        (KEY_LEVEL_MAP[userKey] && KEY_LEVEL_MAP[userKey].keys.includes(correctMelody.key));
    const timeSigCorrect = userTimeSig === correctMelody.timeSignature;
    if (keyCorrect) keyScore = 1;
    if (timeSigCorrect) timeSigScore = 1;

    // 旋律评分：按小节平均
    const beatsPerMeasure = parseInt(correctMelody.timeSignature.split('/')[0]);
    // 将正确音符按小节分组
    const correctMeasures = groupNotesByMeasure(correctMelody.notes, beatsPerMeasure);
    const userMeasures = groupNotesByMeasure(userNotes, beatsPerMeasure);
    const measureCount = correctMeasures.length;
    const scorePerMeasure = measureCount > 0 ? 18 / measureCount : 0;
    let totalMelodyScore = 0;
    let measureDetails = [];

    for (let i = 0; i < measureCount; i++) {
        const correctMeasure = correctMeasures[i] || [];
        const userMeasure = userMeasures[i] || [];
        // 比较音高
        const correctPitches = correctMeasure.map(n => n.pitch);
        const userPitches = userMeasure.map(n => n.pitch);
        const pitchCorrect = arraysEqual(correctPitches, userPitches);
        // 比较节奏（时值序列）
        const correctRhythms = correctMeasure.map(n => n.duration + (n.dots ? '.' : ''));
        const userRhythms = userMeasure.map(n => n.duration + (n.dots ? '.' : ''));
        const rhythmCorrect = arraysEqual(correctRhythms, userRhythms);

        let measureScore = 0;
        if (pitchCorrect && rhythmCorrect) measureScore = scorePerMeasure;
        else if (pitchCorrect || rhythmCorrect) measureScore = scorePerMeasure / 2;
        else measureScore = 0;

        totalMelodyScore += measureScore;
        measureDetails.push({
            index: i + 1,
            pitchCorrect,
            rhythmCorrect,
            score: measureScore,
            correctPitches: correctPitches.join(' '),
            userPitches: userPitches.join(' ')
        });
    }
    melodyScore = Math.round(totalMelodyScore * 10) / 10;
    const totalScore = keyScore + timeSigScore + melodyScore;

    // 生成详情HTML
    const userLevelName = KEY_LEVEL_MAP[userKey] ? KEY_LEVEL_MAP[userKey].name : userKey;
    const correctLevelName = KEY_LEVEL_MAP[correctKeyLevel] ? KEY_LEVEL_MAP[correctKeyLevel].name : correctMelody.keyName || correctMelody.key;
    let detailHtml = '<div style="color:#333;font-size:14px;">';
    detailHtml += `<h4 style="color:#FFB74D;">评分详情 (总分: ${totalScore}/20)</h4>`;
    detailHtml += `<p>调: ${userLevelName} ${keyCorrect ? '✅' : '❌ (正确: ' + correctLevelName + ')'} → ${keyScore}分</p>`;
    detailHtml += `<p>拍号: ${userTimeSig} ${timeSigCorrect ? '✅' : '❌ (正确: ' + correctMelody.timeSignature + ')'} → ${timeSigScore}分</p>`;
    detailHtml += `<p>旋律: ${melodyScore}/18分</p>`;
    detailHtml += '<table style="width:100%;border-collapse:collapse;margin-top:8px;font-size:12px;">';
    detailHtml += '<tr style="background:#f0f0f0;"><th style="padding:4px;border:1px solid #ddd;">小节</th><th style="padding:4px;border:1px solid #ddd;">音高</th><th style="padding:4px;border:1px solid #ddd;">节奏</th><th style="padding:4px;border:1px solid #ddd;">得分</th></tr>';
    measureDetails.forEach(m => {
        detailHtml += `<tr><td style="padding:4px;border:1px solid #ddd;text-align:center;">${m.index}</td>`;
        detailHtml += `<td style="padding:4px;border:1px solid #ddd;text-align:center;">${m.pitchCorrect ? '✅' : '❌'}</td>`;
        detailHtml += `<td style="padding:4px;border:1px solid #ddd;text-align:center;">${m.rhythmCorrect ? '✅' : '❌'}</td>`;
        detailHtml += `<td style="padding:4px;border:1px solid #ddd;text-align:center;">${m.score.toFixed(1)}</td></tr>`;
    });
    detailHtml += '</table>';
    detailHtml += '</div>';

    return { totalScore, keyScore, timeSigScore, melodyScore, keyCorrect, timeSigCorrect, detailHtml };
}

// 将音符按小节分组
function groupNotesByMeasure(notes, beatsPerMeasure) {
    const measures = [];
    let currentMeasure = [];
    let currentBeats = 0;
    notes.forEach(note => {
        currentMeasure.push(note);
        currentBeats += getNoteBeats(note.duration, note.dots);
        if (currentBeats >= beatsPerMeasure - 0.01) {
            measures.push(currentMeasure);
            currentMeasure = [];
            currentBeats = 0;
        }
    });
    if (currentMeasure.length > 0) measures.push(currentMeasure);
    return measures;
}

// 数组相等比较
function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// 显示答案（OSMD渲染）
function showAnswerMelody() {
    if (!melodyAppState.currentMelody) {
        updateMelodyStatus('请先点击"随机播放"听题');
        return;
    }
    const answerDisplay = document.getElementById('melody-answer-display');
    const osmdContainer = document.getElementById('osmd-container-melody');
    if (!answerDisplay || !osmdContainer) return;
    answerDisplay.style.display = 'block';
    osmdContainer.innerHTML = '';

    const melody = melodyAppState.currentMelody;

    // 优先尝试OSMD，失败则使用Canvas兜底
    try {
        if (typeof opensheetmusicdisplay === 'undefined') {
            // OSMD不可用，直接用Canvas渲染正确答案
            renderMelodyAnswerCanvas(melody, osmdContainer);
            return;
        }
        const osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay(osmdContainer, {
            autoResize: true,
            backend: 'svg',
            drawTitle: true
        });
        const xml = generateMusicXML(melody);
        osmd.load(xml).then(() => {
            osmd.render();
            melodyAppState.osmd = osmd;
        }).catch(e => {
            console.warn('OSMD渲染失败，使用Canvas兜底:', e);
            renderMelodyAnswerCanvas(melody, osmdContainer);
        });
    } catch (e) {
        console.warn('OSMD初始化失败，使用Canvas兜底:', e);
        renderMelodyAnswerCanvas(melody, osmdContainer);
    }
    updateMelodyStatus('已显示正确答案');
}

// 练习模式
function startMelodyPracticeMode() {
    melodyAppState.currentMode = 'practice';
    melodyAppState.testInProgress = false;
    const practiceInstructions = document.getElementById('practice-instructions-melody');
    if (practiceInstructions) practiceInstructions.style.display = 'block';
    const statsPanel = document.getElementById('stats-panel-melody');
    if (statsPanel) statsPanel.style.display = 'none';
    const timePanel = document.getElementById('time-panel-melody');
    if (timePanel) timePanel.style.display = 'none';
    const endTestBtn = document.getElementById('end-test-btn-melody');
    if (endTestBtn) endTestBtn.style.display = 'none';
    const testEndContent = document.getElementById('melody-test-end-content');
    if (testEndContent) testEndContent.style.display = 'none';
    const leaderboardContent = document.getElementById('leaderboard-content-melody');
    if (leaderboardContent) leaderboardContent.style.display = 'none';
    const practiceContent = document.getElementById('practice-test-content-melody');
    if (practiceContent) practiceContent.style.display = 'block';
    // 练习模式：启用曲目选择
    const melodySelector = document.getElementById('melody-selector');
    if (melodySelector) melodySelector.disabled = false;
    // 恢复钢琴等控件显示
    const pianoContainer = document.getElementById('piano-container-melody');
    if (pianoContainer) pianoContainer.style.display = 'block';
    const playControls = document.getElementById('play-controls-melody');
    if (playControls) playControls.style.display = 'flex';
    updateMelodyButtonStates();
    updateMelodyStatus('练习模式：可自选曲目，可重复播放，点击琴键有声音，可显示答案');
}

// 测试模式
function startMelodyTestMode() {
    if (!melodyAppState.userInfo.saved) {
        userManager.showSaveStatus('未保存学生信息（可跳过）', 'error');
        setTimeout(() => userManager.hideSaveStatus(), 1800);
    }
    melodyAppState.currentMode = 'test';
    melodyAppState.testInProgress = true;
    melodyAppState.score = 0;
    melodyAppState.correct = 0;
    melodyAppState.wrong = 0;
    melodyAppState.totalQuestions = 0;
    melodyAppState.errorQuestions = [];
    melodyAppState.testAnalysis = [];
    melodyAppState.testStartTime = new Date();

    const practiceInstructions = document.getElementById('practice-instructions-melody');
    if (practiceInstructions) practiceInstructions.style.display = 'none';
    const statsPanel = document.getElementById('stats-panel-melody');
    if (statsPanel) statsPanel.style.display = 'flex';
    const timePanel = document.getElementById('time-panel-melody');
    if (timePanel) timePanel.style.display = 'block';
    const testEndContent = document.getElementById('melody-test-end-content');
    if (testEndContent) testEndContent.style.display = 'none';
    const leaderboardContent = document.getElementById('leaderboard-content-melody');
    if (leaderboardContent) leaderboardContent.style.display = 'none';
    const endTestBtn = document.getElementById('end-test-btn-melody');
    if (endTestBtn) endTestBtn.style.display = 'block';

    startMelodyElapsedTimeTimer();
    startTimeUpdateMelody();
    updateMelodyStats();
    updateMelodyButtonStates();
    // 测试模式：禁用曲目选择（由系统随机抽取）
    const melodySelector = document.getElementById('melody-selector');
    if (melodySelector) melodySelector.disabled = true;
    playRandomMelody();
    updateMelodyStatus('测试已开始，系统随机抽题，请认真听题并作答');
}

// 结束测试模式
function endMelodyTestMode() {
    // 立即停止所有音频播放
    stopMelodyAudio();

    melodyAppState.currentMode = 'practice';
    melodyAppState.testInProgress = false;
    melodyAppState.testEndTime = new Date();
    const endBtn = document.getElementById('end-test-btn-melody');
    if (endBtn) endBtn.style.display = 'none';
    const statsPanel = document.getElementById('stats-panel-melody');
    if (statsPanel) statsPanel.style.display = 'none';
    const timePanel = document.getElementById('time-panel-melody');
    if (timePanel) timePanel.style.display = 'none';
    // 恢复曲目选择
    const melodySelector = document.getElementById('melody-selector');
    if (melodySelector) melodySelector.disabled = false;
    stopMelodyElapsedTimeTimer();
    stopTimeUpdateMelody();
    updateMelodyStatus('测试已结束');
    updateMelodyLeaderboard();

    // 隐藏练习内容，显示结束页（内嵌式，与其他模块一致）
    const practiceContent = document.getElementById('practice-test-content-melody');
    const testEndContent = document.getElementById('melody-test-end-content');
    if (practiceContent) practiceContent.style.display = 'none';
    if (testEndContent) testEndContent.style.display = 'block';

    showMelodyTestEndPage();
}

// 显示测试结束页（内嵌式，与其他模块一致）
function showMelodyTestEndPage() {
    const userInfo = melodyAppState.userInfo;
    const schoolEl = document.getElementById('end-school-melody');
    const majorEl = document.getElementById('end-major-class-melody');
    const nameEl = document.getElementById('end-name-melody');
    const teacherEl = document.getElementById('end-teacher-melody');
    if (schoolEl) schoolEl.textContent = (userInfo && userInfo.school) || '未填写';
    if (majorEl) majorEl.textContent = (userInfo && userInfo.majorClass) || '未填写';
    if (nameEl) nameEl.textContent = (userInfo && userInfo.name) || '未填写';
    if (teacherEl) teacherEl.textContent = (userInfo && userInfo.teacher) || '未填写';

    // 测试结束时间
    const endTimeEl = document.getElementById('end-time-melody');
    if (endTimeEl && melodyAppState.testEndTime) {
        const endTime = melodyAppState.testEndTime;
        const year = endTime.getFullYear();
        const month = String(endTime.getMonth() + 1).padStart(2, '0');
        const day = String(endTime.getDate()).padStart(2, '0');
        const hours = String(endTime.getHours()).padStart(2, '0');
        const minutes = String(endTime.getMinutes()).padStart(2, '0');
        const seconds = String(endTime.getSeconds()).padStart(2, '0');
        endTimeEl.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    // 总分
    const scoreEl = document.getElementById('end-total-score-melody');
    if (scoreEl) scoreEl.textContent = melodyAppState.score;

    // 测试结果分析
    generateMelodyAnalysisContent();
}

// 生成旋律测试评语
function generateMelodyTestComment() {
    const total = melodyAppState.totalQuestions;
    if (total === 0) {
        return '测试尚未开始。请点击"测试模式"开始重新答题';
    }
    // 正确率 = 总分 / 满分(100) * 100
    const accuracy = total > 0 ? (melodyAppState.score / (total * 20) * 100) : 0;

    if (accuracy >= 90) {
        return '优秀！旋律听辨能力出色，音准和节奏感都很强，继续保持！';
    } else if (accuracy >= 70) {
        return '良好！基础扎实，建议加强对复杂旋律和调性变化的练习。';
    } else if (accuracy >= 60) {
        return '及格！需要加强旋律记忆和音高听辨训练，建议从短旋律开始逐步提升。';
    } else {
        return '需要努力！建议从简单旋律听辨开始，每天坚持练习，逐步提高旋律记忆力和音准感。';
    }
}

// 生成旋律测试分析内容
function generateMelodyAnalysisContent() {
    const analysisContent = document.getElementById('analysis-content-melody');
    if (!analysisContent) return;

    let html = '';

    // 成绩统计
    html += `<div class="analysis-section">`;
    html += `<h4>成绩统计</h4>`;
    html += `<div class="stats-row">`;
    html += `<span><strong>总题数：</strong>${melodyAppState.totalQuestions} 题</span>`;
    html += `<span><strong>满分题数：</strong>${melodyAppState.correct} 题</span>`;
    html += `<span><strong>≥70分题数：</strong>${melodyAppState.wrong} 题</span>`;
    html += `</div>`;

    // 正确率 = 5道题正确率的平均值 = 总分 / 100 * 100
    const totalAccuracy = melodyAppState.totalQuestions > 0
        ? (melodyAppState.score / (melodyAppState.totalQuestions * 20) * 100).toFixed(1)
        : 0;
    const elapsedSeconds = melodyAppState.elapsedTime || 0;
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = (elapsedSeconds % 60).toFixed(2);
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.padStart(5, '0')}`;

    html += `<div class="stats-row">`;
    html += `<span><strong>正确率：</strong>${totalAccuracy}%</span>`;
    html += `<span><strong>用时：</strong>${timeStr}</span>`;
    html += `</div>`;
    html += `</div>`;

    // 逐题分析（列出全部题目，含正确率列）
    if (melodyAppState.testAnalysis.length > 0) {
        html += `<div class="analysis-section">`;
        html += `<h4>逐题分析</h4>`;
        html += `<table style="width:100%;border-collapse:collapse;margin-top:8px;font-size:12px;color:#333;">`;
        html += `<tr style="background:#f0f0f0;"><th style="padding:4px;border:1px solid #ddd;">题号</th><th style="padding:4px;border:1px solid #ddd;">曲目</th><th style="padding:4px;border:1px solid #ddd;">得分</th><th style="padding:4px;border:1px solid #ddd;">调性</th><th style="padding:4px;border:1px solid #ddd;">拍号</th><th style="padding:4px;border:1px solid #ddd;">旋律</th><th style="padding:4px;border:1px solid #ddd;">正确率</th></tr>`;
        melodyAppState.testAnalysis.forEach((a, i) => {
            html += `<tr><td style="padding:4px;border:1px solid #ddd;text-align:center;">${i + 1}</td><td style="padding:4px;border:1px solid #ddd;">${a.title}</td><td style="padding:4px;border:1px solid #ddd;text-align:center;">${a.score}/20</td><td style="padding:4px;border:1px solid #ddd;text-align:center;">${a.keyCorrect ? '✓' : '✗'}</td><td style="padding:4px;border:1px solid #ddd;text-align:center;">${a.timeSigCorrect ? '✓' : '✗'}</td><td style="padding:4px;border:1px solid #ddd;text-align:center;">${a.melodyScore}</td><td style="padding:4px;border:1px solid #ddd;text-align:center;font-weight:bold;">${a.accuracy}%</td></tr>`;
        });
        html += `</table>`;
        html += `</div>`;
    }

    // 评语
    html += `<div class="analysis-section">`;
    html += `<h4>评语</h4>`;
    html += `<p>${generateMelodyTestComment()}</p>`;
    html += `</div>`;

    analysisContent.innerHTML = html;
}

// 按钮状态管理
function updateMelodyButtonStates() {
    const practiceBtn = document.getElementById('practice-btn-melody');
    const testBtn = document.getElementById('test-btn-melody');
    const randomPlayBtn = document.getElementById('random-play-btn-melody');
    const playBtn = document.getElementById('play-btn-melody');
    const showAnswerBtn = document.getElementById('show-answer-btn-melody');
    if (melodyAppState.currentMode === 'test') {
        if (practiceBtn) practiceBtn.classList.remove('active');
        if (testBtn) testBtn.classList.add('active');
        // 测试模式：随机播放禁用、重复播放可用、显示答案禁用
        if (randomPlayBtn) randomPlayBtn.disabled = true;
        if (playBtn) playBtn.disabled = false;
        if (showAnswerBtn) showAnswerBtn.disabled = true;
    } else {
        if (practiceBtn) practiceBtn.classList.add('active');
        if (testBtn) testBtn.classList.remove('active');
        if (randomPlayBtn) randomPlayBtn.disabled = false;
        if (playBtn) playBtn.disabled = false;
        if (showAnswerBtn) showAnswerBtn.disabled = false;
    }
}

// 状态更新
function updateMelodyStatus(msg) {
    const el = document.getElementById('status-melody');
    if (el) el.textContent = msg;
}

// 统计更新
function updateMelodyStats() {
    document.getElementById('score-melody').textContent = melodyAppState.score;
    document.getElementById('correct-melody').textContent = melodyAppState.correct;
    document.getElementById('wrong-melody').textContent = melodyAppState.wrong;
    document.getElementById('progress-melody').textContent = melodyAppState.totalQuestions + '题';
}

// 计时器
function startMelodyElapsedTimeTimer() {
    stopMelodyElapsedTimeTimer();
    melodyAppState.elapsedTimeTimer = setInterval(() => {
        if (melodyAppState.testStartTime) {
            melodyAppState.elapsedTime = Math.floor((new Date() - melodyAppState.testStartTime) / 1000);
            const min = Math.floor(melodyAppState.elapsedTime / 60);
            const sec = melodyAppState.elapsedTime % 60;
            const el = document.getElementById('elapsed-time-melody');
            if (el) el.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        }
    }, 1000);
}

function stopMelodyElapsedTimeTimer() {
    if (melodyAppState.elapsedTimeTimer) {
        clearInterval(melodyAppState.elapsedTimeTimer);
        melodyAppState.elapsedTimeTimer = null;
    }
}

function startTimeUpdateMelody() {
    stopTimeUpdateMelody();
    melodyAppState.testTimer = setInterval(() => {
        const el = document.getElementById('current-time-melody');
        if (el) el.textContent = new Date().toLocaleTimeString('zh-CN');
    }, 1000);
}

function stopTimeUpdateMelody() {
    if (melodyAppState.testTimer) {
        clearInterval(melodyAppState.testTimer);
        melodyAppState.testTimer = null;
    }
}

// 风云榜单
function loadMelodyLeaderboard() {
    try {
        const data = localStorage.getItem('melodyLeaderboard');
        if (data) melodyAppState.leaderboard = JSON.parse(data);
    } catch (e) { melodyAppState.leaderboard = []; }
}

function saveMelodyLeaderboard() {
    try {
        localStorage.setItem('melodyLeaderboard', JSON.stringify(melodyAppState.leaderboard));
    } catch (e) { console.error('保存榜单失败:', e); }
}

function updateMelodyLeaderboard() {
    if (melodyAppState.totalQuestions === 0) return;
    const userInfo = melodyAppState.userInfo;
    const elapsed = melodyAppState.elapsedTime || 0;
    const min = Math.floor(elapsed / 60);
    const sec = elapsed % 60;
    // 正确率 = 总分 / 满分(100) * 100
    const accuracy = (melodyAppState.score / (melodyAppState.totalQuestions * 20) * 100).toFixed(1);
    melodyAppState.leaderboard.push({
        name: userInfo.name || '匿名',
        school: userInfo.school || '—',
        score: melodyAppState.score,
        correct: melodyAppState.correct,        // 满分题数
        passCount: melodyAppState.wrong,         // ≥70分题数
        accuracy: parseFloat(accuracy),          // 正确率
        total: melodyAppState.totalQuestions,
        time: `${min}分${sec}秒`,
        timeSeconds: elapsed,
        date: new Date().toLocaleDateString('zh-CN')
    });
    melodyAppState.leaderboard.sort((a, b) => b.score - a.score || a.timeSeconds - b.timeSeconds);
    melodyAppState.leaderboard = melodyAppState.leaderboard.slice(0, 50);
    saveMelodyLeaderboard();
}

function showMelodyLeaderboard() {
    const practiceContent = document.getElementById('practice-test-content-melody');
    const testEndContent = document.getElementById('melody-test-end-content');
    const leaderboardContent = document.getElementById('leaderboard-content-melody');
    if (practiceContent) practiceContent.style.display = 'none';
    if (testEndContent) testEndContent.style.display = 'none';
    if (leaderboardContent) leaderboardContent.style.display = 'block';
    const list = document.getElementById('leaderboard-list-melody');
    if (list) {
        if (melodyAppState.leaderboard.length === 0) {
            list.innerHTML = '<div style="text-align:center;padding:40px;color:rgba(255,255,255,0.5);">暂无榜单数据</div>';
        } else {
            let html = '';
            melodyAppState.leaderboard.forEach((item, i) => {
                const rank = i + 1;
                const rankClass = rank <= 3 ? `lb-rank-${rank}` : '';
                const timeStr = item.time || formatElapsedTime(item.timeSeconds || 0);
                html += `<div class="leaderboard-row ${rankClass}"><div class="lb-rank-value">${rank}</div><div class="lb-name-value">${item.name}</div><div class="lb-score-value">${item.score}</div><div class="lb-time-value">${timeStr}</div></div>`;
            });
            list.innerHTML = html;
        }
    }
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

    // 绑定节拍听辨的音符时值按钮 + 休止开关
    document.querySelectorAll('.rhythm-note-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectMeterUnit(btn.dataset.duration);
        });
    });
    const restToggleBtn = document.getElementById('rest-toggle-btn');
    if (restToggleBtn) restToggleBtn.addEventListener('click', toggleRestMode);

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

    // 渲染空白五线谱
    renderRhythmStaff();

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

        // 显示节奏型按钮，隐藏音符时值按钮
        const rhythmTabsSection = document.querySelector('.rhythm-tabs-section');
        const meterInputSection = document.getElementById('rhythm-meter-input-section');
        if (rhythmTabsSection) rhythmTabsSection.style.display = '';
        if (meterInputSection) meterInputSection.style.display = 'none';

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
                <li><strong>随机播放：</strong>根据所选节拍和小节数随机出题，播放含休止符的节奏</li>
                <li><strong>输入音符：</strong>点击「二分/四分/八分/十六分」输入对应时值的音符</li>
                <li><strong>输入休止符：</strong>点亮「休止」后再点时值按钮，输入对应时值的休止符</li>
                <li><strong>小节填满：</strong>当小节总拍数达到节拍要求时自动跳到下一小节</li>
                <li><strong>提交验证：</strong>填写完所有小节后点击「提交答案」验证正确性</li>
                <li><strong>修改答案：</strong>点击已填写的小节可重置，重新输入</li>
                <li><strong>重播题目：</strong>点击「重复播放」再次听题</li>
            `;
        }

        updateRhythmStatus('已切换到节拍听辨模式');

        // 隐藏节奏型按钮，显示音符时值按钮
        const rhythmTabsSection = document.querySelector('.rhythm-tabs-section');
        const meterInputSection = document.getElementById('rhythm-meter-input-section');
        if (rhythmTabsSection) rhythmTabsSection.style.display = 'none';
        if (meterInputSection) meterInputSection.style.display = '';

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

// ==================== 节拍听辨：音符时值单元（含休止符） ====================

// 可选时值（以四分音符为1拍）
const METER_DURATION_UNITS = {
    'h': { base: 'h', beats: 2, dots: 0, label: '二分' },
    'q': { base: 'q', beats: 1, dots: 0, label: '四分' },
    '8': { base: '8', beats: 0.5, dots: 0, label: '八分' },
    '16': { base: '16', beats: 0.25, dots: 0, label: '十六分' },
    'h.': { base: 'h', beats: 3, dots: 1, label: '附点二分' },
    'q.': { base: 'q', beats: 1.5, dots: 1, label: '附点四分' },
    '8.': { base: '8', beats: 0.75, dots: 1, label: '附点八分' },
    'triplet': { base: 'triplet', beats: 1 / 3, dots: 0, label: '三连音' }
};

// 生成节拍单元对象（音符或休止符）
function makeMeterUnit(duration, rest) {
    const info = METER_DURATION_UNITS[duration] || METER_DURATION_UNITS['q'];
    return { duration: info.base, dots: info.dots || 0, rest: !!rest, beats: info.beats, label: info.label + (rest ? '休止' : '') };
}

// 取节拍单元显示名
function meterUnitLabel(unit) {
    return unit && unit.label ? unit.label : '';
}

// 比较两个节拍单元是否相等（比时值、附点与是否休止）
function meterUnitsEqual(a, b) {
    return !!a && !!b && a.duration === b.duration && (a.dots || 0) === (b.dots || 0) && !!a.rest === !!b.rest;
}

// 设置休止模式开关（仅更新状态与按钮样式，不弹提示）
function setRestMode(on) {
    rhythmAppState.restModeOn = !!on;
    const btn = document.getElementById('rest-toggle-btn');
    if (btn) btn.classList.toggle('active', rhythmAppState.restModeOn);
}

// 点击「休止」按钮切换开关
function toggleRestMode() {
    setRestMode(!rhythmAppState.restModeOn);
    updateRhythmStatus(rhythmAppState.restModeOn ? '休止模式已开启：点时值输入休止符' : '休止模式已关闭：点时值输入音符');
}

// 节拍听辨：点击音符时值按钮（结合休止开关决定输入音符或休止符）
async function selectMeterUnit(duration) {
    const btn = document.querySelector(`.rhythm-note-btn[data-duration="${duration}"]`);
    if (btn) {
        btn.classList.add('active-highlight');
        setTimeout(() => btn.classList.remove('active-highlight'), 300);
    }

    const rest = rhythmAppState.restModeOn;
    const unit = makeMeterUnit(duration, rest);

    // 练习模式：播放该单元音响（休止符只等待、不发声）
    if (rhythmAppState.currentMode === 'practice') {
        try {
            await Tone.start();
            await playRhythmSequence({ notes: [{ duration: unit.duration, beats: unit.beats, dots: unit.dots, rest: unit.rest }] });
        } catch (e) {
            console.error('播放失败:', e);
        }
    }

    // 输入休止符后自动关闭休止开关，避免连续误输休止
    if (rest) setRestMode(false);

    if (rhythmAppState.activeSlotIndex >= 0) {
        const slots = document.querySelectorAll('.rhythm-answer-slot');
        const targetIndex = rhythmAppState.activeSlotIndex;

        if (targetIndex >= slots.length) {
            updateRhythmStatus('槽位索引无效，请重新点击槽位');
            return;
        }

        const currentBeats = rhythmAppState.measureBeatsFilled[targetIndex];
        const maxBeats = rhythmAppState.meterBeatsPerMeasure;

        // 检查是否超出小节容量
        if (currentBeats + unit.beats > maxBeats + 0.001) {
            updateRhythmStatus(`超出小节容量！当前小节已${currentBeats}拍，再加${unit.label}(${unit.beats}拍)超过${maxBeats}拍`);
            return;
        }

        // 添加到当前小节
        rhythmAppState.measureRhythms[targetIndex].push(unit);
        rhythmAppState.measureBeatsFilled[targetIndex] += unit.beats;

        const targetSlot = slots[targetIndex];
        const display = rhythmAppState.measureRhythms[targetIndex].map(u => u.label).join(' + ');
        targetSlot.textContent = `您：${display}`;
        targetSlot.classList.add('filled');

        const filledBeats = rhythmAppState.measureBeatsFilled[targetIndex];
        if (Math.abs(filledBeats - maxBeats) < 0.001) {
            updateRhythmStatus(`✅ 第 ${targetIndex + 1} 小节已完成（${filledBeats}拍）`);
            if (targetIndex + 1 < slots.length) {
                setTimeout(() => activateSlot(targetIndex + 1), 300);
            } else {
                rhythmAppState.activeSlotIndex = -1;
                slots.forEach(s => s.classList.remove('slot-active'));
                updateRhythmStatus('🎉 所有小节已完成，请提交答案！');
            }
        } else {
            updateRhythmStatus(`已选择：${unit.label}（当前小节${filledBeats}/${maxBeats}拍）`);
        }

        rhythmAppState.selectedRhythms[targetIndex] = rhythmAppState.measureRhythms[targetIndex];
    } else {
        updateRhythmStatus('请先点击一个答案槽位以激活上屏记录');
    }

    renderRhythmStaff();
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

    // 同步渲染五线谱
    renderRhythmStaff();
}

// ==================== 节奏五线谱（VexFlow）渲染 ====================

// 收集当前已选的节奏，返回统一描述符（duration/beats/dots/rest/breakBeam）
function getCurrentRhythmSelections() {
    const isMeter = rhythmAppState.currentFunction === 'meter';
    const descriptors = [];
    if (isMeter) {
        (rhythmAppState.measureRhythms || []).forEach(measure => {
            const before = descriptors.length;
            (measure || []).forEach(unit => {
                if (unit) descriptors.push({ duration: unit.duration, beats: unit.beats, dots: unit.dots || 0, rest: !!unit.rest });
            });
            // 小节末尾断开符杠
            if (descriptors.length > before) descriptors[descriptors.length - 1].breakBeam = true;
        });
    } else {
        (rhythmAppState.selectedRhythms || []).forEach(name => {
            if (!name) return;
            const p = RHYTHM_DURATION_MAP[name];
            if (!p) return;
            const before = descriptors.length;
            p.forEach(n => descriptors.push({ duration: n.duration, beats: n.beats, dots: n.dots || 0, rest: false }));
            // 每个节奏型末尾断开符杠
            if (descriptors.length > before) descriptors[descriptors.length - 1].breakBeam = true;
        });
    }
    return descriptors;
}

// 把节奏描述符（duration/beats/dots/rest/breakBeam）转成 VexFlow 音符 / 休止符
function buildVexRhythmNotes(descriptors) {
    const VF = Vex.Flow;
    const notes = [];
    const beams = [];
    const tuplets = [];
    let totalBeats = 0;

    // 1) 创建 VexFlow 音符 / 休止符
    const created = descriptors.map(d => {
        const isTriplet = d.duration === 'triplet';
        const isRest = !!d.rest;
        let dur;
        if (isRest) {
            // 休止符：时值 + (附点)d + r 后缀（qr/8r/16r/hr/qdr/8dr；三连音用 8r）
            dur = (isTriplet ? '8' : d.duration) + (d.dots ? 'd' : '') + 'r';
        } else {
            dur = isTriplet ? '8' : d.duration;
            if (d.dots && !isTriplet) dur = dur + 'd';
        }
        const note = new VF.StaveNote({ keys: ['b/4'], duration: dur });
        // 附点（音符与休止符都需手动 addDot 渲染出圆点）
        if (d.dots && !isTriplet) note.addDot(0);
        if (!isRest) note.setStemDirection(VF.Stem.UP);
        totalBeats += (d.beats || 0);
        return { note, baseDur: isTriplet ? '8' : d.duration, isTriplet, isRest, breakBeam: !!d.breakBeam };
    });

    // 2) 三连音分组
    let tripRun = [];
    const flushTriplet = () => {
        if (tripRun.length === 3) tuplets.push(new VF.Tuplet(tripRun, { num_notes: 3, notes_occupied: 2, ratioed: false }));
        tripRun = [];
    };
    created.forEach(it => { if (it.isTriplet) tripRun.push(it.note); else flushTriplet(); });
    flushTriplet();

    // 3) 符杠：连续八分/十六分音符（跳过休止符），遇断点/长音符/休止符断开
    let beamRun = [];
    const flushBeam = () => {
        if (beamRun.length > 1) beams.push(...VF.Beam.generateBeams(beamRun, { stem_direction: VF.Stem.UP }));
        beamRun = [];
    };
    created.forEach(it => {
        const beamable = !it.isRest && (it.baseDur === '8' || it.baseDur === '16');
        if (beamable) {
            beamRun.push(it.note);
            if (it.breakBeam) flushBeam();
        } else {
            flushBeam();
        }
    });
    flushBeam();

    created.forEach(it => notes.push(it.note));
    return { notes, beams, tuplets, totalBeats: Math.max(1, Math.round(totalBeats * 1000) / 1000) };
}

// 渲染节奏五线谱（空白谱表 + 已选节奏上屏）
function renderRhythmStaff() {
    const container = document.getElementById('rhythm-staff-container');
    if (!container) return;
    if (typeof Vex === 'undefined' || !Vex.Flow) {
        container.innerHTML = '<div style="color:#999;padding:12px;text-align:center;">五线谱组件未加载</div>';
        return;
    }

    container.innerHTML = '';
    const VF = Vex.Flow;

    const beatTypeSelect = document.getElementById('beat-type-rhythm');
    const timeSig = beatTypeSelect && beatTypeSelect.value === '2' ? '2/4' : '4/4';

    const selections = getCurrentRhythmSelections();
    const noteCount = selections.length;
    const baseWidth = container.clientWidth > 0 ? container.clientWidth : 700;
    const width = Math.max(baseWidth - 24, Math.min(260 + noteCount * 72, 2400));
    const height = 100;

    const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
    renderer.resize(width, height);
    const ctx = renderer.getContext();

    // 注意：此版本 VexFlow 的 Stave.y 是“谱表内容区顶部”，真正顶线在 y + 40（space_above_staff_ln×行距）。
    // 画布高 100，五线谱 5 线共 40px，居中则顶线应在 30，故 Stave.y = 30 - 40 = -10。
    const stave = new VF.Stave(10, -10, width - 20);
    stave.addClef('treble').addTimeSignature(timeSig);
    stave.setEndBarType(VF.Barline.type.END);
    stave.setContext(ctx).draw();

    if (!selections.length) return;

    const built = buildVexRhythmNotes(selections);
    if (!built.notes.length) return;

    const voice = new VF.Voice({ num_beats: built.totalBeats, beat_value: 4 });
    voice.addTickables(built.notes);
    new VF.Formatter().joinVoices([voice]).format([voice], width - 60);
    voice.draw(ctx, stave);

    // 符杠 / 三连音在 voice 绘制后再单独绘制
    built.beams.forEach(b => b.setContext(ctx).draw());
    built.tuplets.forEach(t => t.setContext(ctx).draw());
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

    renderRhythmStaff();
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

    renderRhythmStaff();
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

            // 自动点亮下一个节奏选择槽位
            if (targetIndex + 1 < slots.length) {
                setTimeout(() => activateSlot(targetIndex + 1), 200);
            } else {
                rhythmAppState.activeSlotIndex = -1;
                slots.forEach(slot => slot.classList.remove('slot-active'));
                updateRhythmStatus('🎉 所有节奏已选择完毕，请提交答案！');
            }
        }
    } else {
        updateRhythmStatus('请先点击一个答案槽位以激活上屏记录');
    }

    renderRhythmStaff();
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
    if (rhythmAppState.isPlaying) return;

    const descriptors = getCurrentRhythmSelections();
    if (!descriptors.length) {
        updateRhythmStatus('请先选择节奏！');
        return;
    }

    try {
        await Tone.start();
        rhythmAppState.isPlaying = true;
        await playRhythmSequence({ notes: descriptors });
        updateRhythmStatus('已播放上屏节奏');
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

        // 自动点亮第1个答题槽位（节奏型/节拍听辨通用）
        activateSlot(0);

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
        // 节拍听辨模式：生成含休止符的时值单元组合
        const beatsPerMeasure = parseInt(beatType); // 2或3
        const measureCount = quantity; // 2或4

        // 加权候选（四分/八分更常见，二分/十六分/附点/三连音次之）
        const pool = ['q', 'q', '8', '8', '16', 'h', 'q.', '8.', 'h.', 'triplet'];

        const measures = [];
        const allNotes = [];
        let totalRests = 0; // 每题最多2个休止符
        for (let m = 0; m < measureCount; m++) {
            const measureUnits = [];
            let remaining = beatsPerMeasure;
            let safety = 0;
            while (remaining > 0.001 && safety++ < 20) {
                const candidates = pool.filter(d => {
                    const b = d === 'triplet' ? 1 : METER_DURATION_UNITS[d].beats;
                    return b <= remaining + 0.001;
                });
                const chosen = candidates.length ? candidates : ['q'];
                const dur = chosen[Math.floor(Math.random() * chosen.length)];

                if (dur === 'triplet') {
                    // 三连音：3个八分三连音 = 1拍（生成时不含休止，保持简单）
                    for (let k = 0; k < 3; k++) {
                        const unit = makeMeterUnit('triplet', false);
                        measureUnits.push(unit);
                        allNotes.push({ duration: 'triplet', beats: 1 / 3, dots: 0, rest: false });
                    }
                    remaining -= 1;
                } else {
                    const beats = METER_DURATION_UNITS[dur].beats;
                    const rest = totalRests < 2 && Math.random() < 0.35; // 每题最多2个休止符
                    if (rest) totalRests++;
                    const unit = makeMeterUnit(dur, rest);
                    measureUnits.push(unit);
                    allNotes.push({ duration: unit.duration, beats: unit.beats, dots: unit.dots, rest: unit.rest });
                    remaining -= beats;
                }
            }
            measures.push(measureUnits);
        }

        return {
            beatType: beatType,
            quantity: measureCount,
            measures: measureCount,
            timeSignature: `${beatsPerMeasure}/4`,
            name: measures.map(m => m.map(u => u.label).join(' + ')).join(' | '),
            notes: allNotes,
            pattern: measures
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
    ],

    // ===== 三、单个音符时值（用于旋律输入）=====

    // 全音 = 4拍
    '全音': [
        { duration: 'w', beats: 4, description: '全音音符' }
    ],

    // 八分 = 0.5拍
    '八分': [
        { duration: '8', beats: 0.5, description: '八分音符' }
    ],

    // 十六分 = 0.25拍
    '十六分': [
        { duration: '16', beats: 0.25, description: '十六分音符' }
    ],

    // 附点二分 = 3拍
    '附点二分': [
        { duration: 'h', beats: 3, dots: 1, description: '附点二分音符' }
    ],

    // 附点四分 = 1.5拍
    '附点四分': [
        { duration: 'q', beats: 1.5, dots: 1, description: '附点四分音符' }
    ],

    // 附点八分 = 0.75拍
    '附点八分': [
        { duration: '8', beats: 0.75, dots: 1, description: '附点八分音符' }
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

// 计算节奏重音音量：强拍最响、切分音次之、正拍中等、后半拍最轻
function getRhythmAccentVolume(beatPos, beatsPerMeasure, noteBeats) {
    const posInMeasure = ((beatPos % beatsPerMeasure) + beatsPerMeasure) % beatsPerMeasure;
    const onDownbeat = posInMeasure < 0.001;
    const onBeat = Math.abs(posInMeasure - Math.round(posInMeasure)) < 0.001;
    const isSyncopated = !onBeat && noteBeats >= 0.5; // 后半拍起且时值不短 → 切分音

    if (onDownbeat) return 0.92;   // 强拍（每小节第1拍）
    if (isSyncopated) return 0.82; // 切分音（强调）
    if (onBeat) return 0.66;       // 其他正拍
    return 0.5;                    // 后半拍（弱）
}

// 播放节奏序列
async function playRhythmSequence(rhythm) {
    const bpm = rhythmAppState.bpm || 90;
    const beatDuration = 60 / bpm; // 每拍的时长（秒）

    // 每小节拍数（用于强弱拍重音）
    let beatsPerMeasure = 4;
    if (rhythm.timeSignature) {
        beatsPerMeasure = parseInt(rhythm.timeSignature.split('/')[0]) || 4;
    } else if (rhythmAppState.currentFunction === 'meter') {
        beatsPerMeasure = rhythmAppState.meterBeatsPerMeasure || 4;
    }

    let currentBeat = 0; // 当前累计拍（四分音符=1拍）

    // 播放每个音符
    for (const note of rhythm.notes) {
        let noteBeats;

        // 优先使用 beats 属性（如果存在）
        if (note.beats !== undefined) {
            noteBeats = note.beats;
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

            noteBeats = durationMultiplier;
        }

        const noteDuration = beatDuration * noteBeats;

        // 休止符不发声，只等待；其余按强弱拍重音播放
        if (!note.rest) {
            const volume = getRhythmAccentVolume(currentBeat, beatsPerMeasure, noteBeats);
            playNoteWithWebAudio('C4', noteDuration, volume);
        }

        // 更新当前拍
        currentBeat += noteBeats;

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
            const correctMeasure = correctPattern[index]; // 正确答案的时值单元数组

            // 比较两个数组是否相同（顺序和内容都要匹配）
            const isMeasureCorrect = userMeasure.length === correctMeasure.length &&
                userMeasure.every((u, i) => meterUnitsEqual(u, correctMeasure[i]));

            if (!isMeasureCorrect) {
                allCorrect = false;
            }

            // 显示对比结果
            const slot = slots[index];
            const userText = userMeasure.map(u => meterUnitLabel(u)).join(' + ');
            const correctText = correctMeasure.map(u => meterUnitLabel(u)).join(' + ');
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

        // 记录学习数据（节拍听辨模式）
        learningManager.recordResult('rhythm', {
            question: `节拍模式 - ${rhythmAppState.currentRhythm.beatType || '未知'}`,
            correct: allCorrect,
            userAnswer: rhythmAppState.measureRhythms.map(m => m.map(u => meterUnitLabel(u)).join('+')).join(' | '),
            correctAnswer: correctPattern.map(m => m.map(u => meterUnitLabel(u)).join('+')).join(' | '),
            mode: 'meter',
            difficulty: rhythmAppState.difficulty || 1,
            learningMode: rhythmAppState.currentMode || 'practice'
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

        // 记录学习数据（节奏型听辨模式）
        learningManager.recordResult('rhythm', {
            question: `节奏模式 - ${rhythmAppState.currentRhythm.type || '未知'}`,
            correct: isAllCorrect,
            userAnswer: rhythmAppState.selectedRhythms.join(', '),
            correctAnswer: correctPattern.join(', '),
            mode: 'rhythm',
            difficulty: rhythmAppState.difficulty || 1,
            learningMode: rhythmAppState.currentMode || 'practice'
        });

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

    const correctPattern = rhythmAppState.currentRhythm.pattern;
    let answerText;
    if (rhythmAppState.currentFunction === 'meter') {
        answerText = correctPattern.map(measure => measure.map(u => meterUnitLabel(u)).join(' + ')).join(' | ');
    } else {
        answerText = correctPattern.join('；');
    }
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

    // 测试模式下点击琴键不出声，仅高亮并记住最后点击的琴键
    if (singleAppState.currentMode === 'test') {
        clearAllHighlights();
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
    // 测试模式下保持高亮，直到提交答案或下一音播放
    if (singleAppState.currentMode !== 'test') {
        removeHighlightKey(note.note);
    }
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

// ==================== 截屏 / 导出图片功能 ====================
// 优先使用本地打包的 html-to-image（浏览器原生渲染，flexbox/文字与屏幕一致），
// 失败时回退到 html2canvas。两者均从本地 lib/ 加载，不依赖外部 CDN。
let isScreenshotting = false; // 防止重复截屏

// 通用导出：把指定 DOM 元素渲染为 PNG 图片，弹出预览供长按保存 / 下载
function captureElementAsImage(elementSelector, fileNamePrefix, onSuccess, onError) {
    if (isScreenshotting) {
        console.log('正在截屏中，请勿重复点击');
        return;
    }

    const element = typeof elementSelector === 'string'
        ? document.querySelector(elementSelector)
        : elementSelector;

    if (!element) {
        console.error('截屏失败：未找到目标元素', elementSelector);
        alert('截屏失败：未找到要导出的页面区域');
        return;
    }

    isScreenshotting = true;
    console.log('开始导出图片...');

    // 文件名（含时间戳）
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${fileNamePrefix}_${timestamp}.png`;

    // 展示预览弹窗：手机可长按图片“保存到相册”，桌面可点“下载图片”
    const showPreview = (dataUrl) => {
        const modal = document.getElementById('screenshot-modal');
        const img = document.getElementById('screenshot-preview-img');
        const downloadBtn = document.getElementById('screenshot-download-btn');

        if (modal && img) {
            img.src = dataUrl;
            modal.style.display = 'flex';

            if (downloadBtn) {
                downloadBtn.onclick = () => {
                    const link = document.createElement('a');
                    link.download = fileName;
                    link.href = dataUrl;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };
            }
        } else {
            // 兜底：预览弹窗不存在时，直接触发下载
            const link = document.createElement('a');
            link.download = fileName;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        console.log('图片生成成功！');
        if (typeof onSuccess === 'function') onSuccess();
        isScreenshotting = false;
    };

    const fail = (err) => {
        console.error('图片导出失败:', err);
        if (typeof onError === 'function') onError(err);
        else alert('图片导出失败：' + (err && err.message ? err.message : err));
        isScreenshotting = false;
    };

    // 优先使用 html-to-image（浏览器原生 SVG 渲染，flexbox / 文字排版与屏幕完全一致，避免挤压）。
    // 若不可用或渲染失败，则回退到 html2canvas。
    if (typeof htmlToImage !== 'undefined' && typeof htmlToImage.toPng === 'function') {
        htmlToImage.toPng(element, {
            pixelRatio: 2,           // 提高清晰度
            backgroundColor: '#1a1a1a',
            cacheBust: true
        }).then(showPreview).catch(err => {
            console.warn('html-to-image 导出失败，回退到 html2canvas:', err);
            captureWithHtml2canvas();
        });
    } else {
        captureWithHtml2canvas();
    }

    function captureWithHtml2canvas() {
        if (typeof html2canvas === 'undefined') {
            fail(new Error('图片导出组件未加载，请刷新页面后重试'));
            return;
        }
        html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#1a1a1a',
            logging: false
        }).then(canvas => showPreview(canvas.toDataURL('image/png'))).catch(fail);
    }
}

// 截屏功能 - 单音听辨页面
// 生成更精确的文件名：区分声部（单声部/双声部/三声部）与高低音，避免上传错误
function getSingleScreenshotPrefix() {
    const voices = singleAppState.currentVoices || 1;
    const voiceLabel = voices === 1 ? '单声部' : voices === 2 ? '双声部' : '三声部';
    let prefix = `单音听辨_${voiceLabel}`;
    if (voices >= 2) {
        const levelSelect = document.getElementById('difficulty-single');
        const level = levelSelect && levelSelect.value ? levelSelect.value : '';
        if (level) prefix += `_${level}`;
    }
    return prefix;
}

function captureSinglePageScreenshot() {
    captureElementAsImage('#single-page .exercise-page', getSingleScreenshotPrefix(),
        () => updateSingleStatus('图片已生成，请保存到相册'));
}

// 截屏功能 - 音程听辨页面
function captureIntervalPageScreenshot() {
    captureElementAsImage('#interval-page .exercise-page', '音程听辨测试',
        () => updateIntervalStatus('图片已生成，请保存到相册'));
}

// 截屏功能 - 节奏听辨页面
function captureRhythmPageScreenshot() {
    captureElementAsImage('#rhythm-page .exercise-page', '节奏听辨',
        () => updateRhythmStatus('图片已生成，请保存到相册'));
}

// 和弦听辨截屏功能
function captureChordPageScreenshot() {
    captureElementAsImage('#chord-page .exercise-page', '和弦听辨测试',
        () => updateChordStatus('图片已生成，请保存到相册'));
}

// 截屏功能 - 旋律听辨页面
function captureMelodyPageScreenshot() {
    captureElementAsImage('#melody-page .exercise-page', '旋律听辨测试',
        () => updateMelodyStatus('图片已生成，请保存到相册'));
}

// ==================== 智能学习数据管理系统 ====================

// 学习数据管理器 - 实现智能体的"环境感知"、"动态规划"、"决策执行"、"交互反馈"能力
const learningManager = {
    STORAGE_KEY: 'earTraining_learningData',

    // 初始化学习数据结构
    init() {
        let data = this.loadData();
        if (!data) {
            data = this.createDefaultData();
            this.saveData(data);
        } else {
            // 迁移旧数据，确保所有类型都有对应的数据结构
            data = this.migrateData(data);
        }
        return data;
    },

    // 创建默认数据结构
    createDefaultData() {
        const types = ['single', 'interval', 'chord', 'rhythm', 'melody'];
        const weakPoints = {};
        const errorBook = {};
        const adaptiveLevel = {};

        types.forEach(type => {
            weakPoints[type] = {};
            errorBook[type] = [];
            adaptiveLevel[type] = { currentLevel: 1, accuracy: 0 };
        });

        return {
            userInfo: null,
            learningRecords: {
                single: [],      // 单音练习记录
                interval: [],    // 音程练习记录
                chord: [],       // 和弦练习记录
                rhythm: [],      // 节奏练习记录
                melody: []       // 旋律练习记录
            },
            weakPoints: weakPoints,
            errorBook: errorBook,
            stats: {
                totalStudyTime: 0,  // 总学习时间（秒）
                totalSessions: 0,   // 总学习次数
                lastStudyDate: null // 最后学习日期
            },
            adaptiveLevel: adaptiveLevel
        };
    },

    // 迁移旧数据
    migrateData(data) {
        const types = ['single', 'interval', 'chord', 'rhythm', 'melody'];

        // 确保learningRecords有所有类型
        if (!data.learningRecords) {
            data.learningRecords = {};
        }
        types.forEach(type => {
            if (!data.learningRecords[type]) {
                data.learningRecords[type] = [];
            }
        });

        // 确保weakPoints有所有类型
        if (!data.weakPoints) {
            data.weakPoints = {};
        }
        types.forEach(type => {
            if (!data.weakPoints[type]) {
                data.weakPoints[type] = {};
            }
        });

        // 确保errorBook有所有类型
        if (!data.errorBook) {
            data.errorBook = {};
        }
        types.forEach(type => {
            if (!data.errorBook[type]) {
                data.errorBook[type] = [];
            }
        });

        // 确保adaptiveLevel有所有类型
        if (!data.adaptiveLevel) {
            data.adaptiveLevel = {};
        }
        types.forEach(type => {
            if (!data.adaptiveLevel[type]) {
                data.adaptiveLevel[type] = { currentLevel: 1, accuracy: 0 };
            }
        });

        // 确保stats存在
        if (!data.stats) {
            data.stats = {
                totalStudyTime: 0,
                totalSessions: 0,
                lastStudyDate: null
            };
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

        // 确定学习模式：practice（练习）或 test（测试）
        const learningMode = record.learningMode || 'practice';

        const newRecord = {
            timestamp: Date.now(),
            date: new Date().toLocaleDateString('zh-CN'),
            learningMode: learningMode,  // 区分练习/测试模式
            source: type,  // 数据来源类型
            ...record
        };

        // 如果record中已有learningMode，则使用record中的值
        if (record.learningMode) {
            newRecord.learningMode = record.learningMode;
        }

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
        data.stats.totalSessions++;

        // 更新自适应难度（仅基于测试模式数据进行难度调整）
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

        // 统计各类型数据（全部5种类型）
        const allTypes = ['single', 'interval', 'chord', 'rhythm', 'melody'];
        for (const type of allTypes) {
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

        // 计算学习天数（遍历全部类型）
        const dates = new Set();
        for (const type of allTypes) {
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
        const allTypes = ['single', 'interval', 'chord', 'rhythm', 'melody'];

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toLocaleDateString('zh-CN');

            let dayRecords = [];
            for (const type of allTypes) {
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
        const allTypes = ['single', 'interval', 'chord', 'rhythm', 'melody'];
        for (const type of allTypes) {
            const records = data.learningRecords[type];
            total += records.length;
            correct += records.filter(r => r.correct).length;
        }
        return total > 0 ? Math.round((correct / total) * 100) : 0;
    },

    // 生成学习建议
    generateSuggestions(stats) {
        const suggestions = [];

        // 分析各类型表现（全部5种类型）
        const typeNames = {
            single: '单音',
            interval: '音程',
            chord: '和弦',
            rhythm: '节奏',
            melody: '旋律'
        };
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
                const typeName = typeNames[type] || type;
                suggestions.push({
                    type: 'focus',
                    text: `重点加强${typeName}中的：${areaNames}（错误率较高）`
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
    const typeNames = { single: '单音', interval: '音程', chord: '和弦', rhythm: '节奏', melody: '旋律' };
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
    const typeNames = { single: '单音', interval: '音程', chord: '和弦', rhythm: '节奏', melody: '旋律' };
    alert(`即将为您生成"${key}"的专项练习，请在${typeNames[type] || type}练习模式中选择对应难度进行针对性训练。`);
}

// 显示自适应难度推荐
function showAdaptiveRecommendation() {
    const container = document.getElementById('adaptive-content');
    if (!container) return;

    const data = learningManager.init();
    const typeNames = { single: '单音', interval: '音程', chord: '和弦', rhythm: '节奏', melody: '旋律' };

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

    // 绑定和弦库按钮
    const chordlibBtn = document.getElementById('chord-library-btn');
    if (chordlibBtn) {
        chordlibBtn.addEventListener('click', () => {
            showChordLibrary('chord');
            document.getElementById('chordlib-modal').style.display = 'flex';
        });
    }

    // 绑定每日目标按钮
    const goalsBtn = document.getElementById('daily-goals-btn');
    if (goalsBtn) {
        goalsBtn.addEventListener('click', () => {
            showDailyGoals();
            document.getElementById('goals-modal').style.display = 'flex';
        });
    }

    // 绑定数据管理按钮
    const dataManageBtn = document.getElementById('data-manage-btn');
    if (dataManageBtn) {
        dataManageBtn.addEventListener('click', () => {
            document.getElementById('data-modal').style.display = 'flex';
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

    // 绑定每日签到按钮
    const signInBtn = document.getElementById('sign-in-btn');
    if (signInBtn) {
        signInBtn.addEventListener('click', () => {
            showSignInModal();
            document.getElementById('signin-modal').style.display = 'flex';
        });
    }

    // 绑定学习时长按钮
    const timeStatsBtn = document.getElementById('time-stats-btn');
    if (timeStatsBtn) {
        timeStatsBtn.addEventListener('click', () => {
            showTimeStats();
            document.getElementById('time-stats-modal').style.display = 'flex';
        });
    }

    // 绑定音乐小知识按钮
    const knowledgeBtn = document.getElementById('daily-knowledge-btn');
    if (knowledgeBtn) {
        knowledgeBtn.addEventListener('click', () => {
            showDailyKnowledge();
            document.getElementById('knowledge-modal').style.display = 'flex';
        });
    }

    // 绑定学习计划按钮
    const planBtn = document.getElementById('study-plan-btn');
    if (planBtn) {
        planBtn.addEventListener('click', () => {
            showStudyPlan();
            document.getElementById('plan-modal').style.display = 'flex';
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

// 显示学习路径推荐弹窗（含完整学习报告）
function showLearningPathModal() {
    const data = learningManager.init();
    const report = learningManager.generateReport();
    const container = document.getElementById('report-modal-content');
    if (!container) return;

    const typeNames = { single: '单音', interval: '音程', chord: '和弦', rhythm: '节奏', melody: '旋律' };
    let html = '';

    // ========== 1. 学习数据摘要 ==========
    html += '<div class="report-summary-cards">';
    html += `
        <div class="summary-card">
            <div class="summary-value">${report.summary.totalStudyDays}</div>
            <div class="summary-label">学习天数</div>
        </div>
        <div class="summary-card">
            <div class="summary-value">${report.summary.totalQuestions}</div>
            <div class="summary-label">总题数</div>
        </div>
        <div class="summary-card highlight">
            <div class="summary-value">${report.summary.overallAccuracy}%</div>
            <div class="summary-label">正确率</div>
        </div>
    `;
    html += '</div>';

    // ========== 2. 各模块表现 ==========
    html += '<div class="report-section-block"><h4>📊 各模块表现</h4>';
    html += '<div class="accuracy-bars-list">';
    let hasData = false;
    for (const [type, name] of Object.entries(typeNames)) {
        const acc = report.accuracyByType[type];
        if (acc.total > 0) {
            hasData = true;
            const barColor = acc.rate >= 85 ? '#4db6ac' : acc.rate >= 60 ? '#ffb347' : '#e74c3c';
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
    }
    if (!hasData) {
        html += '<p class="empty-hint-text">暂无练习记录，开始练习后可查看表现数据</p>';
    }
    html += '</div></div>';

    // ========== 3. 最近7天学习趋势 ==========
    html += '<div class="report-section-block"><h4>📅 最近7天学习趋势</h4>';
    html += '<div class="trend-chart-v2">';
    let hasTrendData = false;
    report.recentProgress.forEach(day => {
        if (day.total > 0) hasTrendData = true;
        const height = day.accuracy > 0 ? Math.max(10, day.accuracy) : 5;
        const color = day.total === 0 ? 'rgba(255,255,255,0.1)' :
            day.accuracy >= 85 ? '#4db6ac' : day.accuracy >= 60 ? '#ffb347' : '#e74c3c';
        html += `
            <div class="trend-bar-wrapper-v2">
                <div class="trend-bar-v2" style="height: ${height}%; background: ${color};"></div>
                <div class="trend-label-v2">${day.date.slice(5)}</div>
                <div class="trend-value-v2">${day.total > 0 ? day.accuracy + '%' : '-'}</div>
                <div class="trend-count-v2">${day.total}题</div>
            </div>
        `;
    });
    if (!hasTrendData) {
        html += '<p class="empty-hint-text" style="text-align:center; width:100%;">开始练习后可查看7天学习趋势</p>';
    }
    html += '</div></div>';

    // ========== 4. 薄弱环节分析 ==========
    const hasWeakAreas = Object.values(report.weakAreas).some(v => v.length > 0);
    if (hasWeakAreas) {
        html += '<div class="report-section-block"><h4>⚠️ 薄弱环节分析</h4>';
        for (const [type, weakAreas] of Object.entries(report.weakAreas)) {
            if (weakAreas.length > 0) {
                html += `<div class="weak-area-group"><span class="weak-area-title">${typeNames[type]}：</span>`;
                html += weakAreas.slice(0, 3).map(w =>
                    `<span class="weak-area-tag">${w.key} (${w.errorRate}%)</span>`
                ).join('');
                html += '</div>';
            }
        }
        html += '</div>';
    }

    // ========== 5. 智能学习路径推荐 ==========
    html += '<div class="report-section-block"><h4>🎯 智能学习路径推荐</h4>';

    const suggestions = [];
    for (const [type, weakAreas] of Object.entries(report.weakAreas)) {
        if (weakAreas.length > 0) {
            const acc = report.accuracyByType[type];
            suggestions.push({
                title: `${typeNames[type]} - ${weakAreas[0].key}`,
                details: `重点强化：${weakAreas[0].key}`,
                accuracy: acc.rate,
                priority: '重点',
                priorityStyle: 'background: rgba(231, 76, 60, 0.9)'
            });
        }
    }

    if (suggestions.length === 0) {
        for (const [type, name] of Object.entries(typeNames)) {
            const acc = report.accuracyByType[type];
            if (acc.total > 0 && acc.rate < 85) {
                suggestions.push({
                    title: `${name} - 加强基础`,
                    details: `巩固基础${name}练习`,
                    accuracy: acc.rate,
                    priority: acc.rate < 60 ? '重点' : '建议',
                    priorityStyle: acc.rate < 60 ? 'background: rgba(231, 76, 60, 0.9)' : 'background: rgba(255, 179, 71, 0.9)'
                });
            }
        }
    }

    if (suggestions.length === 0) {
        html += '<div class="no-suggestions"><p>🎉 太棒了！暂无薄弱环节</p><p>继续保持良好的学习状态！</p></div>';
    } else {
        suggestions.sort((a, b) => {
            if (a.priority === '重点' && b.priority !== '重点') return -1;
            if (b.priority === '重点' && a.priority !== '重点') return 1;
            return b.accuracy - a.accuracy;
        });

        suggestions.slice(0, 3).forEach((s, i) => {
            html += `
                <div class="path-item">
                    <div class="path-item-header">
                        <span class="path-item-title">${s.title}</span>
                        <span class="path-item-badge" style="${s.priorityStyle}">${s.priority}</span>
                    </div>
                    <div class="path-item-info">
                        <span>🎯 ${s.details}</span>
                        <span>📊 正确率：${s.accuracy}%</span>
                        <span>⏱️ 建议：${3 - i}0分钟</span>
                    </div>
                </div>
            `;
        });
    }
    html += '</div>';

    // ========== 6. 学习成就 ==========
    html += '<div class="report-section-block"><h4>🏆 学习成就</h4>';
    html += generateAchievementsHTML(report);
    html += '</div>';

    container.innerHTML = html;
    document.getElementById('report-modal').style.display = 'flex';
}

// 生成成就徽章HTML
function generateAchievementsHTML(report) {
    const totalQuestions = report.summary.totalQuestions;
    const accuracy = report.summary.overallAccuracy;
    const achievements = [];

    if (totalQuestions >= 10) achievements.push({ icon: '🎯', name: '初露锋芒', desc: '完成10道题目', unlocked: true });
    if (totalQuestions >= 50) achievements.push({ icon: '📚', name: '勤学苦练', desc: '完成50道题目', unlocked: true });
    if (totalQuestions >= 100) achievements.push({ icon: '🚀', name: '百题斩', desc: '完成100道题目', unlocked: true });
    if (accuracy >= 70 && totalQuestions >= 20) achievements.push({ icon: '✨', name: '稳步提升', desc: '正确率达到70%', unlocked: true });
    if (accuracy >= 85 && totalQuestions >= 30) achievements.push({ icon: '🌟', name: '听觉敏锐', desc: '正确率达到85%', unlocked: true });
    if (accuracy >= 95 && totalQuestions >= 50) achievements.push({ icon: '💎', name: '听音达人', desc: '正确率达到95%', unlocked: true });

    if (achievements.length === 0) {
        return '<p class="empty-hint-text">继续练习解锁成就徽章！</p>';
    }

    let html = '<div class="achievements-grid">';
    achievements.slice(0, 6).forEach(a => {
        html += `
            <div class="achievement-badge ${a.unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${a.icon}</div>
                <div class="achievement-name">${a.name}</div>
                <div class="achievement-desc">${a.desc}</div>
            </div>
        `;
    });
    html += '</div>';
    return html;
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

// ==================== 乐理知识速查功能 ====================

// 乐理知识库
const musicTheoryLibrary = {
    chord: [
        {
            name: '大三和弦',
            formula: '根音 + 大三度 + 纯五度',
            example: 'C = C-E-G',
            characteristic: '明亮、稳定、协和',
            usage: '大调主和弦、终止和弦'
        },
        {
            name: '小三和弦',
            formula: '根音 + 小三度 + 纯五度',
            example: 'Cm = C-Eb-G',
            characteristic: '柔和、含蓄、忧伤',
            usage: '小调主和弦、情感铺垫'
        },
        {
            name: '增三和弦',
            formula: '根音 + 大三度 + 增五度',
            example: 'Caug = C-E-G#',
            characteristic: '紧张、不稳定',
            usage: '过渡和弦、转调桥梁'
        },
        {
            name: '减三和弦',
            formula: '根音 + 小三度 + 减五度',
            example: 'Cdim = C-Eb-Gb',
            characteristic: '极度紧张、需解决',
            usage: '经过和弦、减七和弦基础'
        },
        {
            name: '大小七和弦',
            formula: '根音 + 大三度 + 纯五度 + 小七度',
            example: 'C7 = C-E-G-Bb',
            characteristic: '不稳定、需解决到主和弦',
            usage: '属功能组、蓝调和声'
        },
        {
            name: '大大七和弦',
            formula: '根音 + 大三度 + 纯五度 + 大七度',
            example: 'CM7 = C-E-G-B',
            characteristic: '柔和、爵士感',
            usage: '爵士和声、流行音乐'
        }
    ],
    interval: [
        {
            name: '小二度',
            semitones: '1个半音',
            example: 'C-C#',
            characteristic: '最不协和、紧张',
            tip: '听起来像两个很近的音'
        },
        {
            name: '大二度',
            semitones: '2个半音',
            example: 'C-D',
            characteristic: '不协和',
            tip: '两个相邻音符'
        },
        {
            name: '小三度',
            semitones: '3个半音',
            example: 'C-Eb',
            characteristic: '柔和、小调色彩',
            tip: '第一个小三音程是低音3'
        },
        {
            name: '大三度',
            semitones: '4个半音',
            example: 'C-E',
            characteristic: '明亮、大调色彩',
            tip: '与"啦啦"开头相似'
        },
        {
            name: '纯四度',
            semitones: '5个半音',
            example: 'C-F',
            characteristic: '协和、中空',
            tip: '像"国歌"开头'
        },
        {
            name: '纯五度',
            semitones: '7个半音',
            example: 'C-G',
            characteristic: '非常协和、稳定',
            tip: '钟声般的感觉'
        },
        {
            name: '大六度',
            semitones: '9个半音',
            example: 'C-A',
            characteristic: '温暖、协和',
            tip: '下行像"哎呀"'
        },
        {
            name: '八度',
            semitones: '12个半音',
            example: 'C-C',
            characteristic: '完全协和',
            tip: '同音高不同八度'
        }
    ],
    scale: [
        {
            name: '自然大调',
            formula: '全全半全全全半',
            example: 'C D E F G A B',
            characteristic: '明亮、开阔',
            usage: '最常用的调式'
        },
        {
            name: '自然小调',
            formula: '全半全全半全全',
            example: 'C D Eb F G Ab Bb',
            characteristic: '暗淡、忧郁',
            usage: '小调作品基础'
        },
        {
            name: '和声小调',
            formula: '全半全全半增半',
            example: 'C D Eb F G Ab B',
            characteristic: '更有张力',
            usage: '古典、浪漫派'
        },
        {
            name: '旋律小调',
            formula: '全半全全全全半',
            example: 'C D Eb F G A B',
            characteristic: '上行明亮',
            usage: '爵士乐'
        },
        {
            name: '五声调式',
            formula: '宫商角徵羽',
            example: 'C D E G A',
            characteristic: '中国传统音乐',
            usage: '民族音乐、古风'
        }
    ]
};

// 显示乐理知识库
function showChordLibrary(type) {
    const container = document.getElementById('chordlib-content');
    if (!container) return;

    const items = musicTheoryLibrary[type] || [];
    const typeNames = { chord: '和弦', interval: '音程', scale: '调式' };

    let html = `<div class="chordlib-intro"><p>以下是常见${typeNames[type]}的知识点总结，帮助您快速查阅和对比。</p></div>`;
    html += '<div class="chordlib-cards">';

    items.forEach(item => {
        html += `
            <div class="theory-card">
                <div class="theory-card-header">
                    <span class="theory-card-name">${item.name}</span>
                </div>
                <div class="theory-card-body">
                    <div class="theory-item"><span class="theory-label">构成：</span><span class="theory-value">${item.formula || item.semitones}</span></div>
                    <div class="theory-item"><span class="theory-label">示例：</span><span class="theory-value code">${item.example}</span></div>
                    <div class="theory-item"><span class="theory-label">特点：</span><span class="theory-value">${item.characteristic}</span></div>
                    ${item.usage ? `<div class="theory-item"><span class="theory-label">应用：</span><span class="theory-value">${item.usage}</span></div>` : ''}
                    ${item.tip ? `<div class="theory-item"><span class="theory-label">💡：</span><span class="theory-value">${item.tip}</span></div>` : ''}
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// 切换乐理Tab
function switchChordlibTab(type, btn) {
    const tabs = btn.parentElement.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    showChordLibrary(type);
}

// ==================== 每日目标功能 ====================

// 显示每日目标
function showDailyGoals() {
    const container = document.getElementById('goals-modal-content');
    if (!container) return;

    const today = new Date().toDateString();
    const data = learningManager.init();
    const existingGoal = data.dailyGoals?.[today];

    if (!existingGoal) {
        // 显示设置目标界面
        container.innerHTML = `
            <div class="goals-setup">
                <h4>🎯 设定今日学习目标</h4>
                <div class="goal-form-group">
                    <label>每日练习题数</label>
                    <div class="goal-options" id="goal-questions">
                        <button class="goal-option" data-value="10">10题</button>
                        <button class="goal-option active" data-value="20">20题</button>
                        <button class="goal-option" data-value="30">30题</button>
                        <button class="goal-option" data-value="50">50题</button>
                    </div>
                </div>
                <div class="goal-form-group">
                    <label>目标正确率</label>
                    <div class="goal-options" id="goal-accuracy">
                        <button class="goal-option" data-value="60">60%</button>
                        <button class="goal-option" data-value="70">70%</button>
                        <button class="goal-option active" data-value="80">80%</button>
                        <button class="goal-option" data-value="90">90%</button>
                    </div>
                </div>
                <div class="goal-form-group">
                    <label>练习类型（可多选）</label>
                    <div class="goal-options" id="goal-types">
                        <button class="goal-option active" data-type="chord">和弦</button>
                        <button class="goal-option" data-type="interval">音程</button>
                        <button class="goal-option" data-type="single">单音</button>
                    </div>
                </div>
                <p class="goal-tip">💡 提示：建议选择适合当前水平的目标，循序渐进</p>
            </div>
        `;

        // 绑定选项点击
        setupGoalOptions();
    } else {
        // 显示今日进度
        const totalRecords = Object.values(data.learningRecords).flat().filter(r =>
            new Date(r.timestamp).toDateString() === today
        );
        const correctCount = totalRecords.filter(r => r.correct).length;
        const progress = totalRecords.length;
        const accuracy = progress > 0 ? Math.round((correctCount / progress) * 100) : 0;
        const questionsGoal = existingGoal.questions || 20;
        const accuracyGoal = existingGoal.accuracy || 80;
        const typeNames = { chord: '和弦', interval: '音程', single: '单音' };
        const typesText = (existingGoal.types || []).map(t => typeNames[t]).join('、');

        const questionsPercent = Math.min(100, Math.round((progress / questionsGoal) * 100));
        const accuracyMet = accuracy >= accuracyGoal;

        container.innerHTML = `
            <div class="goals-progress">
                <h4>📊 今日学习进度</h4>
                <div class="goal-info-row">
                    <span>练习类型：${typesText}</span>
                    <span>📅 ${new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })}</span>
                </div>
                
                <div class="progress-section">
                    <div class="progress-label">
                        <span>完成题数</span>
                        <span class="progress-current">${progress}/${questionsGoal}</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${questionsPercent}%;"></div>
                    </div>
                </div>
                
                <div class="progress-section">
                    <div class="progress-label">
                        <span>当前正确率</span>
                        <span class="${accuracyMet ? 'progress-success' : 'progress-warning'}">${accuracy}% / ${accuracyGoal}%</span>
                    </div>
                </div>
                
                <div class="goal-status ${progress >= questionsGoal && accuracyMet ? 'achieved' : ''}">
                    ${progress >= questionsGoal && accuracyMet ?
                '🎉 恭喜达成今日目标！' :
                progress >= questionsGoal ?
                    '✅ 题数已完成，继续提升正确率！' :
                    '💪 继续加油，距离目标还差 ' + (questionsGoal - progress) + ' 题'
            }
                </div>
                
                ${progress >= questionsGoal && accuracyMet ? `
                    <button class="modal-btn primary" style="width:100%; margin-top:16px;" onclick="resetDailyGoal()">重新设定目标</button>
                ` : ''}
            </div>
        `;
    }
}

// 设置目标选项交互
function setupGoalOptions() {
    const questionsGroup = document.getElementById('goal-questions');
    const accuracyGroup = document.getElementById('goal-accuracy');
    const typesGroup = document.getElementById('goal-types');

    if (questionsGroup) {
        questionsGroup.querySelectorAll('.goal-option').forEach(btn => {
            btn.onclick = () => {
                questionsGroup.querySelectorAll('.goal-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            };
        });
    }

    if (accuracyGroup) {
        accuracyGroup.querySelectorAll('.goal-option').forEach(btn => {
            btn.onclick = () => {
                accuracyGroup.querySelectorAll('.goal-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            };
        });
    }

    if (typesGroup) {
        typesGroup.querySelectorAll('.goal-option').forEach(btn => {
            btn.onclick = () => {
                btn.classList.toggle('active');
            };
        });
    }
}

// 保存每日目标
function saveDailyGoal() {
    const questionsGroup = document.getElementById('goal-questions');
    const accuracyGroup = document.getElementById('goal-accuracy');
    const typesGroup = document.getElementById('goal-types');

    if (!questionsGroup) return;

    const selectedQuestions = questionsGroup.querySelector('.active')?.dataset.value || '20';
    const selectedAccuracy = accuracyGroup.querySelector('.active')?.dataset.value || '80';
    const selectedTypes = Array.from(typesGroup.querySelectorAll('.active')).map(b => b.dataset.type);

    if (selectedTypes.length === 0) {
        alert('请至少选择一种练习类型');
        return;
    }

    const data = learningManager.init();
    const today = new Date().toDateString();

    data.dailyGoals = data.dailyGoals || {};
    data.dailyGoals[today] = {
        questions: parseInt(selectedQuestions),
        accuracy: parseInt(selectedAccuracy),
        types: selectedTypes,
        createdAt: Date.now()
    };

    learningManager.saveData(data);
    alert('🎯 目标设定成功！开始练习吧！');
    showDailyGoals(); // 刷新显示进度
}

// 重置每日目标
function resetDailyGoal() {
    if (confirm('确定要重新设定今日目标吗？')) {
        const data = learningManager.init();
        const today = new Date().toDateString();
        if (data.dailyGoals) {
            delete data.dailyGoals[today];
            learningManager.saveData(data);
        }
        showDailyGoals();
    }
}

// ==================== 每日签到功能 ====================

// 签到数据存储键
const SIGNIN_KEY = 'earTraining_signinData';

// 获取签到数据
function getSigninData() {
    try {
        const data = localStorage.getItem(SIGNIN_KEY);
        return data ? JSON.parse(data) : { signinDays: [], streak: 0, totalDays: 0, lastSigninDate: null };
    } catch (e) {
        return { signinDays: [], streak: 0, totalDays: 0, lastSigninDate: null };
    }
}

// 保存签到数据
function saveSigninData(data) {
    localStorage.setItem(SIGNIN_KEY, JSON.stringify(data));
}

// 显示每日签到弹窗
function showSignInModal() {
    const container = document.getElementById('signin-modal-content');
    const btn = document.getElementById('signin-btn');
    if (!container) return;

    const data = getSigninData();
    const today = new Date().toDateString();
    const hasSignedToday = data.signinDays.includes(today);

    // 计算7天签到状态
    const weekDays = [];
    const todayObj = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(todayObj);
        date.setDate(date.getDate() - i);
        const dateStr = date.toDateString();
        weekDays.push({
            date: dateStr,
            label: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()],
            hasSigned: data.signinDays.includes(dateStr),
            isToday: dateStr === today
        });
    }

    container.innerHTML = `
        <div class="signin-header">
            <div class="signin-streak">
                <span class="streak-icon">🔥</span>
                <span class="streak-number">${data.streak}</span>
                <span class="streak-label">天连续签到</span>
            </div>
            <div class="signin-total">
                累计签到 <strong>${data.totalDays}</strong> 天
            </div>
        </div>

        <div class="signin-week">
            ${weekDays.map(day => `
                <div class="signin-day ${day.hasSigned ? 'signed' : ''} ${day.isToday ? 'today' : ''}">
                    <div class="day-label">周${day.label}</div>
                    <div class="day-circle">${day.hasSigned ? '✓' : day.isToday ? '●' : ''}</div>
                    <div class="day-date">${new Date(day.date).getMonth() + 1}/${new Date(day.date).getDate()}</div>
                </div>
            `).join('')}
        </div>

        <div class="signin-status ${hasSignedToday ? 'signed' : ''}">
            ${hasSignedToday ? '🎉 今日已签到，明天继续加油！' : '点击"立即签到"开启今日学习'}
        </div>

        <div class="signin-tips">
            <h4>💡 签到奖励</h4>
            <ul>
                <li>连续7天：解锁"坚持不懈"徽章</li>
                <li>连续30天：解锁"学习达人"徽章</li>
                <li>累计100天：解锁"听音大师"徽章</li>
            </ul>
        </div>
    `;

    // 更新按钮状态
    if (hasSignedToday) {
        btn.textContent = '已签到 ✓';
        btn.disabled = true;
        btn.style.opacity = '0.6';
    } else {
        btn.textContent = '立即签到';
        btn.disabled = false;
        btn.style.opacity = '1';
    }
}

// 执行签到
function doSignIn() {
    const data = getSigninData();
    const today = new Date().toDateString();

    if (data.signinDays.includes(today)) {
        alert('今日已签到！');
        return;
    }

    // 添加今日签到
    data.signinDays.push(today);
    data.totalDays++;

    // 计算连续签到天数
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (data.lastSigninDate === yesterdayStr) {
        data.streak++;
    } else if (data.lastSigninDate !== today) {
        data.streak = 1;
    }

    data.lastSigninDate = today;

    // 只保留最近90天的签到记录
    if (data.signinDays.length > 90) {
        data.signinDays = data.signinDays.slice(-90);
    }

    saveSigninData(data);

    // 奖励提示
    let rewardMsg = '签到成功！';
    if (data.streak === 7) rewardMsg += ' 🎉 恭喜连续7天，获得"坚持不懈"徽章！';
    if (data.streak === 30) rewardMsg += ' 🏆 连续30天，获得"学习达人"徽章！';
    if (data.totalDays >= 100) rewardMsg += ' 💎 累计100天，获得"听音大师"徽章！';

    alert(rewardMsg);
    showSignInModal();
}

// ==================== 学习时长统计功能 ====================

// 显示学习时长统计
function showTimeStats() {
    const container = document.getElementById('time-stats-content');
    if (!container) return;

    const data = learningManager.init();
    const stats = calculateTimeStats(data);

    container.innerHTML = `
        <div class="time-stats-overview">
            <div class="time-stat-card">
                <div class="time-stat-icon">⏱️</div>
                <div class="time-stat-value">${formatTime(stats.totalTime)}</div>
                <div class="time-stat-label">总学习时长</div>
            </div>
            <div class="time-stat-card">
                <div class="time-stat-icon">📅</div>
                <div class="time-stat-value">${stats.totalDays}</div>
                <div class="time-stat-label">学习天数</div>
            </div>
            <div class="time-stat-card">
                <div class="time-stat-icon">📊</div>
                <div class="time-stat-value">${formatTime(stats.avgDailyTime)}</div>
                <div class="time-stat-label">日均时长</div>
            </div>
        </div>

        <div class="time-stats-section">
            <h4>📈 各模块学习时长</h4>
            <div class="time-type-bars">
                ${Object.entries(stats.typeTime).map(([type, time]) => {
        const typeNames = { single: '单音', interval: '音程', chord: '和弦', rhythm: '节奏', melody: '旋律' };
        const maxTime = Math.max(...Object.values(stats.typeTime));
        const percent = maxTime > 0 ? (time / maxTime) * 100 : 0;
        return `
                        <div class="time-type-item">
                            <span class="time-type-name">${typeNames[type] || type}</span>
                            <div class="time-type-bar-container">
                                <div class="time-type-bar" style="width: ${percent}%;"></div>
                            </div>
                            <span class="time-type-value">${formatTime(time)}</span>
                        </div>
                    `;
    }).join('')}
            </div>
        </div>

        <div class="time-stats-section">
            <h4>📅 最近7天学习时长</h4>
            <div class="time-week-chart">
                ${stats.dailyTime.map(day => `
                    <div class="time-week-item">
                        <div class="time-week-bar" style="height: ${day.percent}%;"></div>
                        <div class="time-week-label">${day.label}</div>
                        <div class="time-week-value">${day.shortTime}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="time-tips">
            <h4>💡 学习建议</h4>
            <p>${generateTimeTip(stats)}</p>
        </div>
    `;
}

// 计算时长统计
function calculateTimeStats(data) {
    const result = {
        totalTime: 0,
        totalDays: 0,
        avgDailyTime: 0,
        typeTime: { single: 0, interval: 0, chord: 0, rhythm: 0, melody: 0 },
        dailyTime: []
    };

    // 计算各类型题目数量作为时长估算
    const typeQuestionCounts = {};
    for (const type of ['single', 'interval', 'chord', 'rhythm', 'melody']) {
        const records = data.learningRecords[type] || [];
        typeQuestionCounts[type] = records.length;
        // 每题平均约30秒
        result.typeTime[type] = records.length * 30;
        result.totalTime += records.length * 30;
    }

    // 计算天数
    const studyDates = new Set();
    for (const records of Object.values(data.learningRecords)) {
        records.forEach(r => studyDates.add(r.date));
    }
    result.totalDays = studyDates.size;
    result.avgDailyTime = result.totalDays > 0 ? Math.round(result.totalTime / result.totalDays) : 0;

    // 计算最近7天每日时长
    const today = new Date();
    let maxDailyTime = 0;
    const allTypes = ['single', 'interval', 'chord', 'rhythm', 'melody'];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toLocaleDateString('zh-CN');
        const dayOfWeek = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];

        let dayTime = 0;
        for (const type of allTypes) {
            const records = data.learningRecords[type] || [];
            const dayRecords = records.filter(r => r.date === dateStr);
            dayTime += dayRecords.length * 30;
        }

        maxDailyTime = Math.max(maxDailyTime, dayTime);

        result.dailyTime.push({
            date: dateStr,
            label: i === 0 ? '今天' : '周' + dayOfWeek,
            time: dayTime,
            shortTime: dayTime > 0 ? Math.round(dayTime / 60) + '分' : '-',
            percent: maxDailyTime > 0 ? (dayTime / maxDailyTime) * 100 : 0
        });
    }

    return result;
}

// 格式化时间
function formatTime(seconds) {
    if (seconds === 0) return '0分钟';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
        return `${hours}小时${minutes}分`;
    }
    return `${minutes}分钟`;
}

// 生成时长建议
function generateTimeTip(stats) {
    if (stats.totalDays === 0) {
        return '欢迎开始学习！建议每天至少练习15-30分钟，循序渐进提升听觉能力。';
    }
    if (stats.avgDailyTime < 15 * 60) {
        return '日均学习时间较短，建议每天增加到30分钟以上，保持规律学习节奏效果更佳。';
    }
    if (stats.avgDailyTime < 60 * 60) {
        return '学习时间适中，建议保持当前节奏。可以尝试将学习时间分成两次，每次30分钟左右。';
    }
    return '学习时间充足！注意适当休息，避免过度疲劳影响学习效果。建议每学习45分钟休息5-10分钟。';
}

// ==================== 音乐小知识功能 ====================

// 音乐小知识库
const musicKnowledgeDaily = [
    {
        category: '听辨技巧',
        title: '如何区分大小三和弦？',
        content: '听辨大小三和弦的关键在于三音：大三和弦的三音偏高（明亮感），小三和弦的三音偏低（柔和感）。可以通过"啦啦"（大三）和"呜呜"（小三）来辅助记忆。',
        tip: '💡 练习建议：先听根音，再关注三音的高低位置'
    },
    {
        category: '乐理知识',
        title: '什么是等音？',
        content: '等音是指音名不同但音高相同的音。例如升C（C#）和降D（Db）在钢琴上是同一个键。在实际演奏和听辨中，等音会根据调性语境有不同的写法。',
        tip: '💡 记忆方法：在自然大调中，7个基本音是CDEFGAB，等音是它们的升降形式'
    },
    {
        category: '听辨技巧',
        title: '纯五度的音响特征',
        content: '纯五度是最协和的音程之一，听起来像钟声或钟声响起的空旷感觉。两个音融合度非常高，有时甚至像一个音。可以用《小星星》开头的"一闪一闪"来记忆。',
        tip: '💡 训练方法：先听低音，再感受高音的泛音共鸣'
    },
    {
        category: '乐理知识',
        title: '大调式与小调式的区别',
        content: '大调式：明亮、开阔，结构为"全全半全全全半"。小调式：暗淡、忧郁，结构为"全半全全半全全"。区分关键在于第3、6、7音（大调比小调高一个半音）。',
        tip: '💡 听辨技巧：先听主音到三音的距离，大三度=大调，小三度=小调'
    },
    {
        category: '学习方法',
        title: '如何高效练习视唱练耳？',
        content: '1. 从简单到复杂：先单音→再音程→最后和弦\n2. 每日坚持：15-30分钟集中练习\n3. 错题反复：错误的题目要反复听\n4. 结合理论：理解乐理有助于听辨\n5. 使用乐器辅助：钢琴验证答案',
        tip: '💡 最佳时间：建议在注意力集中的时段练习'
    },
    {
        category: '乐理知识',
        title: '和声功能基础',
        content: '主功能（T）：稳定，和弦I级；下属功能（S）：不稳定，和弦IV级；属功能（D）：最不稳定，和弦V级。终止公式：D→T（正格终止）、S→T（变格终止）。',
        tip: '💡 听觉感受：主和弦像"回家"，属和弦像"需要解决"'
    },
    {
        category: '听辨技巧',
        title: '如何识别音程转位？',
        content: '原位音程：低音到高音。转位音程：高音到低音。转位规律：大变小，小变大，纯变纯，增变减，减变增。度数：原位+转位=9度。',
        tip: '💡 快速计算：转位音程=9-原音程度数'
    },
    {
        category: '音乐家故事',
        title: '贝多芬的听觉训练',
        content: '贝多芬在晚年失聪后，仍能创作伟大的交响乐作品。他通过在钢琴上放置木棍，用牙齿咬着木棍来"听"振动，继续进行音乐创作。这告诉我们，听觉训练可以通过多种方式进行。',
        tip: '💡 启示：用心去感受音乐，触觉和想象也是学习的一部分'
    },
    {
        category: '乐理知识',
        title: '七和弦的种类',
        content: '常见七和弦：大小七和弦（属七）、大大七和弦（大七）、小小七和弦（小七）、减小七和弦（半减七）、减减七和弦（减七）。每种都有独特的色彩和功能。',
        tip: '💡 记忆口诀：大小七=大三+小七，大大七=大三+大七'
    },
    {
        category: '学习方法',
        title: '建立音乐听觉记忆',
        content: '听觉记忆是视唱练耳的核心能力。方法包括：\n1. 模唱练习：跟着钢琴唱\n2. 背谱：背诵简单旋律\n3. 听写：记录听到的音\n4. 移调：将旋律转到不同调性\n5. 分析：理解和声结构',
        tip: '💡 每日5分钟模唱，长期效果显著'
    }
];

// 显示每日音乐小知识
function showDailyKnowledge() {
    const container = document.getElementById('knowledge-content');
    if (!container) return;
    getDailyKnowledge(container);
}

// 获取并显示小知识
function getDailyKnowledge(container) {
    if (!container) {
        container = document.getElementById('knowledge-content');
    }
    if (!container) return;

    // 随机选取一条
    const index = Math.floor(Math.random() * musicKnowledgeDaily.length);
    const knowledge = musicKnowledgeDaily[index];

    container.innerHTML = `
        <div class="knowledge-card">
            <div class="knowledge-category">${knowledge.category}</div>
            <h4 class="knowledge-title">${knowledge.title}</h4>
            <p class="knowledge-content">${knowledge.content.replace(/\n/g, '<br>')}</p>
            <div class="knowledge-tip">${knowledge.tip}</div>
        </div>
        <div class="knowledge-footer">
            <span>🎵 每天学一点，进步看得见</span>
        </div>
    `;
}

// ==================== 学习计划功能 ====================

// 显示学习计划
function showStudyPlan() {
    const container = document.getElementById('plan-content');
    if (!container) return;

    const data = learningManager.init();
    const plan = generateStudyPlan(data);

    container.innerHTML = `
        <div class="plan-header">
            <h4>📋 个性化学习计划</h4>
            <p>基于您的学习数据，AI为您制定以下学习计划</p>
        </div>

        <div class="plan-section">
            <div class="plan-section-title">🎯 本周学习目标</div>
            <div class="plan-goals">
                ${plan.weeklyGoals.map(goal => `
                    <div class="plan-goal-item">
                        <div class="plan-goal-icon">${goal.icon}</div>
                        <div class="plan-goal-info">
                            <div class="plan-goal-name">${goal.name}</div>
                            <div class="plan-goal-desc">${goal.desc}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="plan-section">
            <div class="plan-section-title">📅 每日练习安排</div>
            <div class="plan-schedule">
                ${plan.dailySchedule.map(item => `
                    <div class="plan-schedule-item">
                        <span class="schedule-time">${item.time}</span>
                        <span class="schedule-content">${item.content}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="plan-section">
            <div class="plan-section-title">📈 重点提升方向</div>
            <div class="plan-focus">
                ${plan.focusAreas.map(area => `
                    <div class="plan-focus-item">
                        <div class="focus-type">${area.type}</div>
                        <div class="focus-content">${area.content}</div>
                        <div class="focus-priority" style="background: ${area.priorityColor};">${area.priority}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="plan-section">
            <div class="plan-section-title">💡 学习小贴士</div>
            <div class="plan-tips">
                ${plan.tips.map(tip => `<p>${tip}</p>`).join('')}
            </div>
        </div>
    `;
}

// 生成学习计划
function generateStudyPlan(data) {
    const typeNames = { single: '单音', interval: '音程', chord: '和弦' };

    // 分析学习数据
    const stats = {};
    for (const type of ['single', 'interval', 'chord']) {
        const records = data.learningRecords[type] || [];
        const correct = records.filter(r => r.correct).length;
        stats[type] = {
            total: records.length,
            accuracy: records.length > 0 ? Math.round((correct / records.length) * 100) : 0
        };
    }

    // 找出最薄弱的类型
    const weakestType = Object.entries(stats).reduce((a, b) => {
        if (b[1].total === 0) return a;
        if (a[1].total === 0) return b;
        return a[1].accuracy < b[1].accuracy ? a : b;
    })[0];

    // 生成周目标
    const weeklyGoals = [
        { icon: '📝', name: '每日练习', desc: '每天完成30分钟听音练习' },
        { icon: '🎯', name: '错题复习', desc: '每周复习所有错题至少2次' },
        { icon: '⬆️', name: '难度提升', desc: '正确率达到85%时挑战更高难度' }
    ];

    if (stats[weakestType].total > 0 && stats[weakestType].accuracy < 80) {
        weeklyGoals.push({
            icon: '🔥',
            name: `重点加强${typeNames[weakestType]}`,
            desc: `${typeNames[weakestType]}正确率${stats[weakestType].accuracy}%，需重点提升`
        });
    }

    // 每日练习安排
    const dailySchedule = [
        { time: '10分钟', content: '热身练习 - 听音程（纯五度、八度）' },
        { time: '15分钟', content: `${typeNames[weakestType]}专项练习` },
        { time: '10分钟', content: '复习错题本中的错误题目' },
        { time: '5分钟', content: '总结今日学习收获' }
    ];

    // 重点提升方向
    const focusAreas = [];
    for (const type of ['single', 'interval', 'chord']) {
        if (stats[type].total > 0) {
            const level = stats[type].accuracy >= 85 ? '已掌握' :
                stats[type].accuracy >= 60 ? '需加强' : '重点提升';
            const color = stats[type].accuracy >= 85 ? '#4db6ac' :
                stats[type].accuracy >= 60 ? '#ffb347' : '#e74c3c';
            focusAreas.push({
                type: typeNames[type],
                content: `正确率${stats[type].accuracy}%，${level}`,
                priority: level,
                priorityColor: color
            });
        }
    }

    if (focusAreas.length === 0) {
        focusAreas.push({
            type: '全部类型',
            content: '开始学习后将生成个性化分析',
            priority: '待统计',
            priorityColor: '#888'
        });
    }

    // 学习小贴士
    const tips = [
        '🎵 最佳学习时段：上午10-11点，下午3-4点',
        '💪 每次学习不超过45分钟，避免听觉疲劳',
        '📝 听辨前先在心中默唱标准音高，建立音准参考',
        '🎹 练习后用钢琴验证答案，强化听觉记忆'
    ];

    return { weeklyGoals, dailySchedule, focusAreas, tips };
}

// 生成新计划（重新生成随机建议）
function generateNewPlan() {
    showStudyPlan();
}

// ==================== 综合考试模块 ====================

// --- 配置常量 ---
// 7 种考试题型元数据
const EXAM_QUESTION_TYPES = [
    { type: 'single', name: '单音听辨', unit: '个', defaultCount: 10, defaultScore: 1, defaultDifficulty: 1, difficultySource: 'scale', difficultyLevels: 8, scoreModel: 'perCount' },
    { type: 'interval-pitch', name: '音程音准听辨', unit: '个', defaultCount: 10, defaultScore: 2, defaultDifficulty: 1, difficultySource: 'scale', difficultyLevels: 8, scoreModel: 'perCount' },
    { type: 'interval-quality', name: '音程性质听辨', unit: '个', defaultCount: 10, defaultScore: 2, defaultDifficulty: 1, difficultySource: 'interval', difficultyLevels: 3, scoreModel: 'perCount' },
    { type: 'chord-pitch', name: '和弦音准听辨', unit: '个', defaultCount: 10, defaultScore: 3, defaultDifficulty: 1, difficultySource: 'chord', difficultyLevels: 3, scoreModel: 'perCount' },
    { type: 'chord-quality', name: '和弦性质听辨', unit: '个', defaultCount: 10, defaultScore: 3, defaultDifficulty: 1, difficultySource: 'chord', difficultyLevels: 3, scoreModel: 'perCount' },
    { type: 'rhythm', name: '节奏听辨', unit: '小节', defaultCount: 4, defaultScore: 2, defaultDifficulty: 1, difficultySource: 'rhythm', difficultyLevels: 3, scoreModel: 'perCountPlus1' },
    { type: 'melody', name: '旋律听辨', unit: '小节', defaultCount: 8, defaultScore: 2, defaultDifficulty: 1, difficultySource: 'scale', difficultyLevels: 8, scoreModel: 'perCountPlus2' }
];
// scoreModel: perCount=count*score | perCountPlus1=(count+1)*score (timeSig) | perCountPlus2=(count+2)*score (key+timeSig)

// 默认考卷（6题）
function buildDefaultExamPaper() {
    return [
        { id: 1, type: 'single', count: 10, score: 1, difficulty: 1 },
        { id: 2, type: 'interval-pitch', count: 10, score: 2, difficulty: 1 },
        { id: 3, type: 'chord-pitch', count: 10, score: 3, difficulty: 1 },
        { id: 4, type: 'rhythm', count: 4, score: 2, difficulty: 1 },
        { id: 5, type: 'chord-quality', count: 10, score: 3, difficulty: 1 },
        { id: 6, type: 'melody', count: 8, score: 2, difficulty: 1 }
    ];
}

function getExamTypeMeta(type) { return EXAM_QUESTION_TYPES.find(t => t.type === type); }

function getExamItemScore(q) {
    const meta = getExamTypeMeta(q.type);
    if (!meta) return 0;
    if (meta.scoreModel === 'perCount') return q.count * q.score;
    if (meta.scoreModel === 'perCountPlus1') return (q.count + 1) * q.score;
    if (meta.scoreModel === 'perCountPlus2') return (q.count + 2) * q.score;
    return 0;
}

function getDifficultyOptions(difficultySource) {
    if (difficultySource === 'scale') {
        const arr = [];
        for (let i = 1; i <= 8; i++) arr.push({ value: i, label: scaleDifficultyConfig[i].name });
        return arr;
    }
    if (difficultySource === 'chord') {
        const arr = [];
        for (let i = 1; i <= 3; i++) arr.push({ value: i, label: difficultyConfig[i].name });
        return arr;
    }
    if (difficultySource === 'interval') {
        const arr = [];
        for (let i = 1; i <= 3; i++) arr.push({ value: i, label: intervalLevelConfig[i].name });
        return arr;
    }
    if (difficultySource === 'rhythm') {
        return [
            { value: 1, label: '简单（基础节奏型）' },
            { value: 2, label: '中等（含切分附点）' },
            { value: 3, label: '困难（含复杂节奏型）' }
        ];
    }
    return [];
}

const EXAM_NOTES = [];
for (let oct = 3; oct <= 5; oct++) {
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].forEach(n => {
        if (oct === 3 && !['G', 'G#', 'A', 'A#', 'B'].includes(n)) return;
        if (oct === 5 && !['C', 'C#', 'D', 'D#', 'E', 'F'].includes(n)) return;
        EXAM_NOTES.push(n + oct);
    });
}

const EXAM_CHORD_TYPES = [
    { name: '大三', intervals: [0, 4, 7] }, { name: '小三', intervals: [0, 3, 7] },
    { name: '增三', intervals: [0, 4, 8] }, { name: '减三', intervals: [0, 3, 6] },
    { name: '大七', intervals: [0, 4, 7, 11] }, { name: '属七', intervals: [0, 4, 7, 10] },
    { name: '小七', intervals: [0, 3, 7, 10] }, { name: '半减七', intervals: [0, 3, 6, 10] },
    { name: '减七', intervals: [0, 3, 6, 9] }
];

const EXAM_RHYTHM_1BEAT = ['四分', '2个八分', '4个十六分', '前十六', '后十六', '小切分', '小附点', '小后附点', '三连音'];
const EXAM_RHYTHM_2BEAT = ['二分', '八分大切分', '十六分大切分', '前十六大切分', '后十六大切分', '八分大附点', '八分大后附点', '十六分大附点', '十六分大后附点'];

const EXAM_KEYS = [
    { value: 'C', name: 'C大调', scale: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
    { value: 'G', name: 'G大调', scale: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'] },
    { value: 'F', name: 'F大调', scale: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'] },
    { value: 'D', name: 'D大调', scale: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'] },
    { value: 'a', name: 'a小调', scale: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
    { value: 'e', name: 'e小调', scale: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'] },
    { value: 'd', name: 'd小调', scale: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'] }
];

const examState = {
    phase: 'setup', questions: [], currentQIndex: 0, currentPlayIndex: 0,
    isPlaying: false, skipRequested: false, stopRequested: false,
    countdownTimer: null, elapsedTimer: null, elapsedTime: 0,
    score: 0, scoreBreakdown: [], testStartTime: null, testEndTime: null, leaderboard: [],
    answers: null, currentQuestion: 1, selectedMeasure: -1, selectedBeat: -1,
    jumpToNextQ: false, rhythmTab: '1beat',
    melodyDuration: 'q', melodyDots: 0, melodyKeySig: 'none',
    melodyScaleType: 'major', melodyCurrentPitch: null,
    examPaper: buildDefaultExamPaper()
};

// --- 初始化 ---
function initExamPage() {
    const back = document.getElementById('back-home-exam');
    if (back) back.onclick = () => pageManager.switchToPage('home-page');
    const start = document.getElementById('start-exam-btn');
    if (start) start.onclick = () => startExam();
    const submit = document.getElementById('submit-exam-btn');
    if (submit) submit.onclick = () => submitExamAnswers();
    const replay = document.getElementById('exam-replay-btn');
    if (replay) replay.onclick = () => { examState.skipRequested = true; };
    const skip = document.getElementById('exam-skip-btn');
    if (skip) skip.onclick = () => { examState.jumpToNextQ = true; examState.skipRequested = true; };
    const stop = document.getElementById('exam-stop-btn');
    if (stop) stop.onclick = () => { examState.stopRequested = true; };
    const setupTab = document.getElementById('setup-btn-exam');
    if (setupTab) setupTab.onclick = () => showExamTab('setup');
    const lbTab = document.getElementById('leaderboard-btn-exam');
    if (lbTab) lbTab.onclick = () => showExamTab('leaderboard');
    renderExamConfig();
    renderExamLeaderboard();
}

function showExamTab(tab) {
    const setupBtn = document.getElementById('setup-btn-exam');
    const lbBtn = document.getElementById('leaderboard-btn-exam');
    const setupSec = document.getElementById('exam-setup-section');
    const lbSec = document.getElementById('leaderboard-content-exam');
    if (tab === 'setup') {
        if (setupBtn) setupBtn.classList.add('active');
        if (lbBtn) lbBtn.classList.remove('active');
        if (setupSec) setupSec.style.display = 'block';
        if (lbSec) lbSec.style.display = 'none';
    } else {
        if (setupBtn) setupBtn.classList.remove('active');
        if (lbBtn) lbBtn.classList.add('active');
        if (setupSec) setupSec.style.display = 'none';
        if (lbSec) lbSec.style.display = 'block';
        renderExamLeaderboard();
    }
}

function renderExamConfig() {
    const el = document.getElementById('exam-config-table');
    if (!el) return;
    let html = '';
    const paper = examState.examPaper;
    paper.forEach((q, idx) => {
        const meta = getExamTypeMeta(q.type);
        if (!meta) return;
        // Type select: 7 options
        let typeOptions = '';
        EXAM_QUESTION_TYPES.forEach(t => {
            typeOptions += `<option value="${t.type}" ${q.type === t.type ? 'selected' : ''}>${t.name}</option>`;
        });
        // Difficulty select: based on difficultySource
        const diffOpts = getDifficultyOptions(meta.difficultySource);
        let diffOptions = '';
        diffOpts.forEach(d => {
            diffOptions += `<option value="${d.value}" ${q.difficulty === d.value ? 'selected' : ''}>${d.label}</option>`;
        });
        // Count select
        let countOptions = '';
        const countStart = meta.unit === '小节' ? 2 : 5;
        const countEnd = meta.unit === '小节' ? 16 : 30;
        const countStep = meta.unit === '小节' ? 2 : 5;
        for (let c = countStart; c <= countEnd; c += countStep) {
            countOptions += `<option value="${c}" ${q.count === c ? 'selected' : ''}>${c}</option>`;
        }
        // Score select
        let scoreOptions = '';
        for (let s = 1; s <= 5; s++) {
            scoreOptions += `<option value="${s}" ${q.score === s ? 'selected' : ''}>${s}分</option>`;
        }
        const itemTotal = getExamItemScore(q);
        html += `<div class="exam-config-row">
            <span class="q-name">第${idx + 1}题</span>
            <select class="q-type-select" onchange="setExamPaperField(${idx}, 'type', this.value)">${typeOptions}</select>
            <select class="q-difficulty-select" onchange="setExamPaperField(${idx}, 'difficulty', parseInt(this.value))">${diffOptions}</select>
            <span class="q-unit">${meta.unit}</span>
            <select class="q-count-select" onchange="setExamPaperField(${idx}, 'count', parseInt(this.value))">${countOptions}</select>
            <select class="q-score-select" onchange="setExamPaperField(${idx}, 'score', parseInt(this.value))">${scoreOptions}</select>
            <span class="q-total">${itemTotal}分</span>
        </div>`;
    });
    el.innerHTML = html;
    updateExamTotalScore();
}

function setExamPaperField(idx, field, val) {
    const q = examState.examPaper[idx];
    if (!q) return;
    // When changing type, reset count/score/difficulty to defaults
    if (field === 'type') {
        const meta = getExamTypeMeta(val);
        if (meta) {
            q.count = meta.defaultCount;
            q.score = meta.defaultScore;
            q.difficulty = meta.defaultDifficulty;
        }
    }
    q[field] = val;
    renderExamConfig();
}

function updateExamTotalScore() {
    let total = 0;
    examState.examPaper.forEach(q => { total += getExamItemScore(q); });
    const el = document.getElementById('exam-total-score');
    if (el) el.textContent = total;
}

// --- 题目生成 ---
function generateExamQuestions() {
    const paper = examState.examPaper;
    const questions = [];
    paper.forEach((q, idx) => {
        if (q.type === 'single') questions.push({ paperIdx: idx, ...q, data: _genSingle(q.count, q.difficulty) });
        else if (q.type === 'interval-pitch') questions.push({ paperIdx: idx, ...q, data: _genInterval(q.count, q.difficulty) });
        else if (q.type === 'interval-quality') questions.push({ paperIdx: idx, ...q, data: _genIntervalQuality(q.count, q.difficulty) });
        else if (q.type === 'chord-pitch') questions.push({ paperIdx: idx, ...q, data: _genChord(q.count, q.difficulty) });
        else if (q.type === 'chord-quality') questions.push({ paperIdx: idx, ...q, data: _genChordQuality(q.count, q.difficulty) });
        else if (q.type === 'rhythm') questions.push({ paperIdx: idx, ...q, data: _genRhythm(null, q.count, q.difficulty) });
        else if (q.type === 'melody') questions.push({ paperIdx: idx, ...q, data: _genMelody(q.count, q.difficulty) });
    });
    return questions;
}

function _genIntervalQuality(count, difficulty) {
    // Generate intervals and mark quality name (correct answer)
    const semisPool = intervalLevelConfig[difficulty] ? intervalLevelConfig[difficulty].intervals : [1, 2, 3, 4];
    const out = [];
    const notePool = EXAM_NOTES;
    for (let i = 0; i < count; i++) {
        const n1 = notePool[Math.floor(Math.random() * Math.max(1, notePool.length - 8))];
        const st = semisPool[Math.floor(Math.random() * semisPool.length)];
        const f1 = getFrequency(n1), f2 = f1 * Math.pow(2, st / 12);
        let best = null, md = Infinity;
        for (const n of notePool) { const d = Math.abs(getFrequency(n) - f2); if (d < md) { md = d; best = n; } }
        const quality = getIntervalName(st);
        out.push({ note1: n1, note2: best, quality, semitones: st });
    }
    return out;
}

function _genChordQuality(count, difficulty) {
    const out = [];
    const chordPool = difficultyConfig[difficulty] ? difficultyConfig[difficulty].chords : EXAM_CHORD_TYPES.slice(0, 4);
    const roots = EXAM_NOTES.filter(n => { const o = parseInt(n.slice(-1)); return o === 4; });
    for (let i = 0; i < count; i++) {
        const type = chordPool[Math.floor(Math.random() * chordPool.length)];
        const root = roots[Math.floor(Math.random() * roots.length)];
        const rf = getFrequency(root);
        const notes = type.intervals.map(iv => {
            const f = rf * Math.pow(2, iv / 12);
            let best = null, md = Infinity;
            for (const n of EXAM_NOTES) { const d = Math.abs(getFrequency(n) - f); if (d < md) { md = d; best = n; } }
            return best;
        });
        out.push({ root, typeName: type.name, notes, quality: type.name });
    }
    return out;
}

function _genSingle(count, difficulty) {
    const notePool = scaleDifficultyConfig[difficulty] ? scaleDifficultyConfig[difficulty].notes : EXAM_NOTES;
    const out = [];
    for (let i = 0; i < count; i++) out.push(notePool[Math.floor(Math.random() * notePool.length)]);
    return out;
}

function _genInterval(count, difficulty) {
    const notePool = scaleDifficultyConfig[difficulty] ? scaleDifficultyConfig[difficulty].notes : EXAM_NOTES;
    const out = [];
    const semis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    for (let i = 0; i < count; i++) {
        const n1 = notePool[Math.floor(Math.random() * Math.max(1, notePool.length - 7))];
        const st = semis[Math.floor(Math.random() * semis.length)];
        const f1 = getFrequency(n1), f2 = f1 * Math.pow(2, st / 12);
        let best = null, md = Infinity;
        for (const n of notePool) { const d = Math.abs(getFrequency(n) - f2); if (d < md) { md = d; best = n; } }
        out.push({ note1: n1, note2: best });
    }
    return out;
}

function _genChord(count, difficulty) {
    const out = [];
    const chordPool = difficultyConfig[difficulty] ? difficultyConfig[difficulty].chords : EXAM_CHORD_TYPES.slice(0, 7);
    const roots = EXAM_NOTES.filter(n => { const o = parseInt(n.slice(-1)); return o === 4; });
    for (let i = 0; i < count; i++) {
        const type = chordPool[Math.floor(Math.random() * chordPool.length)];
        const root = roots[Math.floor(Math.random() * roots.length)];
        const rf = getFrequency(root);
        const notes = type.intervals.map(iv => {
            const f = rf * Math.pow(2, iv / 12);
            let best = null, md = Infinity;
            for (const n of EXAM_NOTES) { const d = Math.abs(getFrequency(n) - f); if (d < md) { md = d; best = n; } }
            return best;
        });
        out.push({ root, typeName: type.name, notes });
    }
    return out;
}

function _genRhythm(timeSig, bars, difficulty) {
    // timeSig=null => random 2/4 or 3/4 (考核项，不固定)
    const finalTimeSig = timeSig || (Math.random() > 0.5 ? '2/4' : '3/4');
    const bpb = parseInt(finalTimeSig.split('/')[0]);
    // Difficulty affects rhythm complexity
    let easy1 = ['四分', '2个八分'];
    let easy2 = ['二分'];
    let med1 = ['四分', '2个八分', '4个十六分', '前十六', '后十六', '小附点'];
    let med2 = ['二分', '八分大附点', '后十六大切分'];
    let hard1 = EXAM_RHYTHM_1BEAT;
    let hard2 = EXAM_RHYTHM_2BEAT;
    let pool1, pool2;
    if (difficulty <= 1) { pool1 = easy1; pool2 = easy2; }
    else if (difficulty === 2) { pool1 = med1; pool2 = med2; }
    else { pool1 = hard1; pool2 = hard2; }
    const measures = [];
    for (let m = 0; m < bars; m++) {
        const bar = []; let rem = bpb;
        while (rem > 0) {
            if (rem >= 2 && Math.random() > 0.6) { bar.push(pool2[Math.floor(Math.random() * pool2.length)]); rem -= 2; }
            else { bar.push(pool1[Math.floor(Math.random() * pool1.length)]); rem -= 1; }
        }
        measures.push(bar);
    }
    return { timeSignature: finalTimeSig, bars, measures };
}

function _genMelody(bars, difficulty) {
    // Use scale difficulty to determine key
    const scaleConfig = scaleDifficultyConfig[difficulty] || scaleDifficultyConfig[1];
    const scaleKeys = Object.keys(scaleConfig.scales);
    const selectedScale = scaleKeys[Math.floor(Math.random() * scaleKeys.length)];
    const scaleNotes = scaleConfig.scales[selectedScale];
    // Find matching EXAM_KEYS entry or create one
    let key = EXAM_KEYS.find(k => k.name === selectedScale);
    if (!key) {
        const match = selectedScale.match(/^([A-G][#b]?)/);
        const keyValue = match ? match[1] : 'C';
        key = { value: keyValue, name: selectedScale, scale: scaleNotes };
    }
    const timeSig = Math.random() > 0.5 ? '2/4' : '3/4';
    const bpb = parseInt(timeSig.split('/')[0]);
    const measures = [];
    const notes = [];

    // Reverse lookup: duration key → rhythm pattern label
    const DURATION_TO_RHYTHM = {};
    Object.keys(RHYTHM_DURATION_MAP).forEach(pat => {
        const arr = RHYTHM_DURATION_MAP[pat];
        if (arr.length === 1) {
            DURATION_TO_RHYTHM[arr[0].duration + (arr[0].dots || 0)] = pat;
        }
    });
    const rhythmForDur = (dur, dots) => {
        const k = dur + (dots || 0);
        if (DURATION_TO_RHYTHM[k]) return DURATION_TO_RHYTHM[k];
        const map = { 'w': '全音', 'h': '二分', 'q': '四分', '8': '八分', '16': '十六分', 'h.': '附点二分', 'q.': '附点四分', '8.': '附点八分', 'triplet': '三连音' };
        return map[dur] || dur;
    };

    for (let m = 0; m < bars; m++) {
        const bar = [];
        let startBeat = 0;
        let rem = bpb;
        while (rem > 0.001) {
            let pat;
            let patBeats;
            if (rem >= 2 - 0.001 && Math.random() > 0.6) {
                pat = EXAM_RHYTHM_2BEAT[Math.floor(Math.random() * EXAM_RHYTHM_2BEAT.length)];
                patBeats = 2;
            } else {
                pat = EXAM_RHYTHM_1BEAT[Math.floor(Math.random() * EXAM_RHYTHM_1BEAT.length)];
                patBeats = 1;
            }
            const rn = RHYTHM_DURATION_MAP[pat];
            if (rn && rn.length > 0) {
                let subStart = 0;
                rn.forEach(n => {
                    const pitch = scaleNotes[Math.floor(Math.random() * scaleNotes.length)] + '4';
                    const nb = getNoteBeatsForDuration(n.duration, n.dots || 0);
                    const noteObj = {
                        pitch,
                        rhythm: rhythmForDur(n.duration, n.dots || 0),
                        duration: n.duration,
                        dots: n.dots || 0,
                        startBeat: startBeat + subStart
                    };
                    bar.push(noteObj);
                    notes.push({ pitch, duration: n.duration, beats: nb, dots: n.dots || 0 });
                    subStart += nb;
                });
            }
            startBeat += patBeats;
            rem -= patBeats;
        }
        measures.push(bar);
    }
    return { key: key.value, keyName: key.name, scale: key.scale, timeSignature: timeSig, bars, measures, notes };
}

// --- 播放 ---
function examSleep(ms) {
    return new Promise(resolve => {
        if (examState.stopRequested || ms <= 0) return resolve();
        const start = Date.now();
        const t = setInterval(() => {
            if (examState.skipRequested || examState.stopRequested || Date.now() - start >= ms) {
                clearInterval(t);
                // Keep skipRequested active when jumping to next question
                if (examState.skipRequested && !examState.jumpToNextQ) examState.skipRequested = false;
                resolve();
            }
        }, 100);
        examState._sleepTimer = t;
    });
}

function _updateStatus(text) { const el = document.getElementById('exam-status'); if (el) el.textContent = text; }
function _updateProgress(qIdx, pIdx) {
    const totalQs = examState.questions.length;
    const qEl = document.getElementById('exam-current-q'); if (qEl) qEl.textContent = `${qIdx + 1}/${totalQs}`;
    const pEl = document.getElementById('exam-current-play'); if (pEl) pEl.textContent = `${pIdx + 1}/4`;
    const nameEl = document.getElementById('exam-question-name');
    if (nameEl && examState.questions[qIdx]) {
        const meta = getExamTypeMeta(examState.questions[qIdx].type);
        nameEl.textContent = meta ? meta.name : `第${qIdx + 1}题`;
    }
    const fill = document.getElementById('exam-progress-fill');
    if (fill) {
        const total = totalQs * 4; const done = qIdx * 4 + pIdx;
        fill.style.width = (done / total * 100) + '%';
    }
}

function getBpmForType(type) {
    if (type === 'rhythm') return 60;
    if (type === 'melody') return 50;
    return 55; // single, interval-*, chord-*
}

function buildPlaySequence() {
    const qs = examState.questions;
    return qs.map(q => {
        const meta = getExamTypeMeta(q.type);
        const name = meta ? meta.name : q.type;
        const bpm = getBpmForType(q.type);
        let playFn;
        switch (q.type) {
            case 'single':
                playFn = () => _playSingleOnce(q.data, bpm); break;
            case 'interval-pitch':
                playFn = () => _playIntervalOnce(q.data, bpm); break;
            case 'interval-quality':
                playFn = () => _playIntervalOnce(q.data, bpm); break;
            case 'chord-pitch':
                playFn = () => _playChordOnce(q.data, bpm); break;
            case 'chord-quality':
                playFn = () => _playChordOnce(q.data, bpm); break;
            case 'rhythm':
                playFn = () => _playRhythmOnce(q.data, bpm); break;
            case 'melody':
                playFn = () => _playMelodyOnce(q.data, bpm); break;
            default:
                playFn = () => Promise.resolve();
        }
        return { name, play: playFn, type: q.type };
    });
}

async function startExam() {
    await ensureAudioReady();
    try { await Tone.start(); } catch (e) { console.warn('Tone.start failed:', e); }
    examState.questions = generateExamQuestions();
    examState.phase = 'playing';
    examState.stopRequested = false;
    examState.skipRequested = false;
    examState.jumpToNextQ = false;
    examState.testStartTime = new Date();
    examState.elapsedTime = 0;
    // Start elapsed timer
    examState.elapsedTimer = setInterval(() => {
        examState.elapsedTime++;
        const el = document.getElementById('exam-elapsed');
        if (el) {
            const m = Math.floor(examState.elapsedTime / 60);
            const s = examState.elapsedTime % 60;
            el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }
    }, 1000);

    // Show playing section and answer sheet
    document.getElementById('exam-setup-section').style.display = 'none';
    document.getElementById('exam-playing-section').style.display = 'block';
    document.getElementById('exam-answering-section').style.display = 'block';
    document.getElementById('exam-result-section').style.display = 'none';

    // Initialize answers and show answer sheet alongside playing controls
    initExamAnswers();
    showAnswerSheet();

    await playExamSequence();

    if (examState.stopRequested) {
        _updateStatus('考试已终止');
        clearInterval(examState.elapsedTimer);
        return;
    }

    // Finalize: hide playing controls, keep answer sheet
    examState.phase = 'answering';
    const playingSec = document.getElementById('exam-playing-section');
    if (playingSec) playingSec.style.display = 'none';
}

async function playExamSequence() {
    const seq = buildPlaySequence();
    const totalQs = seq.length;

    for (let qi = 0; qi < totalQs; qi++) {
        if (examState.stopRequested) return;
        if (examState.jumpToNextQ) {
            examState.jumpToNextQ = false;
            examState.skipRequested = false;
            await examSleep(500);
        }
        examState.currentQIndex = qi;
        examState.currentQuestion = qi + 1;
        // Update answer sheet to show current question
        const navBar = document.getElementById('exam-nav-bar');
        const inputArea = document.getElementById('exam-input-area');
        if (navBar && inputArea) {
            renderExamNavBar();
            renderExamQuestion(examState.currentQuestion);
        }
        for (let pi = 0; pi < 4; pi++) {
            if (examState.stopRequested) return;
            if (examState.jumpToNextQ) {
                examState.jumpToNextQ = false;
                await examSleep(1000);
                break; // Exit inner loop to advance to next question
            }
            examState.currentPlayIndex = pi;
            _updateProgress(qi, pi);
            _updateStatus(`正在播放第${qi + 1}题「${seq[qi].name}」第${pi + 1}遍...`);
            const cdEl = document.getElementById('exam-countdown');
            if (cdEl) cdEl.textContent = '播放中';

            await seq[qi].play();

            if (examState.stopRequested) return;
            if (examState.jumpToNextQ) {
                examState.jumpToNextQ = false;
                break; // Skip waiting, go to next question
            }

            // Wait between plays (30s), skip last play's wait
            if (pi < 3) {
                await _examCountdown(30, `第${pi + 2}遍播放`);
            }
        }
        // Wait between questions (2 min), skip last question
        if (qi < totalQs - 1) {
            _updateStatus(`第${qi + 1}题播放完毕，准备下一题...`);
            if (!examState.jumpToNextQ) {
                await _examCountdown(120, `下一题（第${qi + 2}题）`);
            }
        }
    }
    _updateStatus('全部题目播放完毕，请答题！');
    clearInterval(examState.elapsedTimer);
}

async function _examCountdown(seconds, label) {
    const cdEl = document.getElementById('exam-countdown');
    for (let s = seconds; s > 0; s--) {
        if (examState.skipRequested || examState.stopRequested) {
            if (!examState.jumpToNextQ) examState.skipRequested = false;
            break;
        }
        _updateStatus(`${label}倒计时：${s}秒`);
        if (cdEl) cdEl.textContent = s + '秒';
        await new Promise(r => setTimeout(r, 1000));
    }
    if (cdEl) cdEl.textContent = '--';
}

async function _playNoteDelay(note, dur) {
    playNoteWithWebAudio(note, dur, 0.8);
    await examSleep(dur * 1000 + 200);
}

async function _playSingleOnce(notes, bpm) {
    const beatDur = 60 / bpm;
    await _playNoteDelay('A4', 1.5);
    await examSleep(500);
    for (const n of notes) { playNoteWithWebAudio(n, 1.0, 0.8); await examSleep(beatDur * 1000); }
    await examSleep(300);
    await _playNoteDelay('A4', 1.5);
}

async function _playIntervalOnce(intervals, bpm) {
    const beatDur = 60 / bpm;
    await _playNoteDelay('A4', 1.5);
    await examSleep(500);
    for (const iv of intervals) {
        playNoteWithWebAudio(iv.note1, 1.0, 0.8);
        await examSleep(beatDur * 1000);
        playNoteWithWebAudio(iv.note2, 1.0, 0.8);
        await examSleep(beatDur * 1500);
    }
    await examSleep(300);
    await _playNoteDelay('A4', 1.5);
}

async function _playChordOnce(chords, bpm) {
    const beatDur = 60 / bpm;
    await _playNoteDelay('A4', 1.5);
    await examSleep(500);
    for (const c of chords) { playChord(c.notes); await examSleep(beatDur * 2000); }
    await examSleep(300);
    await _playNoteDelay('A4', 1.5);
}

async function _playRhythmOnce(rhythm, bpm) {
    const beatDur = 60 / bpm;
    for (let i = 0; i < 4; i++) { playNoteWithWebAudio('A4', 0.3, 0.6); await examSleep(beatDur * 1000); }
    await examSleep(300);
    // Play rhythm
    const notes = [];
    rhythm.measures.forEach(bar => bar.forEach(pat => {
        const rn = RHYTHM_DURATION_MAP[pat];
        if (rn) rn.forEach(n => notes.push(n));
    }));
    for (const n of notes) {
        const dur = beatDur * n.beats;
        playNoteWithWebAudio('C4', dur, 0.8);
        await examSleep(dur * 1000);
    }
}

async function _playMelodyOnce(melody, bpm) {
    const beatDur = 60 / bpm;
    for (let i = 0; i < 4; i++) { playNoteWithWebAudio('A4', 0.3, 0.6); await examSleep(beatDur * 1000); }
    await examSleep(300);
    for (const n of melody.notes) {
        const dur = beatDur * n.beats;
        playNoteWithWebAudio(n.pitch, dur, 0.8);
        await examSleep(dur * 1000);
    }
    await examSleep(300);
    await _playNoteDelay('A4', 1.5);
}

// Helper: get question config at 1-based qIdx
function getExamQuestionAt(qIdx) {
    return examState.questions[qIdx - 1];
}

function getExamAnswerAt(qIdx) {
    return examState.answers[qIdx - 1];
}

function getQuestionHint(type) {
    switch (type) {
        case 'single': return '点击五线谱小节选中，然后点击钢琴键盘输入答案，连击键盘自动进入下一小节';
        case 'interval-pitch': return '点击小节选中，然后点击钢琴键盘输入2个音（不自动进下一小节）';
        case 'interval-quality': return '点击小节选中，然后点击钢琴键盘输入2个音（不自动进下一小节）';
        case 'chord-pitch': return '点击小节选中，然后点击钢琴键盘输入和弦各音（不自动进下一小节）';
        case 'chord-quality': return '点击小节选中，然后点击钢琴键盘输入和弦各音（不自动进下一小节）';
        case 'rhythm': return '选择拍号，点击小节选中后点击节奏按钮填入每拍节奏型';
        case 'melody': return '选择调和拍号，先选定时值，然后点击钢琴键盘输入旋律';
        default: return '';
    }
}

// --- 答卷 ---
function initExamAnswers() {
    examState.answers = examState.questions.map(q => {
        const meta = getExamTypeMeta(q.type);
        const count = q.count;
        switch (q.type) {
            case 'single':
                return new Array(count).fill('');
            case 'interval-pitch':
            case 'interval-quality':
                return Array.from({ length: count }, () => []);
            case 'chord-pitch':
            case 'chord-quality':
                return Array.from({ length: count }, () => []);
            case 'rhythm':
                return { timeSig: '2/4', bars: Array.from({ length: count }, () => []) };
            case 'melody':
                return { key: 'C', timeSig: '2/4', bars: Array.from({ length: count }, () => []) };
            default:
                return null;
        }
    });
    examState.currentQuestion = 1;
    examState.selectedMeasure = -1;
    examState.selectedBeat = -1;
    examState.rhythmTab = '1beat';
    examState.melodyDuration = 'q';
    examState.melodyDots = 0;
    examState.melodyKeySig = 'none';
    examState.melodyScaleType = 'major';
    examState.melodyCurrentPitch = null;
}

function showAnswerSheet() {
    const el = document.getElementById('exam-answer-sheet');
    if (!el) return;
    initExamAnswers();
    el.innerHTML = `
        <div class="exam-nav-bar" id="exam-nav-bar"></div>
        <div id="exam-q-info" class="exam-q-info"></div>
        <div id="exam-staff-area" class="exam-staff-container"></div>
        <div id="exam-input-area"></div>
    `;
    renderExamNavBar();
    renderExamQuestion(examState.currentQuestion);
}

function renderExamNavBar() {
    const el = document.getElementById('exam-nav-bar');
    if (!el) return;
    let html = '';
    const totalQs = examState.questions.length;
    for (let i = 1; i <= totalQs; i++) {
        const q = getExamQuestionAt(i);
        const meta = q ? getExamTypeMeta(q.type) : null;
        const shortName = meta ? meta.name.replace('听辨', '').substring(0, 4) : `题${i}`;
        const active = i === examState.currentQuestion ? ' active' : '';
        html += `<button class="exam-nav-btn${active}" onclick="switchExamQuestion(${i})"><span class="nav-q-num">第${i}题</span>${shortName}</button>`;
    }
    el.innerHTML = html;
}

function switchExamQuestion(qIdx) {
    examState.currentQuestion = qIdx;
    examState.selectedMeasure = -1;
    examState.selectedBeat = -1;
    renderExamNavBar();
    renderExamQuestion(qIdx);
}

function renderExamQuestion(qIdx) {
    const q = getExamQuestionAt(qIdx);
    if (!q) return;
    const meta = getExamTypeMeta(q.type);
    const qName = meta ? meta.name : '';
    const qTotal = getExamItemScore(q);
    const hint = getQuestionHint(q.type);
    const infoEl = document.getElementById('exam-q-info');
    if (infoEl) {
        infoEl.innerHTML = `<div class="eqi-title">第${qIdx}题 ${qName}（${qTotal}分）</div><div class="eqi-hint">${hint}</div>`;
    }
    renderExamStaffSVG(qIdx);
    renderExamInputArea(qIdx);
}

// --- SVG五线谱渲染 ---
const STAFF_CFG = { lineSpacing: 10, topY: 40, leftMargin: 20, measureWidth: 72, noteR: 5 };

function _noteToStep(note) {
    const idx = { 'C': 0, 'D': 1, 'E': 2, 'F': 3, 'G': 4, 'A': 5, 'B': 6 };
    const m = note.match(/^([A-G])(#|b)?(\d)$/);
    if (!m) return 0;
    return (parseInt(m[3]) * 7 + idx[m[1]]) - 34;
}

function _stepToY(step) {
    return (STAFF_CFG.topY + 2 * STAFF_CFG.lineSpacing) - step * (STAFF_CFG.lineSpacing / 2);
}

function _ledgerSteps(step) {
    const lines = [];
    if (step < -4) { for (let s = -6; s >= step; s -= 2) lines.push(s); }
    else if (step > 4) { for (let s = 6; s <= step; s += 2) lines.push(s); }
    return lines;
}

function _renderNoteSVG(x, step, opts) {
    const y = _stepToY(step);
    const r = STAFF_CFG.noteR;
    let svg = '';
    for (const ls of _ledgerSteps(step)) {
        const ly = _stepToY(ls);
        svg += `<line x1="${x - 7}" y1="${ly}" x2="${x + 7}" y2="${ly}" stroke="#1a1a2e" stroke-width="1.2"/>`;
    }
    if (opts.accidental) {
        svg += `<text x="${x - 11}" y="${y + 4}" font-size="13" fill="#1a1a2e" font-family="serif" font-weight="bold">${opts.accidental}</text>`;
    }
    if (opts.filled) {
        svg += `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.78}" fill="#1a1a2e" transform="rotate(-20 ${x} ${y})"/>`;
    } else {
        svg += `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.78}" fill="none" stroke="#1a1a2e" stroke-width="1.5" transform="rotate(-20 ${x} ${y})"/>`;
    }
    if (opts.stem) {
        const stemX = x + r + 0.5;
        const stemDir = opts.stemDown ? 1 : -1;
        const stemTopY = opts.beamY !== null && opts.beamY !== undefined ? opts.beamY : y + stemDir * 20;
        svg += `<line x1="${stemX}" y1="${y}" x2="${stemX}" y2="${stemTopY}" stroke="#1a1a2e" stroke-width="1.2"/>`;

        // Add flags for eighth/sixteenth notes (skip if beamed - beam drawn separately)
        if (opts.duration && !opts.isBeamed) {
            const dur = opts.duration.replace('.', '');
            let flagCount = 0;
            if (dur === '8') flagCount = 1;
            else if (dur === '16') flagCount = 2;

            if (flagCount > 0) {
                const flagStartX = stemX;
                const flagStartY = stemTopY;
                const flagEndY = stemTopY + (flagCount - 1) * 4 + 8;

                // Draw flags as curved path
                if (stemDir === -1) {
                    // Stem up - flags on left
                    svg += `<path d="M ${flagStartX} ${flagStartY} Q ${flagStartX - 8} ${flagStartY + 4} ${flagStartX - 3} ${flagEndY}" fill="#1a1a2e" stroke="none"/>`;
                    if (flagCount === 2) {
                        svg += `<path d="M ${flagStartX} ${flagStartY + 4} Q ${flagStartX - 10} ${flagStartY + 10} ${flagStartX - 3} ${flagEndY + 4}" fill="#1a1a2e" stroke="none"/>`;
                    }
                } else {
                    // Stem down - flags on right
                    svg += `<path d="M ${flagStartX} ${flagStartY} Q ${flagStartX + 8} ${flagStartY + 4} ${flagStartX + 3} ${flagEndY}" fill="#1a1a2e" stroke="none"/>`;
                    if (flagCount === 2) {
                        svg += `<path d="M ${flagStartX} ${flagStartY + 4} Q ${flagStartX + 10} ${flagStartY + 10} ${flagStartX + 3} ${flagEndY + 4}" fill="#1a1a2e" stroke="none"/>`;
                    }
                }
            }
        }
    }
    // Add dots for dotted notes
    if (opts.dots && opts.dots > 0) {
        const dotX = x + r + 6;
        const dotY = y - 3;
        for (let i = 0; i < opts.dots; i++) {
            svg += `<circle cx="${dotX + i * 6}" cy="${dotY}" r="2.5" fill="#1a1a2e"/>`;
        }
    }
    return svg;
}

function _renderStaffLines(x, width) {
    let svg = '';
    for (let i = 0; i < 5; i++) {
        const y = STAFF_CFG.topY + i * STAFF_CFG.lineSpacing;
        svg += `<line x1="${x}" y1="${y}" x2="${x + width}" y2="${y}" stroke="#333" stroke-width="1"/>`;
    }
    return svg;
}

function _renderTrebleClef(x) {
    const staffTop = STAFF_CFG.topY;
    const thirdLineY = staffTop + 2 * STAFF_CFG.lineSpacing;
    const clefFontSize = 96;
    return `<text x="${x}" y="${thirdLineY + STAFF_CFG.lineSpacing * 2.8}" font-size="${clefFontSize}" fill="#1a1a2e" font-family="serif">𝄞</text>`;
}

function _renderTimeSig(x, timeSig) {
    const staffTop = STAFF_CFG.topY;
    const thirdLineY = staffTop + 2 * STAFF_CFG.lineSpacing;
    const fontSize = STAFF_CFG.lineSpacing * 1.6;
    const parts = timeSig.split('/');
    const gap = 1;
    return `<text x="${x}" y="${thirdLineY - fontSize / 2 - gap / 2}" font-size="${fontSize}" fill="#1a1a2e" font-family="serif" font-weight="bold" text-anchor="middle">${parts[0]}</text>
            <text x="${x}" y="${thirdLineY + fontSize / 2 + gap / 2}" font-size="${fontSize}" fill="#1a1a2e" font-family="serif" font-weight="bold" text-anchor="middle">${parts[1]}</text>`;
}

function _renderKeySignature(x, key) {
    if (key === 'C' || key === 'a') return '';
    const y = STAFF_CFG.topY + 2 * STAFF_CFG.lineSpacing;
    const sharps = { 'G': 1, 'D': 2, 'e': 1 };
    const flats = { 'F': 1, 'd': 1 };
    let svg = '';
    const stepPositions = { sharp: [2, -1, 3, 0, 2, -1, 3], flat: [-1, 2, -2, 1, -3, 0, -2] };
    let count = 0;
    let symbol = '';
    const fontSize = STAFF_CFG.lineSpacing * 1.4;
    if (sharps[key] !== undefined) { count = sharps[key]; symbol = '♯'; }
    else if (flats[key] !== undefined) { count = flats[key]; symbol = '♭'; }
    for (let i = 0; i < count; i++) {
        const step = symbol === '♯' ? stepPositions.sharp[i] : stepPositions.flat[i];
        const sy = _stepToY(step);
        svg += `<text x="${x + i * (fontSize * 0.45)}" y="${sy + fontSize * 0.35}" font-size="${fontSize}" fill="#1a1a2e" font-family="serif">${symbol}</text>`;
    }
    return { svg, width: count * fontSize * 0.5 };
}

// Calculate beam groups for exam melody (flat notes array)
function _calcExamBeamGroups(notes) {
    const noteBeatInfo = notes.map(note => {
        const dur = note.duration.replace('.', '');
        const isBeamable = dur === '8' || dur === '16' || dur === 'triplet';
        const beatNum = Math.floor((note.startBeat || 0) + 0.001);
        return { isBeamable, beatNum, dur };
    });
    const groups = [];
    let currentGroup = [];
    for (let i = 0; i < noteBeatInfo.length; i++) {
        const info = noteBeatInfo[i];
        if (info.isBeamable) {
            if (currentGroup.length === 0) {
                currentGroup.push(i);
            } else {
                const prev = noteBeatInfo[currentGroup[currentGroup.length - 1]];
                if (info.beatNum === prev.beatNum) {
                    currentGroup.push(i);
                } else {
                    if (currentGroup.length >= 2) groups.push([...currentGroup]);
                    currentGroup = [i];
                }
            }
        } else {
            if (currentGroup.length >= 2) groups.push([...currentGroup]);
            currentGroup = [];
        }
    }
    if (currentGroup.length >= 2) groups.push([...currentGroup]);
    return groups;
}

function renderExamStaffSVG(qIdx) {
    const el = document.getElementById('exam-staff-area');
    if (!el) return;
    const q = getExamQuestionAt(qIdx);
    const ans = getExamAnswerAt(qIdx);
    if (!q || !ans) return;
    const qType = q.type;
    const mw = STAFF_CFG.measureWidth;
    const lineSpace = STAFF_CFG.lineSpacing;
    const staffTop = STAFF_CFG.topY;
    const staffHeight = 4 * lineSpace;
    const staffBottom = staffTop + staffHeight;
    let measureCount, isRhythm = false, timeSig = '4/4';
    let keySig = null;
    let pitchNotes = [];
    let rhythmData = null;
    let isPitchQ = false, isMelodyQ = false;

    if (qType === 'single') {
        isPitchQ = true;
        measureCount = q.count;
        pitchNotes = ans.map(n => n ? { notes: [_noteToStep(n)], accidental: n.includes('#') ? '♯' : (n.includes('b') ? '♭' : null), filled: false, stem: false } : null);
    } else if (qType === 'interval-pitch' || qType === 'interval-quality') {
        isPitchQ = true;
        measureCount = q.count;
        pitchNotes = ans.map(arr => arr.length ? { notes: arr.map(n => _noteToStep(n)), accidentals: arr.map(n => n.includes('#') ? '♯' : (n.includes('b') ? '♭' : null)), filled: false, stem: false } : null);
    } else if (qType === 'chord-pitch' || qType === 'chord-quality') {
        isPitchQ = true;
        measureCount = q.count;
        pitchNotes = ans.map(arr => arr.length ? { notes: arr.map(n => _noteToStep(n)), accidentals: arr.map(n => n.includes('#') ? '♯' : (n.includes('b') ? '♭' : null)), filled: false, stem: false } : null);
    } else if (qType === 'rhythm') {
        isRhythm = true;
        measureCount = q.count;
        timeSig = ans.timeSig;
        rhythmData = { bpb: parseInt(timeSig.split('/')[0]), bars: ans.bars };
    } else if (qType === 'melody') {
        isRhythm = true;
        isMelodyQ = true;
        measureCount = q.count;
        timeSig = ans.timeSig;
        keySig = ans.key;
        rhythmData = { bpb: parseInt(timeSig.split('/')[0]), bars: ans.bars };
    } else {
        measureCount = q.count || 1;
    }

    // Layout: clef + time signature + key sig all inside staff area
    const clefX = 8;
    const clefWidth = lineSpace * 7;
    const tsWidth = lineSpace * 2;
    const ksWidth = (keySig && keySig !== 'C' && keySig !== 'a') ? lineSpace * 2 : 0;
    const preWidth = clefWidth + tsWidth + ksWidth + 8;
    const staffStartX = preWidth;
    const staffWidth = measureCount * mw;
    const totalWidth = staffStartX + staffWidth + 12;

    // Total height: top padding + staff + bottom padding for ledger lines
    const topPad = staffTop;
    let bottomPad;
    if (qIdx === 6) {
        bottomPad = 60;
    } else if (isRhythm) {
        bottomPad = 20;
    } else {
        bottomPad = 45;
    }
    const totalHeight = topPad + staffHeight + bottomPad;

    let svg = `<svg width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}" xmlns="http://www.w3.org/2000/svg">`;

    // Staff lines - start from clef position so clef/timeSig are inside staff
    svg += _renderStaffLines(clefX - 2, staffWidth + preWidth + 6);

    // Treble clef - positioned on the staff
    svg += _renderTrebleClef(clefX);

    // Time signature - positioned on the staff after clef
    svg += _renderTimeSig(clefX + clefWidth + 2, timeSig);

    // Key signature - positioned on the staff after time sig
    if (keySig && keySig !== 'C' && keySig !== 'a') {
        const ksInfo = _renderKeySignature(clefX + clefWidth + tsWidth + 4, keySig);
        svg += ksInfo.svg;
    }

    // Measures
    const totalH = totalHeight;
    for (let m = 0; m < measureCount; m++) {
        const mx = staffStartX + m * mw;
        const isSel = (examState.selectedMeasure === m);
        const measureBg = isSel ? 'rgba(255,183,77,0.22)' : (m % 2 === 0 ? 'rgba(200,200,200,0.06)' : 'transparent');
        svg += `<g class="measure-group${isSel ? ' selected' : ''}" onclick="selectExamMeasure(${m})">`;
        svg += `<rect x="${mx}" y="0" width="${mw}" height="${totalH}" fill="${measureBg}" stroke="none"/>`;

        // Bar line
        svg += `<line x1="${mx}" y1="${staffTop}" x2="${mx}" y2="${staffBottom}" stroke="#333" stroke-width="${m === 0 ? 1.5 : 1}"/>`;

        // Measure number
        svg += `<text x="${mx + mw / 2}" y="${staffTop - 5}" class="measure-num">${m + 1}</text>`;

        if (isMelodyQ) {
            // Melody: flat notes array with beam support
            const bpb = rhythmData.bpb;
            const notes = rhythmData.bars[m] || [];
            const beatW = mw / bpb;

            // Beat selection highlight
            if (isSel && examState.selectedBeat >= 0) {
                const selX = mx + examState.selectedBeat * beatW;
                svg += `<rect class="beat-bg" x="${selX}" y="0" width="${beatW}" height="${totalH}" fill="rgba(255,217,102,0.3)" stroke="none"/>`;
            }

            // Calculate beam groups
            const beamGroups = _calcExamBeamGroups(notes);
            const beamedSet = new Set();
            beamGroups.forEach(g => g.forEach(idx => beamedSet.add(idx)));

            // Calculate beam Y for each beamed note (uniform stem height)
            const beamYMap = {};
            beamGroups.forEach(group => {
                const stemTops = group.map(idx => {
                    const note = notes[idx];
                    const nb = getNoteBeatsForDuration(note.duration, note.dots || 0);
                    const nx = mx + (note.startBeat + nb / 2) * beatW;
                    const step = _noteToStep(note.pitch);
                    return { idx, x: nx, y: _stepToY(step) };
                });
                // Find extreme (highest note = smallest Y, stem up)
                const extremeIdx = stemTops.reduce((best, p, i) => p.y < stemTops[best].y ? i : best, 0);
                const isSlanted = extremeIdx === 0 || extremeIdx === stemTops.length - 1;
                const beamBaseOffset = -20;
                if (!isSlanted) {
                    const flatY = stemTops[extremeIdx].y + beamBaseOffset;
                    group.forEach((idx, i) => { beamYMap[idx] = flatY; });
                } else {
                    const startP = stemTops[extremeIdx];
                    const endP = stemTops[extremeIdx === 0 ? stemTops.length - 1 : 0];
                    group.forEach((idx, i) => {
                        const t = (stemTops[i].x - startP.x) / (endP.x - startP.x || 1);
                        beamYMap[idx] = startP.y + beamBaseOffset + (endP.y - startP.y) * t;
                    });
                }
            });

            // Render notes
            notes.forEach((note, idx) => {
                const nb = getNoteBeatsForDuration(note.duration, note.dots || 0);
                const nx = mx + (note.startBeat + nb / 2) * beatW;
                const step = _noteToStep(note.pitch);
                const accidental = note.pitch.includes('#') ? '♯' : null;
                const baseDur = note.duration.replace('.', '');
                const isFilled = baseDur !== 'h' && baseDur !== 'w';
                const isBeamed = beamedSet.has(idx);
                const beamY = beamYMap[idx];
                svg += _renderNoteSVG(nx, step, { filled: isFilled, stem: true, accidental, dots: note.dots || 0, duration: note.duration, isBeamed, beamY });
            });

            // Render beams
            beamGroups.forEach(group => {
                if (group.length < 2) return;
                const stemTops = group.map(idx => {
                    const note = notes[idx];
                    const nb = getNoteBeatsForDuration(note.duration, note.dots || 0);
                    const nx = mx + (note.startBeat + nb / 2) * beatW;
                    const r = STAFF_CFG.noteR;
                    return { x: nx + r + 0.5, y: beamYMap[idx], level: note.duration.replace('.', '') === '16' ? 2 : 1 };
                });
                // Main beam
                svg += `<line x1="${stemTops[0].x}" y1="${stemTops[0].y}" x2="${stemTops[stemTops.length - 1].x}" y2="${stemTops[stemTops.length - 1].y}" stroke="#1a1a2e" stroke-width="3"/>`;
                // Second beam for 16th sub-groups
                let subStart = -1;
                for (let i = 0; i <= stemTops.length; i++) {
                    if (i < stemTops.length && stemTops[i].level >= 2) {
                        if (subStart === -1) subStart = i;
                    } else {
                        if (subStart !== -1) {
                            const sf = stemTops[subStart], sl = stemTops[i - 1];
                            svg += `<line x1="${sf.x}" y1="${sf.y + 5}" x2="${sl.x}" y2="${sl.y + 5}" stroke="#1a1a2e" stroke-width="3"/>`;
                            subStart = -1;
                        }
                    }
                }
                // Triplet "3" mark
                const hasTriplet = group.some(idx => notes[idx].duration.replace('.', '') === 'triplet');
                if (hasTriplet) {
                    const midIdx = group[Math.floor(group.length / 2)];
                    const mn = notes[midIdx];
                    const mb = getNoteBeatsForDuration(mn.duration, mn.dots || 0);
                    const midX = mx + (mn.startBeat + mb / 2) * beatW;
                    svg += `<text x="${midX}" y="${beamYMap[midIdx] - 6}" font-size="9" fill="#1a1a2e" text-anchor="middle" font-family="serif" font-weight="bold">3</text>`;
                }
            });
        } else if (isRhythm) {
            const bpb = rhythmData.bpb;
            const bar = rhythmData.bars[m] || [];
            const beatW = mw / bpb;
            for (let beat = 0; beat < bpb; beat++) {
                const bx = mx + beat * beatW;
                const beatSel = isSel && examState.selectedBeat === beat;
                const item = bar[beat];
                if (beatSel) {
                    svg += `<rect class="beat-bg" x="${bx + 2}" y="0" width="${beatW - 4}" height="${totalH}" fill="rgba(255,217,102,0.4)" stroke="none"/>`;
                }
                if (item) {
                    if (typeof item === 'object' && item.pitch) {
                        // Melody note object: {pitch, rhythm, duration, dots}
                        const nx = bx + beatW / 2;
                        const step = _noteToStep(item.pitch);
                        const accidental = item.pitch.includes('#') ? '♯' : null;
                        const duration = item.duration || 'q';
                        // Get base duration (remove dot suffix) for filled check
                        const baseDur = duration.replace('.', '');
                        const isFilled = baseDur !== 'h' && baseDur !== 'w';
                        svg += `<text x="${bx + beatW / 2}" y="${staffTop - 7}" font-size="7" fill="#444" text-anchor="middle" font-family="sans-serif">${item.rhythm}</text>`;
                        const durInfo = RHYTHM_DURATION_MAP[item.rhythm];
                        const itemDots = item.dots || (durInfo && durInfo[0] && durInfo[0].dots) || 0;
                        if (durInfo && durInfo.length > 1) {
                            const noteSpacing = Math.min(8, (beatW - 8) / durInfo.length);
                            const startX = nx - (durInfo.length - 1) * noteSpacing / 2;
                            durInfo.forEach((dn, di) => {
                                const dnBaseDur = dn.duration.replace('.', '');
                                const isF = dnBaseDur !== 'h' && dnBaseDur !== 'w';
                                const dots = dn.dots || 0;
                                svg += _renderNoteSVG(startX + di * noteSpacing, step, { filled: isF, stem: true, accidental: di === 0 ? accidental : null, dots, duration: dn.duration });
                            });
                        } else {
                            svg += _renderNoteSVG(nx, step, { filled: isFilled, stem: true, accidental, dots: itemDots, duration });
                        }
                    } else {
                        // Rhythm pattern string (backward compatible)
                        const pattern = item;
                        svg += `<text x="${bx + beatW / 2}" y="${staffTop - 7}" font-size="8" fill="#444" text-anchor="middle" font-family="sans-serif">${pattern}</text>`;
                        const nx = bx + beatW / 2;
                        const a4step = _noteToStep('A4');
                        const durInfo = RHYTHM_DURATION_MAP[pattern];
                        if (durInfo && durInfo.length > 0) {
                            const noteSpacing = Math.min(10, (beatW - 8) / Math.max(durInfo.length, 1));
                            const startX = nx - (durInfo.length - 1) * noteSpacing / 2;
                            durInfo.forEach((dn, di) => {
                                const isFilled = dn.duration !== 'h' && dn.duration !== 'w';
                                svg += _renderNoteSVG(startX + di * noteSpacing, a4step, { filled: isFilled, stem: true, accidental: null, duration: dn.duration });
                            });
                        } else {
                            const isLong = pattern === '二分';
                            svg += _renderNoteSVG(nx, a4step, { filled: !isLong, stem: true, accidental: null, duration: 'q' });
                        }
                    }
                } else {
                    svg += `<text x="${bx + beatW / 2}" y="${staffBottom + 12}" font-size="9" fill="#ccc" text-anchor="middle" font-family="sans-serif">·</text>`;
                }
            }
        } else if (isPitchQ) {
            const pn = pitchNotes[m];
            if (pn) {
                if (qType === 'single') {
                    svg += _renderNoteSVG(mx + mw / 2, pn.notes[0], { filled: false, stem: false, accidental: pn.accidental });
                } else if (qType === 'interval-pitch' || qType === 'interval-quality') {
                    const nx = mx + mw / 2;
                    pn.notes.forEach((step, i) => {
                        svg += _renderNoteSVG(nx, step, { filled: false, stem: false, accidental: pn.accidentals[i] });
                    });
                } else if (qType === 'chord-pitch' || qType === 'chord-quality') {
                    pn.notes.forEach((step, i) => {
                        svg += _renderNoteSVG(mx + mw / 2, step, { filled: false, stem: false, accidental: pn.accidentals[i] });
                    });
                }
            }
        }

        svg += `</g>`;
    }

    // Final bar line
    const endX = staffStartX + measureCount * mw;
    svg += `<line x1="${endX}" y1="${staffTop}" x2="${endX}" y2="${staffBottom}" stroke="#333" stroke-width="1.5"/>`;
    svg += `<line x1="${endX + 3}" y1="${staffTop}" x2="${endX + 3}" y2="${staffBottom}" stroke="#333" stroke-width="3"/>`;

    svg += `</svg>`;
    el.innerHTML = svg;
}

// --- 输入区渲染 ---
function renderExamInputArea(qIdx) {
    const el = document.getElementById('exam-input-area');
    if (!el) return;
    const q = getExamQuestionAt(qIdx);
    if (!q) return;
    const t = q.type;
    if (t === 'single' || t === 'interval-pitch' || t === 'interval-quality' || t === 'chord-pitch' || t === 'chord-quality') {
        renderExamPiano(qIdx);
    } else if (t === 'melody') {
        renderExamMelodyInput(qIdx);
    } else if (t === 'rhythm') {
        renderExamRhythmInput(qIdx);
    }
}

function renderExamPiano(qIdx) {
    const el = document.getElementById('exam-input-area');
    if (!el) return;
    const q = getExamQuestionAt(qIdx);
    const ans = getExamAnswerAt(qIdx);
    if (!q || !ans) return;
    const whiteNotes = allNotes.filter(n => n.type === 'white');
    const blackNotes = allNotes.filter(n => n.type === 'black');

    let selectedNotes = new Set();
    if (examState.selectedMeasure >= 0) {
        const m = examState.selectedMeasure;
        if (q.type === 'single') {
            const n = ans[m];
            if (n) selectedNotes.add(n);
        } else if (q.type === 'interval-pitch' || q.type === 'interval-quality') {
            (ans[m] || []).forEach(n => { if (n) selectedNotes.add(n); });
        } else if (q.type === 'chord-pitch' || q.type === 'chord-quality') {
            (ans[m] || []).forEach(n => { if (n) selectedNotes.add(n); });
        }
    }

    let html = '<div class="exam-piano"><div class="exam-piano-inner" id="exam-piano-inner">';
    whiteNotes.forEach((note, index) => {
        const sel = selectedNotes.has(note.note) ? ' selected' : '';
        html += `<div class="ew-key white${sel}" data-note="${note.note}" data-index="${index}" onclick="handleExamPianoInput('${note.note}')">${note.display}</div>`;
    });
    html += '</div></div>';
    el.innerHTML = html;

    // Use same positioning approach as initChordPiano
    const inner = document.getElementById('exam-piano-inner');
    if (!inner) return;

    // Force reflow so offsetLeft/offsetWidth are accurate
    inner.offsetWidth;

    // Calculate metrics the same way as updatePianoMetrics
    const whiteEls = inner.querySelectorAll('.ew-key.white');
    if (!whiteEls.length) return;

    const firstLeft = whiteEls[0].offsetLeft;
    const whiteWidth = whiteEls[0].offsetWidth;
    const spacing = whiteEls.length > 1 ? (whiteEls[1].offsetLeft - whiteEls[0].offsetLeft) : whiteWidth + 1;

    // Remove existing black keys
    inner.querySelectorAll('.ew-key.black').forEach(k => k.remove());

    // Add black keys using calculateBlackKeyLeft formula
    const blackWidth = 22;
    blackNotes.forEach(note => {
        const sel = selectedNotes.has(note.note) ? ' selected' : '';
        const left = firstLeft + note.position * spacing + whiteWidth / 2 - blackWidth / 2;
        const key = document.createElement('div');
        key.className = `ew-key black${sel}`;
        key.dataset.note = note.note;
        key.style.left = `${left}px`;
        key.innerHTML = note.display;
        key.onclick = () => handleExamPianoInput(note.note);
        inner.appendChild(key);
    });
}

function renderExamRhythmInput(qIdx) {
    const el = document.getElementById('exam-input-area');
    if (!el) return;
    const ans = getExamAnswerAt(qIdx);
    if (!ans) return;
    let timeSig = ans.timeSig;
    let bars = ans.bars;

    let html = '<div class="exam-selector-bar">';
    // Time signature selector
    const tsOptions = ['2/4', '3/4', '4/4'];
    html += '<div class="exam-selector-group"><span class="esg-label">拍号：</span>';
    tsOptions.forEach(ts => {
        const active = ts === timeSig ? ' active' : '';
        html += `<button class="exam-selector-btn${active}" onclick="setExamTimeSig(${qIdx}, '${ts}')">${ts}</button>`;
    });
    html += '</div></div>';

    // Rhythm tabs
    const activeTab = examState.rhythmTab || '1beat';
    html += '<div class="exam-rhythm-section">';
    html += '<div class="rhythm-tabs">';
    html += `<button class="rhythm-tab${activeTab === '1beat' ? ' active' : ''}" onclick="setExamRhythmTab('1beat')">1拍节奏型</button>`;
    html += `<button class="rhythm-tab${activeTab === '2beat' ? ' active' : ''}" onclick="setExamRhythmTab('2beat')">2拍节奏型</button>`;
    html += '</div>';

    html += '<div class="exam-rhythm-grid">';
    const patterns = activeTab === '1beat' ? EXAM_RHYTHM_1BEAT : EXAM_RHYTHM_2BEAT;
    patterns.forEach(r => {
        html += `<button class="exam-rhythm-btn" onclick="handleExamRhythmInput('${r}')">${r}</button>`;
    });
    html += '</div></div>';

    el.innerHTML = html;
}

function setExamRhythmTab(tab) {
    examState.rhythmTab = tab;
    renderExamInputArea(examState.currentQuestion);
}

const MELODY_DURATION_BUTTONS = [
    { duration: 'w', label: '全音', dots: 0 },
    { duration: 'h', label: '二分', dots: 0 },
    { duration: 'q', label: '四分', dots: 0 },
    { duration: '8', label: '八分', dots: 0 },
    { duration: '16', label: '十六分', dots: 0 },
    { duration: 'h.', label: '附点二分', dots: 1 },
    { duration: 'q.', label: '附点四分', dots: 1 },
    { duration: '8.', label: '附点八分', dots: 1 },
    { duration: 'triplet', label: '三连音', dots: 0 }
];

const MELODY_KEY_SIGNATURES = [
    { value: 'none', name: '无升降' },
    { value: '1sharp', name: '一升' },
    { value: '1flat', name: '一降' },
    { value: '2sharp', name: '二升' },
    { value: '2flat', name: '二降' },
    { value: '3sharp', name: '三升' },
    { value: '3flat', name: '三降' }
];

const MELODY_SCALE_TYPES = [
    { value: 'major', name: '大调' },
    { value: 'minor', name: '小调' },
    { value: 'gong', name: '宫' },
    { value: 'shang', name: '商' },
    { value: 'jue', name: '角' },
    { value: 'zhi', name: '徵' },
    { value: 'yu', name: '羽' }
];

const MELODY_KEY_MAP = {
    'none_major': 'C', 'none_minor': 'a',
    '1sharp_major': 'G', '1sharp_minor': 'e',
    '1flat_major': 'F', '1flat_minor': 'd',
    '2sharp_major': 'D', '2sharp_minor': 'b',
    '2flat_major': 'Bb', '2flat_minor': 'g',
    '3sharp_major': 'A', '3sharp_minor': 'f#',
    '3flat_major': 'Eb', '3flat_minor': 'c'
};

function renderExamMelodyInput(qIdx) {
    const el = document.getElementById('exam-input-area');
    if (!el) return;
    const ans = getExamAnswerAt(qIdx);
    if (!ans || typeof ans !== 'object') return;

    // Initialize melody state
    if (!examState.melodyDuration) examState.melodyDuration = 'q';
    if (!examState.melodyKeySig) examState.melodyKeySig = 'none';
    if (!examState.melodyScaleType) examState.melodyScaleType = 'major';
    if (!examState.melodyCurrentPitch) examState.melodyCurrentPitch = null;

    // Update key based on dropdowns
    const keyMapKey = `${examState.melodyKeySig}_${examState.melodyScaleType}`;
    if (MELODY_KEY_MAP[keyMapKey]) {
        ans.key = MELODY_KEY_MAP[keyMapKey];
    }

    const timeSig = ans.timeSig;
    const bars = ans.bars;

    let html = '<div class="exam-selector-bar">';

    // Key signature dropdown
    html += '<div class="exam-selector-group">';
    html += '<span class="esg-label">调号：</span>';
    html += '<select class="exam-select-select" onchange="setExamMelodyKeySig(this.value)">';
    MELODY_KEY_SIGNATURES.forEach(k => {
        const sel = k.value === examState.melodyKeySig ? ' selected' : '';
        html += `<option value="${k.value}"${sel}>${k.name}</option>`;
    });
    html += '</select>';
    html += '</div>';

    // Scale type dropdown
    html += '<div class="exam-selector-group">';
    html += '<span class="esg-label">调式：</span>';
    html += '<select class="exam-select-select" onchange="setExamMelodyScaleType(this.value)">';
    MELODY_SCALE_TYPES.forEach(s => {
        const sel = s.value === examState.melodyScaleType ? ' selected' : '';
        html += `<option value="${s.value}"${sel}>${s.name}</option>`;
    });
    html += '</select>';
    html += '</div>';

    // Time signature selector
    html += '<div class="exam-selector-group"><span class="esg-label">拍号：</span>';
    ['2/4', '3/4'].forEach(ts => {
        const active = ts === timeSig ? ' active' : '';
        html += `<button class="exam-selector-btn${active}" onclick="setExamTimeSig(${qIdx}, '${ts}')">${ts}</button>`;
    });
    html += '</div></div>';

    // Duration buttons - two rows
    html += '<div class="exam-rhythm-section">';
    html += '<div class="ers-subtitle">选择时值后点击钢琴键盘输入</div>';
    const row1 = MELODY_DURATION_BUTTONS.slice(0, 5);
    const row2 = MELODY_DURATION_BUTTONS.slice(5);
    html += '<div class="melody-duration-row">';
    row1.forEach(b => {
        const active = examState.melodyDuration === b.duration ? ' active' : '';
        html += `<button class="melody-duration-btn${active}" onclick="setExamMelodyDuration('${b.duration}', ${b.dots})">${b.label}</button>`;
    });
    html += '</div>';
    html += '<div class="melody-duration-row">';
    row2.forEach(b => {
        const active = examState.melodyDuration === b.duration ? ' active' : '';
        html += `<button class="melody-duration-btn${active}" onclick="setExamMelodyDuration('${b.duration}', ${b.dots})">${b.label}</button>`;
    });
    html += '</div></div>';

    // Piano keyboard
    const whiteNotes = allNotes.filter(n => n.type === 'white');
    const blackNotes = allNotes.filter(n => n.type === 'black');

    html += '<div class="exam-piano"><div class="exam-piano-inner" id="exam-piano-inner">';
    whiteNotes.forEach((note, index) => {
        const sel = examState.melodyCurrentPitch === note.note ? ' selected' : '';
        html += `<div class="ew-key white${sel}" data-note="${note.note}" data-index="${index}" onclick="handleExamMelodyPiano('${note.note}')">${note.display}</div>`;
    });
    html += '</div></div>';

    el.innerHTML = html;

    // Position black keys
    const inner = document.getElementById('exam-piano-inner');
    if (inner) {
        inner.offsetWidth;
        const whiteEls = inner.querySelectorAll('.ew-key.white');
        if (whiteEls.length) {
            const firstLeft = whiteEls[0].offsetLeft;
            const whiteWidth = whiteEls[0].offsetWidth;
            const spacing = whiteEls.length > 1 ? (whiteEls[1].offsetLeft - whiteEls[0].offsetLeft) : whiteWidth + 1;
            inner.querySelectorAll('.ew-key.black').forEach(k => k.remove());
            const blackWidth = 22;
            blackNotes.forEach(note => {
                const sel = examState.melodyCurrentPitch === note.note ? ' selected' : '';
                const left = firstLeft + note.position * spacing + whiteWidth / 2 - blackWidth / 2;
                const key = document.createElement('div');
                key.className = `ew-key black${sel}`;
                key.dataset.note = note.note;
                key.style.left = `${left}px`;
                key.innerHTML = note.display;
                key.onclick = () => handleExamMelodyPiano(note.note);
                inner.appendChild(key);
            });
        }
    }
}

function setExamMelodyDuration(duration, dots) {
    examState.melodyDuration = duration;
    examState.melodyDots = dots;
    renderExamInputArea(examState.currentQuestion);
}

function setExamMelodyKeySig(value) {
    examState.melodyKeySig = value;
    const qIdx = examState.currentQuestion;
    const ans = getExamAnswerAt(qIdx);
    const keyMapKey = `${value}_${examState.melodyScaleType}`;
    if (MELODY_KEY_MAP[keyMapKey] && ans && typeof ans === 'object') {
        ans.key = MELODY_KEY_MAP[keyMapKey];
    }
    renderExamStaffSVG(qIdx);
    renderExamInputArea(qIdx);
}

function setExamMelodyScaleType(value) {
    examState.melodyScaleType = value;
    const qIdx = examState.currentQuestion;
    const ans = getExamAnswerAt(qIdx);
    const keyMapKey = `${examState.melodyKeySig}_${value}`;
    if (MELODY_KEY_MAP[keyMapKey] && ans && typeof ans === 'object') {
        ans.key = MELODY_KEY_MAP[keyMapKey];
    }
    renderExamStaffSVG(qIdx);
    renderExamInputArea(qIdx);
}

function handleExamMelodyPiano(note) {
    const qIdx = examState.currentQuestion;
    const ans = getExamAnswerAt(qIdx);
    if (!ans || typeof ans !== 'object') return;
    let m = examState.selectedMeasure;
    if (m < 0) {
        examState.selectedMeasure = 0;
        examState.selectedBeat = 0;
        return handleExamMelodyPiano(note);
    }
    m = examState.selectedMeasure;

    examState.melodyCurrentPitch = note;

    const dur = examState.melodyDuration || 'q';
    const dots = examState.melodyDots || 0;
    const beats = getNoteBeatsForDuration(dur, dots);

    const rhythmName = dur === 'w' ? '全音' : dur === 'h' ? '二分' : dur === 'q' ? '四分' : dur === '8' ? '八分' : dur === '16' ? '十六分' : dur === 'h.' ? '附点二分' : dur === 'q.' ? '附点四分' : dur === '8.' ? '附点八分' : dur === 'triplet' ? '三连音' : dur;
    const actualDots = dur.endsWith('.') ? 1 : dots;

    const bars = ans.bars;
    const bpb = parseInt(ans.timeSig.split('/')[0]);
    const bar = bars[m] || [];
    const currentBeat = examState.selectedBeat >= 0 ? examState.selectedBeat : 0;

    // Remove any notes that overlap with the new note's time slot
    const newBar = bar.filter(n => {
        const nBeats = getNoteBeatsForDuration(n.duration, n.dots || 0);
        return (n.startBeat + nBeats <= currentBeat + 0.01 || n.startBeat >= currentBeat + beats - 0.01);
    });

    // Add the new note with startBeat
    newBar.push({ pitch: note, rhythm: rhythmName, duration: dur, dots: actualDots, startBeat: currentBeat });
    newBar.sort((a, b) => a.startBeat - b.startBeat);
    bars[m] = newBar;

    // Advance beat
    let nextBeat = currentBeat + beats;
    if (nextBeat >= bpb - 0.01) {
        examState.selectedMeasure = (m + 1) % bars.length;
        examState.selectedBeat = 0;
    } else {
        examState.selectedBeat = nextBeat;
    }

    try { playNoteWithWebAudio(note, 0.5, 0.6); } catch (e) { }
    renderExamStaffSVG(qIdx);
    renderExamInputArea(qIdx);
}

const DURATION_BEAT_MAP = {
    'w': { beats: 4 },
    'h': { beats: 2 },
    'q': { beats: 1 },
    '8': { beats: 0.5 },
    '16': { beats: 0.25 },
    'h.': { beats: 3 },
    'q.': { beats: 1.5 },
    '8.': { beats: 0.75 },
    'triplet': { beats: 1 / 3 }
};

function setExamMelodyKey(key) {
    const qIdx = examState.currentQuestion;
    const ans = getExamAnswerAt(qIdx);
    if (ans && typeof ans === 'object' && ans.key !== undefined) {
        ans.key = key;
    }
    renderExamInputArea(qIdx);
}

function setExamTimeSig(qIdx, ts) {
    const q = getExamQuestionAt(qIdx);
    const ans = getExamAnswerAt(qIdx);
    if (!q || !ans || typeof ans !== 'object') return;
    ans.timeSig = ts;
    ans.bars = Array.from({ length: q.count }, () => []);
    examState.selectedMeasure = -1;
    examState.selectedBeat = -1;
    renderExamStaffSVG(qIdx);
    renderExamInputArea(qIdx);
}

// --- 选中与输入 ---
function selectExamMeasure(m) {
    const qIdx = examState.currentQuestion;
    const q = getExamQuestionAt(qIdx);
    const ans = getExamAnswerAt(qIdx);
    if (!q || !ans) return;
    examState.selectedMeasure = m;
    if (q.type === 'melody') {
        // Melody: calculate next empty beat from flat notes array
        const bar = ans.bars[m] || [];
        const bpb = parseInt(ans.timeSig.split('/')[0]);
        let usedBeats = 0;
        bar.forEach(n => {
            usedBeats += getNoteBeatsForDuration(n.duration, n.dots || 0);
        });
        examState.selectedBeat = usedBeats >= bpb - 0.01 ? 0 : usedBeats;
    } else if (q.type === 'rhythm') {
        // Rhythm: auto-select first empty beat
        const bar = ans.bars[m] || [];
        examState.selectedBeat = bar.length;
        const bpb = parseInt(ans.timeSig.split('/')[0]);
        if (examState.selectedBeat >= bpb) examState.selectedBeat = 0;
    } else {
        examState.selectedBeat = -1;
    }
    renderExamStaffSVG(qIdx);
    renderExamInputArea(qIdx);
}

function handleExamPianoInput(note) {
    const qIdx = examState.currentQuestion;
    const q = getExamQuestionAt(qIdx);
    const ans = getExamAnswerAt(qIdx);
    if (!q || !ans) return;
    let m = examState.selectedMeasure;
    const count = q.count;
    if (m < 0) {
        // Auto-select first empty measure
        for (let i = 0; i < count; i++) {
            let isEmpty = false;
            if (q.type === 'single') isEmpty = !ans[i];
            else isEmpty = (ans[i] || []).length === 0;
            if (isEmpty) { examState.selectedMeasure = i; return handleExamPianoInput(note); }
        }
        examState.selectedMeasure = 0;
        return handleExamPianoInput(note);
    }
    m = examState.selectedMeasure;
    if (q.type === 'single') {
        ans[m] = note;
        // Auto-advance to next measure
        const next = (m + 1) % count;
        examState.selectedMeasure = next;
    } else if (q.type === 'interval-pitch' || q.type === 'interval-quality') {
        if (!Array.isArray(ans[m])) ans[m] = [];
        const arr = ans[m];
        const idx = arr.indexOf(note);
        if (idx !== -1) { arr.splice(idx, 1); }
        else { arr.push(note); if (arr.length > 2) arr.shift(); }
    } else if (q.type === 'chord-pitch' || q.type === 'chord-quality') {
        if (!Array.isArray(ans[m])) ans[m] = [];
        const arr = ans[m];
        const idx = arr.indexOf(note);
        if (idx !== -1) { arr.splice(idx, 1); }
        else { arr.push(note); if (arr.length > 4) arr.shift(); }
    }
    // Play the note for feedback
    try { playNoteWithWebAudio(note, 0.5, 0.6); } catch (e) { }
    renderExamStaffSVG(qIdx);
    renderExamInputArea(qIdx);
}

function handleExamRhythmInput(pattern) {
    const qIdx = examState.currentQuestion;
    const q = getExamQuestionAt(qIdx);
    const ans = getExamAnswerAt(qIdx);
    if (!q || !ans || typeof ans !== 'object') return;
    let m = examState.selectedMeasure;
    if (m < 0) {
        // Auto-select first measure
        examState.selectedMeasure = 0;
        examState.selectedBeat = 0;
        return handleExamRhythmInput(pattern);
    }
    m = examState.selectedMeasure;
    const bars = ans.bars;
    const bpb = parseInt(ans.timeSig.split('/')[0]);

    const bar = bars[m];
    const isTwoBeat = EXAM_RHYTHM_2BEAT.includes(pattern);
    const beatIdx = examState.selectedBeat >= 0 ? examState.selectedBeat : bar.length;
    const remaining = bpb - beatIdx;
    if (isTwoBeat && remaining < 2) {
        // Not enough space - wrap to next measure or start fresh
        const next = (m + 1) % bars.length;
        examState.selectedMeasure = next;
        examState.selectedBeat = 0;
        // Clear that bar and fill
        bars[next] = [pattern];
        examState.selectedBeat = 2;
        if (examState.selectedBeat >= bpb) {
            const nn = (examState.selectedMeasure + 1) % bars.length;
            examState.selectedMeasure = nn;
            examState.selectedBeat = 0;
        }
        renderExamStaffSVG(q);
        return;
    }
    // Place the pattern at the current beat
    while (bar.length < beatIdx) bar.push(''); // fill gaps
    if (isTwoBeat) {
        // Remove any existing pattern at beatIdx and beatIdx+1
        if (bar[beatIdx]) bar[beatIdx] = pattern;
        else bar.push(pattern);
        // If there was a pattern at beatIdx+1, remove it
        if (bar.length > beatIdx + 1) bar.splice(beatIdx + 1, 1, '');
        examState.selectedBeat = beatIdx + 2;
    } else {
        if (beatIdx < bar.length) bar[beatIdx] = pattern;
        else bar.push(pattern);
        examState.selectedBeat = beatIdx + 1;
    }
    // Auto-advance to next beat or measure
    if (examState.selectedBeat >= bpb) {
        const next = (m + 1) % bars.length;
        examState.selectedMeasure = next;
        examState.selectedBeat = 0;
    }
    renderExamStaffSVG(qIdx);
}

// --- 提交与评分 ---
function submitExamAnswers() {
    if (!confirm('确定提交答卷吗？提交后将自动评分。')) return;
    const qs = examState.questions;
    const ans = examState.answers;
    const breakdown = [];
    let totalScore = 0;

    qs.forEach((q, qi) => {
        const userAns = ans[qi];
        const meta = getExamTypeMeta(q.type);
        const name = meta ? meta.name : q.type;
        const totalPossible = getExamItemScore(q);
        const scorePerItem = q.score;
        let result = null;

        switch (q.type) {
            case 'single': {
                const results = [];
                let score = 0;
                for (let i = 0; i < q.count; i++) {
                    const user = userAns[i] || '';
                    const correct = q.data[i];
                    const ok = user && areEnharmonic(user, correct);
                    results.push({ user: user || '未填', correct, ok });
                    if (ok) score += scorePerItem;
                }
                result = { name, score, total: totalPossible, results, type: 'single' };
                break;
            }
            case 'interval-pitch': {
                const results = [];
                let score = 0;
                for (let i = 0; i < q.count; i++) {
                    const ua = (userAns[i] || [])[0] || '';
                    const ub = (userAns[i] || [])[1] || '';
                    const ca = q.data[i].note1, cb = q.data[i].note2;
                    const ok = ua && ub && ((areEnharmonic(ua, ca) && areEnharmonic(ub, cb)) || (areEnharmonic(ua, cb) && areEnharmonic(ub, ca)));
                    results.push({ user: ua && ub ? `${ua} + ${ub}` : '未填', correct: `${ca} + ${cb}`, ok });
                    if (ok) score += scorePerItem;
                }
                result = { name, score, total: totalPossible, results, type: 'interval' };
                break;
            }
            case 'interval-quality': {
                const results = [];
                let score = 0;
                for (let i = 0; i < q.count; i++) {
                    // Grade quality: compare quality name
                    const ua = (userAns[i] || [])[0] || '';
                    const ub = (userAns[i] || [])[1] || '';
                    const correct = q.data[i];
                    // Compute user's quality from their two notes
                    let userQuality = '';
                    if (ua && ub) {
                        const st = Math.abs(getIntervalSemitones(ua, ub));
                        userQuality = getIntervalName(st);
                    }
                    const correctQuality = correct.quality;
                    // Also accept correct pitch order as alternative check
                    const ca = correct.note1, cb = correct.note2;
                    const pitchOk = ua && ub && ((areEnharmonic(ua, ca) && areEnharmonic(ub, cb)) || (areEnharmonic(ua, cb) && areEnharmonic(ub, ca)));
                    const qualityOk = userQuality === correctQuality;
                    const ok = pitchOk || qualityOk;
                    results.push({
                        user: ua && ub ? `${ua} + ${ub}（${userQuality || '未识别'}）` : '未填',
                        correct: `${ca} + ${cb}（${correctQuality}）`,
                        ok
                    });
                    if (ok) score += scorePerItem;
                }
                result = { name, score, total: totalPossible, results, type: 'interval' };
                break;
            }
            case 'chord-pitch': {
                const results = [];
                let score = 0;
                for (let i = 0; i < q.count; i++) {
                    const userNotes = (userAns[i] || []).filter(n => n);
                    const correctNotes = q.data[i].notes;
                    let ok = false;
                    let userStr = '未填';
                    if (userNotes.length === correctNotes.length && userNotes.length > 0) {
                        ok = userNotes.every(un => correctNotes.some(cn => areEnharmonic(un, cn))) &&
                            correctNotes.every(cn => userNotes.some(un => areEnharmonic(un, cn)));
                        userStr = userNotes.join(' + ');
                    } else if (userNotes.length > 0) {
                        userStr = userNotes.join(' + ');
                    }
                    results.push({ user: userStr, correct: correctNotes.join(' + '), ok });
                    if (ok) score += scorePerItem;
                }
                result = { name, score, total: totalPossible, results, type: 'chord' };
                break;
            }
            case 'chord-quality': {
                const results = [];
                let score = 0;
                for (let i = 0; i < q.count; i++) {
                    const userNotes = (userAns[i] || []).filter(n => n);
                    const correct = q.data[i];
                    const correctNotes = correct.notes;
                    // Compare note sets with enharmonic equivalence (pitch) OR compare type name
                    let pitchOk = false;
                    if (userNotes.length === correctNotes.length && userNotes.length > 0) {
                        pitchOk = userNotes.every(un => correctNotes.some(cn => areEnharmonic(un, cn))) &&
                            correctNotes.every(cn => userNotes.some(un => areEnharmonic(un, cn)));
                    }
                    // Compute user's chord quality from their notes (best effort root detection)
                    let userStr = '未填';
                    if (userNotes.length > 0) userStr = userNotes.join(' + ');
                    const ok = pitchOk;
                    results.push({ user: userStr, correct: `${correctNotes.join(' + ')}（${correct.typeName}）`, ok });
                    if (ok) score += scorePerItem;
                }
                result = { name, score, total: totalPossible, results, type: 'chord' };
                break;
            }
            case 'rhythm': {
                // perCountPlus1: (count + 1) * score => scoreTimeSig=score, scorePerBar=score
                const graded = _gradeRhythm(userAns, q.data, scorePerItem, scorePerItem);
                result = { name, score: graded.score, total: totalPossible, ...graded, type: 'rhythm' };
                break;
            }
            case 'melody': {
                // perCountPlus2: (count + 2) * score => scoreKey=score, scoreTimeSig=score, scorePerBar=score
                const graded = _gradeMelody(userAns, q.data, scorePerItem);
                result = { name, score: graded.score, total: totalPossible, ...graded, type: 'melody' };
                break;
            }
            default:
                result = { name, score: 0, total: totalPossible, type: 'single', results: [] };
        }
        breakdown.push(result);
        totalScore += result.score;
    });

    examState.score = totalScore;
    examState.scoreBreakdown = breakdown;
    examState.testEndTime = new Date();
    examState.phase = 'graded';

    document.getElementById('exam-answering-section').style.display = 'none';
    document.getElementById('exam-result-section').style.display = 'block';
    showExamResults(breakdown, totalScore);
    updateExamLeaderboard();
}

function _gradeRhythm(userAns, correct, scoreTimeSig, scorePerBar) {
    const userTS = userAns.timeSig;
    const tsOk = userTS === correct.timeSignature;
    let score = tsOk ? scoreTimeSig : 0;
    const barResults = [];
    for (let b = 0; b < correct.bars; b++) {
        const correctBar = correct.measures[b];
        const userBar = userAns.bars[b] || [];
        let barOk = tsOk && userBar.length === correctBar.length;
        if (barOk) {
            for (let j = 0; j < correctBar.length; j++) {
                if ((userBar[j] || '') !== correctBar[j]) { barOk = false; break; }
            }
        }
        barResults.push({
            user: userBar.map(v => v || '?').join(' ') || '空',
            correct: correctBar.join(' '),
            ok: barOk
        });
        if (barOk) score += scorePerBar;
    }
    return { score, tsOk, userTS, correctTS: correct.timeSignature, barResults };
}

function _gradeMelody(userAns, correct, scorePerItem) {
    const userKey = userAns.key;
    const userTS = userAns.timeSig;
    const keyOk = userKey === correct.key;
    const tsOk = userTS === correct.timeSignature;
    let score = (keyOk ? scorePerItem : 0) + (tsOk ? scorePerItem : 0);
    const barResults = [];
    for (let b = 0; b < correct.bars; b++) {
        const correctBar = correct.measures[b] || [];
        const userBar = userAns.bars[b] || [];

        // Normalize to comparable strings: pitch (enharmonic-aware) + duration|dots
        const normalize = (n) => {
            if (!n || typeof n !== 'object') return '';
            const p = n.pitch || '';
            const d = n.duration || '';
            const dt = n.dots || 0;
            return `${p}|${d}|${dt}`;
        };
        const userNorm = userBar.map(normalize).filter(s => s);
        const correctNorm = correctBar.map(normalize).filter(s => s);

        let barOk = tsOk && userNorm.length === correctNorm.length;
        const perNoteResults = [];
        if (barOk) {
            for (let j = 0; j < correctNorm.length; j++) {
                const [uPitch, uDur, uDots] = userNorm[j].split('|');
                const [cPitch, cDur, cDots] = correctNorm[j].split('|');
                const pOk = areEnharmonic(uPitch, cPitch);
                const dOk = uDur === cDur && uDots === cDots;
                const noteOk = pOk && dOk;
                if (!noteOk) barOk = false;
                perNoteResults.push({ user: userNorm[j], correct: correctNorm[j], ok: noteOk });
            }
        } else {
            // Still build per-note display of what was there
            const maxLen = Math.max(userNorm.length, correctNorm.length);
            for (let j = 0; j < maxLen; j++) {
                const u = userNorm[j] || '—';
                const c = correctNorm[j] || '—';
                perNoteResults.push({ user: u, correct: c, ok: false });
            }
        }

        const userDisplay = userNorm.map(s => {
            const [p, d, dt] = s.split('|');
            return `${p}${d}${parseInt(dt) > 0 ? '.'.repeat(parseInt(dt)) : ''}`;
        }).join(' ') || '空';
        const correctDisplay = correctNorm.map(s => {
            const [p, d, dt] = s.split('|');
            return `${p}${d}${parseInt(dt) > 0 ? '.'.repeat(parseInt(dt)) : ''}`;
        }).join(' ');

        barResults.push({
            user: userDisplay,
            correct: correctDisplay,
            ok: barOk
        });
        if (barOk) score += scorePerItem;
    }
    return { score, keyOk, tsOk, userKey, correctKey: correct.keyName || correct.key, userTS, correctTS: correct.timeSignature, barResults };
}

// --- 结果展示 ---
function showExamResults(breakdown, totalScore) {
    const el = document.getElementById('exam-result-content');
    if (!el) return;
    const elapsed = Math.floor((examState.testEndTime - examState.testStartTime) / 1000);
    const totalPossible = breakdown.reduce((s, b) => s + b.total, 0);
    const pct = totalPossible > 0 ? totalScore / totalPossible : 0;
    const grade = pct >= 0.9 ? '优秀' : pct >= 0.75 ? '良好' : pct >= 0.6 ? '及格' : '不及格';
    let html = `
    <div class="exam-result-summary">
        <div class="exam-result-score">${totalScore}<span class="ers-unit"> / ${totalPossible} 分</span></div>
        <div class="exam-result-grade">${grade}</div>
        <div class="exam-result-breakdown">`;
    breakdown.forEach(b => {
        const cls = b.score === b.total ? 'full' : b.score > 0 ? 'partial' : 'zero';
        html += `<div class="erb-item"><div class="erb-label">${b.name}</div><div class="erb-value" style="color:${b.score === b.total ? '#81c784' : b.score > 0 ? '#FFB74D' : '#ef9a9a'}">${b.score}/${b.total}</div></div>`;
    });
    html += `</div></div>`;

    // Per-question comparison
    breakdown.forEach((b, idx) => {
        const cls = b.score === b.total ? 'full' : b.score > 0 ? 'partial' : 'zero';
        html += `<div class="exam-comparison-card" id="ec-${idx}">
            <div class="exam-comparison-header" onclick="document.getElementById('ec-${idx}').classList.toggle('expanded')">
                <span class="ec-title">第${idx + 1}题 ${b.name}</span>
                <span class="ec-score ${cls}">${b.score}/${b.total}分</span>
            </div><div class="exam-comparison-body">`;

        if (b.type === 'single' || b.type === 'interval' || b.type === 'chord') {
            html += `<table class="compare-table"><tr><th>题号</th><th>你的答案</th><th>正确答案</th><th>结果</th></tr>`;
            b.results.forEach((r, i) => {
                html += `<tr><td>${i + 1}</td><td class="${r.ok ? 'correct' : 'mismatch'}">${r.user || '未填'}</td><td class="correct">${r.correct}</td><td>${r.ok ? '✓' : '✗'}</td></tr>`;
            });
            html += `</table>`;
        } else if (b.type === 'rhythm') {
            html += `<p style="margin-bottom:6px"><strong>拍号：</strong>你的答案 <span class="${b.tsOk ? 'correct' : 'mismatch'}">${b.userTS}</span> | 正确答案 <span class="correct">${b.correctTS}</span> ${b.tsOk ? '✓' : '✗'}</p>`;
            html += `<table class="compare-table"><tr><th>小节</th><th>你的答案</th><th>正确答案</th><th>结果</th></tr>`;
            b.barResults.forEach((r, i) => {
                html += `<tr><td>${i + 1}</td><td class="${r.ok ? 'correct' : 'mismatch'}">${r.user}</td><td class="correct">${r.correct}</td><td>${r.ok ? '✓' : '✗'}</td></tr>`;
            });
            html += `</table>`;
        } else if (b.type === 'melody') {
            html += `<p style="margin-bottom:4px"><strong>调：</strong>你的答案 <span class="${b.keyOk ? 'correct' : 'mismatch'}">${b.userKey}</span> | 正确答案 <span class="correct">${b.correctKey}</span> ${b.keyOk ? '✓' : '✗'}</p>`;
            html += `<p style="margin-bottom:6px"><strong>拍号：</strong>你的答案 <span class="${b.tsOk ? 'correct' : 'mismatch'}">${b.userTS}</span> | 正确答案 <span class="correct">${b.correctTS}</span> ${b.tsOk ? '✓' : '✗'}</p>`;
            html += `<table class="compare-table"><tr><th>小节</th><th>你的答案</th><th>正确答案</th><th>结果</th></tr>`;
            b.barResults.forEach((r, i) => {
                html += `<tr><td>${i + 1}</td><td class="${r.ok ? 'correct' : 'mismatch'}">${r.user}</td><td class="correct">${r.correct}</td><td>${r.ok ? '✓' : '✗'}</td></tr>`;
            });
            html += `</table>`;
        }
        html += `</div></div>`;
    });

    // Analysis
    const weak = breakdown.filter(b => b.total > 0 && b.score / b.total < 0.6);
    html += `<div class="exam-analysis-section"><h4>📊 简要分析</h4>`;
    html += `<p>总分 ${totalScore}/${totalPossible}，用时 ${Math.floor(elapsed / 60)}分${elapsed % 60}秒。`;
    if (weak.length > 0) {
        html += `以下题型需要加强练习：`;
        weak.forEach(w => html += `<span class="weak-tag">${w.name} (${w.score}/${w.total})</span>`);
    } else {
        html += `各题型表现均衡，继续保持！`;
    }
    html += `</p></div>`;

    el.innerHTML = html;
    el.scrollIntoView({ behavior: 'smooth' });
}

// --- 风云榜单 ---
function updateExamLeaderboard() {
    const userInfo = chordAppState.userInfo;
    if (!userInfo || !userInfo.name) return;
    const key = 'comprehensiveExamLeaderboard';
    let lb = localStorage.getItem(key);
    lb = lb ? JSON.parse(lb) : [];
    const elapsed = Math.floor((examState.testEndTime - examState.testStartTime) / 1000);
    lb.push({
        name: userInfo.name,
        school: userInfo.school || '未填写',
        majorClass: userInfo.majorClass || '未填写',
        score: examState.score,
        time: elapsed,
        date: new Date().toLocaleString('zh-CN')
    });
    lb.sort((a, b) => b.score - a.score || a.time - b.time);
    lb = lb.slice(0, 10);
    localStorage.setItem(key, JSON.stringify(lb));
    examState.leaderboard = lb;
    console.log('综合考试榜单已更新', lb);
}

function renderExamLeaderboard() {
    const list = document.getElementById('leaderboard-list-exam');
    const info = document.getElementById('exam-leaderboard-info');
    if (!list) return;
    const key = 'comprehensiveExamLeaderboard';
    let lb = localStorage.getItem(key);
    lb = lb ? JSON.parse(lb) : [];
    if (lb.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:40px;color:rgba(255,255,255,0.5)">暂无榜单数据</div>';
        if (info) info.textContent = '完成综合考试后成绩将自动记入榜单';
        return;
    }
    let html = '';
    lb.forEach((r, i) => {
        const rank = i + 1;
        const rc = rank <= 3 ? `lb-rank-${rank}` : '';
        const m = Math.floor(r.time / 60), s = r.time % 60;
        html += `<div class="leaderboard-row ${rc}"><div class="lb-rank-value">${rank}</div><div class="lb-name-value">${r.name}</div><div class="lb-score-value">${r.score}</div><div class="lb-time-value">${m}:${String(s).padStart(2, '0')}</div></div>`;
    });
    list.innerHTML = html;
    if (info) info.textContent = `共 ${lb.length} 条记录`;
}

// ==================== 确保DOM加载后初始化 ====================
if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', function () { init(); }); } else { init(); }

// 后续：其余模块（音程/单音/节奏/旋律）定义与实现保留在此文件（已提取）
