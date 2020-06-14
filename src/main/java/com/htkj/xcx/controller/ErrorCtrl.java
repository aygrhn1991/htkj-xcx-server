package com.htkj.xcx.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/error")
public class ErrorCtrl {

    Logger logger = LoggerFactory.getLogger(getClass());

    @RequestMapping("/error")
    public String error() {
        return "error/error";
    }

}
