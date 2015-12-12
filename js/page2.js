'use strict';
addEvent(window,'load',function(){

/* 轮播图*/
;(function(){
	var oBox=document.getElementById('banner');
	var oUl=oBox.children[0];
	var oOl=oBox.children[1];
	var oPrev=oBox.children[2];
	var oNext=oBox.children[3];
	var aLi=oUl.children;
	var aBtn=oOl.children;

	oUl.innerHTML+=oUl.innerHTML;  //先变成俩分
	oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';  //设置ul的宽度
	var w=oUl.offsetWidth/2;			//定义变量w
	var iNow=0;
	var timer=null;
	oBox.onmouseover=function(){
		oPrev.style.display='block';
		oNext.style.display='block';
	};
	oBox.onmouseout=function(){
		oPrev.style.display='none';
		oNext.style.display='none';
	};
	for(var i=0;i<aBtn.length;i++){
		(function(index){
			aBtn[i].onmouseover=function(){
				
				if((iNow%aBtn.length==4||iNow%aBtn.length==-1)&&index%aBtn.length==0){
					iNow++;
				}
				if(iNow%aBtn.length==0&&index%aBtn.length==4){
					iNow--;
				}
				iNow=Math.floor(iNow/aBtn.length)*aBtn.length+index;
				tab();
			};
		})(i);
	}
	function tab(){
		for(var i=0;i<aBtn.length;i++){
			aBtn[i].className='';
		}
		if(iNow>0){
			aBtn[iNow%aBtn.length].className='on';
		}else{
			aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className='on';
		}
		startMove(oUl,-iNow*aLi[0].offsetWidth);
	
	}
	oPrev.onclick=function(){
		iNow--;
		tab();
	};
	oNext.onclick=function(){
		iNow++;
		tab();
	};
	var left = 0;
	function startMove(obj,iTarget){
		var start = left;
		var dis = iTarget-start;
		var count = Math.floor(700/30);
		var n= 0;
		clearInterval(timer);
		timer = setInterval(function(){
			n++;
			var a = 1-n/count;
			left = start+dis*(1-Math.pow(a,3));
			if(left<0){
				oUl.style.left = left%w+'px';
			}else{
				oUl.style.left = (left%w-w)%w+'px';
			}
			if(n==count){
				clearInterval(timer);
			}
		},30);
	}

})();
/* -------------------------------------------*/ 
//穿墙
var oSelect=document.getElementById('select');
;(function(){
  //弧度转角
  function a2d(n){
    return n*180/Math.PI;
  }
  function hoverDir(obj,oEvent){
    var x=obj.offsetLeft+obj.offsetWidth/2-oEvent.clientX;
    var y=obj.offsetTop+obj.offsetHeight/2-oEvent.clientY;
    return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
  }
  function hoverGo(obj){
    var oDiv=obj.children[0];
    obj.onmouseover=function(ev){
      var oEvent = ev||event;
      var oFrom = oEvent.fromElement||oEvent.relatedTarget;
      if(obj.contains(oFrom))return;
      var dir=hoverDir(obj,oEvent);
	      switch(dir){
	      case 0:
	        oDiv.style.left='230px';
	        oDiv.style.top=0;
	        break;
	        case 1:
	        oDiv.style.left = 0;
	        oDiv.style.top = '230px';
	        break;
	      case 2:
	        oDiv.style.left = '-230px';
	        oDiv.style.top = 0;
	        break;
	      case 3:
	        oDiv.style.left = 0;
	        oDiv.style.top = '-230px';
	        break;

	      }
	      startMove(oDiv,{left:0,top:0});
    };

    obj.onmouseout=function(ev){
    	var oEvent=ev||event;
    	var oTo = oEvent.toElement||oEvent.relatedTarget;
		if(obj.contains(oTo))return; 
		var dir=hoverDir(obj,oEvent);
		switch(dir){
			case 0:
				startMove(oDiv,{left:230,top:0});
				break;
			case 1:
				startMove(oDiv,{left:0,top:230});
				break;
			case 2:
				startMove(oDiv,{left:-230,top:0});
				break;
			case 3:
				startMove(oDiv,{left:0,top:-230});
				break;
		}
    };
   
  
    
  }


  
  var aLi=oSelect.children;
  for(var i=0;i<aLi.length;i++){
    hoverGo(aLi[i]);
  }
})();
/*----------------------------------------*/
/*九宫格*/
;(function(){
	var oBox = document.getElementById('box_first');

	var aDiv = oBox.children;
	for(var i=0;i<aDiv.length;i++){
		changeSize(aDiv[i]);
	}
	
	function changeSize(obj){
		obj.onmousedown=function(ev){
			var oEvent = ev||event;
			oEvent.cancelBubble=true;
			var oldX = oEvent.clientX;
			var oldY = oEvent.clientY;
			var oldW = oBox.offsetWidth;
			var oldH= oBox.offsetHeight;
			var oldL = oBox.offsetLeft;
			var oldT = oBox.offsetTop;
			document.onmousemove=function(ev){
				var oEvent = ev||event;
				if(obj.className.indexOf('r')!=-1){
					oBox.style.width=oldW+(oEvent.clientX-oldX)+'px';
				}
				if(obj.className.indexOf('b')!=-1){
					oBox.style.height = oldH+(oEvent.clientY-oldY)+'px';
				}
				if(obj.className.indexOf('l')!=-1){
					oBox.style.width = oldW-(oEvent.clientX-oldX)+'px';
					oBox.style.left = oldL+(oEvent.clientX-oldX)+'px';
				}
				if(obj.className.indexOf('t')!=-1){
					oBox.style.height = oldH-(oEvent.clientY-oldY)+'px';
					oBox.style.top = oldT+(oEvent.clientY-oldY)+'px';
				}
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				obj.releaseCapture&&obj.releaseCapture();
			};
			obj.setCapture&&obj.setCapture();
			return false;
		};
	}
	oBox.onmousedown=function(ev){
		var oEvent = ev||event;
		var disX = oEvent.clientX-oBox.offsetLeft;
		var disY = oEvent.clientY-oBox.offsetTop;
		document.onmousemove=function(ev){
			var oEvent = ev||event;
			oBox.style.left = oEvent.clientX-disX+'px';
			oBox.style.top = oEvent.clientY-disY+'px';
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			oBox.releaseCapture&&oBox.releaseCapture();
		};
		oBox.setCapture&&oBox.setCapture();
		return false;
	};


})();
/*----------------------------------*/
;(function(){
	var oBox=document.getElementById('box');
	var aDiv=oSelect.getElementsByTagName('div');
	var oFirst=getByClass(oBox,'first')[0];
	var oFirstClose=oFirst.getElementsByTagName('i')[0];
	aDiv[0].onclick=function(){
		oFirst.style.display='block';
	};
	oFirstClose.onclick=function(){
		oFirst.style.display='none';
	};
})();
/*---------------------------------------*/
/*猫*/
	;(function(){
	var oPlay=document.getElementById('play');
	var aLi = oPlay.getElementsByTagName('li');
	var oneW = aLi[0].offsetWidth;
	var defaultW = 40;
	
		//布局
	for(var i=1;i<aLi.length;i++){
		//第一张一直都在开始的位置，所以不应管第一张，所以i从1开始
		aLi[i].style.left = oneW-(aLi.length-i)*defaultW+'px'
		/*i       left       
		0 600   0        
		1 600 	600-160 (5-1)*40
		2		600-120 (5-2)*40
		3		600-80  (5-3)*40*/

	}
	for(var i=0;i<aLi.length;i++){
		(function(index){
			aLi[i].onmouseover=function(){
				for(var i=0;i<aLi.length;i++){
					if(i<=index){
						//aLi[i].style.left = i*defaultW+'px';
						startMove(aLi[i],{left:i*defaultW});
					}else{
						//aLi[i].style.left = oneW-(aLi.length-i)*defaultW+'px';
						startMove(aLi[i],{left:oneW-(aLi.length-i)*defaultW});
					}
				}
			};
		})(i);
	}

	})();
/*---------------------------*/

});