package com.task.project.repository;

import com.task.project.model.Task;
import com.task.project.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepo extends JpaRepository<Task,Long> {


    Task findByTaskId(Long id);
}
