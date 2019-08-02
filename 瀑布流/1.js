var uls = document.getElementsByTagName('ul');
var aryUl = utils.toArray(uls);
var data;
var xhr = new XMLHttpRequest();
xhr.open('get','data.txt',false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
        data = JSON.parse(xhr.responseText)
    }
}
xhr.send();



function bindHtml() {
    for (var i = 0; i < 50; i++) {  // 循环50个
        var num = Math.round(Math.random()*7); //产生随机整数
        var curObj = data[num]; // 把后台请求来的数据，按照上面随机整数，赋值
        var curLi = document.createElement('li'); // 动态创建 li
        var a = document.createElement('a'); // 动态创建 a
        a.innerHTML = '采集'; // a 输出 文字
        a.href = 'javascript:;'; // a  禁止跳转
        curLi.appendChild(a); // 把 a 放在  li  里面

        var img = document.createElement('img'); // 动态创建 img
        img.setAttribute('trueImg',curObj.src); // 给img 添加行内属性， 并且把上面随机获取的数据的路径给这个 属性
        img.style.height = Math.round(Math.random()*(350-200)+200)+'px'; // 获取图片的高度在350 200 之间
        curLi.appendChild(img); // 把 img  插入 到 li  里面

        var p = document.createElement('p'); // 动态创 p
        p.innerHTML = curObj.title; // p  的输出 为  上面随机获取的数据的title给这个 属性
        curLi.appendChild(p); // 把 扑 放在 li  里面

        aryUl.sort(function (a,b) {  // 把 ul 排序
            return a.scrollHeight - b.scrollHeight; //
        })
        aryUl[0].appendChild(curLi);  // 把上面创建  li 放在第一个ul里面
    }
}
bindHtml(); // 函数执行

var imgs = document.getElementsByTagName('img'); //  获取 50个 img

var winH = utils.win('clientHeight');  //  获取当前 窗口 的 可视窗口高度

function delay() {
    for (var i = 0; i < imgs.length; i++) {  // 循环 img
        delayImg(imgs[i]) // 把 每一项 i 当实参传给 下面的函数形参
    }
}
function delayImg (img) {
    if (img.flag) {
        return
    }

    var curT = utils.offset(img).top + img.offsetHeight;

    var winT = utils.win('scrollTop');

    var lastT = utils.offset(imgs[imgs.length-1]).top + imgs[imgs.length-1].offsetHeight;


    if (winH + winT > lastT) {

        bindHtml();

    }
    if (winH + winT > curT) {
        var address = img.getAttribute('trueimg');
        var newImg = new Image;
        newImg.src=address;
        newImg.onload = function () {
            img.src = address;
            fadeIn(img);
            img.flag = true;
        }
    }
}
window.onscroll = delay;
delay();
function fadeIn(curEle) {
    utils.setCss(curEle,'opacity',0.3);
    var timer = setInterval(function () {
        var cur = Number(utils.getCss(curEle,'opacity'));
        cur += 0.1;
        if (cur >= 1) {
            clearInterval(timer)
        }
        utils.setCss(curEle,'opacity',cur)
    },100)
}