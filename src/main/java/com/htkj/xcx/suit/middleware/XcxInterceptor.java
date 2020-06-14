package com.htkj.xcx.suit.middleware;

import com.google.gson.Gson;
import com.htkj.xcx.suit.response.R;
import com.htkj.xcx.suit.response.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.lang.reflect.Method;

@Component
public class XcxInterceptor implements HandlerInterceptor {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }
        HandlerMethod handlerMethod = (HandlerMethod) handler;
        Method method = handlerMethod.getMethod();
        boolean isPage = method.getReturnType().equals(String.class);
        boolean isJosn = method.isAnnotationPresent(ResponseBody.class);
        boolean isController = (!handlerMethod.getBeanType().isAnnotationPresent(RestController.class) && handlerMethod.getBeanType().isAnnotationPresent(Controller.class));
        boolean isView = isPage && !isJosn && isController;
        request.setAttribute("isView", isView);
        //登录检查
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("admin")) {
                    //已登录
                    return true;
                }
            }
        }
        //未登录
        if (isView) {
            response.sendRedirect("/admin/login");
        } else {
            response.setCharacterEncoding("UTF-8");
            response.setContentType("application/json;charset=utf-8");
            try (PrintWriter out = response.getWriter()) {
                Result r = R.exception("登录信息失效，请重新登录", null);
                out.println(new Gson().toJson(r));
            }
        }
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
