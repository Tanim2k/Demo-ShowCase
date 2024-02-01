package com.task.project.dto;

import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskDto {

    private Long taskId;
    private String title;
    private String description;
    private String status;
    private LocalDate createdDate;
}
