package com.task.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
    private String title;
    private String description;
    private String status;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
