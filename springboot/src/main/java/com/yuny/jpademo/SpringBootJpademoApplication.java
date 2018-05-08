package com.yuny.jpademo;

import java.util.Map;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

import com.yuny.jpademo.configure.MyConver;
import com.yuny.jpademo.configure.MyFreemarkerView;

@SpringBootApplication
public class SpringBootJpademoApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(SpringBootJpademoApplication.class, args);
	}
}
