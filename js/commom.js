'use strict';
//事件绑定
function addEvent(obj,sEv,fn){
  if(obj.addEventListener){
    obj.addEventListener(sEv,fn,false);
  }else{
    obj.attachEvent('on'+sEv,fn);
  }
}
//toDouble
function toDou(iNum){
  return iNum<10?'0'+iNum:''+iNum;
}
//n,m随机数
function rnd(n,m){
  return parseInt(n+Math.random()*(m-n));
}
//弧度转角度
function a2d(n){
    return n*180/Math.PI;
  }
//getByClass
function getByClass(obj,sClass){
  if(obj.getElementsByClassName){
    return obj.getElementsByClassName(sClass);
  }else{
    var aResult = [];
    var aEle = obj.getElementsByTagName('*');  //注意1、这里是obj，不是document
    var reg = new RegExp('\\b'+sClass+'\\b','g');
    for(var i=0;i<aEle.length;i++){
      if(aEle[i].className.search(reg)!=-1){ //注意2、这里有个search
        aResult.push(aEle[i]);
      }
    }
    return aResult;                           //注意3、最终返回的都是数组，是一组标签
  }
}
//弹性碰撞的封装
;(function(){

	var left = 0;
	var iSpeed = 0;
	var timer = null;
	window.move1 = function (obj,iTarget){
		clearInterval(timer);
		timer = setInterval(function(){
			iSpeed+=(iTarget-left)/5;
			iSpeed*=0.7;
			left+=iSpeed;
			obj.style.left = left+'px';
			if(Math.floor(iSpeed)==0&&Math.floor(left)==iTarget){
				clearInterval(timer);
			}
		},30);
	}
})();

//运动框架
    
    ;(function(){
        function getStyle(obj,sName){
          return (obj.currentStyle||getComputedStyle(obj,false))[sName];
        }
        window.startMove=function(obj,json,options){
          options=options||{};
          options.time = options.time||700;
          options.type = options.type||'ease-out';
          var start = {};
          var dis = {};
          for(var name in json){
            start[name] = parseFloat(getStyle(obj,name));
            if(isNaN(start[name])){
              switch(name){
                case 'top':
                  start[name] = obj.offsetTop;
                  break;
                case 'left':
                  start[name] = obj.offsetLeft;
                  break;
                case 'width':
                  start[name] = obj.offsetWidth;
                  break;
                case 'height':
                  start[name] = obj.offsetHeight;
                  break;
                case 'opacity':
                  start[name] = 1;
                  break;
                case 'borderWidth':
                  start[name] = 0;
                  break;
              }
            }
            dis[name] = json[name]-start[name];
          }
          var count = Math.floor(options.time/30);
          var n = 0;
          clearInterval(obj.timer);
          obj.timer = setInterval(function(){
            n++;
            for(var name in json){
              switch(options.type){
                case 'linear':
                  var cur = start[name]+dis[name]*n/count;
                  break;
                case 'ease-in':
                  var a = n/count;
                  var cur = start[name]+dis[name]*Math.pow(a,3);
                  break;
                case 'ease-out':
                  var a = 1-n/count;
                  var cur = start[name]+dis[name]*(1-Math.pow(a,3));
                  break;
              }
              if(name=='opacity'){
                obj.style.opacity=cur;
                obj.style.filter='alpha(opacity:'+cur*100+')';
              }else{
                obj.style[name] = cur+'px';
              }
            }
            if(n==count){
              clearInterval(obj.timer);
              options.end&&options.end();
            }
          },30);
        }

        })();

addEvent(window,'load',function(){

    //顶部时间
    ;(function(){
      var oTime=document.getElementById('time');
      var aImg = oTime.getElementsByTagName('img');
      function tick(){
        var oDate = new Date();
        var h = oDate.getHours();
        var m = oDate.getMinutes();
        var s = oDate.getSeconds();
        var str = toDou(h)+toDou(m)+toDou(s);
        for(var i=0;i<aImg.length;i++){
          //aImg[i].style.top=-35*str.charAt(i)+'px';
          startMove(aImg[i],{top:-35*str.charAt(i)},{time:300});
        }
      }
      tick();
      setInterval(tick,1000);
    })();
  	//nav导航条
    ;(function(){
      var oNav=document.getElementById('nav');
      var oBar = document.getElementById('nav_bar');
      
      var oUl= oNav.children[1];
      var aLi=oUl.children;
      var iNow = 0;

      for(var i=0;i<aLi.length-1;i++){

        aLi[i].onmouseover=function(){
          //oBar.style.left = this.offsetLeft+'px';
          move1(oBar,this.offsetLeft-20);
        
        };
        aLi[i].onmouseout=function(){

          move1(oBar,aLi[iNow].offsetLeft-20);
        };
        //点击的时候，获得当前的索引，因为点击以后，鼠标移出的时候要让他回到当前已经点击的地方
        //循环里面加事件，事件里面使用i,要用封闭空间
        (function(index){
          aLi[i].onclick=function(){
            iNow = index;
          };
        })(i);
      }
    })();
/*----------------------------*/
/*返回顶部*/
    ;(function(){
        var oBack = document.getElementById('back_top');
        var timer = null;
        var bOk = false;    
        document.onscroll=function(){

    //区分是人滚的还是js滚的，如果是人滚的就停      在混动事件按开始的时候就区分 
          if(bOk){        //当执行下面的定时器的时候就已经，bOk就是false；假的，不执行这个关闭的
            clearInterval(timer);
          }
          bOk = true;   //把bOk变成真的，继续执行，有点不理解，记住就可以

          var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
          if(scrollT>0){
            oBack.style.display='block';
          }else{
            oBack.style.display='none';
          }
        };
      oBack.onclick=function(){
        var start = document.documentElement.scrollTop||document.body.scrollTop;
        var dis = 0-start;
        var count = Math.floor(2000/30);
        var n = 0;
        clearInterval(timer);
        timer = setInterval(function(){
          bOk = false;             //开定时器的时候就得把false变成假的，这就起到判断是不是人为的滚动滚轮
          n++;
          var a = 1-n/count;
          var cur = start+dis*(1-Math.pow(a,3));       //注意，这里不加px，因为scrollTop,就不带px
          
          document.documentElement.scrollTop=document.body.scrollTop=cur;    //这里也是连等，改变的是scrollTop
          if(n==count){
            clearInterval(timer);
          }
        },30);
        //document.documentElement.scrollTop=document.body.scrollTop=0;   这里可可以连等，因为火狐下，scrollTop是0；而不是undefind
      };

    })();
/*-----------------------------*/

});