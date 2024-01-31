package com.task.project.dto;

import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskDto {

    private String title;
    private String description;
    private String status;
    private LocalDate createdDate;
}
