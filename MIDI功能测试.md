# MIDI 功能测试清单

## 快速测试步骤

### 1. 浏览器兼容性测试
- [ ] 使用 Chrome 或 Edge 浏览器打开应用
- [ ] 按 F12 打开开发者工具
- [ ] 在 Console 中查看是否有 "MIDI 访问已授予" 或相关日志

### 2. MIDI 设备连接测试
- [ ] 连接 MIDI 键盘到电脑
- [ ] 刷新页面
- [ ] 检查钢琴键盘上方是否显示 "已连接 (设备名称)"
- [ ] 状态文字应为绿色

### 3. 基础音符测试
- [ ] 按下 MIDI 键盘上的 C4（中央C）
- [ ] 应该听到音符声音
- [ ] 屏幕上的 C4 琴键应该高亮显示（黄色）
- [ ] 高亮应该在 300ms 后消失

### 4. 音符范围测试
测试以下音符是否都能正常响应：
- [ ] G3（最低音）
- [ ] C4（中央C）
- [ ] F5（最高音）
- [ ] 尝试按下 F#5（超出范围，应该不响应）

### 5. 和弦测试
- [ ] 同时按下 C4、E4、G4（C大三和弦）
- [ ] 三个音符应该同时发声
- [ ] 三个琴键都应该高亮显示

### 6. 练习模式测试

#### 单音听辨模式
- [ ] 进入单音听辨练习
- [ ] 系统播放一个音符
- [ ] 使用 MIDI 键盘按下对应的音符
- [ ] 系统应该记录您的答案

#### 和弦听辨模式 - 音准
- [ ] 进入和弦听辨练习
- [ ] 选择"音准听辨"模式
- [ ] 系统播放一个和弦
- [ ] 依次按下和弦中的音符
- [ ] 系统应该记录每次按键

#### 和弦听辨模式 - 性质
- [ ] 切换到"性质听辨"模式
- [ ] 使用 MIDI 键盘试听音符
- [ ] 用鼠标选择和弦类型
- [ ] 提交答案

### 7. 热插拔测试
- [ ] 在应用运行时断开 MIDI 键盘
- [ ] 状态应该变为"未连接"（灰色）
- [ ] 重新连接 MIDI 键盘
- [ ] 状态应该恢复为"已连接"

### 8. 多设备测试（如果有多个 MIDI 设备）
- [ ] 连接第一个 MIDI 设备
- [ ] 连接第二个 MIDI 设备
- [ ] 两个设备的按键都应该能触发音符

## 常见问题诊断

### 如果 MIDI 设备未被识别

**检查点：**
1. 浏览器是否为 Chrome/Edge？
2. 是否在 HTTPS 或 localhost 环境下运行？
3. 浏览器是否请求了 MIDI 权限？
4. 设备是否在其他软件中正常工作？

**控制台检查：**
```javascript
// 在浏览器控制台中运行以下代码检查 MIDI 支持
console.log('Web MIDI API 支持:', !!navigator.requestMIDIAccess);

// 手动请求 MIDI 访问
navigator.requestMIDIAccess().then(
  access => {
    console.log('MIDI 访问成功');
    console.log('输入设备数量:', access.inputs.size);
    for (let input of access.inputs.values()) {
      console.log('设备:', input.name, input.state);
    }
  },
  error => {
    console.error('MIDI 访问失败:', error);
  }
);
```

### 如果音符不发声

**检查点：**
1. 系统音量是否正常？
2. 音频上下文是否已初始化？（需要先点击页面任意位置）
3. 按下的音符是否在 G3-F5 范围内？

**控制台检查：**
```javascript
// 检查音频上下文
console.log('AudioContext 状态:', window.audioContext?.state);

// 手动测试音频
if (window.audioContext) {
  const osc = window.audioContext.createOscillator();
  const gain = window.audioContext.createGain();
  osc.connect(gain);
  gain.connect(window.audioContext.destination);
  osc.frequency.value = 440; // A4
  gain.gain.value = 0.1;
  osc.start();
  osc.stop(window.audioContext.currentTime + 0.5);
}
```

### 如果琴键不高亮

**检查点：**
1. 音符名称是否正确映射？
2. DOM 元素是否存在？

**控制台检查：**
```javascript
// 检查琴键元素
const c4Key = document.querySelector('[data-note="C4"]');
console.log('C4 琴键元素:', c4Key);

// 手动测试高亮
if (c4Key) {
  c4Key.classList.add('active');
  setTimeout(() => c4Key.classList.remove('active'), 1000);
}
```

## 预期行为总结

✅ **正常情况：**
- MIDI 设备连接后立即显示状态
- 按下琴键立即发声（延迟 < 50ms）
- 琴键高亮显示 300ms
- 支持同时按下多个琴键
- 设备断开/重连自动检测

❌ **异常情况：**
- 状态一直显示"未连接" → 检查浏览器兼容性和权限
- 按下琴键无声音 → 检查音频上下文和音量
- 琴键不高亮 → 检查音符映射和 DOM 元素
- 部分音符不响应 → 检查是否在支持的音符范围内

## 性能指标

- **MIDI 消息处理延迟：** < 10ms
- **音频播放延迟：** < 50ms
- **视觉反馈延迟：** < 100ms
- **总响应时间：** < 160ms（从按下琴键到听到声音并看到高亮）

---

**测试完成后，您应该能够流畅地使用 MIDI 键盘进行音乐听力练习！** 🎹✨
