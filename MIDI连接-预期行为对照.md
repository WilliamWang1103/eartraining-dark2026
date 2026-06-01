# MIDI 连接 - 预期行为对照表

## 📺 正常情况下您应该看到的内容

### 1. 页面加载时（控制台输出）

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
系统初始化完成
```

---

### 2. 页面上应该看到的 UI

**在和弦/单音/音程练习页面：**

```
┌─────────────────────────────────────────────┐
│  🎵 MIDI: 点击页面任意位置以连接 MIDI 设备    │
│                      [🔌 连接 MIDI]          │
└─────────────────────────────────────────────┘
                    [钢琴键盘显示在这里]
```

- 状态文字应该是**橙色**的
- "🔌 连接 MIDI" 按钮应该可见且可点击

---

### 3. 点击按钮或页面空白处时

**控制台应该显示：**

```
🖱️ 用户点击 chord 页面的 MIDI 连接按钮
📡 正在请求 MIDI 访问权限...
```

**同时浏览器应该弹出对话框：**

```
┌──────────────────────────────────────────┐
│  localhost:8000                          │
│                                          │
│  此文件想要控制您的 MIDI 设备            │
│  以及为其重新编程                        │
│                                          │
│         [屏蔽]        [允许]             │
└──────────────────────────────────────────┘
```

---

### 4. 点击"允许"后

**控制台应该显示：**

```
✅ MIDI 访问已授予
🔄 MIDI 设备状态变化: [您的MIDI键盘名称] connected
已连接 1 个 MIDI 设备
```

**页面上的变化：**

```
┌─────────────────────────────────────────────┐
│  🎵 MIDI: 已连接 (您的MIDI键盘名称)          │
│                      [按钮已隐藏]            │
└─────────────────────────────────────────────┘
```

- 状态文字变成**绿色**
- "连接 MIDI" 按钮自动隐藏

---

## ❌ 异常情况对照

### 情况 A: 没有任何 MIDI 相关日志

**可能原因：**
- `app.js` 文件没有加载
- JavaScript 有语法错误
- 页面路径不对

**检查方法：**
```javascript
// 在控制台运行
console.log(typeof initMIDI);
// 应该显示 "function"，如果显示 "undefined" 说明文件没加载
```

---

### 情况 B: 看到 "⚠️ 浏览器不支持 Web MIDI API"

**可能原因：**
- 使用了 Firefox、Safari 等不支持的浏览器

**解决方法：**
- 改用 Chrome 或 Edge 浏览器

---

### 情况 C: 点击按钮后控制台没有任何输出

**可能原因：**
- 按钮事件监听器没有正确绑定
- 按钮被其他元素遮挡
- 按钮不存在

**检查方法：**
```javascript
const btn = document.getElementById('connect-midi-btn-chord');
console.log('按钮存在:', !!btn);
console.log('按钮可见:', btn ? btn.offsetParent !== null : 'N/A');
```

---

### 情况 D: 点击按钮后有输出但没有弹窗

**可能原因：**
- 之前拒绝了权限并被记住
- 浏览器设置了禁止 MIDI 访问

**解决方法：**
1. 点击地址栏左侧的锁图标
2. 找到 "MIDI 设备" 权限
3. 改为"允许"或删除设置
4. 刷新页面

---

### 情况 E: 弹窗出现但点击"允许"后还是未连接

**可能原因：**
- MIDI 键盘没有正确连接
- USB 线松动
- 键盘电源未开启

**检查方法：**
```javascript
// 手动检查设备列表
if (midiAccess) {
    console.log('MIDI 输入设备:');
    for (let input of midiAccess.inputs.values()) {
        console.log('  -', input.name, input.state);
    }
} else {
    console.log('midiAccess 未初始化');
}
```

---

## 🔧 快速诊断命令

复制以下任一命令到控制台运行：

### 命令 1: 检查整体状态
```javascript
console.log('浏览器支持:', !!navigator.requestMIDIAccess);
console.log('midiAccess:', typeof midiAccess);
console.log('initMIDI:', typeof initMIDI);
const btn = document.getElementById('connect-midi-btn-chord');
console.log('按钮存在:', !!btn);
```

### 命令 2: 强制请求权限
```javascript
navigator.requestMIDIAccess({ sysex: false })
    .then(a => { console.log('✅ 成功'); midiAccess = a; })
    .catch(e => console.error('❌ 失败:', e.message));
```

### 命令 3: 模拟按钮点击
```javascript
document.getElementById('connect-midi-btn-chord')?.click();
```

### 命令 4: 完整测试
```javascript
async function fullTest() {
    console.log('=== 开始测试 ===');
    
    // 1. 检查支持
    if (!navigator.requestMIDIAccess) {
        console.error('❌ 浏览器不支持');
        return;
    }
    console.log('✅ 浏览器支持');
    
    // 2. 请求权限
    try {
        const access = await navigator.requestMIDIAccess({ sysex: false });
        console.log('✅ 权限已授予');
        
        // 3. 列出设备
        let count = 0;
        for (let input of access.inputs.values()) {
            count++;
            console.log(`设备 ${count}:`, input.name);
        }
        
        if (count === 0) {
            console.warn('⚠️ 没有检测到设备');
        } else {
            console.log('✅ 检测到', count, '个设备');
        }
        
        // 4. 更新全局变量
        midiAccess = access;
        
    } catch (e) {
        console.error('❌ 权限请求失败:', e.message);
    }
    
    console.log('=== 测试完成 ===');
}

fullTest();
```

---

## 📞 需要帮助？

如果以上都不行，请提供：

1. **控制台完整截图**（从页面加载到点击按钮后的所有输出）
2. **浏览器类型和版本**（例如：Chrome 120.0.6099.109）
3. **操作系统**（macOS / Windows 及版本）
4. **MIDI 键盘型号**
5. **运行 `fullTest()` 的结果**

我会根据这些信息帮您进一步排查！
