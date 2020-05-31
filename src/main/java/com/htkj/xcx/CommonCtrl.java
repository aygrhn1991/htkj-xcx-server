package com.htkj.xcx;

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
@RequestMapping("/common")
public class CommonCtrl {

    @Autowired
    JdbcTemplate jdbc;

    @RequestMapping("/getDepartment")
    @ResponseBody
    public List<Map<String, Object>> getDepartment() {
        String sql = String.format("select * from t_department");
        List<Map<String, Object>> list = this.jdbc.queryForList(sql);
        return list;
    }
}
