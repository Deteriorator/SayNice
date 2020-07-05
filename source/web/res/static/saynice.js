var themes = [
  "primary",
  "secondary",
  "green",
  "blue",
  "orange",
  "red",
  "black",
  "accent primary",
  "accent secondary",
  "accent green",
  "accent blue",
  "accent blue",
  "accent orange",
  "accent black",
]

function initTheme() {
  var theme = Cookies.get("theme")

  if (theme) {
    setTheme(theme)
  } else {
    randTheme()
  }
}

function randTheme() {
  var i = Math.random() * 10000 % themes.length
  var x = themes[Math.floor(i)]
  document.body.className = document.body.className + " " + x

  Cookies.set("theme", x)
}

function setTheme(theme) {
  document.body.className = document.body.className + " " + theme

  Cookies.set("theme", theme)
}

initTheme()

function httpGet(url, success, failure = undefined) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.responseType = "json";
  request.send();
  request.onload = function () {
    httpOnLoad(request, success, failure)
  }
}

function httpPost(url, data, success, failure = undefined) {
  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.responseType = "json";
  request.send(JSON.stringify(data));
  request.onload = function () {
    httpOnLoad(request, success, failure)
  }
}

function httpOnLoad(request, success, failure) {
  if (200 != request.status) {
    if (undefined == failure) {
      Snackbar.show({ text: "网络异常，请稍后再试。", });
    } else {
      failure(request.status, request.response)
    }
  } else {
    success(request.response)
  }
}

function apiGet(url, success, failure = undefined) {
  httpGet(url, function (resp) {
    if (0 == resp.code) {
      success(resp)
    } else if (undefined == failure) {
      Snackbar.show({ text: "请求失败: " + resp.erro, });
    } else {
      failure(200, resp)
    }
  }, failure)
}

function apiPost(url, data, success, failure = undefined) {
  httpPost(url, data, function (resp) {
    if (0 == resp.code) {
      success(resp)
    } else if (undefined == failure) {
      Snackbar.show({ text: "提交失败: " + resp.erro, });
    } else {
      failure(200, resp)
    }
  }, failure)
}

function autoLoad(callback) {
  var windowH = document.documentElement.clientHeight;//网页可视区域高度
  //windowH = window.innerHeight;
  //windowH=window.scrollY;
  var documentH = document.documentElement.offsetHeight;
  //documentH=document.documentElement.offsetHeight;
  var scrollH = document.documentElement.scrollTop;
  if (windowH + scrollH >= documentH) {
    callback()
  }
}