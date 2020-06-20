package com.htkj.xcx.controller;

import com.htkj.xcx.model.AddJobRecord;
import com.htkj.xcx.suit.request.Search;
import com.htkj.xcx.suit.response.R;
import com.htkj.xcx.suit.response.Result;
import com.htkj.xcx.suit.util.UtilDate;
import com.htkj.xcx.suit.util.UtilPage;
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

    //region 员工(admin)
    @RequestMapping("/getUserList")
    @ResponseBody
    public Result getUserList(@RequestBody Search model) {
        String sql = "select t.*,t1.name department_name from t_user t left join t_department t1 on t.department_id=t1.id order by t.state,t.id limit " + UtilPage.getPage(model);
        List<Map<String, Object>> list = this.jdbc.queryForList(sql);
        sql = "select count(*) from t_user";
        int count = this.jdbc.queryForObject(sql, Integer.class);
        return R.success("员工列表", count, list);
    }

    @RequestMapping("/deleteUser/{userid}")
    @ResponseBody
    public Result deleteUser(@PathVariable int userid) {
        String sql = "delete from t_user where id=?";
        int count = this.jdbc.update(sql, userid);
        return R.success("员工申请已拒绝");
    }

    @RequestMapping("/updateUserState/{userid}/{state}")
    @ResponseBody
    public Result updateUserState(@PathVariable int userid, @PathVariable int state) {
        String sql = "update t_user t set t.state=? where t.id=?";
        int count = this.jdbc.update(sql, state, userid);
        return R.success("员工状态更新成功");
    }
    //endregion

    //region 加班(user)
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

    //region 加班(admin)
    @RequestMapping("/getAddJobRecord")
    @ResponseBody
    public Result getAddJobRecord(@RequestBody Search model) {
        String sql = "select t.*,t1.name user_name,t2.name department_name from t_add_job_record t left join t_user t1 on t.userid=t1.id left join t_department t2 on t1.department_id=t2.id where t.del=0 and date_format(t.date,'%Y-%m-%d')=? order by t.systime limit " + UtilPage.getPage(model);
        List<Map<String, Object>> list = this.jdbc.queryForList(sql, model.string1);
        sql = "select count(*) from t_add_job_record t where t.del=0 and date_format(t.date,'%Y-%m-%d')=?";
        int count = this.jdbc.queryForObject(sql, Integer.class, model.string1);
        return R.success("加班申报记录(分页)", count, list);
    }

    @RequestMapping("/getAddJobRecordAllDate")
    @ResponseBody
    public Result getAddJobRecordAllDate() {
        String sql = "select t.date from t_add_job_record t where t.del=0 group by t.date";
        List<Map<String, Object>> list = this.jdbc.queryForList(sql);
        return R.success("所有有加班记录的日期", list);
    }

    @RequestMapping("/getAddJobRecordOneDay/{date}")
    @ResponseBody
    public Result getAddJobRecordOneDay(@PathVariable String date) {
        String sql = "select * from t_add_job_record t where t.del=0 and date_format(t.date,'%Y-%m-%d')=?";
        List<Map<String, Object>> list = this.jdbc.queryForList(sql, date);
        return R.success("一天所有加班申报记录", list);
    }
    //endregion
}
