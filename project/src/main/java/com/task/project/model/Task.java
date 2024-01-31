package com.task.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.task.project.model.UserEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;


@Entity
@Table(name = "tasks")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    @NotBlank(message = "Title is required")
    @Size(max = 100, message = "Title must be less than or equal to 100 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(max = 255, message = "Description must be less than or equal to 255 characters")
    private String description;

    @NotBlank(message = "Status is required")
    @Size(max = 50, message = "Status must be less than or equal to 50 characters")
    private String status;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;
}
