package com.task.project.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class UserLoginReqModel {
    private String email;
    private String password;
}
