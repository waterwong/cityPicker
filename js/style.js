document.querySelector("#input").addEventListener("focus",function(){
	document.querySelector("._layer_big").style.display = "block";
})
document.querySelector("._layer").addEventListener("touchend",function(e){
	document.querySelector("._layer_big").style.display = "none";
},false)
window.onload = function(){
	var transformUl = document.querySelectorAll(".transform_ul"),proHtml="";
	for(var i=0;i<transformUl.length;i++){
		transformUl[i].addEventListener("touchstart",touchStartUl);
		transformUl[i].addEventListener("touchmove",touchMoveUl);
		transformUl[i].addEventListener("touchend",touchEndUl);
	};
	for(var i=0;i<addr_arr[0].length;i++){
		if(i==0){
			proHtml += '<li class="current_ul" data-id='+addr_arr[0][i][0]+'>'+addr_arr[0][i][1]+'</li>'
		}else{
			proHtml += '<li data-id='+addr_arr[0][i][0]+'>'+addr_arr[0][i][1]+'</li>';
		}
		
	}
	document.querySelector("#proUl").innerHTML = proHtml;
	renderCity(targetNum);
};
document.addEventListener("touchstart",function(e){
	e.preventDefault();
});
document.querySelector(".cancle_btn").addEventListener("touchend",function(){
	document.querySelector("._layer_big").style.display = "none";
});
document.querySelector(".save_btn").addEventListener("touchend",function(){
	var checkedCity = document.querySelectorAll(".current_ul");
	var checkedHtml = '';
	for(var i=0;i<checkedCity.length;i++){
		if(checkedHtml==""){
			checkedHtml += checkedCity[i].innerHTML;
		}else{
			checkedHtml += '-' + checkedCity[i].innerHTML;
		}
	};
	document.querySelector("#input").value = checkedHtml;
	document.querySelector("._layer_big").style.display = "none";
})
var startY,startTranslateY,touches,cityHtmlHeight = document.querySelector(".cityHtml").getBoundingClientRect().height,ulEle = document.getElementsByClassName("transform_ul"),endY,targetNum=1,ulHeight,currId;
function touchStartUl(e){
	touches = e.changedTouches[0];
	startY = touches.pageY;
	startTranslateY = parseInt(this.style.transform.split("(")[1]);
}
function touchMoveUl(e){
	touches = e.changedTouches[0];
	endY = touches.pageY;
	this.style.transform = this.style.WebkitTransform = "translateY("+(startTranslateY+endY-startY)+"px)";
}
function touchEndUl(e){
	ulHeight = this.getBoundingClientRect().height;
	startTranslateY = parseInt(this.style.transform.split("(")[1]);
	startTranslateY = Math.round((startTranslateY/36)) * 36;
	if(startTranslateY>144){
		startTranslateY = 144;
	}
	if(startTranslateY<(180-ulHeight)){
		startTranslateY = 180-ulHeight;
	};
	targetNum = Math.abs(startTranslateY/36-5);
	document.getElementsByClassName("cityHtml")[0].dataset[this.id.split("U")[0]] = targetNum;
	this.style.transform = this.style.WebkitTransform = "translateY("+startTranslateY+"px)";
	var aLi = this.getElementsByTagName("li");
	for(var i=0;i<aLi.length;i++){
		aLi[i].className = "";
	}
	this.getElementsByTagName("li")[targetNum-1].className = "current_ul";
	currId = this.getElementsByClassName("current_ul")[0].getAttribute("data-id");
	console.log(currId);
	if(this.id=="cityUl"){
		renderUrban(currId);
	};
	if(this.id=="proUl"){
		renderCity(targetNum);		
	}
};
//渲染城市
function renderCity(num){
	document.querySelector("#cityUl").style.transform = document.querySelector("#cityUl").style.WebkitTransform = "translateY(144px)";
	var i=0,len = addr_arr[num].length,cityHtml = "",cityArr = addr_arr[num];
	for(i;i<len;i++){
		if(i==0){
			cityHtml += '<li class="current_ul" data-id='+cityArr[i][0]+'>'+cityArr[i][1]+'</li>';
		}else{
			cityHtml += '<li data-id='+cityArr[i][0]+'>'+cityArr[i][1]+'</li>';
		}
		
	};
	document.querySelector("#cityUl").innerHTML = cityHtml;
	var urbanId = document.querySelector("#cityUl li").getAttribute("data-id");
	renderUrban(urbanId);
};
//渲染县城
function renderUrban(num){
	document.querySelector("#urbanUl").style.transform = document.querySelector("#urbanUl").style.WebkitTransform = "translateY(144px)";
	var i=0,len = addr_arr[num].length,urbanHtml = "",urbanArr = addr_arr[num];
	for(i;i<len;i++){
		if(i==0){
			urbanHtml += '<li class="current_ul" data-id='+urbanArr[i][0]+'>'+urbanArr[i][1]+'</li>'
		}else{
			urbanHtml += '<li data-id='+urbanArr[i][0]+'>'+urbanArr[i][1]+'</li>';
		}
		
	};
	document.querySelector("#urbanUl").innerHTML = urbanHtml;	
};