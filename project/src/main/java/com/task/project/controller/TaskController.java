package com.task.project.controller;

import com.task.project.dto.TaskDto;
import com.task.project.model.Task;
import com.task.project.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/v2/task")
@AllArgsConstructor
public class TaskController {

    private TaskService taskService;

    @PostMapping("/create")
    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<TaskDto> createTask(@RequestBody Task task)
    {
        TaskDto taskDto=taskService.createTask(task);
        return new ResponseEntity<>(taskDto, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<TaskDto> updateTask(@RequestBody Task task,@PathVariable Long id)
    {
        TaskDto taskDto=taskService.updateTask(task,id);
        return new ResponseEntity<>(taskDto,HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<?> deleteTask(@PathVariable Long id)
    {
        taskService.deleteTask(id);
        return new ResponseEntity<>("Deleted Successfully",HttpStatus.OK);
    }

    @GetMapping("/getTask/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<TaskDto> getTaskViaTaskId(@PathVariable Long id)
    {
        TaskDto taskDto=taskService.getTaskViaTaskId(id);
        return new ResponseEntity<>(taskDto,HttpStatus.OK);
    }

    @GetMapping("/getAllTasks")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<TaskDto>> getAllTasksForAdmin()
    {
       /* Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        System.out.println("User Authorities: " + authorities);*/
        List<TaskDto>list=taskService.getAllTasksForAdmin();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/getAllTaskForUserAndAdmin")
    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<List<TaskDto>> getAllTasksForUserAndAdmin()
    {
        List<TaskDto>list=taskService.getUserAllTasks();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }


}
