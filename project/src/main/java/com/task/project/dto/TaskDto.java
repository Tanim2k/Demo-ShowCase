package com.task.project.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskDto {


    private String title;
    private String description;
    private String status;
}
