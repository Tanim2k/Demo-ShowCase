package com.task.project.repository;

import com.task.project.model.Task;
import com.task.project.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepo extends JpaRepository<Task,Long> {

     List<Task> findAllByUserEntity(UserEntity user);
    Task findByTaskId(Long id);
}
