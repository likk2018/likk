var revertArr = [21,15,19,34,9,22,8,14,30];
var scoreArr = [0,1,2,3,4];
var scoreArr1 = [4,3,2,1,0];
var deteleDimensionArr = ['外向性','活泼性','忠厚性','稳定性','坚强性','健壮性'];
var dimension = [
                 {'cname':'外向性','name':'Ex','questions':'6,31,42,46','avg':10.56,'deviation':3.62},
                 {'cname':'好强性','name':'Do','questions':'23,38,40','avg':6.93,'deviation':2.64},
                 {'cname':'活泼性','name':'Ac','questions':'3,24,39','avg':8.86,'deviation':2.52},
                 {'cname':'友善性','name':'Fr','questions':'28,35,41','avg':7.58,'deviation':2.41},
                 {'cname':'遵从性','name':'Ob','questions':'4,20,27,44','avg':11.18,'deviation':2.93},
                 {'cname':'忠厚性','name':'Ho','questions':'33,37,49','avg':8.1,'deviation':2.61},
                 {'cname':'细致性','name':'Ca','questions':'21,25,48','avg':6.77,'deviation':2.91},
                 {'cname':'坚持性','name':'Pe','questions':'15,16,19,34','avg':7.79,'deviation':3.67},
                 {'cname':'稳定性','name':'Es','questions':'9,22,32','avg':5.95,'deviation':2.86},
                 {'cname':'主见性','name':'Sc','questions':'17,29,43','avg':8.75,'deviation':2.42},
                 {'cname':'坚强性','name':'Br','questions':'8,14,30','avg':4.78,'deviation':3.12},
                 {'cname':'求知欲','name':'Li','questions':'5,10,11,26','avg':12.34,'deviation':2.94},
                 {'cname':'聪颖性','name':'Le','questions':'2,18,47,50','avg':12.25,'deviation':3.29},
                 {'cname':'独立性','name':'Ld','questions':'7,13,45','avg':7.25,'deviation':2.61},
                 {'cname':'健壮性','name':'Bh','questions':'1,12,36','avg':8.76,'deviation':2.55},
                 ];
var isDeleteQuestionArr = [];
$.each(dimension,function(index,val){
	for(var i in deteleDimensionArr){
		if(deteleDimensionArr[i] == val.cname){
			val.isDelete = true;
			var qs = val.questions.split(',');
			for(var j in qs){
				isDeleteQuestionArr.push(qs[j]);
			}
			
		}
	}
//	 var qs = val.questions.split(',');
//	  var max = 0,min=0;
//	  for(var i=0;i<qs.length;i++){
//		  max+=4;
//	  }
//	console.log((max - val.avg)/val.deviation+''+(min - val.avg)/val.deviation);
})
var questions = [
                 {'qname':'身体素质比较好','score':0,'direction':'+'},
                 {'qname':'思维敏捷','score':0,'direction':'+'},
                 {'qname':'比较好动','score':0,'direction':'+'},
                 {'qname':'比较听话','score':0,'direction':'+'},
                 {'qname':'喜欢观察','score':0,'direction':'+'},
                 
                 {'qname':'和人交往时主动热情','score':0,'direction':'+'},
                 {'qname':'独立性较强','score':0,'direction':'+'},
                 {'qname':'怕鬼','score':0,'direction':'+'},
                 {'qname':'比较容易激动','score':0,'direction':'+'},
                 {'qname':'思想比较活跃','score':0,'direction':'+'},
                 
                 {'qname':'想象力丰富','score':0,'direction':'+'},
                 {'qname':'身体很健康','score':0,'direction':'+'},
                 {'qname':'自己的事情能够自己做','score':0,'direction':'+'},
                 {'qname':'胆子比较小','score':0,'direction':'+'},
                 {'qname':'学习上不够用工','score':0,'direction':'+'},
                 
                 {'qname':'在学习上有一股不服输的劲头','score':0,'direction':'+'},
                 {'qname':'对事情有自己的看法','score':0,'direction':'+'},
                 {'qname':'学习能力比较强','score':0,'direction':'+'},
                 {'qname':'只有家长监督时候成绩才会好些','score':0,'direction':'+'},
                 {'qname':'很讲道理','score':0,'direction':'+'},
                 
                 {'qname':'马虎','score':0,'direction':'+'},
                 {'qname':'爱发脾气','score':0,'direction':'+'},
                 {'qname':'喜欢领导别人','score':0,'direction':'+'},
                 {'qname':'动作灵活','score':0,'direction':'+'},
                 {'qname':'作业比较工整','score':0,'direction':'+'},
                 
                 {'qname':'好奇心比较强','score':0,'direction':'+'},
                 {'qname':'遵守纪律','score':0,'direction':'+'},
                 {'qname':'待人接物比较有礼貌','score':0,'direction':'+'},
                 {'qname':'对问题有自己独特的看法','score':0,'direction':'+'},
                 {'qname':'怕黑','score':0,'direction':'+'},
                 
                 {'qname':'不管和什么样的人都能谈得来','score':0,'direction':'+'},
                 {'qname':'情绪比较稳定','score':0,'direction':'+'},
                 {'qname':'不说假话','score':0,'direction':'+'},
                 {'qname':'做什么事都坚持不了多长时间','score':0,'direction':'+'},
                 {'qname':'体贴大人','score':0,'direction':'+'},
                 
                 {'qname':'很少得病','score':0,'direction':'+'},
                 {'qname':'很诚实','score':0,'direction':'+'},
                 {'qname':'比较有主见','score':0,'direction':'+'},
                 {'qname':'精力旺盛','score':0,'direction':'+'},
                 {'qname':'争强好胜','score':0,'direction':'+'},
                 
                 {'qname':'比较大方','score':0,'direction':'+'},
                 {'qname':'喜欢和人交往','score':0,'direction':'+'},
                 {'qname':'心里比较有主意','score':0,'direction':'+'},
                 {'qname':'对父母很少有过分的要求','score':0,'direction':'+'},
                 {'qname':'生活自理能力较强','score':0,'direction':'+'},
                 
                 {'qname':'喜欢参加集体活动','score':0,'direction':'+'},
                 {'qname':'学习东西比较快','score':0,'direction':'+'},
                 {'qname':'做事比较认真','score':0,'direction':'+'},
                 {'qname':'忠厚老实','score':0,'direction':'+'},
                 {'qname':'脑子比较灵活','score':0,'direction':'+'}
                 ];
                 
