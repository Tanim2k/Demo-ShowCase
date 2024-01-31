package com.task.project.service.impl;

import com.fasterxml.jackson.databind.util.BeanUtil;
import com.task.project.dto.ProfileDto;
import com.task.project.dto.UserDto;
import com.task.project.exceptions.EmailAlreadyExist;
import com.task.project.exceptions.InvalidUser;
import com.task.project.exceptions.ResourceNotFoundException;

import com.task.project.model.UserEntity;
import com.task.project.repository.UserRepo;
import com.task.project.service.UserService;
import com.task.project.utils.JWTUtils;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;



import java.util.ArrayList;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService,UserDetailsService {

    private UserRepo userRepo;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private ModelMapper modelMapper;
    private UsernameGenaratorService usernameGenaratorService;
    @Override
    public UserDto createUser(UserEntity user) throws ResourceNotFoundException {
        if(userRepo.findByEmail(user.getEmail()).isPresent())
            throw new EmailAlreadyExist("Email Already Exists Please Try Another One");
        if(user==null)
        {
            throw new ResourceNotFoundException("UserEntity Details Cant be Null");
        }
        UserEntity user1=UserEntity.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .address(user.getAddress())
                .role(user.getRole())
                .email(user.getEmail())
                .password(bCryptPasswordEncoder.encode(user.getPassword()))
                .role("USER")
                .username(usernameGenaratorService.generateRandomUsername())
                .build();
        userRepo.save(user1);
        UserDto userDto=modelMapper.map(user1,UserDto.class);
        String accessToken = JWTUtils.generateToken(user.getEmail());
        userDto.setAccessToken(accessToken);
        return userDto;
    }

    @Override
    public UserDto getUser(String email) throws  InvalidUser {
       Optional<UserEntity> user=userRepo.findByEmail(email);
       if(user.isEmpty())
           throw new InvalidUser("Invalid Email Address");

        BeanUtils.copyProperties(user,new UserDto());

        return modelMapper.map(user.get(),UserDto.class);

    }

    @Override
    public ProfileDto getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user=userRepo.findByEmail(authentication.getName());
        return modelMapper.map(user,ProfileDto.class);
    }

    @Override
    public UserDto getById(Long id) throws ResourceNotFoundException {
        UserEntity user=userRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Invalid Id"));
        return modelMapper.map(user,UserDto.class);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userRepo.findByEmail(username).get();
        return new User(userEntity.getEmail(),userEntity.getPassword(),
                true,true,true,true,new ArrayList<>());
    }
}
