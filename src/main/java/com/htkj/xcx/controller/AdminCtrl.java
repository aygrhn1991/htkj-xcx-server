package com.htkj.xcx.controller;

import com.google.gson.Gson;
import com.htkj.xcx.model.Admin;
import com.htkj.xcx.suit.request.Search;
import com.htkj.xcx.suit.response.R;
import com.htkj.xcx.suit.response.Result;
import com.htkj.xcx.suit.util.UtilPage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/admin")
public class AdminCtrl {

    Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private JdbcTemplate jdbc;

    private Admin getAdminFromCookie() throws UnsupportedEncodingException {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String json = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("admin")) {
                json = URLDecoder.decode(cookie.getValue(), "UTF-8");
            }
        }
        return new Gson().fromJson(json, Admin.class);
    }

    @RequestMapping("/test/{message}")
    public Result test(@PathVariable String message) {
        return R.success("ok", message);
    }

    //region 登录
    @RequestMapping("/login")
    public String login() {
        return "admin/login";
    }

    @RequestMapping("/doLogin")
    @ResponseBody
    public Result doLogin(@RequestBody Admin model) {
        String sql = "select t.* from t_admin t where t.account=?";
        List<Map<String, Object>> list = this.jdbc.queryForList(sql, model.account);
        if (list.size() == 0) {
            return R.error("账号不存在或未授权");
        }
        if (!list.get(0).get("password").toString().equals(model.password)) {
            return R.error("密码错误");
        }
        return R.success("登录成功", list.get(0));
    }

    @RequestMapping("/getAdmin")
    @ResponseBody
    public Result getAdmin() throws UnsupportedEncodingException {
        String sql = "select t.*,t1.name user_name,t2.name department_name from t_admin t left join t_user t1 on t.account=t1.id left join t_department t2 on t1.department_id=t2.id where t.account=?";
        List<Map<String, Object>> list = this.jdbc.queryForList(sql, this.getAdminFromCookie().account);
        Map map = new HashMap();
        map.put("admin", list.get(0));
        return R.success("管理员信息与授权页面", map);
    }
    //endregion

    //region layout
    @RequestMapping("/index")
    public String index() {
        return "admin/index";
    }
    //endregion

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

    //region 加班
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
