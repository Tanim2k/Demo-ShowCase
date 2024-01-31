package com.task.project.model;

import jakarta.persistence.*;
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
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String address;
    private String role;
    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL)
    private List<Task> tasks;
}
