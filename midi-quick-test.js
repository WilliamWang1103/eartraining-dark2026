// MIDI 快速测试脚本 - 复制粘贴到浏览器控制台运行

console.log('\n%c🎹 MIDI 快速测试工具', 'font-size: 20px; font-weight: bold; color: #4CAF50;');
console.log('=====================================\n');

// 测试 1: 检查浏览器支持
console.log('%c测试 1: 浏览器支持检查', 'color: #2196F3; font-weight: bold;');
if (navigator.requestMIDIAccess) {
    console.log('%c✅ 浏览器支持 Web MIDI API', 'color: #4CAF50;');
} else {
    console.error('%c❌ 浏览器不支持 Web MIDI API！请使用 Chrome 或 Edge', 'color: #f44336;');
}

// 测试 2: 检查全局变量
console.log('\n%c测试 2: 检查应用状态', 'color: #2196F3; font-weight: bold;');
console.log('midiAccess:', typeof midiAccess !== 'undefined' ? (midiAccess ? '已连接' : '未连接') : '变量不存在');
console.log('initMIDI:', typeof initMIDI);
console.log('initMidiConnectButtons:', typeof initMidiConnectButtons);

// 测试 3: 检查按钮
console.log('\n%c测试 3: 检查 MIDI 连接按钮', 'color: #2196F3; font-weight: bold;');
const pages = ['chord', 'single', 'interval'];
pages.forEach(page => {
    const btn = document.getElementById(`connect-midi-btn-${page}`);
    const statusText = document.getElementById(`midi-status-text-${page}`);
    
    if (btn) {
        console.log(`%c✅ ${page} 页面`, 'color: #4CAF50;');
        console.log(`   按钮存在: 是`);
        console.log(`   按钮可见: ${btn.offsetParent !== null ? '是' : '否'}`);
        console.log(`   按钮尺寸: ${btn.offsetWidth}x${btn.offsetHeight}px`);
        console.log(`   当前状态: "${statusText ? statusText.textContent : 'N/A'}"`);
    } else {
        console.log(`%c❌ ${page} 页面`, 'color: #f44336;');
        console.log(`   按钮存在: 否`);
    }
});

// 测试 4: 手动请求权限函数
console.log('\n%c测试 4: 手动权限请求', 'color: #2196F3; font-weight: bold;');
console.log('运行以下命令来手动测试 MIDI 权限请求：');
console.log('%c  testMIDIPermission()', 'color: #FF9800; font-family: monospace; background: #f5f5f5; padding: 4px;');

async function testMIDIPermission() {
    console.log('\n%c📡 正在请求 MIDI 访问权限...', 'color: #FF9800;');
    
    try {
        const access = await navigator.requestMIDIAccess({ sysex: false });
        console.log('%c✅ MIDI 权限已成功授予！', 'color: #4CAF50; font-weight: bold;');
        
        console.log('\n可用的 MIDI 输入设备：');
        let deviceCount = 0;
        for (let input of access.inputs.values()) {
            deviceCount++;
            console.log(`%c  ${deviceCount}. ${input.name}`, 'color: #2196F3;');
            console.log(`     制造商: ${input.manufacturer || '未知'}`);
            console.log(`     状态: ${input.state}`);
            console.log(`     ID: ${input.id}`);
        }
        
        if (deviceCount === 0) {
            console.log('%c  ⚠️ 没有检测到 MIDI 设备', 'color: #FF9800;');
            console.log('  请确保 MIDI 键盘已正确连接并开启电源');
        }
        
        // 更新全局变量
        if (typeof midiAccess !== 'undefined') {
            midiAccess = access;
            console.log('\n%cℹ️ 已更新全局 midiAccess 变量', 'color: #9E9E9E;');
        }
        
        return true;
    } catch (error) {
        console.error('%c❌ MIDI 权限请求失败', 'color: #f44336; font-weight: bold;');
        console.error('错误信息:', error.message);
        console.error('错误详情:', error);
        
        if (error.message.includes('NotAllowedError')) {
            console.log('\n%c💡 提示：您可能之前拒绝了权限', 'color: #FF9800;');
            console.log('请在浏览器设置中清除该网站的 MIDI 权限设置后重试');
        }
        
        return false;
    }
}

// 测试 5: 模拟点击按钮
console.log('\n%c测试 5: 模拟按钮点击', 'color: #2196F3; font-weight: bold;');
console.log('运行以下命令来模拟点击和弦页面的 MIDI 连接按钮：');
console.log('%c  simulateButtonClick()', 'color: #FF9800; font-family: monospace; background: #f5f5f5; padding: 4px;');

function simulateButtonClick() {
    const btn = document.getElementById('connect-midi-btn-chord');
    if (!btn) {
        console.error('%c❌ 按钮不存在', 'color: #f44336;');
        return;
    }
    
    console.log('%c🖱️ 模拟点击 MIDI 连接按钮...', 'color: #FF9800;');
    console.log('如果一切正常，应该会弹出权限请求对话框');
    
    // 触发点击事件
    btn.click();
}

// 导出函数到全局作用域
window.testMIDIPermission = testMIDIPermission;
window.simulateButtonClick = simulateButtonClick;

console.log('\n=====================================');
console.log('%c✨ 测试工具已就绪！', 'color: #4CAF50; font-weight: bold;');
console.log('可用命令：');
console.log('  • testMIDIPermission() - 手动请求 MIDI 权限');
console.log('  • simulateButtonClick() - 模拟点击连接按钮');
console.log('=====================================\n');
