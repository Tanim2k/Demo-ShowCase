package com.task.project.service;

import com.task.project.dto.TaskDto;
import com.task.project.dto.TestTaskDto;
import com.task.project.exceptions.ResourceNotFoundException;
import com.task.project.model.Task;

import java.util.List;

public interface TaskService {

  TestTaskDto createTask(Task task) throws ResourceNotFoundException;
  TaskDto updateTask(Task task,Long id) throws ResourceNotFoundException;

  void deleteTask(Long id) throws ResourceNotFoundException;

  TaskDto getTaskViaTaskId(Long id);
  List<TaskDto> getUserAllTasks();

  List<TaskDto> getAllTasksForAdmin();

  List<TaskDto> getUserAllTasksSortedViaDate();
  List<TaskDto> getUserAllTasksSortedViaTitle();

}
