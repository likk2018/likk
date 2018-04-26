var wxopenid=getCookie('wxopenid');
//var DOMIN = {MAIN:'http://127.0.0.1:8080/mini'}
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
                        }else{
                        	  alert('微信身份识别失败 \n '+result);
                        }
                        
                    }
                });    
        }
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
checkOpenId();

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
		},
		success: function(data){
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
			}else{
				alert(data.message)
			}
		}
	});
}

//调用微信JS api 支付
function jsApiCall(data) {
	WeixinJSBridge.invoke('getBrandWCPayRequest', data, function(res) {
		if (res.err_msg == "get_brand_wcpay_request:ok") {
			if(typeof(bindLogin) == 'function'){
				bindLogin();
			}
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