var data;
var xhr = new XMLHttpRequest();
xhr.open("get", "json/product.json", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}/.test(xhr.status)) {
        data = JSON.parse(xhr.responseText);
    }
}
xhr.send();
var list = document.getElementById("list"),
    navs = document.getElementsByTagName("a"),
    oLis = document.getElementsByTagName("li");

bindHtml()

function bindHtml() {
    str = ``;
    for (let i = 0; i < data.length; i++) {
        var cur = data[i];
        str += `
            <li data-time = "${cur.time}" data-hot = "${cur.hot}" data-price = "${cur.price}">
                <img src="${cur.img}">
                <span>${cur.title}</span>
                <span>${cur.time}</span>
                <span>热度：${cur.hot}</span>
                <span>价格：${cur.price}</span>
            </li>
        `
    }
    list.innerHTML = str
}

for (let i = 0; i < navs.length; i++) {
    navs[i].index = i;
    navs[i].flag = -1;
    navs[i].onclick = function () {
        this.flag *= -1
        sortList.call(this);
        addArrow.call(this);
        removeArrow.call(this);
    }
}

function sortList() {
    var ary = utils.toArray(oLis),
        dataAry = ["data-time", "data-hot", "data-price"];
    var that = this;
    ary.sort(function (a, b) {
        var cur = a.getAttribute(dataAry[that.index]);
        var next = b.getAttribute(dataAry[that.index]);
        if (that.index === 0) {
            cur = cur.replace("-", "").replace("-", "");
            next = next.replace("-", "").replace("-", "");
        }
        return (cur - next) * that.flag;
    });
    var frg = document.createDocumentFragment();
    for (let i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    list.appendChild(frg);
}

function addArrow() {
    var up = this.children[0],
        down = this.children[1];
    if (this.flag > 0) {
        up.classList.add("bg");
        down.classList.remove("bg")
    } else {
        down.classList.add("bg")
        up.classList.remove("bg");
    }
}

function removeArrow() {
    for (let i = 0; i < navs.length; i++) {
        if (this != navs[i]) {
            navs[i].children[0].classList.remove("bg");
            navs[i].children[1].classList.remove("bg");
            navs[i].flag = -1;
        }
    }
}