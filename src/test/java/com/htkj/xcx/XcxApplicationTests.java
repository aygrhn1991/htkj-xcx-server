package com.htkj.xcx;

import com.htkj.xcx.suit.util.UtilDate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

@SpringBootTest
class XcxApplicationTests {
    @Autowired
    private JdbcTemplate jdbc;

    @Test
    void contextLoads() {
//        String sql="insert into t_add_job_record(id,userid,date,meal,meal_time,bus,bus_time,bus_to,systime) " +
//                "values(?,?,?,?,?,?,?,?,now())";
//        for(int i=200;i<500;i++){
//            String date=UtilDate.dateToYYYYMMDD( UtilDate.addDay(new Date(),i-200));
//            int count=this.jdbc.update(sql,i,12159,date,0,0,0,0,0);
//        }
        System.out.println("ok");
    }

}
