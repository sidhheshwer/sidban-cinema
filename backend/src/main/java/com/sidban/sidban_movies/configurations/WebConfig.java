package com.sidban.sidban_movies.configurations;


import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
        /*    @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                .allowedOrigins(
                    "http://localhost:3000"
                )
                .allowedMethods("*")
                .allowCredentials(true);
        }*/


 @Override
public void addViewControllers(ViewControllerRegistry registry) {

    registry.addViewController("/{spring:[a-zA-Z0-9-]+}")
            .setViewName("forward:/index.html");

    registry.addViewController("/**/{spring:[a-zA-Z0-9-]+}")
            .setViewName("forward:/index.html");
}

      
    };




  
    