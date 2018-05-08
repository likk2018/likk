package com.yuny.jpademo.configure;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FreeMarkerConfig { 
	
//	/** 
//	 * 增加自定义视图变量和方法 
//	 * 
//	 * @return 
//	 */  
//	public CommandLineRunner customFreemarker(final FreeMarkerViewResolver resolver) {  
//	    return new CommandLineRunner() {  
//	        @Override  
//	        public void run(String... strings) throws Exception {  
//	   //增加视图  
//	            resolver.setViewClass(MyFreemarkerView.class);  
//	            //添加自定义解析器  
//	            Map map = resolver.getAttributesMap();  
//	            map.put("conver", new MyConver());  
//	        }  
//	    };  
//	}  

	@Autowired  
	public org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer configuration;
	
    @Autowired
    protected org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver viewResolver;  
    
    @PostConstruct  
    public void  setSharedVariable(){
//    	configuration1.setTemplateConfigurations(configuration);
//        configuration.setTemplateLoaderPath("classpath:/ftl");
//		Map<String, Object> map = new HashMap<String, Object>();
//		map.put("base", "spring");
//		configuration.setFreemarkerVariables(map);
//		configuration.setDefaultEncoding("UTF-8");
//		configuration.setTm
//        configuration.setSharedVariable("content_list", "11");  
//        configuration.setSharedVariable("article_list", new ArticleDirective());  
//        configuration.setSharedVariable("channel_list", new ChannelListDirective());</span>  
          
//        try {  
//        	resolver.setSetting("template_update_delay", "1");  
//            configuration.setSetting("default_encoding", "UTF-8");  
//        } catch (TemplateException e) {  
//            e.printStackTrace();  
//        }  
//        springResolver.setPrefix("/page/");//解析前缀后XXX路径下的jsp文件</span>  
//        springResolver.setSuffix(".jsp");  
//        springResolver.setOrder(1);
		viewResolver.setContentType("text/html; charset=UTF-8");
		viewResolver.setSuffix(".ftl"); //解析后缀为ftl的  
		viewResolver.setCache(false);//是否缓存模板</span>  
		viewResolver.setRequestContextAttribute("request"); //为模板调用时，调用request对象的变量名</span>  
		viewResolver.setOrder(0); 
		viewResolver.setViewClass(MyFreemarkerView.class);
		 Map map1 = viewResolver.getAttributesMap();  
         map1.put("conver", new MyConver());  
        //freeMarkerResolver.setViewClass(FreeMarkerView.class);
//		freeMarkerViewResolver.setViewNames("ftl/*");
//		freeMarkerViewResolver.setViewClass(FreeMarkerView.class);
    }  
}
