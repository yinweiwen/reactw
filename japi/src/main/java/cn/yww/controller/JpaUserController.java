package cn.yww.controller;

import cn.yww.model.JpaUser;
import cn.yww.service.JpaUserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * POST（CREATE）：在服务器新建一个资源。
 * PUT（UPDATE）：在服务器更新完整资源（客户端提供改变后的完整资源）。
 * PATCH（UPDATE）：在服务器更新部分资源（客户端提供改变的属性）。
 */
@RestController
@RequestMapping("/user")
public class JpaUserController {
    @Resource
    private JpaUserService jpaUserService;

    @PostMapping("")
    public JpaUser addUser(@RequestBody JpaUser user) {
        return jpaUserService.insertUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") int id) {
        jpaUserService.deleteUser(id);
    }

    @PutMapping("")
    public JpaUser updateUser(@RequestBody JpaUser user) {
        return jpaUserService.updateUser(user);
    }

    @GetMapping("")
    public List<JpaUser> findAll() {
        return jpaUserService.findAllUsers();
    }

    @GetMapping("/{id}")
    public JpaUser findById(@PathVariable("id") int id) {
        return jpaUserService.findUserById(id);
    }

    @PostMapping("/login")
    public String login(HttpSession session,@RequestBody JpaUser user){

    }
}
