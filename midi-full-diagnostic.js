// 在浏览器控制台中运行此代码来诊断 MIDI 问题

console.log('=== MIDI 问题诊断 ===\n');

// 1. 检查基本支持
console.log('1. 浏览器信息:');
console.log('   User Agent:', navigator.userAgent);
console.log('   Web MIDI API:', navigator.requestMIDIAccess ? '✅ 支持' : '❌ 不支持');

// 2. 检查变量是否存在
console.log('\n2. 全局变量检查:');
console.log('   midiAccess:', typeof midiAccess !== 'undefined' ? (midiAccess ? '已初始化' : 'null') : '❌ 未定义');
console.log('   midiInitialized:', typeof midiInitialized !== 'undefined' ? midiInitialized : '❌ 未定义');
console.log('   initMIDI:', typeof initMIDI);
console.log('   initMidiConnectButtons:', typeof initMidiConnectButtons);

// 3. 检查按钮
console.log('\n3. 按钮检查:');
['chord', 'single', 'interval'].forEach(page => {
    const btn = document.getElementById(`connect-midi-btn-${page}`);
    console.log(`   ${page} 页面按钮:`, btn ? '✅ 存在' : '❌ 不存在');
    if (btn) {
        console.log(`      - 可见性:`, btn.offsetParent !== null ? '可见' : '隐藏');
        console.log(`      - 尺寸:`, `${btn.offsetWidth}x${btn.offsetHeight}px`);
        console.log(`      - 位置:`, `(${btn.offsetLeft}, ${btn.offsetTop})`);
        
        // 高亮按钮
        btn.style.border = '3px solid red';
        btn.style.animation = 'pulse 1s infinite';
    }
});

// 4. 检查事件监听器
console.log('\n4. 事件监听器测试:');
let clickDetected = false;
const testHandler = () => {
    clickDetected = true;
    console.log('✅ Body 点击事件被触发！');
};
document.body.addEventListener('click', testHandler, {once: true});
console.log('   请点击页面任意位置来测试...');

// 5. 手动测试 MIDI 权限请求
console.log('\n5. 手动权限请求测试:');
console.log('   运行以下命令来测试:');
console.log('   testManualPermission()');

async function testManualPermission() {
    console.log('\n📡 正在手动请求 MIDI 权限...');
    
    if (!navigator.requestMIDIAccess) {
        console.error('❌ 浏览器不支持 Web MIDI API');
        return false;
    }
    
    try {
        const access = await navigator.requestMIDIAccess({ sysex: false });
        console.log('✅ 权限请求成功！');
        
        let count = 0;
        for (let input of access.inputs.values()) {
            count++;
            console.log(`   设备 ${count}:`, input.name);
        }
        
        if (count === 0) {
            console.warn('   ⚠️ 没有检测到 MIDI 设备');
        }
        
        // 更新全局变量
        if (typeof midiAccess !== 'undefined') {
            midiAccess = access;
            console.log('   ℹ️ 已更新 midiAccess 变量');
        }
        
        return true;
    } catch (error) {
        console.error('❌ 权限请求失败:', error.message);
        console.error('   错误对象:', error);
        
        if (error.name === 'NotAllowedError') {
            console.log('\n💡 提示：您可能之前拒绝了权限');
            console.log('   请清除网站设置后重试');
        }
        
        return false;
    }
}

// 6. 模拟按钮点击
console.log('\n6. 模拟按钮点击测试:');
console.log('   运行以下命令来模拟点击:');
console.log('   simulateButtonClick()');

function simulateButtonClick() {
    const btn = document.getElementById('connect-midi-btn-chord');
    if (!btn) {
        console.error('❌ 按钮不存在');
        return;
    }
    
    console.log('🖱️ 模拟点击按钮...');
    btn.click();
}

// 7. 检查是否有其他元素遮挡
console.log('\n7. 检查元素遮挡:');
const chordBtn = document.getElementById('connect-midi-btn-chord');
if (chordBtn) {
    const rect = chordBtn.getBoundingClientRect();
    const elementAtPoint = document.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
    );
    
    console.log('   按钮中心点元素:', elementAtPoint);
    console.log('   是否是按钮本身:', elementAtPoint === chordBtn ? '✅' : '❌ 可能被遮挡');
    
    if (elementAtPoint !== chordBtn) {
        console.log('   遮挡元素的标签:', elementAtPoint.tagName);
        console.log('   遮挡元素的类名:', elementAtPoint.className);
    }
}

// 导出函数
window.testManualPermission = testManualPermission;
window.simulateButtonClick = simulateButtonClick;

console.log('\n=== 诊断完成 ===');
console.log('\n下一步操作:');
console.log('1. 查看上面的输出结果');
console.log('2. 点击页面任意位置，看是否显示 "Body 点击事件被触发"');
console.log('3. 运行 testManualPermission() 来直接测试权限请求');
console.log('4. 运行 simulateButtonClick() 来模拟按钮点击\n');
