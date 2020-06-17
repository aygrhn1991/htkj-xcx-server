package com.htkj.xcx.controller;

import com.htkj.xcx.model.AddJobRecord;
import com.htkj.xcx.suit.response.*;
import com.htkj.xcx.suit.util.UtilDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ApiCtrl {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private JdbcTemplate jdbc;

    @RequestMapping("/test/{message}")
    public Result test(@PathVariable String message) {
        return R.success("ok", message);
    }

    //region 加班
    @RequestMapping("/addJob")
    public Result addJob(@RequestBody AddJobRecord model) {
        String sql = "select count(*) from t_add_job_record t where t.del=0 and t.userid=? and date_format(t.date,'%Y-%m-%d')=?";
        int count = this.jdbc.queryForObject(sql, Integer.class, model.userid, model.date);
        if (count >= 1) {
            return R.error("当天已申报加班");
        }
        sql = "insert into t_add_job_record(userid,date,meal,meal_time,bus,bus_time,del,systime) values(?,?,?,?,?,?,0,now())";
        count = this.jdbc.update(sql, model.userid, model.date, model.meal, model.meal_time, model.bus, model.bus_time);
        return R.success("申报加班成功", count);
    }

    @RequestMapping("/getAddJobRecordOfUser/{userid}")
    public Result getAddJobRecordOfUser(@PathVariable String userid) {
        String sql = "select * from t_add_job_record t where t.del=0 and t.userid=? order by t.date desc";
        List<Map<String, Object>> list = this.jdbc.queryForList(sql, userid);
        return R.success("加班申报记录", list);
    }
    //endregion

    //region 加班统计
    @RequestMapping("/getAddJobRecordOneDay/{date}")
    @ResponseBody
    public Result getAddJobRecordOneDay(@PathVariable String date) {
        String sql = "select * from t_add_job_record t where t.del=0 and date_format(t.date,'%Y-%m-%d')=?";
        List<Map<String, Object>> list = this.jdbc.queryForList(sql, date);
        return R.success("一天所有加班申报记录", list);
    }
    //endregion
}
