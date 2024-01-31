package com.task.project.repository;

import com.task.project.model.Task;
import com.task.project.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepo extends JpaRepository<Task,Long> {

     List<Task> findAllByUserEntity(UserEntity user);
    List<Task> findAllByUserEntityOrderByCreatedDateDesc(UserEntity userEntity);
    List<Task> findAllByUserEntityOrderByTitleAsc(UserEntity userEntity);
    Task findByTaskId(Long id);
}
