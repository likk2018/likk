package com.yuny.jpademo.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Date;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.yuny.jpademo.pojo.User;
import com.yuny.jpademo.repository.UserRepository;

import gui.ava.html.image.generator.HtmlImageGenerator;

@RestController
@RequestMapping(value="user")
public class UserController {
	@Autowired
	private UserRepository userRepository;
	
	//测试插入新的数据
	@PostMapping(path="/add")
	public @ResponseBody String addNewUser (@RequestParam(required=true) String name
			, @RequestParam(defaultValue="男") String sex,@RequestParam(required=true) String phone) {
		   ExampleMatcher matcher = ExampleMatcher.matching() //构建对象
//           .withMatcher("name", GenericPropertyMatchers.) //姓名采用“开始匹配”的方式查询
           .withIgnorePaths("focus");  //忽略属性：是否关注。因为是基本类型，需要忽略掉
		
		User n = new User();
		n.setPhone(phone);
		Example<User> ex = Example.of(n, matcher);
		if(userRepository.count(ex)>0){
			return "exists";
		}
		n.setName(name);
		ex = Example.of(n, matcher);
		if(userRepository.count(ex)>0){
			return "exists";
		}
		n.setSex(sex);
		n.setCreateTime(new Date());
		n.setUpdateTime(new Date());
		userRepository.save(n);
		return "ok";
	}
	
	
	//测试获取全部的数据
	@GetMapping(path="/all")
	public Iterable<User> getAllUsers(HttpServletRequest req) {
		System.out.println(req.getParameter("n"));
		System.out.println(req.getRequestURI());
		return userRepository.findAll();
	}
	
	public static void main(String[] args) throws InterruptedException {
		 HtmlImageGenerator imageGenerator = new HtmlImageGenerator();
		  imageGenerator.loadUrl("http://wx.taoxiaoguai.cn");
		  imageGenerator.getBufferedImage();
		  Thread.sleep(8000);
		  imageGenerator.saveAsImage(new File("d://1.png"));
	}
	
	//测试获取全部的数据
	@GetMapping(path="/html2Img")
	public void html2Img(HttpServletRequest req,@RequestParam String url,HttpServletResponse resp) throws UnsupportedEncodingException {
		  HtmlImageGenerator imageGenerator = new HtmlImageGenerator();
//		  url = url.split("\\?")[0]+"?"+URLEncoder.encode(url.split("\\?")[1],"utf-8");
		  imageGenerator.loadUrl("http://wx.taoxiaoguai.cn");
		  try {
			              
			              BufferedImage  bf = imageGenerator.getBufferedImage();
			              Thread.sleep(8000);
			              bf = imageGenerator.getBufferedImage();
			              ImageIO.write(bf, "png",  resp.getOutputStream());
			              resp.getOutputStream().flush();
			              resp.getOutputStream().close();
			       } catch (Exception e) {
			               e.printStackTrace();
			           }
	}
}
