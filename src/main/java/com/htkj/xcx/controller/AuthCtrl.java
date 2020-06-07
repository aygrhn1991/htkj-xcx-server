package com.htkj.xcx.controller;

import com.google.gson.Gson;
import com.htkj.xcx.model.*;
import com.htkj.xcx.suit.response.R;
import com.htkj.xcx.suit.response.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthCtrl {

    @Value("${wx.appid}")
    private String appid;
    @Value("${wx.appsecret}")
    private String appsecret;

    @Autowired
    private JdbcTemplate jdbc;

    @RequestMapping("/login/{code}")
    public Result login(@PathVariable String code) {
        String url = String.format("https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code", this.appid, this.appsecret, code);
        String result = new RestTemplate().getForObject(url, String.class);
        Map resultMap = new Gson().fromJson(result, Map.class);
        String openid = resultMap.get("openid").toString();
        String sql = "select t.*,t1.name department_name from t_user t left join t_department t1 on t.department_id=t1.id where t.openid=?";
        List<Map<String, Object>> list = this.jdbc.queryForList(sql, openid);
        if (list.size() == 0) {
            return R.error("用户不存在", openid);
        } else if (Integer.parseInt(list.get(0).get("state").toString()) == UserState.unauthorized.ordinal()) {
            return R.error("用户信息审核中", UserState.unauthorized.ordinal());
        } else if (Integer.parseInt(list.get(0).get("state").toString()) == UserState.disabled.ordinal()) {
            return R.error("用户账号已禁用", UserState.disabled.ordinal());
        } else {
            return R.success("用户存在且正常", list.get(0));
        }
    }

    @RequestMapping("/register")
    public Result register(@RequestBody User model) {
        String sql = "select * from t_user t where t.id=?";
        List<Map<String, Object>> list = this.jdbc.queryForList(sql, model.id);
        if (list.size() > 0) {
            return R.error("该工号已被注册");
        }
        sql = "insert into t_user(id,openid,name,department_id,state,systime) values(?,?,?,?,?,now())";
        int count = this.jdbc.update(sql, model.id, model.openid, model.name, model.department_id, UserState.unauthorized.ordinal());
        return R.success("用户认证已提交", model);
    }


}
