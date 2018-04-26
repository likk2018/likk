;(function($) {
	/**
	 * 线性进度条
	 * @param	{Object}	配置参数
 	 * 示例: 
	 * $('.bidProgress').linePro({
	 *		 obj : null, //选择元素
 	 *	 	 data : 'progress', 自定义data数据名
	 *		 speed : '1000' 自定义速度
	 *	});
	 */
	$.fn.linePro = function(setting){ 

		function init(obj){
			var oTop = obj.offset().top;
			var off = obj.find('i').attr('off'); //获取进度条是否加载过
			if(oTop<=$(window).scrollTop()+$(window).height() && oTop>= $(window).scrollTop()  && !off){
			var oNun = obj.find('i').data(setting.data);  // 获取进度值
				obj.find('i').animate({'width':oNun},setting.speed);
				obj.find('i').attr('off','1');
			}
		} 

		var defaults = {
			obj : null,//选择元素
			data : 'progress', //自定义data数据名
			speed : '1000' //自定义速度
		};

		defaults.obj = $(this);
		//拷贝default的值
		var setting = $.extend(defaults, setting);

		$(this).each(function(){
			init($(this));
		});
		

		var timer = null;
		$(window).on('scroll',function(){
			clearTimeout(timer);
			timer = setTimeout(function(){
				setting.obj.each(function(){
					init($(this));
				});
			},200);
			
		});
	}
})(jQuery);
////////////////////////////////解决ie8不支持bind方法的问题/////////////////////////
if (!Function.prototype.bind) {
	  Function.prototype.bind = function(oThis) {
	    if (typeof this !== 'function') {
	      // closest thing possible to the ECMAScript 5
	      // internal IsCallable function
	      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
	    }

	    var aArgs   = Array.prototype.slice.call(arguments, 1),
	        fToBind = this,
	        fNOP    = function() {},
	        fBound  = function() {
	          return fToBind.apply(this instanceof fNOP && oThis
	                 ? this
	                 : oThis,
	                 aArgs.concat(Array.prototype.slice.call(arguments)));
	        };

	    fNOP.prototype = this.prototype;
	    fBound.prototype = new fNOP();

	    return fBound;
	  };
	}

//更换验证码
function nextVerifyCode() {
	$(".verifyCode").attr("src",window.CONTEXT_PATH+
			"/verifyCodeServlet?" + new Date().getTime());
}
////////////////////////////////////页面提示框--开始/////////////////////////////////////////////////

//function picDialog(imgSrc){
//	$.artDialog({
//		fixed: true,
//	     lock:true,
//		content: "<div style='overflow:auto;max-width:600px;max-height:480px;'><img src='"+imgSrc+"'></img></div>"
//	});
//}

function picDialog(imgSrc,imgWidth,imgHeight){
	imgWidth = (imgWidth > 600) ? 600 : imgWidth;
	imgHeight = (imgHeight > 480) ? 480 : imgHeight;
	var picLeft= imgWidth ? (($("body").width() - imgWidth -120)/2 + "px") : "50%";
	var	picTop = imgHeight ? (($(window).height() - imgHeight -70)/2 + "px") : "50%";
	$.artDialog({
		fixed: true,
	    lock:true,
	    left:picLeft,
	    top:picTop,
		content: "<div style='overflow:auto;max-width:600px;max-height:480px;'><img src='"+imgSrc+"'></img></div>"
	});
}

/**
 * 短暂提示
 * @param	{String}	提示内容
 * @param	{Number}	显示时间 (默认1.5秒)
 */
artDialog.tips = function (content, time, isLock, icon) {
    return $.dialog({
        id: 'Tips',
        icon: icon,
        title: false,
        fixed: true,
        lock: isLock?isLock:false,
        opacity: .5
    })
    .content('<div style="padding: 0 1em;">' + content + '</div>')
    .time(time || 10);
};

/**
 * 确认
 * @param	{String}	消息内容
 * @param	{Function}	确定按钮回调函数
 * @param	{Function}	取消按钮回调函数
 */
artDialog.confirm = function (content, yes, no) {
    return $.dialog({
        id: 'Confirm',
        icon: 'question',
        fixed: true,
        lock: true,
        opacity: .1,
        content: content,
        ok: function (here) {
            return yes.call(this, here);
        },
        cancel: function (here) {
            return no && no.call(this, here);
        }
    });
};

/**
 * 警告
 * @param	{String}	消息内容
 */
artDialog.alert = function (content, yes, icon) {
    return artDialog({
        id: 'Alert',
        icon: icon,
        fixed: true,
        lock: true,
        esc:false,
        content: content,
        ok: function (here) {
            return yes.call(this, here);
        },
        cancel:false
    });
};

