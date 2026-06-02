# 移动端开发规范指南

> **项目**: 音乐听觉综合训练系统  
> **版本**: v1.0  
> **最后更新**: 2026-06-01  
> **适用范围**: 所有前端开发人员

---

## 📱 一、设计原则

### 1.1 移动优先 (Mobile First)
- **默认针对移动端设计**，再适配桌面端
- 最小触摸目标尺寸：**44x44px**（iOS Human Interface Guidelines 标准）
- 字体大小不小于 **14px**，确保可读性
- 按钮间距至少 **8px**，防止误触

### 1.2 性能优先 (Performance First)
- 首屏加载时间控制在 **3秒以内**
- 避免布局抖动（Layout Thrashing）
- 减少重绘（Repaint）和回流（Reflow）
- 音频资源按需加载，避免预加载过多

### 1.3 代码精简 (Code Minimalism)
- 遵循 **KISS 原则**（Keep It Simple, Stupid）
- 单一职责：每个函数只做一件事
- 避免过度抽象和过早优化
- 删除未使用的代码和注释

### 1.4 严禁幻觉 (No Hallucination)
- 不确定的API必须查阅官方文档
- 不假设用户环境（浏览器版本、设备类型）
- 所有异步操作必须有错误处理
- 关键逻辑必须添加注释说明

---

## 🎯 二、交互设计规范

### 2.1 触摸事件处理

#### ✅ 正确做法
```javascript
// 使用 passive: false 允许 preventDefault
element.addEventListener('touchstart', (e) => {
    e.preventDefault(); // 阻止默认滚动行为
    handleInteraction();
}, { passive: false });

// 使用 touchend 而非 click 作为主要触发方式
element.addEventListener('touchend', (e) => {
    if (!isScrolling) {
        completeInteraction();
    }
}, { passive: true });
```

#### ❌ 错误做法
```javascript
// 错误1: 使用 passive: true 却调用 preventDefault
element.addEventListener('touchstart', (e) => {
    e.preventDefault(); // ⚠️ 无效！会报错
}, { passive: true });

// 错误2: 同时绑定 touchstart 和 click 导致重复触发
element.addEventListener('touchstart', handler);
element.addEventListener('click', handler); // ⚠️ 会触发两次！

// 错误3: 在 touchmove 中执行耗时操作
element.addEventListener('touchmove', (e) => {
    heavyCalculation(); // ⚠️ 导致卡顿
});
```

### 2.2 音频触发规范

**核心原则：即时响应，零延迟**

```javascript
// ✅ 推荐：在 touchstart 立即触发音频
key.addEventListener('touchstart', (e) => {
    e.preventDefault();
    playNote(note); // 立即发声
    highlightKey(note); // 立即高亮
}, { passive: false });

// ❌ 避免：在 touchend 或 click 才触发
key.addEventListener('click', () => {
    playNote(note); // ⚠️ 有300ms延迟
});
```

### 2.3 防抖与节流

```javascript
// 滚动事件必须节流
let scrollTimer = null;
window.addEventListener('scroll', () => {
    if (scrollTimer) return;
    scrollTimer = setTimeout(() => {
        handleScroll();
        scrollTimer = null;
    }, 100);
});

// 搜索输入必须防抖
let searchTimer = null;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        performSearch(e.target.value);
    }, 300);
});
```

---

## ⚡ 三、性能优化规范

### 3.1 DOM 操作优化

#### ✅ 批量更新
```javascript
// 推荐：使用 DocumentFragment
const fragment = document.createDocumentFragment();
notes.forEach(note => {
    const key = createKeyElement(note);
    fragment.appendChild(key);
});
piano.appendChild(fragment); // 只触发一次重排

// ❌ 避免：循环中直接操作 DOM
notes.forEach(note => {
    const key = createKeyElement(note);
    piano.appendChild(key); // ⚠️ 每次都会重排
});
```

#### ✅ 使用事件委托
```javascript
// 推荐：父元素监听，减少事件监听器数量
piano.addEventListener('click', (e) => {
    const key = e.target.closest('.piano-key');
    if (key) {
        handleKeyClick(key.dataset.note);
    }
});

// ❌ 避免：为每个琴键绑定事件
keys.forEach(key => {
    key.addEventListener('click', handler); // ⚠️ 23个监听器
});
```

### 3.2 内存管理

```javascript
// ✅ 及时清理事件监听器
function initPiano() {
    const handler = (e) => handleKeyClick(e);
    piano.addEventListener('click', handler);
    
    // 页面卸载时清理
    window.addEventListener('beforeunload', () => {
        piano.removeEventListener('click', handler);
    });
}

// ✅ 避免闭包导致的内存泄漏
function setupAudio() {
    let audioContext = new AudioContext();
    
    // 不使用匿名函数，方便后续清理
    const cleanup = () => {
        audioContext.close();
        audioContext = null;
    };
    
    return cleanup;
}
```