$.each(questions,function(idx,val){
	for(var i in isDeleteQuestionArr){
		if((idx+1) == isDeleteQuestionArr[i]){
			val.isDelete = true;
		}
	}
});          
                 
              $(function(){
            	  //设置负分题
            	  for(var i in revertArr){
            		  questions[revertArr[i]-1].direction = '-';
            	  }
            	  var index = 1;//第一题
            	  var qindex = 0;
            	  $("#next").click(function(){
            		  index++;
            		  if(index >= 31){
            			  $(this).val('完成');
            		  }
            		  if(index > 31 || qindex >= 50){
            			  //测试结束
            			  $(this).prop('disabled',true);
            			  calcScore();
            			  return;
            		  }
            		  if($("#question input[type='radio']:checked").length==0){
            			  alert('请选择题！')
            			  return;
            		  }
            		  var answer = $("#question input[type='radio']:checked").val();
            		  if(questions[qindex].direction=='+'){
            			  questions[qindex].score = scoreArr[parseInt(answer)];
            		  }else{
            			  questions[qindex].score = scoreArr1[parseInt(answer)];
            		  }
            		  //alert(questions[index].score)
            		  qindex++;
            		  while(questions[qindex].isDelete){
            			  //console.log(qindex)
            			  qindex++;
            		  }
            		  console.log(qindex)
            		  $("#qname").html('第'+(index)+'题:   '+questions[qindex].qname);
            		  //alert($("#question input[type='radio']:checked").val())
            	  });
            	  while(questions[qindex].isDelete){
            		  console.log(qindex)
        			  qindex++;
        		  }
            	  $("#qname").html('第'+index+'题:   '+questions[qindex].qname);
              })
              function calcScore(){
            	  var ans = '答题结束！';
            	  $.each(dimension,function(index,val){
            		  var qs = val.questions.split(',');
            		  var youScore = 0;
            		  var max = 0;
            		  for(var i=0;i<qs.length;i++){
            			  youScore +=  questions[qs[i]-1].score;
            			  max+=4;
            		  }
            		  val.youScore = youScore;
            		  val.z = (val.youScore - val.avg)/val.deviation;
            		  val.min = 0;
            		  val.max = max;
            		  val.minZ = (val.min - val.avg)/val.deviation;
            		  val.maxZ = (val.max - val.avg)/val.deviation;
            		  if(val.z<0){
            			  val.score =  ((val.z - val.minZ) / Math.abs(val.minZ))*0.5
            		  }else{
            			  val.score = 0.5+(1-((val.maxZ - val.z) / Math.abs(val.maxZ)))*0.5
            		  }
            		  //ans += val.cname+'->>> 平均分：'+val.avg+',你的得分：'+val.avgYou+'<br/>';
//            		  ans += val.cname+'->>> 你的得分：'+val.youScore+' 你的z值：'+val.z+' minZ:'+ val.minZ 
//            		  +' maxZ : '+ val.maxZ +'<br/>';
            	  })
            	  $("#question-btn").html(ans);
            	  drawCanver();
              }