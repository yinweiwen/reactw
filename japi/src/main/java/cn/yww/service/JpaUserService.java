package cn.yww.service;

import cn.yww.model.JpaUser;

import java.util.List;

public interface JpaUserService {
    JpaUser insertUser(JpaUser user);

    void deleteUser(Integer id);

    JpaUser findUserById(Integer id);

    JpaUser updateUser(JpaUser user);

    List<JpaUser> findAllUsers();
}
