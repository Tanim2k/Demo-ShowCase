package com.task.project.repository;

import com.task.project.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<UserEntity,Long> {

    Optional<UserEntity> findByEmail(String email);

    UserEntity findByUserId(int u_id);
}
