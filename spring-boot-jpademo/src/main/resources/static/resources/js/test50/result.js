$(document).ready(function(){
	$("#testResult").attr("width",document.documentElement.clientWidth*2+'px');
	//alert(1)
	drawResult();
	var dateStr = $.getUrlParam('dateStr');
	  dateStr = dateStr.replace('y','年');
	  dateStr = dateStr.replace('m','月');
	  dateStr = dateStr.replace('d','日');
	var no =  $.getUrlParam('no');
	var costTime = $.getUrlParam('costTime');
	costTime = costTime.replace('m','分');
	costTime = costTime.replace('s','秒');
	$("#currentDate").html(':'+dateStr);
});

var xxx = document.documentElement.clientWidth;
if(xxx>650){
	xxx = 650;
}
var xWidth = xxx*2 / 20;
window.addEventListener("resize",function(){
	var xxx = document.documentElement.clientWidth;
	if(xxx>650){
		xxx = 650;
	}
	$("#testResult").attr("width",xxx*2+'px');
	xWidth = xxx*2 / 20;
	drawResult();
})
function drawResult(){
	var score = [1,0.3,0,-0.8,-0.5,-0.2,0.1,0.2,0.8,1,1,1,1,1,1]
		var scoreStr = $.getUrlParam('scores');
	if(scoreStr && scoreStr.length>0){
		scoreStr = scoreStr.split(',');
		score = [];
    	for(var i in scoreStr){
    		score.push(parseFloat(scoreStr[i]));
    	}
	}
    var canvas = document.getElementById("testResult");//画布
	var ctx = canvas.getContext("2d");//2d上下文
	ctx.scale(2,2)
	//ctx.translate(0.5, 0.5);
    var lineHeight = 20
    ctx.lineWidth = 0.5
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = '#fff';
    for(var i=1;i<=7;i++){
      var showI = 0;
      if(i<4){
        showI = 4-i
      }else if(i == 4){
        showI = 0
      }else{
        showI = i-4
      }
      ctx.fillText(showI, 10, 22 + (i * lineHeight))
      if(i==4){
          continue
      }
      ctx.moveTo(20, 20+(i*lineHeight))
      ctx.lineTo(xWidth*9+50, 20+(i*lineHeight))
    }
    ctx.stroke()
    ctx.beginPath()
    //ctx.setStrokeStyle('#BCBA60')
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#BCBA60';
    for(var i=0;i<xWidth+14;i++){
      if(i % 2 == 0){
        ctx.moveTo(20 + (8 * i), 20 + (4 * lineHeight))
        ctx.lineTo(20 + (8 * (i+1)), 20 + (4 * lineHeight))
      }
    }
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = '#fff';
    for (var i = 1; i <= 9; i++) {
      ctx.moveTo(20 + (xWidth * i), 8 * lineHeight - 3)
      ctx.lineTo(20 + (xWidth * i), 8 * lineHeight + 3)
      if(i==1){
        ctx.fillText('好',16 + (xWidth * i), 8 * lineHeight + 20)
        ctx.fillText('强', 16 + (xWidth * i), 8 * lineHeight + 35)
        ctx.fillText('性', 16 + (xWidth * i), 8 * lineHeight + 50)
      } else if (i == 2){
        ctx.fillText('友', 16 + (xWidth * i), 8 * lineHeight + 20)
        ctx.fillText('善', 16 + (xWidth * i), 8 * lineHeight + 35)
        ctx.fillText('性', 16 + (xWidth * i), 8 * lineHeight + 50)
      } else if (i == 3) {
        ctx.fillText('遵', 16 + (xWidth * i), 8 * lineHeight + 20)
        ctx.fillText('从', 16 + (xWidth * i), 8 * lineHeight + 35)
        ctx.fillText('性', 16 + (xWidth * i), 8 * lineHeight + 50)
      } else if (i == 4) {
        ctx.fillText('细', 16 + (xWidth * i), 8 * lineHeight + 20)
        ctx.fillText('致', 16 + (xWidth * i), 8 * lineHeight + 35)
        ctx.fillText('性', 16 + (xWidth * i), 8 * lineHeight + 50)
      } else if (i == 5) {
        ctx.fillText('坚', 16 + (xWidth * i), 8 * lineHeight + 20)
        ctx.fillText('持', 16 + (xWidth * i), 8 * lineHeight + 35)
        ctx.fillText('性', 16 + (xWidth * i), 8 * lineHeight + 50)
      } else if (i == 6) {
        ctx.fillText('主', 16 + (xWidth * i), 8 * lineHeight + 20)
        ctx.fillText('见', 16 + (xWidth * i), 8 * lineHeight + 35)
        ctx.fillText('性', 16 + (xWidth * i), 8 * lineHeight + 50)
      } else if (i == 7) {
        ctx.fillText('求', 16 + (xWidth * i), 8 * lineHeight + 20)
        ctx.fillText('知', 16 + (xWidth * i), 8 * lineHeight + 35)
        ctx.fillText('欲', 16 + (xWidth * i), 8 * lineHeight + 50)
      } else if (i == 8) {
        ctx.fillText('思', 16 + (xWidth * i), 8 * lineHeight + 20)
        ctx.fillText('维', 16 + (xWidth * i), 8 * lineHeight + 35)
        ctx.fillText('性', 16 + (xWidth * i), 8 * lineHeight + 50)
      } else if (i == 9) {
        ctx.fillText('独', 16 + (xWidth * i), 8 * lineHeight + 20)
        ctx.fillText('立', 16 + (xWidth * i), 8 * lineHeight + 35)
        ctx.fillText('性', 16 + (xWidth * i), 8 * lineHeight + 50)
      }
      
    }
    ctx.stroke()

    var posArr = [];
    for(var i=1;i<=15;i++){
      var pos = null;
      var oneScore = score[i-1];
      if (oneScore>0){
        pos = { 'x': 16 + (xWidth * i), 'y': 60 * (1 - oneScore) + 40 }
      }else{
        pos = { 'x': 16 + (xWidth * i), 'y': 60 * Math.abs(oneScore) + 40+60 }
      }
       
      posArr.push(pos);
      ctx.beginPath();
      if (i == 5) {
        ctx.arc(pos.x, pos.y , 3,0, Math.PI * 2) 
      }else{
        ctx.arc(pos.x, pos.y, 3, 0,Math.PI * 2) 
      }
      ctx.fill();

      ctx.beginPath()
      if (i == 5) {
        ctx.arc(pos.x, pos.y, 5,0, Math.PI * 2)
      } else {
        ctx.arc(pos.x, pos.y, 5, 0,Math.PI * 2)
      }
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(posArr[0].x, posArr[0].y)
    for (var i = 1; i < posArr.length;i++){
      ctx.lineTo(posArr[i].x, posArr[i].y)
    }
    ctx.stroke();
    renderHtml(score);
}

function renderHtml(score){
	var titleIdx = [];
	for(var i =0;i<score.length;i++){
		titleIdx.push({'idx':i,'score':score[i]});
	}
	function NumAscSort(a,b)
	{
	 return a - b;
	}
	score.sort(NumAscSort);
	var max1 = score[score.length-1];
	var max2 = score[score.length-2];
	var max3 = score[score.length-3];
	var max1Id = null;
	var max2Id = null;
	var max3Id = null;
	
	var min1 = score[0];
	var min2 = score[1];
	var min3 = score[2];
	var min1Id = null;
	var min2Id = null;
	var min3Id = null;
	
	$.each(titleIdx,function(index,val){
		
		if(val.score == max1 && max1Id == null){
			max1Id = val.idx;
			$("#max1").html(resultArr[max1Id].name);
			$("#max1").next().html(resultArr[max1Id].ceil);
			return;
		}
		if(val.score == max2 && max2Id == null){
			max2Id = val.idx;
			$("#max2").html(resultArr[max2Id].name);
			$("#max2").next().html(resultArr[max2Id].ceil);
			return;
		}
		if(val.score == max3 && max3Id == null){
			max3Id = val.idx;
			$("#max3").html(resultArr[max3Id].name);
			$("#max3").next().html(resultArr[max3Id].ceil);
			return;
		}
		
		if(val.score == min1 && min1Id == null){
			min1Id = val.idx;
			$("#min1").html(resultArr[min1Id].name);
			$("#min1").next().html(resultArr[min1Id].floor);
			$("#min1p").html(resultArr[min1Id].develop);
			return;
		}
		if(val.score == min2 && min2Id == null){
			min2Id = val.idx;
			$("#min2").html(resultArr[min2Id].name);
			$("#min2").next().html(resultArr[min2Id].floor);
			$("#min2p").html(resultArr[min2Id].develop);
			return;
		}
		if(val.score == min3 && min3Id == null){
			min3Id = val.idx;
			$("#min3").html(resultArr[min3Id].name);
			$("#min3").next().html(resultArr[min3Id].floor);
			$("#min3p").html(resultArr[min3Id].develop);
			return;
		}
	});
	

		
}
