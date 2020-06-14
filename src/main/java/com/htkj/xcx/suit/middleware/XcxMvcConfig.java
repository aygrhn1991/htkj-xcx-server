package com.htkj.xcx.suit.middleware;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class XcxMvcConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new XcxInterceptor()).addPathPatterns("/**")
                .excludePathPatterns("/api/**", "/auth/**", "/error/**")
                .excludePathPatterns("/admin/login", "/admin/dologin")
                .excludePathPatterns("/css/**", "/js/**", "/img/**", "/plugin/**", "/favicon.ico");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("admin/index");
    }

}
