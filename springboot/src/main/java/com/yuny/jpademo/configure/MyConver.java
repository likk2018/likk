package com.yuny.jpademo.configure;

import java.util.List;

import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModelException;  
  
/** 
 * Created by shiqm on 2017-05-03. 
 */  
public class MyConver implements TemplateMethodModelEx {  
    @Override  
    public Object exec(List arguments) throws TemplateModelException {  
        if (null != arguments && 2 == arguments.size()) {  
            String key = String.valueOf(arguments.get(0));  
            try {  
                switch (key) {
                    case "source":  
                        return arguments.get(1);
                    case "userType":
                    	return arguments.get(1);
                    case "logModule":
                    	return arguments.get(1);
                    case "logAction":
                    	return arguments.get(1);
                    default:  
                        return null;  
                }  
            }catch (Exception e){  
                return null;  
            }  
        } else {  
            return null;  
        }  
    }  
}  