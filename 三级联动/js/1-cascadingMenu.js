let jsonData;
let $province=$("#province");
function formData(level,value) {
    let result = [];
    let data=null;
    if(level===0){
        $.each(jsonData,function (index,item) {
            result.push(item.name)
        });
    }
    if(level===1){
         $.each(jsonData,function (index,item) {
             if(item.name===value){
                 data=item.city
             }
         })
        if(data){
             $.each(data,function (index,item) {
                 result.push(item.name)
             })
         }
    }
    return result;
}
// 仅用于组装新的字符串；
function bindHtml(result) {
    let str=`<option>请选择</option>`;
    $.each(result,function (index,item) {
        str+=`<option>${item}</option>`
    })
    return str;
}
$.ajax({
    url:"json/regionData.json",
    type:"get",
    dateType:"json",
    success:function (data) {
        jsonData=data;
        let result= formData(0);
        let provinceStr=bindHtml(result);
        $province.html(provinceStr);
        $province.change(function () {
            let val= $(this).val();

            let cityStr=bindHtml(formData(1,val))

            $("#city").html(cityStr);
        })
    }
})
