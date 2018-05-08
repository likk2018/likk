var wxopenid=getCookie('wxopenid');
//var DOMIN = {MAIN:'http://127.0.0.1:8080/mini'}
String.prototype.trim = function() {
	  return this.replace(/\s+|\s+/g, '');
	}    
/**
 * 验证码的cookie,精确到分钟
 * @param name
 * @param value
 * @param minutes
 * @returns
 */
function addCookieForSmsCode(name,value,minutes){
	if(!minutes || isNaN(minutes)){ //默认5分钟
		minutes = 5;
	}
	var exp = new Date();
    exp.setTime(exp.getTime() + minutes*60*1000);
    document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
}
function checkOpenId(){
	var access_code = $.getUrlParam('code');
    if (wxopenid==null){
        if (access_code==null || access_code == '' || !access_code)
        {   
        	getWxAppId();
        }
        else
        {   
            $.ajax({
                type:'post',
                url:DOMIN.MAIN+'/wechatpay/getOpenId', 
                async:false,
                cache:false,
                data:{code:access_code},
                dataType:'json',
                success:function(result){
                        if (result!=null && result.hasOwnProperty('openid') && result.openid!=""){
                     	   wxopenid = result.openid;
                           addCookie('wxopenid',result.openid,360*2);
                           //alert('wxopenid获取成功！openid='+result.openid+"&result="+result);    
                           wxPay();
                        }else{
                        	  alert('微信身份识别失败 \n '+result);
                        }
                        
                    }
                });    
        }
    }else{
    	wxPay();
    }
}
function getWxAppId(){
	$.ajax({
		url:DOMIN.MAIN+'/wechatpay/getWxAppId',
		type: 'POST',
		dataType: 'json',
		cache:false,
		asycn:false,
		data:{}, 
		error:function(data){
		},success: function(data){
			if(data.success){
		        var fromurl=location.href;
	            var url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+data.data
	            +'&redirect_uri='+encodeURIComponent(fromurl)+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
	            location.href=url;
			}
		}
	});
}
//checkOpenId();


function wxPay(){
	
	$.ajax({
		url:DOMIN.MAIN+'/wechatpay/getPublicCodePayParam',
		type: 'POST',
		dataType: 'json',
		cache:false,
		asycn:false,
		data:{
			openId:wxopenid
		}, 
		error:function(data){
		},success: function(data){
			if(data.success){
				var data = {
					'appId':data.data.appId,
					'timeStamp': data.data.timeStamp,
					'nonceStr': data.data.nonceStr,
					'package': data.data.package,
					'signType': data.data.signType,
					'paySign': data.data.paySign
				}
				jsApiCall(data);
			}
		}
	});
}

//调用微信JS api 支付
function jsApiCall(data) {
	WeixinJSBridge.invoke('getBrandWCPayRequest', data, function(res) {
		if (res.err_msg == "get_brand_wcpay_request:ok") {
			alert('支付成功！')
			//var uri = rootPath+'/order/ordersuccess.html?orderNo=${(orderNo)}';
			//location.href = encodeURI(uri);
		} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
			alert('支付取消！')
			//var uri = rootPath + "/wechatpay/payresult.html?message=用户取消支付";
			//location.href = encodeURI(uri);
		} else {
			alert('支付失败！')
			//if (res.err_desc)
			//	location.href = encodeURI(rootPath + "/wechatpay/payresult.html?message="+res.err_desc);
			//else
			//	location.href = encodeURI(rootPath + "/wechatpay/payresult.html?message=支付失败");
		}
	});
}

$(document).ready(function(e){
		$.mode = '';
   		//手机号验证
		$('#userName').change(function(){
			var username = $.trim($(this).val()).trim();
			var error = JSVerify.Phone(username,false);
			if(error){
				//alert('请输入正确的手机号码！');
				$('#userName').focus();
				$.mode = '';
				return;
			}else{
				$.mode = 'mobile';
			}
		});
		//验证码长度控制
 		$("#code").bind("keyup",function() {
			if($(this).val().length >6) {
				var lCode = $(this).val().substring(0,6);
				$(this).val(lCode) ;
			}
		});
 		//普通注册
 		$("#login").click(function(){
 			var _this = $(this);
 			//手机号
			var userName =$.trim($('#userName').val()).trim();
			
			if($.mode == ''){
				//请输入正确的手机和邮箱
				alert('请输入正确的手机号！');
				//$('#userName').focus();
				return;
			}
			var vCode = $('#code').val($.trim($('#code').val())).val();
			if(vCode == null || vCode == '' || vCode == undefined){
				alert('验证码不能为空！');
				return false;
			}
			
			$('#login').html('正在绑定...');
			_this.prop('disabled',true);
			$.ajax({
				url:DOMIN.MAIN+'/login/bind',
				type: 'POST',
				dataType: 'json',
				cache:false,
				asycn:false,
				data:{
						mobile : userName,
						openId : getCookie('wxopenid'),
						code : $("#code").val(),
						tokenCode : getCookie('send_sms_encryption_code'),
				}, 
				error:function(data){
					_this.prop('disabled',false);
					alert("链接服务器失败！");
					$('#login').html('绑定');
				},success: function(data){
					_this.prop('disabled',false);
					if(data.success){
//						addCookie('wxopenid',wxopenid,360*2);
//						addCookie('public_code',data.data,360*2);
						location.href = 'password.html?phone='+userName
					}else{
						alert(data.message);
						$('#login').html('绑定');
					}
				}
			});
			
 		});
 		
 		
 		
 	//发送验证码
	$('#getcode').click(function(){
		if($.mode == ''){
             alert('请输入正确的手机号！');
             return false;
        }
		var self = this;
		if($(self).data('issending'))return;
		$(self).data('issending',true);
		$(self).prop('disabled',true).html('正在发送...');
		//$('#js-phone-code-tip').show();
		var callback  = function(data,error){
			if(error==null && data.success){
				var smsResult = data.data;
				//保存验证码
				addCookieForSmsCode('send_sms_encryption_code',smsResult);
				var time = 60;
				$(self).val(time+'S');
				$(self).data('sendcode-setInterval',setInterval(function(){
					if(time==0){
						clearInterval($(self).data('sendcode-setInterval'));
						$(self).html('重新发送验证码').data('issending',false);
						return;
					}
					$(self).html((--time)+'S后重新发送');
				},1000));
				$("#userName").hide();
				$("#code").show();
				//$("#next").show();
			}else{
				alert(data.message);
				$(self).html('重新发送验证码').data('issending',false);
			}
		};
		var error = null;
		var userName =$.trim($('#userName').val()).trim();
		error = JSVerify.SendPhoneCode(userName,true,callback);
		if(error){
			alert(error);
			$(self).val('重新发送验证码').data('issending',false);
		}
	});
});
//手机验证，手机号码格式控制
function formatPhoneNum(e,obj){
	if(e.keyCode==8){
		return;
	}
	obj.value = obj.value.replace(/[^\d\s]/g,'');
	var _this = obj;
	//_this.value=_this.value.replace(/[^(\d\s)]/g,'');
	if(_this.value.length==3){
		_this.value = _this.value+' ';
	}else if(_this.value.length==8){
		_this.value = _this.value+' ';
	}
	if(_this.value.length>13){
		_this.value = _this.value.substr(0,13);
	}
	$('#userName').change();
}