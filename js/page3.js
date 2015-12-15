'use strict';

addEvent(window,'load',function(){
	var oPage=document.getElementById('page');
	;(function(){
		var oBanner=document.getElementById('banner');
		var oBtn = oBanner.getElementsByTagName('div')[0];
		var oUl = oBanner.getElementsByTagName('ul')[0];
		var aLi = oUl.children;
		var iNow = 2;
		
		oBtn.onclick=function(){
			iNow++;
			for(var i=0;i<aLi.length;i++){
				aLi[i].className='';
			}
			aLi[(iNow-2)%aLi.length].className='l2';
			aLi[(iNow-1)%aLi.length].className='l1';
			aLi[iNow%aLi.length].className='cur';
			aLi[(iNow+1)%aLi.length].className='r1';
			aLi[(iNow+2)%aLi.length].className='r2';
		};
	})();
/*--------------------------------------------*/
	/*3d_立方体*/

	;(function(){
		var oBoxD=document.getElementById('box_3d');
		var oBox=oBoxD.querySelector('.box');

		var x=0;
		var y=0;
		var left=false;
		var right=false;
		var top=false;
		var bottom=false;

		document.onmousedown=function(ev){
			var disX=ev.clientX-y;
			var disY=ev.clientY-x;
			
			function fnMove(ev){
				x=ev.clientY-disY;
				y=ev.clientX-disX;
				oBox.style.WebkitTransform='perspective(800px) rotateY('+y/5+'deg) rotateX('+x/5+'deg)';
				oBox.style.MozTransform='perspective(800px) rotateY('+y/5+'deg) rotateX('+x/5+'deg)';
				oBox.style.transform='perspective(800px) rotateY('+y/5+'deg) rotateX('+x/5+'deg)';
			}
			function fnUp(){
				removeEvent(document,'mousemove',fnMove);
				removeEvent(document,'mouseup',fnUp);
			}
			addEvent(document,'mousemove',fnMove);
			addEvent(document,'mouseup',fnUp);
			ev.preventDefault();
		};
		
		addEvent(document,'keydown',function(ev){
			switch(ev.keyCode){
				case 37:
				left=true;
					break;
				case 38:
				top=true;
					break;
				case 39:
				right=true;
					break;
				case 40:
				bottom=true;
					break;
			}
			ev.preventDefault();
		});
		
		setInterval(function(){
			if(left){
				y-=3;
				oBox.style.WebkitTransform='perspective(800px) rotateX('+x/5+'deg) rotateY('+y/5+'deg)';
				oBox.style.MozTransform='perspective(800px) rotateX('+x/5+'deg) rotateY('+y/5+'deg)';
				oBox.style.transform='perspective(800px) rotateX('+x/5+'deg) rotateY('+y/5+'deg)';
			}
			if(right){
				y+=3;
				oBox.style.WebkitTransform='perspective(800px) rotateX('+x/5+'deg) rotateY('+y/5+'deg)';
				oBox.style.MozTransform='perspective(800px) rotateX('+x/5+'deg) rotateY('+y/5+'deg)';
				oBox.style.transform='perspective(800px) rotateX('+x/5+'deg) rotateY('+y/5+'deg)';
			}
			if(top){
				x+=3;
				oBox.style.WebkitTransform='perspective(800px) rotateX('+x/5+'deg) rotateY('+y/5+'deg)';
				oBox.style.MozTransform='perspective(800px) rotateX('+x/5+'deg) rotateY('+y/5+'deg)';
				oBox.style.transform='perspective(800px) rotateX('+x/5+'deg) rotateY('+y/5+'deg)';
			}
			if(bottom){
				x-=3;
				oBox.style.WebkitTransform='perspective(800px) rotateX('+x/5+'deg) rotateY('+y/5+'deg)';
				oBox.style.MozTransform='perspective(800px) rotateX('+x/5+'deg) rotateY('+y/5+'deg)';
				oBox.style.transform='perspective(800px) rotateX('+x/5+'deg) rotateY('+y/5+'deg)';
			}
		},16);
		addEvent(document,'keyup',function(ev){
			switch(ev.keyCode){
				case 37:
				left=true;
					break;
				case 38:
				top=true;
					break;
				case 39:
				right=true;
					break;
				case 40:
				bottom=true;
					break;
			}
			ev.preventDefault();
		});
		
	})();
/*-------------------------*/
/*爆炸*/
;(function(){
	var oBoom=document.getElementById('boom');
	var oBox=oBoom.querySelector('div');
	var oUl=oBoom.querySelector('ul');
	var aS=oBox.children;
	var oBtn1=oUl.querySelectorAll('li')[0];
	var oBtn2=oUl.querySelector('.two');
	var oBtn3=oUl.querySelector('.three');
	var iNow=0;
	var R=4,C=7;
	var arr = ["1.jpg", "2.jpg", "3.jpg"];
	var bOk=true;
	 function createBoom(iNow) {
            for (var i = 0; i < R; i++) {
                for (var j = 0; j < C; j++) {
                    var oS = document.createElement("span");
                    oS.style.width = oBox.offsetWidth / C + "px";
                    oS.style.height = oBox.offsetHeight / R + "px";
                    oBox.appendChild(oS);
                    oS.style.left = j * oBox.offsetWidth / C + "px";
                    oS.style.top = i * oBox.offsetHeight / R + "px";
                    oS.style.background = "url(img/boom/" + arr[iNow] + ") -" + oS.offsetLeft + "px -" + oS.offsetTop + "px";
                    oS.style.WebkitTransform = "perspective(800px) rotateX(0) rotateY(0) translateX(0) translateY(0)";
                    oS.style.MozTransform = "perspective(800px) rotateX(0) rotateY(0) translateX(0) translateY(0)";
                    oS.style.msTransform = "perspective(800px) rotateX(0) rotateY(0) translateX(0) translateY(0)";
                    oS.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateX(0) translateY(0)";
                    oS.R = i;
                    oS.C = j
                }
            }
        }
	oBtn1.onclick = function() {
            if (bOk) {
                bOk = false;
                createBoom(iNow % arr.length);
                oBox.style.background = "url(img/boom/" + arr[(iNow + 1) % arr.length] + ")";
                var divX = oBox.offsetWidth / 2;
                var divY = oBox.offsetHeight / 2;
                for (var i = 0; i < aS.length; i++) {
                    var sX = aS[i].offsetLeft + aS[i].offsetWidth / 2;
                    var sY = aS[i].offsetTop + aS[i].offsetHeight / 2;
                    var disX = (sX - divX) * 2 * Math.random();
                    var disY = (sY - divY) * 2 * Math.random();
                    aS[i].style.WebkitTransition = "0.5s all ease";
                    aS[i].style.MozTransition = "0.5s all ease";
                    aS[i].style.msTransition = "0.5s all ease";
                    aS[i].style.transition = "0.5s all ease";
                    aS[i].style.WebkitTransform = "perspective(800px) translateX(" + disX + "px) translateY(" + disY + "px) rotateX(" + (Math.random() * 360 + 180) + "deg) rotateY(" + (Math.random() * 360 + 180) + "deg) scale(" + (Math.random() * 2) + "," + (Math.random() * 2) + ")";
                    aS[i].style.MozTransform = "perspective(800px) translateX(" + disX + "px) translateY(" + disY + "px) rotateX(" + (Math.random() * 360 + 180) + "deg) rotateY(" + (Math.random() * 360 + 180) + "deg) scale(" + (Math.random() * 2) + "," + (Math.random() * 2) + ")";
                    aS[i].style.msTransform = "perspective(800px) translateX(" + disX + "px) translateY(" + disY + "px) rotateX(" + (Math.random() * 360 + 180) + "deg) rotateY(" + (Math.random() * 360 + 180) + "deg) scale(" + (Math.random() * 2) + "," + (Math.random() * 2) + ")";
                    aS[i].style.transform = "perspective(800px) translateX(" + disX + "px) translateY(" + disY + "px) rotateX(" + (Math.random() * 360 + 180) + "deg) rotateY(" + (Math.random() * 360 + 180) + "deg) scale(" + (Math.random() * 2) + "," + (Math.random() * 2) + ")";
                    aS[i].style.opacity = 0
                }
                setTimeout(function() {
                    oBox.innerHTML = "";
                    iNow++;
                    bOk = true
                }, 500)
            }
        };
		
	;(function(){
			var oCbox = document.getElementById('c1');
			var oDiv=oCbox.querySelector('div');
			var oC=oDiv.querySelector('canvas');
			var gc = oC.getContext('2d');
			var arr = [154,270,300,250,245];
			var iMax = Math.max.apply(null,arr);//求出最大值，Math.max是数字求最大，并不是数组，但是用apply就转化了，这样就可以用了

			var aHeight = [];
			for(var i=0;i<arr.length;i++){
				//根据比例把数组arr放到新数组里，最大的放进去，其它就能放进去
				aHeight.push(arr[i]/iMax*oC.height);
			}
			
			//图+缝隙一共分为4份，图3份，缝隙1份，也就是图和间隙的比例是3:1，最后减1以后就紧贴俩边，但是不知道为什么,减去1就是减去一份，，
			var space = oC.width/(arr.length*4-1);
				//现在设置了padding所以下边左面有空白
			var w = space*3;
			
			for(var i=0;i<aHeight.length;i++){
					gc.fillStyle='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
					gc.fillRect(i*w+i*space,oC.height-aHeight[i],w,aHeight[i]);
					
		}
	})();
/*svg饼图*/
	;(function(){
		function getXY(cx, cy, r, ang){
			var a=Math.sin(d2a(ang))*r;
			var b=Math.cos(d2a(ang))*r;
			
			return {x: cx+a, y: cy-b};
		}
		var oSvg=document.getElementById('svg1');

		var cx=250, cy=150;
		var r=130;
	
	//角
	function pie(s, e, color){
		var startPos=getXY(cx, cy, r, s);
		var endPos=getXY(cx, cy, r, e);
		
		//path
		var oPath=document.createElementNS('http://www.w3.org/2000/svg', 'path');
		
		oPath.style.fill=color;
		
		oPath.setAttribute('d', [
				//1-直线
				'M', cx, cy,
				'L', startPos.x, startPos.y,
				//2-弧
				'A', r, r, 0, (e-s)>180?1:0, 1, endPos.x, endPos.y,
				//Z
				'Z'
			].join(' '));
		
		oSvg.appendChild(oPath);
		}
	
		//饼图
		pie(0, 40, 'red');
		pie(40, 120, 'green');
		pie(120, 240, 'yellow');
		pie(240, 360, '#CCC');
	})();
/*--------------*/
/*屏保*/
;(function(){

	var oCbox=document.getElementById('c2');
	var oDiv=oCbox.querySelector('div');
	var oC=oDiv.children[0];
	var gc=oC.getContext('2d');
	var winW = document.documentElement.clientWidth;
	var winH = document.documentElement.clientHeight;
	oC.width=winW;
	oC.height=winH;
	var N = 5;
	var aPoint = [];//数组保存的是json[{},{},{}]每一个json保存的是每个点的信息
	//1、保存点
	for(var i=0;i<N;i++){
		aPoint[i] = {
			x:rnd(0,winW),
			y:rnd(0,winH),
			speedX:rnd(-10,10),
			speedY:rnd(-10,10)
		};
	}
	
	//2、画点
	function drawPoint(point){
		gc.fillStyle='#fff';
		gc.fillRect(point.x,point.y,1,1);
	}
	for(var i=0;i<N;i++){
		drawPoint(aPoint[i]);
	}
	
	var len = 10;
	var oldPos = [];
	
	//3、运动，让五个点运动起来
	setInterval(function(){
		//vanvas运动，得先清除以前的像素点
		gc.clearRect(0,0,winW,winH);
		//3-1、根据速度让每个点动起来
		for(var i=0;i<N;i++){//每个都动，加循环
			aPoint[i].x+=aPoint[i].speedX;
			aPoint[i].y+=aPoint[i].speedY;
			if(aPoint[i].x<0){
				aPoint[i].x=0;
				aPoint[i].speedX*=-1;
			}
			
			if(aPoint[i].x>=(oPage.offsetWidth)){
				aPoint[i].x=oPage.offsetWidth;
				aPoint[i].speedX*=-1;
			}
			if(aPoint[i].y<0){
				aPoint[i].y=0;
				aPoint[i].speedY*=-1;
			}
			if(aPoint[i].y>=winH){
				aPoint[i].y=winH;
				aPoint[i].speedY*=-1;
			}
			
			
			gc.fillRect(aPoint[i].x,aPoint[i].y,1,1);
		}
		//3-2、把每个点连线
		gc.beginPath();
		gc.strokeStyle='#fff';
		gc.moveTo(aPoint[0].x,aPoint[0].y);
		for(var i=1;i<aPoint.length;i++){//这里是i=1
			gc.lineTo(aPoint[i].x,aPoint[i].y);
		}
		gc.closePath();
		gc.stroke();
		
		//3-3、保存老的位置
		//oldPos=[]这个数组里面保存的都是arr
		//[[五个点],[五个点],[],[]]每个数组都保存的是五个点的信息
		//等的运动的时候用，以达到虚影的效果
		var arr = [];
		for(var i=0;i<aPoint.length;i++){
			arr.push({
				x:aPoint[i].x,
				y:aPoint[i].y
			});
		}
		//把arr五个点的信息保存到这个数组里，这个时候注意保存的顺序，好多点，最近的点最后保存进去的
		oldPos.push(arr);
		//3-4、得到老线的条数
		while(oldPos.length>len){
			//想的到虚线的条数
			oldPos.shift();//数组前面删除
		}
		
		//3-5、画老的线
		//也可以是这个，不重要for(var i=0;i<oldPos.length;i++){
		for(var i =oldPos.length-1;i>-1;i--){
			//重新开始一个路径画图，写begin
			gc.beginPath();
			var opacity = 1-i/oldPos.length;//线透明,0条是离得最远的一条，添加arr的时候理解

			gc.strokeStyle='rgba(255,255,255,'+opacity+')';

			gc.moveTo(oldPos[i][0].x,oldPos[i][0].y);
				//这里循环五个点
			for(var j=0;j<oldPos[i].length;j++){
				gc.lineTo(oldPos[i][j].x,oldPos[i][j].y);
			}
			gc.closePath();
			gc.stroke();
		}
		
		
	},16);
})();



})();













});