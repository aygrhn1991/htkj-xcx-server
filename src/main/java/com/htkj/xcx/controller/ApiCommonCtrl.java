package com.htkj.xcx.controller;

import com.htkj.xcx.suit.response.R;
import com.htkj.xcx.suit.response.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/common")
public class ApiCommonCtrl {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private JdbcTemplate jdbc;

    @RequestMapping("/getDepartment")
    @ResponseBody
    public Result getDepartment() {
        String sql = String.format("select * from t_department");
        List<Map<String, Object>> list = this.jdbc.queryForList(sql);
        return R.success("部门列表", list);
    }
}
