package com.task.project.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class UserDto {

    private int userId;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String address;
    private String role;

    public void setAccessToken(String s) {
    }
}
