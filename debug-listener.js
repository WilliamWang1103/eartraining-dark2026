// 在听音 App 的控制台中运行此代码

console.log('=== 听音 App MIDI 诊断 ===\n');

// 1. 检查 init() 是否被调用
console.log('1. 检查初始化状态:');
console.log('   midiInitialized:', typeof midiInitialized !== 'undefined' ? midiInitialized : '❌ 未定义');
console.log('   midiAccess:', typeof midiAccess !== 'undefined' ? (midiAccess ? '已连接' : 'null') : '❌ 未定义');

// 2. 检查函数是否存在
console.log('\n2. 检查函数:');
console.log('   initMIDI:', typeof initMIDI);
console.log('   initMidiConnectButtons:', typeof initMidiConnectButtons);

// 3. 检查按钮
console.log('\n3. 检查按钮:');
const chordBtn = document.getElementById('connect-midi-btn-chord');
console.log('   和弦页面按钮:', chordBtn ? '✅ 存在' : '❌ 不存在');

if (chordBtn) {
    console.log('      - 可见性:', chordBtn.offsetParent !== null ? '可见' : '隐藏');
    console.log('      - 尺寸:', `${chordBtn.offsetWidth}x${chordBtn.offsetHeight}px`);
    
    // 高亮按钮
    chordBtn.style.border = '5px solid red';
    chordBtn.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
}

// 4. 测试 body 点击事件
console.log('\n4. 测试 body 点击事件:');
let bodyClickDetected = false;
document.body.addEventListener('click', () => {
    bodyClickDetected = true;
    console.log('✅ Body 点击事件被触发！');
}, {once: true});
console.log('   👉 现在请点击页面任意位置...');

// 5. 测试按钮点击事件
if (chordBtn) {
    console.log('\n5. 测试按钮点击事件:');
    chordBtn.addEventListener('click', (e) => {
        console.log('✅ 按钮点击事件被触发！');
        console.log('   事件目标:', e.target);
        console.log('   当前目标:', e.currentTarget);
    }, {once: true});
    console.log('   👉 现在请点击 "连接 MIDI" 按钮...');
}

// 6. 手动调用 initMIDI
console.log('\n6. 手动调用测试:');
console.log('   运行以下命令来手动初始化 MIDI:');
console.log('   manualInitMIDI()');

async function manualInitMIDI() {
    console.log('\n🎹 手动调用 initMIDI...');
    
    if (typeof initMIDI !== 'function') {
        console.error('❌ initMIDI 函数不存在');
        return;
    }
    
    try {
        await initMIDI();
        console.log('✅ initMIDI 执行完成');
        console.log('   midiInitialized:', midiInitialized);
        console.log('   midiAccess:', midiAccess ? '已连接' : 'null');
    } catch (error) {
        console.error('❌ initMIDI 执行失败:', error);
    }
}

// 7. 直接请求权限（绕过所有代码）
console.log('\n7. 直接权限请求测试:');
console.log('   运行以下命令来直接请求权限:');
console.log('   directPermissionRequest()');

async function directPermissionRequest() {
    console.log('\n📡 直接请求 MIDI 权限...');
    
    try {
        const access = await navigator.requestMIDIAccess({ sysex: false });
        console.log('✅ 权限已授予！');
        
        let count = 0;
        for (let input of access.inputs.values()) {
            count++;
            console.log(`   设备 ${count}:`, input.name);
        }
        
        // 更新全局变量
        if (typeof midiAccess !== 'undefined') {
            midiAccess = access;
            midiInitialized = true;
            console.log('   ℹ️ 已更新全局变量');
        }
        
        return true;
    } catch (error) {
        console.error('❌ 请求失败:', error.message);
        return false;
    }
}

// 导出函数
window.manualInitMIDI = manualInitMIDI;
window.directPermissionRequest = directPermissionRequest;

console.log('\n=== 诊断完成 ===');
console.log('\n请按顺序执行:');
console.log('1. 查看上面的输出');
console.log('2. 点击页面空白处，看是否显示 "Body 点击事件被触发"');
console.log('3. 点击 "连接 MIDI" 按钮，看是否显示 "按钮点击事件被触发"');
console.log('4. 如果都没有触发，运行 manualInitMIDI()');
console.log('5. 如果还不行，运行 directPermissionRequest()\n');
