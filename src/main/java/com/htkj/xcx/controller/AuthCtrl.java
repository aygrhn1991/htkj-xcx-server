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
        String sql = "select t.*,t1.name department_name from t_user t left join t_department t1 on t.department_id=t1.id where t.del=0 and t.openid=?";
        List<Map<String, Object>> list = this.jdbc.queryForList(sql, openid);
        Map data = new HashMap();
        data.put("openid", openid);
        if (list.size() == 0) {
            data.put("state", UserState.unregister.ordinal());
            return R.success("用户不存在", data);
        } else if (Integer.parseInt(list.get(0).get("state").toString()) == UserState.unauthorized.ordinal()) {
            data.put("state", UserState.unauthorized.ordinal());
            return R.success("用户尚未通过认证", data);
        } else if (Integer.parseInt(list.get(0).get("state").toString()) == UserState.disabled.ordinal()) {
            data.put("state", UserState.disabled.ordinal());
            return R.success("用户账号已被禁用", data);
        } else {
            data.put("state", UserState.active.ordinal());
            data.put("data", list.get(0));
            return R.success("用户存在且账号可用", data);
        }
    }

    @RequestMapping("/register")
    public Result register(@RequestBody User model) {
        String sql = "insert into t_user(id,openid,name,department_id,state,del,systime) values(?,?,?,?,?,0,now())";
        int count = this.jdbc.update(sql, model.id, model.openid, model.name, model.department_id, UserState.unauthorized.ordinal());
        return R.success("用户认证信息已提交，请等待审核", model);
    }


}
