package com.task.project.repository;

import com.task.project.model.UserEntity;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Map;
import java.util.Optional;

public interface UserRepo extends JpaRepository<UserEntity,Long> {

    Optional<UserEntity> findByEmail(String email);

    UserEntity findByUserId(int u_id);

   UserEntity findByUsername(String username);
}
