package com.htkj.xcx;

import com.google.gson.Gson;
import com.htkj.xcx.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ApiCtrl {

    @Value("${wx.appid}")
    private String appid;
    @Value("${wx.appsecret}")
    private String appsecret;

    @Autowired
    JdbcTemplate jdbc;

    @RequestMapping("/checkUser/{code}")
    @ResponseBody
    public Map checkUser(@PathVariable String code) {
        String url = String.format("https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code", this.appid, this.appsecret, code);
        String result = new RestTemplate().getForObject(url, String.class);
        Map map = new Gson().fromJson(result, Map.class);
        String openid = map.get("openid").toString();
        String sql = "select count(*) from t_user t where t.openid=?";
        int count = this.jdbc.queryForObject(sql, Integer.class, openid);
        map = new HashMap();
        map.put("openid", openid);
        map.put("user", count == 1);
        return map;
    }

    @RequestMapping("/addUser")
    @ResponseBody
    public int addUser(@RequestBody User model) {
        String sql = "insert into t_user(id,openid,name,department_id,state,systime) values(?,?,?,?,null,now())";
        int count = this.jdbc.update(sql, model.id, model.openid, model.name, model.department_id);
        return count;
    }

    @RequestMapping("/addJob/{openid}")
    @ResponseBody
    public Map addJob(@PathVariable String openid) {
        Map map = new HashMap();
        map.put("result", "ok");
        map.put("openid", openid);
        return map;
    }
}