////////////////////////////////页面提示框--结束////////////////////////////////////
//验证码发送消息提示
function timerCountB(buttonId) {
		timer(buttonId, {
			"count" : 60,
			"animate" : true,
			initText:"获取验证码",
			initTextBefore : "已发送...",
			initTextAfter : "s"
		}).begin();
}

//验证码发送消息提示
function timerCount(xhr, status, args, buttonId) {
	$('#'+buttonId).removeAttr("disabled");
	if (!args.validationFailed) {
		timer(buttonId, {
			"count" : 60,
			"animate" : true,
			initText:"获取验证码",
			initTextBefore : "已发送...",
			initTextAfter : "s"
		}).begin();
	}
}

function enableBtn(buttonId){
	$('#'+buttonId).removeAttr("disabled").css('opacity','1');
}

var common = {
	
	// footer trust
	trust : function(obj){
		var obj = obj || $('.footTrust li');
		obj.hover(function(){
			$(this).find('.show').stop().hide();
			$(this).find('.hide').stop().show();
		},function(){
			$(this).find('.show').stop().show();
			$(this).find('.hide').stop().hide();
		});
	},
	// fixedMenu滑过显示
	fixedMenuHover: function(){
		var width,height;
		$('#fixedMenu li').hover(function(){
			width = $(this).find('.hide').data('width');
			height = $(this).find('.hide').data('height');
			$(this).find('.hide').stop().animate({'width': width,'height': height}).show();
		},function(){
			$(this).find('.hide').stop().animate({'width': '0px','height':'0px'},function(){
				$(this).hide();
			});
		});
	},
	// fixedMenu返回顶部
	fixedMenuTop: function(){
		var top = $(window).scrollTop(),
			obj = $('#fixedMenu li:last'),
			timer = null;
		function show(){
			if(top>=200){
				obj.slideDown();
			}else{
				obj.slideUp();
			}
		}
		show();
		obj.on('click',function(){
			$('body,html').animate({'scrollTop': '0px'});
		});
		$(window).on('scroll',function(){
			top = $(window).scrollTop();
			clearTimeout(timer);
			timer = setTimeout(function(){
				show();
			},300);			
		});
	},
	// fixedMenu 收益计算器   
	fixedMenuCalc: function(){ 
		var re = /^\d+(\.\d{2})?$/,
			reNumber = /^\d+$/,
			oBtnSubimt = $('.calcBtnSubimt'),
			oBbtnReset = $('.calcBtnReset'),
			oMode = $('#calcMode span').eq(0),	// 计息方式
			oModeHide = $('#calcMode span').eq(1),	// 隐藏的计息方式
			oIptNum = $('#calcIptNum'), // 投资金额
			oIptProfit =  $('#calcIptProfit'),	// 年化收益
			oIptTime = $('#calcIptTime'),	// 计息时长
			oProfit = $('.calcProfit span'),	// 预计收益
			oClose = $('.calcClone'),	// 关闭按钮
			oMark = $('#calcMark'),	// 收益计算器遮罩层
			oCalc = $('#calc'),	// 收益计算器
			oFixedMenuCalc = $('.icon-rightFixedCalc'); // 右侧悬浮菜单计算器

		function reset(){
			oIptNum.val('');
			oIptProfit.val('');
			oIptTime.val('');
			oProfit.text('0.00');
		}
		function hide(){
			oMark.stop().fadeOut();
			oCalc.stop().fadeOut();
		}
		function show(){
			oMark.stop().fadeIn();
			oCalc.stop().fadeIn();
		}

		/**
		 * 限制输入内容
		 * @param	{Object}	限制对象
		 * @param	{RegExp}	限制正则
		 * @param	{Boolean}	是否是小数，小数true
		 * 示例:
		 * inputConstraints(oIptNum,/\D/g);
		 */
		function inputConstraints(obj,re,off){
			obj.on('keyup',function(){
				var txt = $(this).val();
				$(this).val(txt.replace(re,''));
				if(off){
					// 计算点出现次数
					var index = 0;
					// 重新获取截取后的字符串
					txt = $(this).val();
					$(this).val(txt.replace(/\.+/g,function(){
						index++;
						if(index > 1){ 
							return '';
						}else{
							return '.';
						}						
					}));
				}
			});
		}

		// 投资金额限制输入内容
		inputConstraints(oIptNum,/\D/g);
		// 年化收益限制输入内容
		inputConstraints(oIptProfit,/[^0-9\.]/g,true);
		// 计息时长限制输入内容
		inputConstraints(oIptTime,/\D/g);

		// 计息方式显示二级菜单
		$('#calcMode,.calcIptTipIcon').hover(function(){
			oModeHide.css('display','block');
		},function(){
			oModeHide.css('display','none');
		});
		// 计息方式切换
		oModeHide.on('click',function(){
			var off = $(this).text();
			if(off == '月'){
				 $(this).text('天');
				 oMode.text('月');
			}else{
				$(this).text('月');
				oMode.text('天');
			}
			$(this).hide();
		});
		// 关闭计算器
		oClose.on('click',function(){
			hide();
			reset();
		});
		// 打开计算器
		oFixedMenuCalc.on('click',function(){
			show();
		});
		// 重置计算器
		oBbtnReset.on('click',function(){
			reset();
		});
		// 计算收益
		oBtnSubimt.on('click',function(){

			var numVal = oIptNum.val(),
				profitVal = oIptProfit.val(),
				timeVal = oIptTime.val();
				modeVal = oMode.text(),
				profitNum = '';

			if(numVal == ''){
				artDialog.tips('请填写投资金额',1.5); 
				return false;
			}else if(!reNumber.test(numVal)){
				artDialog.tips('投资金额请输入数字，禁止输入小数',1.5); 
				return false;
			}else if(numVal>100000000){
				artDialog.tips('投资金额不能≥10亿',1.5); 
				return false;
			}

			if(profitVal == ''){
				artDialog.tips('请填写年化收益',1.5);
				 return false;
			}else if(!re.test(profitVal)){
				artDialog.tips('年化收益请输入数字及小数后2位',1.5); 
				return false;
			}else if(profitVal>100){
				artDialog.tips('年化收益不能>100%',1.5); 
				return false;
			}

			if(timeVal == ''){
				artDialog.tips('请填写计息时长',1.5);
				 return false;
			}else if(!reNumber.test(timeVal)){
				artDialog.tips('计息时长请输入整数',1.5); 
				return false;
			}else if (timeVal>100 && modeVal == '月'){
				artDialog.tips('计息时长不能>100月',1.5); 
				return false;
			}else if (timeVal>1000 && modeVal == '天'){
				artDialog.tips('计息时长不能>1000天',1.5); 
				return false;
			}

			numVal = parseInt(oIptNum.val());
			timeVal = parseInt(oIptTime.val());
			
			if(modeVal == '天'){
				profitNum = numVal * ((profitVal/100)/365) * timeVal;
				oProfit.text(profitNum.toFixed(2));
			}else{
				profitNum = numVal * ((profitVal/100)/12) * timeVal;
				oProfit.text(profitNum.toFixed(2));
			}
		});
	},
	// 导航滑过二级菜单
	navHover: function(){
		var obj = $('.nav >li');
		obj.hover(function(){
			$(this).find('.navMenu').stop().show();
		},function(){
			$(this).find('.navMenu').stop().hide();
		});
	},
	// 风险评测弹窗
	egTip: function(){
		var oMrak = $('#calcMark'),
			oEgTip = $('.eg-tip'),
			oBtn = $('.eg-tip-esc');
		
		oMrak.stop().fadeIn();
		oEgTip.stop().fadeIn();
		
		oBtn.on('click',function(){
			oMrak.stop().fadeOut();
			oEgTip.stop().fadeOut();
		});
	},
	/**
	 * 即利经纪人弹窗
	 * @param	{Object}	Dom元素
	 */
	agentTip: function(obj){
		var mark = $('#agent-mark'),
			close = $('.agent-pop-close'),
			pop01 = $('#agent-pop01'),
			pop02 = $('#agent-pop02');
		
		close.on('click',function(){
			$(this).parent().fadeOut();
			mark.fadeOut();
		});
		
		
		obj.on('click',function(){
			if($(this).hasClass('ac-not-login')){
				return;
			}
			
			$.ajax({
				type: 'GET',
				url: window.CONTEXT_PATH + '/registBroker',
				success: function(data){
					data = $.parseJSON(data);
					if(data.status === 'y'){
						mark.fadeIn();
						pop01.fadeIn();
					}
					
					if(data.status === 'n'){
						mark.fadeIn();
						pop02.fadeIn();
					}
				}
			});
		});	
	},
	// 6个月未投资弹窗
	sixTip: function(){
		var mark = $('#calcMark'),
		close = $('.six-tip-close'),
		pop01 = $('.six-tip');
		
		mark.fadeIn();
		pop01.fadeIn();
		
		close.on('click',function(){
			mark.fadeOut();
			pop01.fadeOut();
		});
	}
};

$(function(){

	// footer trust
	// common.trust();
	// fixedMenu滑过显示
	common.fixedMenuHover();
	// fixedMenu返回顶部
	common.fixedMenuTop();
	// fixedMenu 收益计算器
	common.fixedMenuCalc();
	// 导航滑过二级菜单
	common.navHover();
	// 首页标进度条
  	$('.bidProgress').linePro();
  	// 列表标进度条
  	$('.listProgress').linePro();
  	// 详情页进度条
  	$('.detail-top-progress').linePro();
});


