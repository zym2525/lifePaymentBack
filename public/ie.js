(function () {
  var sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/firefox\/([\d.]+)/))
    ? (sys.firefox = s[1])
    : (s = ua.match(/chrome\/([\d.]+)/))
    ? (sys.chrome = s[1])
    : (s = ua.match(/opera.([\d.]+)/))
    ? (sys.opera = s[1])
    : (s = ua.match(/rv:([\d.]+)/))
    ? (sys.ie = s[1])
    : (s = ua.match(/msie ([\d.]+)/))
    ? (sys.ie = s[1])
    : (s = ua.match(/version\/([\d.]+).*safari/))
    ? (sys.safari = s[1])
    : 0;
  var browser = 'Unknown';

  var tip = document.createElement('div');
  var closeBtn = document.createElement('img');
  var iconHTML = '<img src="https://parkmanagement.oss-cn-hangzhou.aliyuncs.com/12333/staticHtml/img/icon-legacy-warning.png" style="width: 16px; height: 16px; margin-right: 8px;vertical-align: text-bottom"/>';
  var contentHTML =
    iconHTML + '您当前使用的浏览器可能会出现界面显示异常或功能无法正常使用等问题，建议切换到极速模式或下载使用最新的Chrome浏览器。';
  var endHTML =
    '&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://www.google.cn/intl/zh-CN/chrome/browser-tools/" target="_blank" style="cursor: pointer; color: #3A71FF;">下载浏览器点我</a>';
  var handleClickClose = function (event) {
    document.body.removeChild(tip);
  };
  var startAppend = function () {
    document.body.appendChild(tip);
    tip.appendChild(closeBtn);
  };

  closeBtn.style.position = 'absolute';
  closeBtn.style.right = '20px';
  closeBtn.style.bottom = '7px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.width = '15px';
  closeBtn.style.height = '15px';
  // closeBtn.src = '../assets/images/icon-close.png';
  closeBtn.alt = '关闭';

  if (closeBtn.addEventListener) {
    closeBtn.addEventListener('click', handleClickClose);
  } else {
    // IE8 及以下
    closeBtn.attachEvent('onclick', handleClickClose);
  }

  tip.style.backgroundColor = '#FFFBE6';
  tip.style.color = '#333333';
  tip.style.position = 'fixed';
  tip.style.top = 0;
  tip.style.right = 0;
  tip.style.left = 0;
  tip.style.fontSize = '14px';
  tip.style.textAlign = 'center';
  tip.style.height = '36px';
  tip.style.lineHeight = '36px';
  tip.style.fontFamily = 'Microsoft YaHei';
  tip.style.padding = '0 16px';

  if (sys.ie) {
    browser = 'IE';
    tip.innerHTML = contentHTML + endHTML;
    startAppend();
  }
  if (sys.firefox) {
    browser = 'Firefox';
    tip.innerHTML = contentHTML + endHTML;
    startAppend();
  }
  if (sys.chrome) {
    browser = 'Chrome';

    var getChromeVersion = function () {
      var arr = navigator.userAgent.split(' ');
      var chromeVersion = '';
      for (var i = 0; i < arr.length; i++) {
        if (/chrome/i.test(arr[i])) chromeVersion = arr[i];
      }
      if (chromeVersion) {
        return Number(chromeVersion.split('/')[1].split('.')[0]);
      } else {
        return false;
      }
    };

    if (getChromeVersion()) {
      var version = getChromeVersion();
      // 如果 360 极速浏览器并切换到极速模式低于86版本
      if (version < 86) {
        tip.innerHTML =
          iconHTML + '您当前使用的浏览器版本过低，使用可能会出现界面显示异常或功能无法正常使用等问题，建议下载使用最新的Chrome浏览器。' +
          endHTML;
        startAppend();
      }
    }
  }
  if (sys.opera) {
    browser = 'Opera';
    tip.innerHTML = contentHTML + endHTML;
    startAppend();
  }
  if (sys.safari) {
    browser = 'Safari';
  }
})();
