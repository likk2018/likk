<#macro leftNav index>
	<body class="pace-done">
		<div id="wrapper">
			<!-- BEGIN SIDEBAR -->
			<nav class="navbar-default navbar-static-side" role="navigation">
				<div class="sidebar-collapse">
					<ul class="nav metismenu" id="side-menu">
						<li class="nav-header">
							<div class="dropdown profile-element">
								<span>
              						<img alt="image" class="img-circle" src="${base}/resources/img/profile_small.jpg">
               					</span>
								<a data-toggle="dropdown" class="dropdown-toggle" href="#">
									<span class="clear">
										<span class="block m-t-xs"> <strong class="font-bold">
											<#if Session.userName?exists>${Session.userName}</#if>
										</strong></span>
									</span>
								</a>
							</div>
						</li>
		
						<li>
							<a href="javascript:;">
								<i class="fa fa-group"></i>
								<span class="nav-label">demo</span>
								<span class="fa arrow"></span>
							</a>
							<ul class="nav nav-second-level collapse">
								<li>
									<a href="${base}/gameGift/toGiftList">demo1管理</a>
								</li>
							
								<li>
									<a href="${base}/gameGift/toMsgList">demo2管理</a>
								</li>
							
							</ul>
						</li>
						
					</ul>
				</div>
			</nav>
</#macro>
