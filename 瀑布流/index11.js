// 获取元素
var uls = document.getElementsByTagName('ul');
var ary = utils.toArray(uls);
var data;
var xhr = new XMLHttpRequest();
xhr.open('get','data.txt',false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        data = JSON.parse(xhr.responseText)
    }
};
xhr.send();

// 绑定元素
function bindHTML() {
    for (var i = 0; i < 50; i++) {
        var num = Math.round(Math.random() * 7);
        var obj = data(num);
        var list = document.createElement('li');

        var a = document.createElement('a');
        a.innerHTML = '采集';
        a.href = 'javascript:;';
        list.appendChild('a');

        var img = document.createElement('img');
        img.setAttribute('trueImg',obj.src);
        img.className = 'bg';
        img.style.height = Math.round(Math.random() * (350 - 200) + 200) + 'px';
        list.appendChild('img');

        var p = document.createElement('p');
        p.innerHTML = obj.title;
        list.appendChild('p');

        ary.sort(function (a, b) {
            return a.scrollHeight - b.scrollHeight
        });
        ary[0].appendChild('list')
    }
}
bindHTML();

// 延迟加载
var imgs = document.getElementsByClassName('bg');
function daley() {
     for (var i = 0; i < imgs.length; i++) {
         daleyImg(i)
     }
}

// 获取可视窗口
var winT = utils.win('clientHeight');

function daleyImg(num) {
    var cur = imgs(num);
    if (cur.load) {
        return
    }
    var curT = utils.offset(cur).top;
    var curH = cur.offsetHeight;
    var winH = utils.win('scrollTop');
    if (curT + curH < winT + winH) {
        var trueAddress = cur.getVarDate('trueImg')
    }
}