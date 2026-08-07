// VexFlow 4.x loader - 简单包装
// vexflow.js 的UMD包装器会自动设置 window.Vex
// 这里确保 window.VF 也可用（作为别名）
(function () {
  // 等待 vexflow.js 加载完成
  var checkInterval = setInterval(function () {
    if (window.Vex && window.Vex.Renderer) {
      // VexFlow已加载，创建VF别名
      window.VF = window.Vex;
      clearInterval(checkInterval);
      console.info('VexFlow 4.x loaded. window.Vex and window.VF are available.');
    }
  }, 50);

  // 超时保护
  setTimeout(function () {
    clearInterval(checkInterval);
    if (!window.Vex || !window.Vex.Renderer) {
      console.error('VexFlow加载超时，请确保lib/vexflow.js文件存在');
    }
  }, 5000);
})();
