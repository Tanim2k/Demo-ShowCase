package com.task.project;

import com.task.project.dto.ProfileDto;
import com.task.project.dto.TaskDto;
import com.task.project.dto.TestTaskDto;
import com.task.project.dto.UserDto;
import com.task.project.exceptions.EmailAlreadyExist;
import com.task.project.exceptions.ResourceNotFoundException;
import com.task.project.model.Task;
import com.task.project.model.UserEntity;
import com.task.project.repository.TaskRepo;
import com.task.project.repository.UserRepo;

import com.task.project.service.TaskService;
import com.task.project.service.impl.TaskServiceImpl;
import com.task.project.service.impl.UserServiceImpl;
import com.task.project.service.impl.UsernameGenaratorService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.modelmapper.ModelMapper;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class UserServiceImplTest {

    @Mock
    private UserRepo userRepo;

    @Mock
    private TaskRepo taskRepo;
    @Mock
    private SecurityContext securityContext;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private Authentication authentication;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Mock
    private UsernameGenaratorService usernameGeneratorService;

    @InjectMocks
    private UserServiceImpl userService;

    @InjectMocks
    private TaskServiceImpl taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void createUser() throws ResourceNotFoundException {
        // Arrange
        UserEntity newUser = new UserEntity();
        newUser.setFirstName("John");
        newUser.setLastName("Doe");
        newUser.setAddress("123 Main St");
        newUser.setRole("USER");
        newUser.setEmail("john.doe@example.com");
        newUser.setPassword("password");

        when(userRepo.findByEmail("john.doe@example.com")).thenReturn(Optional.empty());
        when(bCryptPasswordEncoder.encode("password")).thenReturn("hashedPassword");
        when(usernameGeneratorService.generateRandomUsername()).thenReturn("john_doe_username");
        when(modelMapper.map(any(), eq(UserDto.class))).thenAnswer(invocation -> {
            UserEntity source = invocation.getArgument(0);
            UserDto target = new UserDto();
            target.setFirstName(source.getFirstName());
            target.setLastName(source.getLastName());
            // Map other fields as needed
            return target;
        });

        // Act
        UserDto result = userService.createUser(newUser);

        // Assert
        assertNotNull(result);
        assertEquals("John", result.getFirstName());
        assertEquals("Doe", result.getLastName());
        // Add assertions for other fields as needed

        // Verify that findByEmail and save methods were called
        verify(userRepo, times(1)).findByEmail("john.doe@example.com");
        verify(userRepo, times(1)).save(any(UserEntity.class));
    }

    @Test
    void createUserWithEmailAlreadyExists() {
        // Arrange
        UserEntity existingUser = new UserEntity();
        existingUser.setEmail("john.doe@example.com");

        when(userRepo.findByEmail("john.doe@example.com")).thenReturn(Optional.of(existingUser));

        // Act and Assert
        assertThrows(EmailAlreadyExist.class, () -> userService.createUser(existingUser));

        // Verify that findByEmail method was called
        verify(userRepo, times(1)).findByEmail("john.doe@example.com");
        // Verify that save method was not called
        verify(userRepo, never()).save(any(UserEntity.class));
    }


    @Test
    void getProfile() {
        // Arrange
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        SecurityContextHolder.setContext(securityContext);

        UserEntity userEntity = new UserEntity();
        userEntity.setUserId(1L);
        userEntity.setUsername("john_doe");
        userEntity.setFirstName("John");
        userEntity.setLastName("Doe");

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("john_doe");
        when(userRepo.findByUsername("john_doe")).thenReturn(userEntity);
        when(modelMapper.map(userEntity, ProfileDto.class)).thenReturn(new ProfileDto("John", "Doe"));

        // Act
        ProfileDto result = userService.getProfile();

        // Assert
        assertEquals("John", result.getFirstName());
        assertEquals("Doe", result.getLastName());

        // Verify that findByUsername and map methods were called
        verify(userRepo, times(1)).findByUsername("john_doe");
        verify(modelMapper, times(1)).map(userEntity, ProfileDto.class);
    }



    @Test
    void testCreateTask() throws ResourceNotFoundException {
        MockitoAnnotations.initMocks(this);

        // Mock authentication context
        SecurityContextHolder.getContext().setAuthentication(authentication);
        when(authentication.getName()).thenReturn("testuser");

        // Mock user retrieval
        UserEntity userEntity = new UserEntity();
        userEntity.setUserId(1L);
        when(userRepo.findByUsername("testuser")).thenReturn(userEntity);

        // Mock task retrieval
        when(taskRepo.findAll()).thenReturn(Collections.emptyList());

        // Mock task creation
        Task task = new Task();
        task.setTitle("Test Task");
        task.setDescription("Test Description");
        when(modelMapper.map(any(), eq(Task.class))).thenReturn(task);

        // Mock task saving
        when(taskRepo.save(task)).thenReturn(task);

        // Mock task mapping for response
        when(modelMapper.map(task, TestTaskDto.class)).thenReturn(new TestTaskDto());

        // Call the method under test
        assertDoesNotThrow(() -> {
            TestTaskDto result = taskService.createTask(task);
            assertNotNull(result);
            // Add assertions based on your actual mapping logic
        });

        // Verify that the necessary methods were called
        verify(userRepo, times(1)).findByUsername("testuser");
        verify(taskRepo, times(1)).findAll();
        verify(taskRepo, times(1)).save(task);
        verify(modelMapper, times(1)).map(task, TestTaskDto.class);
    }



}