### 3.3 资源加载优化

```javascript
// ✅ 音频懒加载
const audioCache = new Map();

async function loadNote(note) {
    if (audioCache.has(note)) {
        return audioCache.get(note);
    }
    
    const audio = await fetchAudio(note);
    audioCache.set(note, audio);
    return audio;
}

// ❌ 避免：一次性加载所有音频
const allAudios = notes.map(note => fetchAudio(note)); // ⚠️ 浪费流量
```

---

## 🎨 四、UI/UX 规范

### 4.1 响应式设计

```css
/* ✅ 使用相对单位 */
.button {
    width: 100%;
    padding: 12px 24px;
    font-size: 1rem;
    min-height: 44px; /* 触摸友好 */
}

/* ❌ 避免固定像素 */
.button {
    width: 300px; /* ⚠️ 小屏幕溢出 */
    height: 30px; /* ⚠️ 太小不易点击 */
}
```

### 4.2 触摸反馈

```css
/* ✅ 提供视觉反馈 */
.piano-key:active {
    transform: scale(0.95);
    background-color: #ffd700;
    transition: transform 0.1s ease;
}

/* ✅ 禁用状态明确 */
.piano-key.disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
}
```

### 4.3 加载状态

```javascript
// ✅ 显示加载状态
async function submitAnswer() {
    showLoadingSpinner();
    disableSubmitButton();
    
    try {
        await validateAnswer();
    } finally {
        hideLoadingSpinner();
        enableSubmitButton();
    }
}
```

---

## 🔧 五、代码质量规范

### 5.1 命名规范

```javascript
// ✅ 语义化命名
const isTestMode = true;
const selectedNotes = [];
const maxAttempts = 3;

// ❌ 模糊命名
const flag = true;
const arr = [];
const num = 3;
```

### 5.2 函数设计

```javascript
// ✅ 单一职责，参数不超过3个
function calculateScore(correctCount, totalCount) {
    return Math.round((correctCount / totalCount) * 100);
}

// ✅ 提前返回，减少嵌套
function validateAnswer(answer) {
    if (!answer) return false;
    if (answer.length < 2) return false;
    if (!isValidInterval(answer)) return false;
    return true;
}

// ❌ 避免：过长函数（超过50行）
// ❌ 避免：深层嵌套（超过3层）
```

### 5.3 错误处理

```javascript
// ✅ 完整的错误处理
async function playAudio(note) {
    try {
        ensureAudioReady();
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffers[note];
        source.connect(audioContext.destination);
        source.start();
    } catch (error) {
        console.error(`播放音频失败: ${note}`, error);
        showErrorMessage('音频播放失败，请重试');
    }
}

// ❌ 避免：空 catch
try {
    doSomething();
} catch (e) {
    // ⚠️ 静默失败
}
```

### 5.4 注释规范

```javascript
// ✅ 解释"为什么"，而不是"做什么"
// 使用 touchstart 而非 click，因为移动端 click 有300ms延迟
key.addEventListener('touchstart', handler, { passive: false });

// ✅ 复杂算法必须注释
// 计算黑键位置：基于白键宽度和黑键偏移量
function calculateBlackKeyLeft(position) {
    // ...
}

// ❌ 避免：冗余注释
// 设置变量为true
const isActive = true; // ⚠️ 无意义
```

---

## 🧪 六、测试规范

### 6.1 手动测试清单

每次发布前必须测试：

- [ ] **iOS Safari**：iPhone 12+，Safari 浏览器
- [ ] **Android Chrome**：主流安卓机型，Chrome 浏览器
- [ ] **桌面端**：Chrome、Firefox、Safari
- [ ] **触摸交互**：轻触、长按、滑动、多点触控
- [ ] **音频播放**：首次激活、连续播放、快速切换
- [ ] **网络异常**：弱网、断网情况下的降级处理
- [ ] **横竖屏切换**：布局是否正常
- [ ] **键盘弹出**：输入框聚焦时布局是否错乱

### 6.2 性能监控

```javascript
// ✅ 关键指标监控
const performanceMetrics = {
    firstPaint: performance.now(),
    audioLoadTime: 0,
    interactionLatency: []
};

// 记录音频加载时间
async function loadAudio(note) {
    const start = performance.now();
    await fetchAudio(note);
    performanceMetrics.audioLoadTime = performance.now() - start;
}

// 记录交互延迟
key.addEventListener('touchstart', () => {
    const latency = performance.now() - eventTimestamp;
    performanceMetrics.interactionLatency.push(latency);
});
```

---

## 🚫 七、常见陷阱与避免方法

### 7.1 移动端音频自动播放限制

