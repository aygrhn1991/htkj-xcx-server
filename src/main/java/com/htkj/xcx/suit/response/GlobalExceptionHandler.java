package com.htkj.xcx.suit.response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {

    Logger logger = LoggerFactory.getLogger(getClass());

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public Result exceptionHandler(Exception e) {
        logger.error(e.getMessage(), e);
        return R.exception("系统错误，请稍后再试",null);
    }

}
