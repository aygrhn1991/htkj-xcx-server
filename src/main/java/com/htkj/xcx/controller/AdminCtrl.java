package com.htkj.xcx.controller;

import com.google.gson.Gson;
import com.htkj.xcx.suit.request.Search;
import com.htkj.xcx.suit.response.R;
import com.htkj.xcx.suit.response.Result;
import com.htkj.xcx.suit.util.UtilPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminCtrl {

    @Autowired
    private JdbcTemplate jdbc;

    @RequestMapping("/login")
    public String login() {
        return "admin/login";
    }

    @RequestMapping("/dologin")
    @ResponseBody
    public Map dologin(@RequestBody Search model) {
        Map m = new HashMap();
        m.put("data", model.string1);
        return m;
    }

    @RequestMapping("/index")
    public String index() {
        return "admin/index";
    }

    @RequestMapping("/user")
    public String user() {
        return "admin/user";
    }

    @RequestMapping("/addjobrecord")
    public String addjobrecord() {
        return "admin/addjobrecord";
    }

    @RequestMapping("/getUserList")
    @ResponseBody
    public Result getUserList(@RequestBody Search model) {
        String sql1 = "select *,t1.name department_name from t_user t left join t_department t1 on t.department_id=t1.id order by t.state,t.name limit " + UtilPage.getPage(model);
        String sql2 = "select count(*) from t_user";
        List<Map<String, Object>> userList = this.jdbc.queryForList(sql1);
        int count = this.jdbc.queryForObject(sql2, Integer.class);
        return R.success("用户列表", count, userList);
    }

    @RequestMapping("/deleteUser/{userid}")
    @ResponseBody
    public Result deleteUser(@PathVariable int userid) {
        String sql = "delete from t_user where id=?";
        int count = this.jdbc.update(sql, userid);
        return R.success("用户申请已拒绝");
    }

    @RequestMapping("/updateUserState/{userid}/{state}")
    @ResponseBody
    public Result updateUserState(@PathVariable int userid, @PathVariable int state) {
        String sql = "update t_user t set t.state=? where t.id=?";
        int count = this.jdbc.update(sql, state, userid);
        return R.success("用户状态更新成功");
    }

    @RequestMapping("/getAddJobRecordList")
    @ResponseBody
    public Result getAddJobRecordList(@RequestBody Search model) {
        String sql1 = "select *,t1.name user_name,t2.name department_name from t_add_job_record t left join t_user t1 on t.userid=t1.id left join t_department t2 on t1.department_id=t2.id where t.del=0 and date_format(t.time,'%Y-%m-%d')=? order by t.systime desc limit " + UtilPage.getPage(model);
        String sql2 = "select count(*) from t_add_job_record t where t.del=0 and date_format(t.time,'%Y-%m-%d')=?";
        List<Map<String, Object>> recordList = this.jdbc.queryForList(sql1, model.string1);
        int count = this.jdbc.queryForObject(sql2, Integer.class, model.string1);
        return R.success("加班申报记录", count, recordList);
    }
}
