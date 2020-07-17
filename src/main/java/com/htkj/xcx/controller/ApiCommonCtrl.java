package com.htkj.xcx.controller;

import com.htkj.xcx.model.em.PatchPlanStepEnum;
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

import java.util.HashMap;
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
        String sql = String.format("select t.* from t_department t order by t.id");
        List<Map<String, Object>> list = this.jdbc.queryForList(sql);
        return R.success("部门列表", list);
    }

    @RequestMapping("/getUser")
    @ResponseBody
    public Result getUser() {
        String sql = String.format("select t.*,t1.name department_name from t_user t left join t_department t1 on t.department_id=t1.id order by t.department_id,convert(t.name using gb2312),t.id");
        List<Map<String, Object>> list = this.jdbc.queryForList(sql);
        return R.success("员工列表", list);
    }

    @RequestMapping("/getPage")
    @ResponseBody
    public Result getPage() {
        Map map = new HashMap();
        String sql = String.format("select t.* from t_page_app t order by t.group_sort,t.sort");
        List<Map<String, Object>> list = this.jdbc.queryForList(sql);
        map.put("app", list);
        sql = String.format("select t.* from t_page_admin t order by t.group_sort,t.sort");
        list = this.jdbc.queryForList(sql);
        map.put("admin", list);
        return R.success("所有页面", map);
    }


}
