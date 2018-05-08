$(document).ready(function() {
	$('#LeftAside').on('touchend', function(even) {
		if ($(this).attr('bOk') == 'true') {
			$('#right-aside').css('display', 'none');
			$('#right-aside').attr('bOk', true);
			$('.navbar-static-side').css('display', 'block');
			$(this).attr('bOk', false)
		} else {
			$('.navbar-default.navbar-static-side').css('display', 'none');
			$(this).attr('bOk', true)
		}
		even.stopPropagation();
	})
	$('#rightAside').on('touchend', function(even) {
		if ($('#right-aside').attr('bOk') == 'true') {
			$('#right-aside').css('display', 'block');
			$('#right-aside').css('height', $('#wrapper').height());
			$('#right-aside').attr('bOk', false);
			$('.navbar-static-side').css('display', 'none');
			$('#LeftAside').attr('bOk', true)
		} else {
			$('#right-aside').css('display', 'none');
			$('#right-aside').attr('bOk', true);
		}

		/*$('.second_nav').hide();*/
		even.stopPropagation();
	});
	$(document).on('touchend', function(even) {
		var $target = $(event.target);
		if (!$target.hasClass('sidebar-collapse') && !$target.parents().hasClass('sidebar-collapse')) {
			$('.navbar-static-side').css('display', 'none');
			$('#LeftAside').attr('bOk', true);
		}
		if (!$target.hasClass('right-aside') && !$target.parents().hasClass('right-aside')) {
			$('#right-aside').css('display', 'none');
			$('#right-aside').attr('bOk', true);
		}
		if (!$target.hasClass('operation-bar') && !$target.parents().hasClass('operation-bar')) {
			$('.operation-bar').remove();
		}
		even.stopPropagation();
	});
	alert(0)
	$('#side-menu>li').each(function() {
		if ($(this).hasClass('active')) {
			$(this).find('ul').removeClass('collapse');
		}
	});
	$('#side-menu>li').click(function(even) {
		$('#side-menu>li').removeClass('active');
		$(this).addClass('active');
		if ($(this).find('ul').hasClass('collapse')) {
			$('#side-menu>li').find('ul').addClass('collapse');
			$(this).find('ul').removeClass('collapse');
		} else {
			$('#side-menu>li').find('ul').addClass('collapse');
			$(this).find('ul').addClass('collapse');
		}
		even.stopPropagation();
	});
});