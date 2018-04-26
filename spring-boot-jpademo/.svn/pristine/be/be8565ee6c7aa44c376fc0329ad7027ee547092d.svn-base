var revertArr = [21,15,19,34,9,22,8,14,30];
var scoreArr = [0,1,2,3,4];
var scoreArr1 = [4,3,2,1,0];
var deteleDimensionArr = [];
var dimension = null;
var isDeleteQuestionArr = [];
var questions = null;
var totalCount = 50;

var index = 1;//第一题
var qindex = 0;//答题索引
var scoreIndex = -1;

              $(function(){
             	  var wxopenid=getCookie('wxopenid');
            	  if(!wxopenid){
            		  alert('请在微信下打开连接！');
            		  return;
            	  }
            	  getDemision();
              })
              function addEvent(){
            	  if(getCookie('test_index')){
            			index = parseInt(getCookie('test_index'));
            		}
            		if(getCookie('test_index')){
            			qindex = parseInt(getCookie('test_qindex'));
            		}
            		if(index >= 31 || qindex >= 50){
            			index = 1;
            			qindex = 0;
        			}
            		var ssss = getCookie('test_scores');
            		if(ssss && ssss.length>50){
            		  ssss = ssss.split(',');
                   	  for(var i in questions){
                   		  questions[i].score = ssss[i];
                   	  }
            		}
            	  
            	  $("#current").html(index);
            	  $("#total").html(totalCount);
            	  
            	  var imgHtml = '<img src="../resources/imgs/test/start4.png" alt=""/>';
            	  $("#answers div").click(function(){
            		  scoreIndex = $(this).index();
            		  if($(this).find('img').length<=0){
            			  $(imgHtml).appendTo($(this));
            		  }
            		  $(this).siblings().find('img').remove();
            	  });
            	  
            	 
            	  //设置负分题
            	  for(var i in revertArr){
            		  questions[revertArr[i]-1].direction = '-';
            	  }
            	 
            	  $("#next").click(function(){
            		  if(scoreIndex<0){
            			  alert('请选择题！')
            			  return;
            		  }
            		  index++;
            		  if(index > 50 || qindex >= 50){
            			  addCookie('test_index',index);
                    	  addCookie('test_qindex',qindex);
            			  if(questions[qindex].direction=='+'){
                			  questions[qindex].score = scoreArr[scoreIndex];
                		  }else{
                			  questions[qindex].score = scoreArr1[scoreIndex];
                		  }
            			  var ssss = [];
                    	  for(var i in questions){
                    		  ssss.push(questions[i].score);
                    	  }
                    	  addCookie('test_scores',ssss.join(','))
            			  //测试结束
            			  $(this).prop('disabled',true);
            			  //calcScore();
            			  calcScoreServer();
            			  return;
            		  }
            		  if(questions[qindex].direction=='+'){
            			  questions[qindex].score = scoreArr[scoreIndex];
            		  }else{
            			  questions[qindex].score = scoreArr1[scoreIndex];
            		  }
            		  $("#answers div img").remove();
            		  scoreIndex = -1;
            		  qindex++;
            		  while(questions[qindex].isDelete){
            			  qindex++;
            		  }
            		  addCookie('test_index',index);
                	  addCookie('test_qindex',qindex);
                	  var ssss = [];
                	  for(var i in questions){
                		  ssss.push(questions[i].score);
                	  }
                	  addCookie('test_scores',ssss.join(','))
                	  addToServer();
            		  $(".nth").html('第'+index+'题');
            		  $("#qname").html(questions[qindex].qname);
            		  $("#current").html(index);
            		  $(".progress div").css('width',(index/totalCount*100)+"%");
            	  });
            	  while(questions[qindex].isDelete){
        			  qindex++;
        		  }
            	  $("#current").html(index);
            	  $(".progress div").css('width',(index/totalCount*100)+"%");
            	  $(".nth").html('第'+index+'题');
            	  $("#qname").html(questions[qindex].qname);
              }
              
              function calcScoreServer(){
            	  alert('恭喜你，已完成');
            	  var scores = [];
            	  for(var i=0;i<questions.length;i++){
            		  scores.push(questions[i].score);
            	  }
                  $.ajax({
                      type:'post',
                      url:DOMIN.MAIN+'/test/addTest', 
                      async:false,
                      cache:false,
                      data:{
                    	  score:scores.join(','),
                    	  openId:wxopenid
                      },
                      dataType:'json',
                      success:function(result){
                    	  console.log(result)
                              if (result.success){
                            	  var str = [];
                            	  $.each(result.data,function(idx,val){
                            		  var isDel = false;
                            		  for(var j in deteleDimensionArr){
                            			  if(deteleDimensionArr[j] == val.cname){
                            				  isDel = true;
                            				  break;
                            			  }
                            		  }
                            		  if(!isDel){
                            			  str.push(val.finalScore);
                            		  }
                            		 
                            	  });
                            	  var test = result.datasets.test.data.data;
                            	  var costTime = parseInt((test.updateTime - test.createTime)/1000/60)+"m"+
                            	  parseInt((test.updateTime - test.createTime)/1000%60)+'s'
                            	  var no = test.no;
                            	  var dateStr = $.getDateStr().replace('年','y');
                            	  dateStr = dateStr.replace('月','m');
                            	  dateStr = dateStr.replace('日','d');
                            	  calcScore(scores.join(','),str.join(','),no,dateStr,costTime);
                              }else{
                            	  alert('加载数据失败！')
                              }
                              
                          }
                      }); 
              }
              
              function calcScore(s,str,no,dateStr,costTime){
                  $.ajax({
                      type:'post',
                      url:DOMIN.MAIN+'/test/calcScore', 
                      async:false,
                      cache:false,
                      data:{
                    	  scores:s
                      },
                      dataType:'json',
                      success:function(result){
                              if (result.success){
                            	  var toUrl = 'result.html?scores='+str+'&four='
                            	  +result.list.join(',')+'&no='+no+'&dateStr='+dateStr+'&costTime='+costTime;
                            	  location.href = toUrl;
                              }else{
                            	  alert('加载数据失败！')
                              }
                          }
                      }); 
              }
              
              function calcScorejs(){
            	  alert('恭喜你，已完成');
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
            		  ans += val.cname+'->>> 你的得分：'+val.youScore+' 你的z值：'+val.z+' minZ:'+ val.minZ 
            		  +' maxZ : '+ val.maxZ +'<br/>';
            	  })
            	  $("#question-awn").html(ans);
            	  //drawCanver();
              }
              //var DOMIN = {'MAIN':'http://127.0.0.1:8080/mini'}
              function getDemision(){
                  $.ajax({
                      type:'post',
                      url:DOMIN.MAIN+'/test/getQuestion', 
                      async:false,
                      cache:false,
                      data:{},
                      dataType:'json',
                      success:function(result){
                    	  console.log(result)
                              if (result.success){
                            	  dimension = JSON.parse(result.data.dimension);
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
                            		})
                            		
//                            		$.each(dimension,function(index,val){
//                            			if(!val.isDelete){
//                            				console.log(val.cname)
//                            			}
//                            		})
                            		
                            	  questions = JSON.parse(result.data.question);
                            	  $.each(questions,function(idx,val){
                            			for(var i in isDeleteQuestionArr){
                            				if((idx+1) == isDeleteQuestionArr[i]){
                            					val.isDelete = true;
                            					totalCount--;
                            				}
                            			}
                            		});
                            	  addEvent();
                              }else{
                            	  alert('加载数据失败！')
                              }
                              
                          }
                      });   
              }
         
              
              
        function addToServer(){
       	  var scores = [];
    	  for(var i=0;i<questions.length;i++){
    		  scores.push(questions[i].score);
    	  }
            $.ajax({
                type:'post',
                url:DOMIN.MAIN+'/test/addTest', 
                async:false,
                cache:false,
                data:{
              	  score:scores.join(','),
              	  openId:wxopenid,
              	  current:index
                },
                dataType:'json',
                success:function(result){
                        
                }
            })
        }