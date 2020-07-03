package com.htkj.xcx;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
class XcxApplicationTests {
    @Autowired
    private JdbcTemplate jdbc;

    @Test
    void contextLoads() {
        System.out.println("ok");
    }

}
