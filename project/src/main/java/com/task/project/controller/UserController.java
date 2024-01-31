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
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
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
    public ResponseEntity<?> register(@RequestBody @Valid UserEntity user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // Validation errors occurred
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        }

        try {
            UserDto createdUser = userService.createUser(user);
            String accessToken = JWTUtils.generateToken(createdUser.getEmail());
            Map<String, Object> registerResponse = new HashMap<>();
            registerResponse.put("user", createdUser);
            registerResponse.put(AppConstants.HEADER_STRING, AppConstants.TOKEN_PREFIX + accessToken);
            return ResponseEntity.status(HttpStatus.CREATED).body(registerResponse);
        }catch (InvalidUser i) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Credentials");
        }
        catch (Exception e) {
            // Handle other exceptions (e.g., database errors) here
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during user registration");
        }
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
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginReqModel.getUsername(), userLoginReqModel.getPassword()));
            if (authentication.isAuthenticated()) {
                UserDto userDto = userService.getUser(userLoginReqModel.getUsername());
                String accessToken = JWTUtils.generateToken(userDto.getUsername());

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
