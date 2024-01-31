package com.task.project.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ProfileDto {

    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String role;


    public ProfileDto(String john, String doe) {
    }
}
