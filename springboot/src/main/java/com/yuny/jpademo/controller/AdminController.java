package com.yuny.jpademo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value="admin")
public class AdminController {
	
	//测试插入新的数据
	@GetMapping(path="/index")
	public String index () {
		return "index";
	}
	
	
	
}
