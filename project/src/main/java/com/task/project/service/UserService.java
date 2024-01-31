package com.task.project.service;

import com.task.project.dto.ProfileDto;
import com.task.project.dto.UserDto;
import com.task.project.exceptions.EmailAlreadyExist;
import com.task.project.exceptions.InvalidUser;
import com.task.project.exceptions.ResourceNotFoundException;
import com.task.project.model.UserEntity;


public interface UserService {

      UserDto createUser(UserEntity userEntity) throws ResourceNotFoundException;

      UserDto getUser(String email) throws InvalidUser;
      ProfileDto getProfile();

      UserDto getById(Long id) throws ResourceNotFoundException;
}
