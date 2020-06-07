package com.htkj.xcx;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

@SpringBootTest
class XcxApplicationTests {
    @Autowired
    private JdbcTemplate jdbc;

    @Test
    void contextLoads() {
        String sql = "select t.*,t1.name department_name from t_user t left join t_department t1 on t.department_id=t1.id where t.del=0 and t.openid=?";
        List<Map<String, Object>> list = this.jdbc.queryForList(sql, "o2lQZ0WMG6z_VFuJUYwEyzITQGnA");
        System.out.println("ok");
    }

}
