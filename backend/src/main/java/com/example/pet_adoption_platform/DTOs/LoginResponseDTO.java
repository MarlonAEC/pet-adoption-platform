package com.example.pet_adoption_platform.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LoginResponseDTO {
    private String jwtToken;

    private String username;
    private List<String> roles;

    public LoginResponseDTO(String username, List<String> roles, String jwtToken) {
        this.username = username;
        this.roles = roles;
        this.jwtToken = jwtToken;
    }
}