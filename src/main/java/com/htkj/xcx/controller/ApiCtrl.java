package com.htkj.xcx.controller;

import com.htkj.xcx.model.AddJobRecord;
import com.htkj.xcx.suit.response.R;
import com.htkj.xcx.suit.response.Result;
import com.htkj.xcx.suit.util.UtilDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ApiCtrl {

    @Autowired
    private JdbcTemplate jdbc;

    @RequestMapping("/test/{message}")
    public Result test(@PathVariable String message) {
        return R.success("ok", message);
    }

    @RequestMapping("/getDepartment")
    @ResponseBody
    public Result getDepartment() {
        String sql = String.format("select * from t_department");
        List<Map<String, Object>> departmentList = this.jdbc.queryForList(sql);
        return R.success("部门列表", departmentList);
    }

    @RequestMapping("/addJob")
    public Result addJob(@RequestBody AddJobRecord model) {
        String sql = "select count(*) from t_add_job_record t where t.del=0 and t.userid=? and date_format(t.time,'%Y-%m-%d')=?";
        int count = this.jdbc.queryForObject(sql, Integer.class, model.userid, UtilDate.dateToYYYYMMDD(model.time));
        if (count >= 1) {
            return R.error("当天已申报加班");
        }
        sql = "insert into t_add_job_record(userid,time,meal,bus,del,systime) values(?,?,?,?,0,now())";
        count = this.jdbc.update(sql, model.userid, model.time, model.meal, model.bus);
        return R.success("申报加班成功", count);
    }

    @RequestMapping("/addJobRecord/{userid}")
    public Result addJobRecord(@PathVariable String userid) {
        String sql = "select * from t_add_job_record t where t.del=0 and t.userid=? order by t.time desc";
        List<Map<String, Object>> recordList = this.jdbc.queryForList(sql, userid);
        return R.success("加班申报记录", recordList);
    }
//    @RequestMapping("/addJobRecord/{userid}")
//    public Result addJobRecord(@PathVariable String userid) {
//        String sql = "select *,date_format(t.time,'%Y-%m-%d') as _time from t_add_job_record t where t.del=0 and t.userid=? order by t.time desc";
//        List<Map<String, Object>> recordList = this.jdbc.queryForList(sql, userid);
//        Set<String> set = new HashSet<String>();
//        for (Map map : recordList) {
//            set.add(map.get("_time").toString().substring(0, 7));
//        }
//        List<Map> result = new ArrayList<>();
//        for (String date : new ArrayList<>(set)) {
//            Map month = new HashMap();
//            month.put("date", date);
//            List<Map> monthRecord = new ArrayList<>();
//            for (Map map : recordList) {
//                if (map.get("_time").toString().startsWith(date)) {
//                    monthRecord.add(map);
//                }
//            }
//            month.put("data", monthRecord);
//            result.add(month);
//        }
//        return R.success("加班申报记录", result);
//    }
}
