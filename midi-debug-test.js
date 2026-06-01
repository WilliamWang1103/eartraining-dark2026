// MIDI 连接诊断脚本 - 在浏览器控制台中运行此代码

console.log('=== MIDI 连接诊断开始 ===\n');

// 1. 检查浏览器支持
console.log('1. 浏览器支持检查:');
console.log('   navigator.requestMIDIAccess:', typeof navigator.requestMIDIAccess);
if (!navigator.requestMIDIAccess) {
    console.error('   ❌ 浏览器不支持 Web MIDI API！请使用 Chrome 或 Edge 浏览器');
} else {
    console.log('   ✅ 浏览器支持 Web MIDI API');
}

// 2. 检查 midiAccess 变量
console.log('\n2. MIDI 访问状态:');
console.log('   midiAccess 变量:', typeof midiAccess !== 'undefined' ? midiAccess : '未定义');

// 3. 检查按钮是否存在
console.log('\n3. MIDI 连接按钮检查:');
const pages = ['chord', 'single', 'interval'];
pages.forEach(page => {
    const btn = document.getElementById(`connect-midi-btn-${page}`);
    const statusText = document.getElementById(`midi-status-text-${page}`);
    
    if (btn) {
        console.log(`   ✅ ${page} 页面按钮存在`);
        console.log(`      - 显示状态: ${btn.style.display || 'visible'}`);
        console.log(`      - 可见性: ${btn.offsetParent !== null ? '可见' : '隐藏'}`);
        console.log(`      - 位置: (${btn.offsetLeft}, ${btn.offsetTop})`);
    } else {
        console.log(`   ❌ ${page} 页面按钮不存在`);
    }
    
    if (statusText) {
        console.log(`   ✅ ${page} 页面状态文本存在: "${statusText.textContent}"`);
    } else {
        console.log(`   ❌ ${page} 页面状态文本不存在`);
    }
});

// 4. 检查事件监听器
console.log('\n4. 事件监听器检查:');
console.log('   注意：无法直接检查已注册的事件监听器，但可以尝试手动触发');

// 5. 尝试手动请求 MIDI 权限
console.log('\n5. 手动测试 MIDI 权限请求:');
async function testMIDIPermission() {
    try {
        console.log('   正在请求 MIDI 访问权限...');
        const access = await navigator.requestMIDIAccess({ sysex: false });
        console.log('   ✅ MIDI 权限已授予！');
        
        // 列出所有设备
        console.log('   可用 MIDI 输入设备:');
        for (let input of access.inputs.values()) {
            console.log(`     - ${input.name} (${input.manufacturer}) - 状态: ${input.state}`);
        }
        
        return true;
    } catch (error) {
        console.error('   ❌ MIDI 权限请求失败:', error.message);
        console.error('   错误详情:', error);
        return false;
    }
}

// 6. 提供快速测试命令
console.log('\n=== 快速测试命令 ===');
console.log('要手动测试 MIDI 连接，请在控制台运行:');
console.log('   testMIDIPermission()');
console.log('\n或者点击页面上的 "🔌 连接 MIDI" 按钮');
console.log('=== 诊断完成 ===\n');

// 导出测试函数供后续使用
window.testMIDIPermission = testMIDIPermission;
