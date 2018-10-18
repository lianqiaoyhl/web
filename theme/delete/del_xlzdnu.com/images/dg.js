// JavaScript Document
document.write('<form name="form1" id="form1">' +
	'<input name="cid" id="cid"/>' +
	'<input name="customerId" id="customerId"/>' +
	'<input name="productPlanId" id="productPlanId"/>' +
	'<input name="productId" id="productId"/>' +
	'<input name="buyerName" id="buyerName"/>' +
	'<input name="buyerMobile" id="buyerMobile"/>' +
	'<input name="buyerProvince" id="buyerProvince"/>' +
	'<input name="buyerCity" id="buyerCity"/>' +
	'<input name="buyerArea" id="buyerArea"/>' +
	'<input name="buyerAddress" id="buyerAddress"/>' +
	'<input name="orderPrice" id="orderPrice"/>' +
	'<input name="payCategory" id="payCategory"/>' +
	'<input name="sendTime" id="sendTime"/>' +
	'<input name="buyerRemarks" id="buyerRemarks"/>' +
	'<input name="bm" id="bm"/>' +
	'<input name="fromUrl" id="fromUrl"/>' +
	'<input name="color" id="color"/>' +
	'<input name="size" id="size"/>' +
	'<input name="backUrl" id="backUrl" value=""/></form>');

$el("form1").style.display="none";

function submitorder(){
	var oForm=document.getElementById("form1");
	oForm.cid.value=cid;
	oForm.customerId.value=$el("customerId2").value;
	if ($el("productId2") != null)
	{
		oForm.productId.value=$el("productId2").value;
	}
	oForm.buyerName.value=$el("username2").value;
	oForm.buyerMobile.value=$el("mobile2").value;
	oForm.buyerProvince.value=$el("s_province").value;
	oForm.buyerCity.value=$el("s_city").value;
	oForm.buyerArea.value=$el("s_county").value;
	oForm.buyerAddress.value=$el("addr2").value;
	var obj = document.getElementsByName("productPlanId2");
	var price ="";
	var planId = "";
	if (obj != null)
	{
    for(var i=0; i<obj.length; i++){
        if(obj[i].checked){
        price = (obj[i].attributes["price"].nodeValue);
		planId = (obj[i].attributes["value"].nodeValue);
        }
	}
	oForm.productPlanId.value=planId;
	oForm.orderPrice.value=price;
	}
	if ($el("payCategory2") != null)
	{
		oForm.payCategory.value=$el("payCategory2").value;
	}
	if ($el("sendTime2") != null)
	{
		oForm.sendTime.value=$el("sendTime2").value;
	}
	oForm.buyerRemarks.value=$el("remark2").value;
	oForm.bm.value=bm;
	oForm.fromUrl.value=window.location.href;
	var col = document.getElementsByName("color2");
	if (col != null)
	{
		var color ="";
		for(var i=0; i<col.length; i++){
			if(col[i].checked){
			color=(col[i].attributes["value"].nodeValue);
			}
		}
		oForm.color.value=color;
	}
	var siz = document.getElementsByName("size2");
	if (siz != null)
	{
		var ssize ="";
		for(var i=0; i<siz.length; i++){
			if(siz[i].checked){
			ssize=(siz[i].attributes["value"].nodeValue);
			}
		}
		oForm.size.value=ssize;
	}
	oForm.backUrl.value='';
	oForm.method = 'post';
//	oForm.target = '_blank';
	oForm.action ="http://genod1.yksq.net/order/gen/genOrderByForm";
	oForm.submit();
}

function $el(name) { 
	return document.getElementById(name);
}

function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, ""); 
} 

function hanzi(str){
	return str.replace(/[^\u4E00-\u9FA5]/g,''); 
}
