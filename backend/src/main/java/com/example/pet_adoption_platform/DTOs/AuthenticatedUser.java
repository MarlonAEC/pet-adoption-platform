package com.example.pet_adoption_platform.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticatedUser {
    private String username;
    private String name;
    private String email;

    public AuthenticatedUser(String username, String name, String email) {
        this.username = username;
        this.name = name;
        this.email = email;
    }
}
