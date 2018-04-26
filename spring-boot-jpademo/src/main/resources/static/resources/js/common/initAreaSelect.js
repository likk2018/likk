function initProvince(provinceSelector){
	var $province = $('#'+provinceSelector);
	$.ajax({
		url : DOMIN.MAIN+"/address/queryAllProvince",
		type : "post",
		cache : false,
		async : true,
		dataType : "json",
		data: {
			
		},
		traditional: true,
		success : function(data, textStatus){
			if(data.success){
				var obj = data.list;
				//处理返回结果
				$province.empty();
				$province.append('<option value="">选择省份</option>');
				for(var i=0;i<obj.length;i++){
					$province.append('<option value="'+obj[i].id+'">'+obj[i].regionname+'</option>');
				}
			}else{
				alert(data.message);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			alert(errorThrown);
		}
	});
}

function initCity(provinceSelector, citySelector){
	var $province = $('#'+provinceSelector);
	var $city = $('#'+citySelector);
	$province.change(function(){
		if($province.val() == ''){
			return;
		}
		if($city.prop('disabled')){
			$city.prop('disabled',false);
		}
		
		$.ajax({
			url : DOMIN.MAIN+"/address/queryCityByProvince",
			type : "post",
			cache : false,
			async : true,
			dataType : "json",
			data: {
				provinceId: $province.val()
			},
			traditional: true,
			success : function(data, textStatus){
				if(data.success){
					var obj = data.list;
					//处理返回结果
					$city.empty();
					$city.append('<option value="">选择城市</option>');
					for(var i=0;i<obj.length;i++){
						$city.append('<option value="'+obj[i].id+'">'+obj[i].regionname+'</option>');
					}
				}else{
					alert(data.message);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				alert(errorThrown);
			}
		});
	});
}

function initArea(provinceSelector, citySelector, areaSelector){
	var $province = $('#'+provinceSelector);
	var $city = $('#'+citySelector);
	var $area = $('#'+areaSelector);
	var innerMethod = function(){
		if($city.val() == ''){
			return;
		}
		$.ajax({
			url : DOMIN.MAIN+"/address/queryAllAreaByCity",
			type : "post",
			cache : false,
			async : true,
			dataType : "json",
			data: {
				cityId: $city.val()
			},
			traditional: true,
			success : function(data, textStatus){
				if(data.success){
					var obj = data.list;
					//处理返回结果
					$area.empty();
					$area.append('<option value="">选择市区</option>');
					for(var i=0;i<obj.length;i++){
						$area.append('<option value="'+obj[i].id+'">'+obj[i].regionname+'</option>');
					}
				}else{
					alert(data.message);
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				alert(errorThrown);
			}
		});
	}
	//$province.change(innerMethod);
	$city.change(innerMethod);
}
