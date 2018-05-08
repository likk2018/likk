<#import "../base/head.ftl" as jksk>
<#import "../base/nav.ftl" as nav>
<#import "../base/top.ftl" as top>
<#import "../base/footer.ftl" as footer>
<@jksk.htmlHead cssList="select2_metro.css,DT_bootstrap.css">
</@jksk.htmlHead>
<@nav.leftNav index=5>
</@nav.leftNav>
<@top.htmlTop>
</@top.htmlTop>
<!-- END SIDEBAR -->
<div class="wrapper wrapper-content animated fadeInRight">
	<div class="row">
		<div class="col-lg-12">
			<div class="ibox float-e-margins" style="margin-top:150px;width=100%;height=100%;text-align:center;">
				<img alt="image" class="img-circle" src="${base}/resources/img/reading.png" width="800px" height="400px" />
				<br><font size="3">欢迎使用后台管理系统！</font>
			</div>
		</div>
	</div>
</div>


<!-- END PAGE -->
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<@footer.foot>
</@footer.foot>

<!-- END FOOTER -->
<script>
function(){
	$.ajax({
		url: '${base}/vip/getGameOpenProvince?t' + Math.random(),
		type: 'GET',
		async: false,
		dataType: 'JSON',
		success: function(response) {
			$('#province').empty();
			var clouds = response;
			var option = '';
			for(var i in clouds) {
				option += '<option value="' + i + '">' + clouds[i] + '</option>';
			}
			$('#province').append(option);
		}
	});
}

</script>
</body>

<!-- END BODY -->

</html>