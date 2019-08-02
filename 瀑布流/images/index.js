
var uls = document.getElementsByTagName('ul');

// 获取到类数组 4个 ul
var aryUl = utils.toArray(uls);

// 转成数组 4个 ul

// 1.请求数据
var data;
var xhr = new XMLHttpRequest();
xhr.open('get', 'data.txt',false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        data = JSON.parse(xhr.responseText)
    }
};
xhr.send();
// 8 个数据


// 2. 绑定数据
var index = 49;
function bindHTML() {
    for (var i = 0; i < 50; i++) {


        var num = Math.round(Math.random()*7); // 产生一个随机数，把这个对象中的数据渲染成li

        var curObj = data[num]; // 把每一项插入到 curObj 里面

        var curLi =document.createElement('li'); // 最后插入到li里面

        var a = document.createElement('a');
        a.innerHTML = '采集';
        a.href = 'javascript:;';
        curLi.appendChild(a);

        var img = document.createElement('img');
        img.setAttribute('trueImg', curObj.src); // 把图片的真实路径给了当前图片的一个行间属性

        img.style.height = Math.round(Math.random()*(350 - 200) + 200 )+ 'px';
        curLi.appendChild(img);

        var p = document.createElement("p");
        p.innerHTML = curObj.title;
        curLi.appendChild(p);

        aryUl.sort(function (a,b) {
            return a.scrollHeight-b.scrollHeight;
        });
        aryUl[0].appendChild(curLi);
    }
}
var imgs = document.getElementsByTagName("img");
var winH = utils.win("clientHeight");

console.log(winH);

function delay() {

    for(var i=0;i<imgs.length;i++){

        delayImg(imgs[i])
    }
}


function delayImg(img) {

    var curT = utils.offset(img).top + img.offsetHeight;

    if(img.flag){
        return;
    }

    var winT = utils.win("scrollTop");
    if(winH + winT>curT){

        var address =img.getAttribute("trueimg");

        var newImg = new Image;
        newImg.src=address;
        newImg.onload = function(){

            img.src=address;
            fadeIn(img);
            img.flag=true;
        }
    }
}
window.onscroll = delay;

console.log(index);
bindHTML();






function fadeIn(curEle) {
    // 设置初始的透明度
    utils.setCss(curEle,"opacity",0.3);
    var timer = setInterval(function () {
        // 每次进来先获取一下最新的透明度；然后+=0.1；
        var cur = Number(utils.getCss(curEle,"opacity"));
        cur+=0.1;
        if(cur>=1){
            clearInterval(timer);
        }
        utils.setCss(curEle,"opacity",cur);
    },100)
}