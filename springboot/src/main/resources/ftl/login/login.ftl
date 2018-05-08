<!DOCTYPE html>
<html>

	<head>

		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<title>后台运营管理登录</title>

		<link href="${base}/resources/css/bootstrap.min.css" rel="stylesheet">
		<link href="${base}/resources/css/font-awesome.css" rel="stylesheet">

		<link href="${base}/resources/css/animate.css" rel="stylesheet">
		<link href="${base}/resources/css/style.css" rel="stylesheet">
		<link href="${base}/resources/css/ixianlai.css" rel="stylesheet">

	</head>

	<body class="gray-bg">

		<div class="middle-box text-center loginscreen animated fadeInDown">
			<div>
				<div>

					<h1 class="logo-name" style="font-size:40px;letter-spacing:0px;">后台管理系统</h1>

				</div>
				<form class="m-t" role="form" action="#">
					<div class="form-group">
						<input type="text" class="form-control" placeholder="账号" id="username" name="username" value="${(username)?default('')}">
					</div>
					<div class="form-group">
						<input type="password" class="form-control" placeholder="密码" id="password" name="password">
					</div>
					<!--验证码
					<div class="control-group">
						<input class="m-wrap" type="text" placeholder="验证码" id="chkcode" name="chkcode" />
						<img id="codeImg" alt="点击更换" title="点击更换" src="" />
						<a href="#" id="change">换一张</a>
					</div>
					验证码结束-->
					<a class="btn btn-primary block full-width m-b" id="login">登录</a>
				</form>
				<p class="m-t"> <small>北京likk有限公司</small> </p>
			</div>
		</div>

		<!-- Mainly scripts -->
		<script src="${base}/resources/js/jquery-1.10.1.min.js"></script>
		<script src="${base}/resources/js/bootstrap.min.js"></script>
		<script>
			//获取移动设备类型(1--移动设备;0--非移动设备;)
			function getMobileType() {
				var ua = navigator.userAgent;
				if(!!ua.match(/AppleWebKit.*Mobile.*/)) {
					return 1;
				}
				return 0;
			}
			jQuery(document).ready(function() {
				var m = getMobileType();
				$("#login").on("click", function(e) {
					window.location.href = "${base}/admin/index";
					return;
					var username = $("#username").val();
					var psw = $("#password").val();
					var verifycode = 'ss';
					if(username == '' || psw == '' || verifycode == '') {
						alert("账号、密码不能为空!");
						changeCode();
						return;
					}
					var param = {};
					param.username = username;
					param.password = psw;
					param.verifycode = verifycode;
					var url = "${base}/login/login";
					var callback = function(data) {
						if(data.result == 'AccountErr') {
							alert("账号或者密码输入有误!");
							window.location.href = "${base}/login/toLogin";
						} else if(data.result == 'chkErr') {
							alert("验证码错误!");
							$("#chkcode").val('');
							changeCode();
						} else if(data.result == 'IPErr') {
							alert("仅限内网访问使用，如需开通外网访问权限，请联系lilan@ixianlai.com");
							$("#chkcode").val('');
							//changeCode();
						} else if(data.result == 'isDelErr') {
							alert("该用户已被注销!");
							$("#chkcode").val('');
							//changeCode();
						} else {
							if(m == 0) {
								if(data.isupdate == 'N') {
									window.location.href = "${base}/sys/toUpdatePsw";
								} else {
									window.location.href = "${base}/login/index";
								}
							} else {
								if(data.isupdate == 'N') {
									alert('你尚未修改密码，请先在PC端登录修改密码');
								}else{
									window.location.href = "${base}/mobile/agent/toVipPlayer";
								}
							}
						}
					}
					$.post(url, param, callback, 'json');
				});
				document.onkeydown = function(e) {
					var ev = document.all ? window.event : e;
					if(ev.keyCode == 13) {
						$("#login").trigger("click");
					}
				}

				function changeCode() {
					//$("#codeImg").attr("src", "${base}/login/getCaptcher?t=" + Math.random());
				}
				//changeCode();
				//$("#codeImg").bind("click", changeCode);
				//$("#change").bind("click", changeCode);
			});
		</script>

		<!-- END JAVASCRIPTS -->
	</body>

</html>