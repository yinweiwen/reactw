package cn.yww.repository;

import cn.yww.model.JpaUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
JPA 对 DAO层的封装
 */
public interface JpaUserRepository extends JpaRepository<JpaUser, Integer> {
}
