// VexFlow 4.x CJS -> UMD wrapper
(function () {
  var module = { exports: {} };
  var exports = module.exports;
  
  // Load the CJS bundle
  var script = document.createElement('script');
  script.textContent = '(' + function() {
    // Stub for require
    var require = function(name) {
      // VexFlow 4.x internal requires are stubbed
      return {};
    };
    ' + document.querySelector('script[src$="vexflow.js"]').textContent + '; window.VF = module.exports; window.Vex = module.exports;';
  
  // Actually, let's just execute the CJS code in a controlled environment
})();
