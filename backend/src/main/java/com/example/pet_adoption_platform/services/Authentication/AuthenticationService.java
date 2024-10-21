package com.example.pet_adoption_platform.services.Authentication;

import com.example.pet_adoption_platform.DTOs.RegisterUserDto;
import com.example.pet_adoption_platform.entities.Authority;
import com.example.pet_adoption_platform.entities.AuthorityId;
import com.example.pet_adoption_platform.entities.User;
import com.example.pet_adoption_platform.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager
    ) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public User signUp(RegisterUserDto input){
        User user = new User();

        user.setUsername(input.getUsername());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setName(input.getName());
        user.setAddress(input.getAddress());
        user.setEmail(input.getEmail());
        user.setEnabled(true);

        // Assign a default role to the user
        Authority authority = new Authority();
        AuthorityId authorityId = new AuthorityId();
        authorityId.setUsername(user.getUsername());
        authorityId.setAuthority("ROLE_USER");
        authority.setId(authorityId);
        authority.setUser(user);

        user.setAuthorities(Set.of(authority));

        return userRepository.save(user);
    }
}
