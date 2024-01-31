package com.task.project.controller;

import com.task.project.constants.AppConstants;
import com.task.project.dto.ProfileDto;
import com.task.project.dto.UserDto;
import com.task.project.dto.UserLoginReqModel;
import com.task.project.exceptions.InvalidUser;
import com.task.project.model.UserEntity;
import com.task.project.service.UserService;
import com.task.project.utils.JWTUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v2/user")
public class UserController {
    private AuthenticationManager authenticationManager;

    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register (@RequestBody UserEntity user) {

            UserDto createdUser = userService.createUser(user);
            String accessToken = JWTUtils.generateToken(createdUser.getEmail());
            Map<String, Object> registerResponse = new HashMap<>();
            registerResponse.put("user", createdUser);
            registerResponse.put(AppConstants.HEADER_STRING, AppConstants.TOKEN_PREFIX + accessToken);
            return ResponseEntity.status(HttpStatus.CREATED).body(registerResponse);

    }

    @GetMapping("/profile")
    @PreAuthorize("hasAnyAuthority('ROLE_USER','ROLE_ADMIN')")
    public ResponseEntity<ProfileDto> viewProfile()
    {
        ProfileDto profileDto=userService.getProfile();
        return new ResponseEntity<>(profileDto,HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginReqModel userLoginReqModel, HttpServletResponse response) throws InvalidUser {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginReqModel.getEmail(), userLoginReqModel.getPassword()));
            if (authentication.isAuthenticated()) {
                UserDto userDto = userService.getUser(userLoginReqModel.getEmail());
                String accessToken = JWTUtils.generateToken(userDto.getEmail());

                Map<String, Object> loginResponse = new HashMap<>();
                loginResponse.put("role", userDto.getRole());
                loginResponse.put("email", userDto.getEmail());
                loginResponse.put("username",userDto.getUsername());
                loginResponse.put(AppConstants.HEADER_STRING, AppConstants.TOKEN_PREFIX + accessToken);
                return ResponseEntity.status(HttpStatus.OK).body(loginResponse);

            } else {
                return new ResponseEntity<>("Invalid email or password!", HttpStatus.UNAUTHORIZED);
            }
        } catch (InvalidUser e) {
            return new ResponseEntity<>("Username not found!", HttpStatus.UNAUTHORIZED);

        }
        catch (AuthenticationException a)
        {
            return new ResponseEntity<>("Invalid Credentials Please Check and Try Again",HttpStatus.UNAUTHORIZED);
        }
    }
}
