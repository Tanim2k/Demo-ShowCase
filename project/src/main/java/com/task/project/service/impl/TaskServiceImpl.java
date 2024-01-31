package com.task.project.service.impl;

import com.task.project.dto.TaskDto;
import com.task.project.exceptions.ResourceNotFoundException;
import com.task.project.exceptions.UnAuthorizedException;
import com.task.project.model.Task;
import com.task.project.model.UserEntity;
import com.task.project.repository.TaskRepo;
import com.task.project.repository.UserRepo;
import com.task.project.service.TaskService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private TaskRepo taskRepo;
    private ModelMapper modelMapper;
    private UserRepo userRepo;
    @Override
    public TaskDto createTask(Task task) throws ResourceNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user=userRepo.findByEmail(authentication.getName());

        if(user.isEmpty())
            throw new ResourceNotFoundException("Invalid Credentials");

        task.setUserEntity(user.get());
        taskRepo.save(task);
        return modelMapper.map(task,TaskDto.class);
    }

    @Override
    public TaskDto updateTask(Task task,Long id) throws ResourceNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user=userRepo.findByEmail(authentication.getName());

        if(user.isEmpty())
            throw new ResourceNotFoundException("Invalid Credentials");
        // Frontend will check whether the given input is null or not so i dont need to check it here...
        Task task1=taskRepo.findByTaskId(id);
        if(task1==null)
            throw new ResourceNotFoundException("Invalid Task Id");
        task1.setStatus(task.getStatus());
        task1.setDescription(task.getDescription());
        task1.setTitle(task.getTitle());
        taskRepo.save(task1);
        return modelMapper.map(task1,TaskDto.class);
    }

    @Override
    public void deleteTask(Long id) throws ResourceNotFoundException,UnAuthorizedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user=userRepo.findByEmail(authentication.getName());

        if(user.isEmpty())
            throw new ResourceNotFoundException("Invalid Credentials");
        Task task=taskRepo.findByTaskId(id);
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        // Extract role names from GrantedAuthority objects
        List<String> roles = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        if(task==null)
            throw new ResourceNotFoundException("Invalid Task Id");

        if(task.getUserEntity()!=user.get() && roles.contains("ROLE_USER"))
            throw new UnAuthorizedException("Please Select your task Id");

        taskRepo.deleteById(id);


    }

    @Override
    public TaskDto getTaskViaTaskId(Long id) {
        return null;
    }

    @Override
    public List<TaskDto> getUserAllTasks() {
        return null;
    }
}
