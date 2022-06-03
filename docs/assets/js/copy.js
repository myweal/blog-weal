function copyPlugin(hook, vm) {
  hook.doneEach(function () {
    var targetElms = document.querySelectorAll('pre[data-lang]');
    var i18n = {
      errorText: "错误",
      successText: "成功"
    };
    if (vm.config.copy) {
      Object.keys(i18n).forEach(function (key) {
        var textVal = vm.config.copy[key];
        if (typeof textVal === 'string') {
          i18n[key] = textVal;
          // } else if( typeof textVal === 'object' ) {
          //   const 
        }
      });
    }
    var template = "<div class=\"code-copy-plugin\"><span class=\"label\"><svg t=\"1595490352086\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2869\" width=\"16\" height=\"16\"><path d=\"M227.555556 682.666667h341.333333v113.777777H227.555556zM227.555556 455.111111h341.333333v113.777778H227.555556z\" p-id=\"2870\"></path><path d=\"M170.666667 0v170.666667h113.777777V113.777778h625.777778v739.555555h-56.888889v113.777778h170.666667V0H170.666667z\" p-id=\"2871\"></path><path d=\"M0 1024h796.444444V227.555556H0v796.444444zM113.777778 341.333333h568.888889v568.888889H113.777778V341.333333z\" p-id=\"2872\"></path></svg></span><span class=\"error\">" + i18n.errorText + "</span><span class=\"success\">" + i18n.successText + "</span></div>";
    targetElms.forEach(function (item) {
      item.insertAdjacentHTML('beforeend', template);
    });
  });
  hook.mounted(function () {
    var listenerHost = document.querySelector(".content");
    listenerHost.addEventListener("click", function (e) {
      var isCopyBtn = e.target.classList.contains('code-copy-plugin');
      if (isCopyBtn) {
        var btnElm_1 = e.target;
        var range = document.createRange();
        var preElm = btnElm_1.parentNode;
        var codeElm = preElm === null || preElm === void 0 ? void 0 : preElm.querySelector('code');
        var selection = window.getSelection();
        range.selectNode(codeElm);
        selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
        selection === null || selection === void 0 ? void 0 : selection.addRange(range);
        // 复制文本
        try {
          var isSuccess = document.execCommand('copy');
          if (isSuccess) {
            btnElm_1.classList.add("success");
            setTimeout(function () {
              btnElm_1.classList.remove("success");
            }, 1000);
          }
        }
        catch (e) {
          btnElm_1.classList.add("error");
          setTimeout(function () {
            btnElm_1.classList.remove("error");
          }, 1000);
        }
        selection = window.getSelection();
        if (typeof (selection === null || selection === void 0 ? void 0 : selection.removeRange) === 'function') {
          selection.removeRange(range);
        }
        else if (typeof (selection === null || selection === void 0 ? void 0 : selection.removeAllRanges) === "function") {
          selection.removeAllRanges();
        }
      }
    });
  });
}
window.$docsify = window.$docsify || {};
window.$docsify.plugins = [copyPlugin].concat(window.$docsify.plugins || []);
