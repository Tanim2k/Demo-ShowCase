package com.task.project.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;


import java.util.List;

@Entity
@Table(name = "user")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotBlank(message = "Username is required")
    @Size(min = 4, max = 50, message = "Username must be between 4 and 50 characters")
    private String username;

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must be less than or equal to 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must be less than or equal to 50 characters")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 100, message = "Password must be between 6 and 100 characters")
    private String password;

    @NotBlank(message = "Address is required")
    @Size(max = 255, message = "Address must be less than or equal to 255 characters")
    private String address;

    @NotBlank(message = "Role is required")
    @Size(max = 50, message = "Role must be less than or equal to 50 characters")
    private String role;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL)
    private List<Task> tasks;
}
