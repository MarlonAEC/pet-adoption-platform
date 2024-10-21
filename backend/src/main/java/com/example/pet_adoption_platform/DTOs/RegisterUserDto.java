package com.example.pet_adoption_platform.DTOs;

import lombok.Getter;
import lombok.Setter;

public class RegisterUserDto {
    @Getter
    @Setter
    private String username;

    @Getter
    @Setter
    private  String password;

    @Getter
    @Setter
    private boolean enabled;

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String email;

    @Setter
    @Getter
    private String address;
}
