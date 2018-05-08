//登录注册相关验证  
var JSVerify = {
	_trim:function(str){
		return $.trim(str);
	},
	_callback:function(callback,isok,error,data){
		if(callback!=null){
			callback(isok,error,data);
		}
		return error;
	},
	
	//功能：验证用户名是否存在
	//参数：手
	//		验证成功后回调函数(function)参数：是否成功、相关信息(错误提示信息)、返回原始数据
	//返回：错误信息(string)，正确返回null
	IsUserNameExists:function(userName,ajax,callback){
		var _this = this;
		userName = _this._trim(userName);
		if(userName==''){
			return '请输入正确的用户名！';
		};
		if(ajax){
			$.ajax({
				url:DOMIN.MAIN+'/login/checkUserName',
				async : false,
				type:'POST',
				data:{
					username : userName
				},
				dataType:'json',
				error:function(data){
					return _this._callback(callback,false,'连接服务器失败，请稍后再试！');
				},
				success:function(data){
					return _this._callback(callback,data,data);
				}
			});
		}
		return null;
	},
	//功能：验证手机
	//参数：手机号码(string)、是否验证已绑定(bool)、验证成功后回调函数(function)
	//		验证成功后回调函数(function)参数：是否成功、相关信息(错误提示信息)、返回原始数据
	//返回：错误信息(string)，正确返回null
	Phone:function(phone,exist,callback){
		var _this = this;
		phone = _this._trim(phone);
		if(phone==''){
			return '手机号码不能为空！';
		};
		if (!/^\d{11}$/.test(phone)) {
			return '手机号码格式错误！';
		}
		return null;
	},
	//功能：发送手机验证码
	//参数：手机号码(string)、是否验证已绑定(bool)、验证成功后回调函数(function)
	//		验证成功后回调函数(function)参数：是否成功、相关信息(错误提示信息)、返回原始数据
	//返回：错误信息(string)，正确返回null
	SendPhoneCode:function(phone,ajax,callback){
		var _this = this;
		phone = _this._trim(phone);
		if(phone==''){
			return '手机号码不能为空！';
		};
		if (!/^\d{11}$/.test(phone)) {
			return '手机号码格式错误！';
		};
		
		if(ajax){
			$.ajax({
				url:DOMIN.MAIN+'/login/sendSms',
				type:'GET',
				data:{
					mobile : phone
				},
				dataType:'json',
				error:function(e){
					$.tip(e);
					return _this._callback(callback,e,'连接服务器失败，请稍后再试！');
				},
				success:function(data){
						return _this._callback(callback,data,null);
				}
			});
		}
		return null;
	},
	//功能：验证手机验证码
	//参数：手机号码(string)、验证码(string)、是否ajax验证(bool)、验证成功后回调函数(function)
	//		验证成功后回调函数(function)参数：是否成功、相关信息(错误提示信息)、返回原始数据
	//返回：错误信息(string)，正确返回null
	PhoneCode:function(phone,code,activeCode,ajax,callback){
		var _this = this;
		phone = _this._trim(phone);
		code = _this._trim(code);
		if(phone==''){
			return '手机号码不能为空！';
		};
		if (!/^\d{10,11}$/.test(phone)) {
			return '手机号码格式错误！';
		};
		if(code==''){
			return '请输入您的手机验证码。';
		};
		if (!/^\d{6}$/.test(code)) {
			return '您输入的验证码错误，请重新输入或重新获取验证码。';
		};
	},
	//功能：验证密码
	//参数：密码(string)、验证成功后回调函数(function)
	//		验证成功后回调函数(function)参数：是否成功、相关信息(错误提示信息)、返回原始数据
	//返回：错误信息(string)，正确返回null
	Password:function(password,callback){
		var _this = this;
		password = _this._trim(password);
		if(password==''){
			return '请输入您的密码。';
		};
		if (!/^.{6,15}$/.test(password)) {
			return '您输入的密码长度应为6-16个字符，请重新输入。';
		};
		return null;
	},
	//功能：验证二次密码
	//参数：密码(string)、二次密码(string)、验证成功后回调函数(function)
	//		验证成功后回调函数(function)参数：是否成功、相关信息(错误提示信息)、返回原始数据
	//返回：错误信息(string)，正确返回null
	Password2:function(password,password2,callback){
		var _this = this;
		password = _this._trim(password);
		password2 = _this._trim(password2);
		if(password2==''){
			return '请再次输入您的密码。';
		};
		if (!/^.{6,15}$/.test(password2)) {
			return '您输入的密码长度应为6-16个字符，请重新输入。';
		};
		if(password2!=password){
			return '两次密码不相同！';
		}
		return null;
	},
	//功能：验证图片验证码
	//参数：验证码(string)、是否ajax验证(bool)、验证成功后回调函数(function)
	//		验证成功后回调函数(function)参数：是否成功、相关信息(错误提示信息)、返回原始数据
	//返回：错误信息(string)，正确返回null
	ImageCode:function(code,ajax,callback){
		var _this = this;
		code = _this._trim(code);
		if(code==''){
			return '请输入您的手机验证码。';
		};
		if (!/^[0-9a-zA-Z]{4}$/.test(code)) {
			return '您输入的验证码错误，请重新输入或重新获取验证码。';
		};
		if(ajax){
			
		}
		return null;
	}
};