var choose = document.getElementById("choose");
	var ul = document.getElementById("type");
	var oLis = ul.getElementsByTagName("li");
	var option = ul.getElementsByTagName("a");
	// 循环所有的a标签，当点击a时，
	// 1.让当前字体变成红色；
	// 2. 添加导航；
	for(var i=0;i<oLis.length;i++){
	    oLis[i].index =i;
	}
	var arr = [];
	for(var i=0;i<option.length;i++){
		option[i].onclick = function () {
		    // 获取当前元素所有的兄弟元素
			var pid = this.parentNode.index;
		    var sibilings = this.parentNode.children;
            for(var j=0;j<sibilings.length;j++){
                sibilings[j].style.color="";
            }
            // 给当前元素加上颜色；
			this.style.color="red";
			// 添加导航栏
			var mark = document.createElement("mark");
			mark.innerHTML = this.innerHTML;
			var a = document.createElement("a");
			a.onclick = function () {
                for(var j=0;j<sibilings.length;j++){
                    sibilings[j].style.color="";
                }
                this.parentNode.parentNode.removeChild(this.parentNode);
				arr[pid]=undefined;
            }
			a.innerHTML ="x";
			a.href="javascript:;";
			mark.appendChild(a);
			// 给每一个mark新增pid属性；属性值是父元素的下标；
			mark.pid = pid;
			arr[pid]=mark;
            //console.log(arr);
            // 根据下标排序；
			/*arr.sort(function (a,b) {
				return a.pid-b.pid;
            });*/
			choose.innerHTML="你的选择:";
            //console.log(arr);
            for(var k=0;k<arr.length;k++){
			    if(arr[k]!=undefined){
                    choose.appendChild(arr[k]);
				}
			}
        }
	}