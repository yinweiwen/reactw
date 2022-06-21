package cn.yww.service.impl;

import cn.yww.model.JpaUser;
import cn.yww.repository.JpaUserRepository;
import cn.yww.service.JpaUserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class JpaUserServiceImpl implements JpaUserService {
    @Resource
    private JpaUserRepository jpaUserRepository;

    @Override
    public JpaUser insertUser(JpaUser user) {
        return jpaUserRepository.save(user);
    }

    @Override
    public void deleteUser(Integer id) {
        jpaUserRepository.deleteById(id);
    }

    @Override
    public JpaUser findUserById(Integer id) {
        return jpaUserRepository.findById(id).orElse(null);
    }

    /**
     * 同样调用save方法，根据id是否赋值区分 insert或update操作
     */
    @Override
    public JpaUser updateUser(JpaUser user) {
        return jpaUserRepository.save(user);
    }

    @Override
    public List<JpaUser> findAllUsers() {
        return jpaUserRepository.findAll();
    }
}
