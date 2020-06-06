package com.htkj.xcx.model;

import java.util.Date;

public class User2 {
    public int id;
    public String openid;
    public String name;
    public int department_id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getDepartment_id() {
        return department_id;
    }

    public void setDepartment_id(int department_id) {
        this.department_id = department_id;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public int getDel() {
        return del;
    }

    public void setDel(int del) {
        this.del = del;
    }

    public Date getSystime() {
        return systime;
    }

    public void setSystime(Date systime) {
        this.systime = systime;
    }

    public int state;
    public int del;
    public Date systime;
}
