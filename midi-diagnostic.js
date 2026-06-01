// MIDI 诊断脚本 - 在浏览器控制台中运行此代码

console.log('=== MIDI 诊断开始 ===\n');

// 1. 检查浏览器支持
console.log('1. 浏览器信息:');
console.log('   User Agent:', navigator.userAgent);
console.log('   Web MIDI API 支持:', !!navigator.requestMIDIAccess);

if (!navigator.requestMIDIAccess) {
    console.error('❌ 您的浏览器不支持 Web MIDI API');
    console.log('   请使用 Chrome 或 Edge 浏览器');
    console.log('   当前浏览器可能不支持此功能');
} else {
    console.log('✅ 浏览器支持 Web MIDI API\n');
    
    // 2. 请求 MIDI 访问
    console.log('2. 请求 MIDI 访问权限...');
    navigator.requestMIDIAccess({ sysex: false })
        .then(function(access) {
            console.log('✅ MIDI 访问成功\n');
            
            // 3. 检查输入设备
            console.log('3. MIDI 输入设备列表:');
            const inputs = Array.from(access.inputs.values());
            console.log('   找到设备数量:', inputs.length);
            
            if (inputs.length === 0) {
                console.warn('⚠️ 未找到任何 MIDI 输入设备');
                console.log('   可能的原因:');
                console.log('   - MIDI 键盘未连接或未通电');
                console.log('   - USB 连接有问题');
                console.log('   - 驱动程序未安装');
                console.log('   - 设备不被系统识别');
            } else {
                inputs.forEach(function(input, index) {
                    console.log(`   设备 ${index + 1}:`);
                    console.log('     名称:', input.name);
                    console.log('     制造商:', input.manufacturer || '未知');
                    console.log('     状态:', input.state);
                    console.log('     ID:', input.id);
                    console.log('     类型:', input.type);
                });
            }
            
            console.log('\n4. MIDI 输出设备列表:');
            const outputs = Array.from(access.outputs.values());
            console.log('   找到设备数量:', outputs.length);
            outputs.forEach(function(output, index) {
                console.log(`   设备 ${index + 1}:`, output.name, '(', output.state, ')');
            });
            
            // 5. 监听设备变化
            console.log('\n5. 设置设备变化监听器...');
            access.onstatechange = function(event) {
                console.log('📢 MIDI 设备状态变化:');
                console.log('   设备:', event.port.name);
                console.log('   状态:', event.port.state);
                console.log('   类型:', event.port.type);
                
                // 重新列出所有设备
                setTimeout(function() {
                    console.log('\n   当前设备列表:');
                    const newInputs = Array.from(access.inputs.values());
                    console.log('   输入设备:', newInputs.length, '个');
                    newInputs.forEach(function(input) {
                        console.log('     -', input.name, '(', input.state, ')');
                    });
                }, 100);
            };
            
            console.log('✅ 监听器已设置');
            console.log('   现在可以尝试连接/断开 MIDI 设备，会看到状态变化\n');
            
            // 6. 测试消息监听
            console.log('6. 为第一个设备设置消息监听器...');
            if (inputs.length > 0) {
                const firstInput = inputs[0];
                firstInput.onmidimessage = function(event) {
                    console.log('🎹 收到 MIDI 消息:', event.data);
                    console.log('   命令:', event.data[0].toString(16).toUpperCase());
                    console.log('   音符:', event.data[1], '(十进制)');
                    console.log('   力度:', event.data[2]);
                    
                    // 转换为音符名称
                    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
                    const midiNote = event.data[1];
                    const octave = Math.floor(midiNote / 12) - 1;
                    const noteIndex = midiNote % 12;
                    const noteName = noteNames[noteIndex] + octave;
                    console.log('   音符名称:', noteName);
                };
                console.log('✅ 消息监听器已设置');
                console.log('   现在按下 MIDI 键盘的琴键，应该能看到消息\n');
            }
            
        })
        .catch(function(error) {
            console.error('❌ MIDI 访问失败:', error);
            console.log('   错误信息:', error.message);
            console.log('   可能的原因:');
            console.log('   - 浏览器阻止了 MIDI 权限请求');
            console.log('   - 页面不是通过 HTTPS 或 localhost 访问');
            console.log('   - 浏览器策略限制');
        });
}

console.log('\n=== 诊断脚本执行完毕 ===');
console.log('请查看上方的输出信息，并根据提示操作\n');
