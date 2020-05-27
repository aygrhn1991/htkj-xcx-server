package com.htkj.xcx;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Value;
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

    @RequestMapping("/code/{code}")
    @ResponseBody
    public Map code(@PathVariable String code) {
        String url = String.format("https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code", this.appid, this.appsecret, code);
        String result = new RestTemplate().getForObject(url, String.class);
        Map map = new Gson().fromJson(result, Map.class);
        return map;
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
