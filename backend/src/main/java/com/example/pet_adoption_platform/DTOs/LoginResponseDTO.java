package com.example.pet_adoption_platform.DTOs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
public class LoginResponseDTO {
    private String jwtToken;
    private String refreshToken;

    private String username;
    private Collection<? extends GrantedAuthority> roles;

    public LoginResponseDTO(String username, Collection<? extends GrantedAuthority> roles, String jwtToken, String refreshToken) {
        this.username = username;
        this.roles = roles;
        this.jwtToken = jwtToken;
        this.refreshToken = refreshToken;
    }
}