**问题**：iOS/Android 禁止自动播放音频

**解决方案**：
```javascript
// ✅ 在用户交互中初始化 AudioContext
document.addEventListener('touchstart', function initAudio() {
    ensureAudioReady();
    document.removeEventListener('touchstart', initAudio);
}, { once: true });
```

### 7.2 100vh 在移动端的坑

**问题**：`100vh` 包含地址栏高度，导致内容被遮挡

**解决方案**：
```css
/* ✅ 使用 dvh（动态视口高度） */
.container {
    height: 100dvh;
}

/* 或使用 JS 计算 */
.container {
    height: calc(var(--vh, 1vh) * 100);
}
```

```javascript
// 动态计算视口高度
function setVH() {
    document.documentElement.style.setProperty('--vh', 
        `${window.innerHeight * 0.01}px`);
}
window.addEventListener('resize', setVH);
setVH();
```

### 7.3 快速点击导致的双重提交

**问题**：用户快速多次点击提交按钮

**解决方案**：
```javascript
// ✅ 防抖 + 禁用按钮
let isSubmitting = false;

async function handleSubmit() {
    if (isSubmitting) return;
    
    isSubmitting = true;
    disableButton();
    
    try {
        await submitData();
    } finally {
        isSubmitting = false;
        enableButton();
    }
}
```

### 7.4 内存泄漏

**常见问题**：
- 未清理的定时器
- 未移除的事件监听器
- 闭包引用大对象

**解决方案**：
```javascript
// ✅ 组件销毁时清理
function cleanup() {
    clearInterval(timer);
    element.removeEventListener('click', handler);
    largeObject = null;
}

window.addEventListener('beforeunload', cleanup);
```

---

## 📊 八、性能指标目标

| 指标 | 目标值 | 测量方法 |
|------|--------|----------|
| 首屏加载时间 | < 3s | Lighthouse |
| 首次内容绘制 (FCP) | < 1.8s | Performance API |
| 最大内容绘制 (LCP) | < 2.5s | Performance API |
| 首次输入延迟 (FID) | < 100ms | Performance API |
| 累积布局偏移 (CLS) | < 0.1 | Performance API |
| 音频触发延迟 | < 50ms | 自定义测量 |
| 页面流畅度 (FPS) | > 50fps | requestAnimationFrame |

---

## 🔄 九、代码审查清单

提交代码前自查：

### 功能性
- [ ] 功能是否符合需求
- [ ] 边界情况是否处理（空值、异常、网络错误）
- [ ] 是否有内存泄漏风险

### 性能
- [ ] 是否有不必要的 DOM 操作
- [ ] 是否有未节流的滚动/ resize 事件
- [ ] 是否有未清理的定时器或监听器

### 移动端适配
- [ ] 触摸目标是否 >= 44x44px
- [ ] 是否有横向滚动条
- [ ] 字体是否清晰可读
- [ ] 按钮间距是否足够

### 代码质量
- [ ] 命名是否语义化
- [ ] 函数是否单一职责
- [ ] 是否有冗余代码
- [ ] 关键逻辑是否有注释

### 可维护性
- [ ] 是否有硬编码（应提取为常量）
- [ ] 是否有魔法数字（应命名常量）
- [ ] 错误信息是否友好

---

## 📚 十、参考资源

### 官方文档
- [MDN Web Docs - Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design - Touch Targets](https://material.io/design/usability/accessibility.html#touch-targets)

### 性能优化
- [Web.dev - Performance](https://web.dev/performance/)
- [Google Developers - Web Fundamentals](https://developers.google.com/web/fundamentals/)

### 音频处理
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Tone.js Documentation](https://tonejs.github.io/Tone.js/)

---

## 📝 附录：快速检查表

### 新功能开发流程

1. **需求分析**
   - [ ] 明确用户需求
   - [ ] 确定移动端适配要求
   - [ ] 评估性能影响

2. **技术方案**
   - [ ] 选择最优实现方案
   - [ ] 考虑兼容性问题
   - [ ] 预估开发时间

3. **编码实现**
   - [ ] 遵循本规范
   - [ ] 编写单元测试
   - [ ] 添加必要注释

4. **自测验证**
   - [ ] iOS Safari 测试
   - [ ] Android Chrome 测试
   - [ ] 桌面端测试
   - [ ] 性能测试

5. **代码审查**
   - [ ] 对照审查清单
   - [ ] 修复发现的问题
   - [ ] 更新文档

6. **部署上线**
   - [ ] 灰度发布
   - [ ] 监控关键指标
   - [ ] 收集用户反馈

---

**最后提醒**：规范是为了提高效率和质量，不是束缚。遇到特殊情况时，请与团队讨论后灵活调整。

**维护者**: 开发团队  
**更新频率**: 每季度 review 一次
