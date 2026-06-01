# MIDI 连接问题排查指南

## 🔍 详细诊断步骤

### 第一步：打开浏览器控制台

1. 在 Chrome/Edge 浏览器中打开 `http://localhost:8000`
2. 按 `Cmd + Option + I` (Mac) 或 `Ctrl + Shift + I` (Windows) 打开开发者工具
3. 点击 "Console"（控制台）标签

### 第二步：运行诊断脚本

**复制以下代码并粘贴到控制台中，然后按回车：**

```javascript
// 快速诊断命令
console.log('=== MIDI 诊断开始 ===');
console.log('1. 浏览器支持:', navigator.requestMIDIAccess ? '✅ 支持' : '❌ 不支持');
console.log('2. midiAccess 变量:', typeof midiAccess !== 'undefined' ? (midiAccess ? '已初始化' : 'null') : '未定义');

// 检查按钮
['chord', 'single', 'interval'].forEach(page => {
    const btn = document.getElementById(`connect-midi-btn-${page}`);
    console.log(`3.${page} 按钮:`, btn ? '✅ 存在' : '❌ 不存在');
    if (btn) {
        console.log(`   - 可见性:`, btn.offsetParent !== null ? '可见' : '隐藏');
        console.log(`   - 尺寸: ${btn.offsetWidth}x${btn.offsetHeight}px`);
    }
});

// 测试权限请求
async function testPermission() {
    try {
        console.log('正在请求 MIDI 权限...');
        const access = await navigator.requestMIDIAccess({ sysex: false });
        console.log('✅ 权限已授予！');
        for (let input of access.inputs.values()) {
            console.log(`   设备: ${input.name} (${input.state})`);
        }
    } catch (e) {
        console.error('❌ 权限请求失败:', e.message);
    }
}
console.log('\n运行 testPermission() 来手动测试权限请求');
console.log('=== 诊断完成 ===');
```

### 第三步：查看控制台输出

**正常情况应该看到：**
```
🎹 初始化 MIDI 系统...
✅ 浏览器支持 Web MIDI API
⏳ MIDI 已准备，等待用户交互以请求权限
👂 正在设置文档级别的事件监听器...
✅ 事件监听器设置完成 - 点击页面任意位置将触发 MIDI 权限请求
🔘 初始化 MIDI 连接按钮...
✅ 找到 chord 页面的 MIDI 连接按钮
✅ chord 页面按钮事件监听器已设置
✅ 找到 single 页面的 MIDI 连接按钮
✅ single 页面按钮事件监听器已设置
✅ 找到 interval 页面的 MIDI 连接按钮
✅ interval 页面按钮事件监听器已设置
✅ MIDI 连接按钮初始化完成
```

**如果看到错误信息，请记录下来告诉我。**

---

## 🛠️ 常见问题及解决方案

### 问题 1：浏览器不支持 Web MIDI API

**症状：**
- 控制台显示 "⚠️ 浏览器不支持 Web MIDI API"

**解决方案：**
- ✅ 使用 **Chrome** 或 **Edge** 浏览器
- ❌ Firefox、Safari 可能不支持

### 问题 2：按钮不存在

**症状：**
- 控制台显示 "⚠️ 未找到 chord 页面的 MIDI 连接按钮"

**解决方案：**
1. 确保您进入了练习页面（和弦/单音/音程）
2. 刷新页面重新加载
3. 检查 HTML 文件中是否有对应的按钮元素

### 问题 3：点击按钮没有任何反应

**可能原因 A：按钮被其他元素遮挡**

**检查方法：**
```javascript
// 在控制台中运行
const btn = document.getElementById('connect-midi-btn-chord');
if (btn) {
    btn.style.border = '3px solid red';
    btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
```

**可能原因 B：有其他事件监听器阻止了点击**

**检查方法：**
1. 打开控制台
2. 点击按钮
3. 查看是否有任何输出

**如果没有输出，说明点击事件没有被触发！**

**可能原因 C：JavaScript 文件没有正确加载**

**检查方法：**
```javascript
// 在控制台中运行
console.log(typeof initMIDI);
console.log(typeof initMidiConnectButtons);
// 应该都显示 "function"
```

### 问题 4：弹出权限对话框但点了"允许"后还是无法连接

**解决方案：**
1. 检查 MIDI 键盘是否正确连接
2. 在 Mac 上：系统偏好设置 → 安全性与隐私 → 隐私 → 输入监控
3. 在 Windows 上：设备管理器中查看 MIDI 设备状态

### 问题 5：之前点了"屏蔽"，现在无法再请求权限

**解决方案：**
1. Chrome: 地址栏左侧点击锁图标 → 网站设置 → MIDI 设备 → 改为"允许"
2. 或者：设置 → 隐私和安全 → 网站设置 → MIDI 设备 → 清除该网站的设置
3. 刷新页面重试

---

## 📋 完整测试流程

### 测试 1：检查初始化日志

1. 刷新页面 (`Cmd + R`)
2. 立即查看控制台
3. 应该看到上述的初始化日志

**如果没有看到任何 MIDI 相关的日志：**
- 说明 `app.js` 文件可能没有正确加载
- 检查网络标签页是否有 404 错误

### 测试 2：测试文档级点击监听器

1. 进入和弦练习页面
2. 在控制台运行：
```javascript
document.addEventListener('click', () => console.log('文档点击事件触发'), { once: true });
```
3. 点击页面任意空白处
4. 应该看到 "文档点击事件触发"

**如果没有触发：**
- 说明页面上有其他元素拦截了点击事件
- 可能是 CSS `pointer-events: none` 或其他问题

### 测试 3：手动调用权限请求

1. 在控制台运行：
```javascript
navigator.requestMIDIAccess({ sysex: false })
    .then(access => {
        console.log('✅ 成功！');
        for (let input of access.inputs.values()) {
            console.log(`设备: ${input.name}`);
        }
    })
    .catch(err => console.error('❌ 失败:', err));
```

2. 应该会弹出权限对话框

**如果这段代码都不工作：**
- 说明浏览器完全不支持 Web MIDI API
- 或者浏览器设置了禁止 MIDI 访问

### 测试 4：直接点击按钮测试

1. 在控制台运行：
```javascript
const btn = document.getElementById('connect-midi-btn-chord');
if (btn) {
    console.log('模拟点击按钮...');
    btn.click();
} else {
    console.error('按钮不存在');
}
```

2. 观察控制台输出和是否弹出权限对话框

---

## 🎯 最可能的原因

根据经验，最可能的原因是：

1. **浏览器不支持** - 使用了 Firefox 或 Safari
2. **之前拒绝了权限** - 需要清除网站设置
3. **页面没有正确加载** - JavaScript 文件有错误或路径不对
4. **按钮被遮挡** - CSS 层叠问题导致点击不到按钮

---

## 📞 获取帮助

如果以上步骤都无法解决问题，请提供以下信息：

1. **浏览器类型和版本**（例如：Chrome 120.0.6099.109）
2. **操作系统**（macOS / Windows）
3. **控制台完整输出**（截图或复制文本）
4. **运行诊断脚本的结果**
5. **MIDI 键盘型号和连接方式**（USB / Bluetooth）

把这些信息发给我，我会帮您进一步排查！
