package com.example.pet_adoption_platform.controller;

import com.example.pet_adoption_platform.DTOs.*;
import com.example.pet_adoption_platform.entities.User;
import com.example.pet_adoption_platform.jwt.JwtUtils;
import com.example.pet_adoption_platform.repositories.UserRepository;
import com.example.pet_adoption_platform.services.Authentication.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDTO loginRequest) {
        Authentication authentication;
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch (AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad credentials");
            map.put("status", false);
            return new ResponseEntity<Object>(map, HttpStatus.UNAUTHORIZED);
        }

        if(userRepository.existsById(loginRequest.getUsername())) {
            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
            String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);
            String refreshToken = jwtUtils.generateRefreshTokenFromUsername(userDetails);

            LoginResponseDTO response = new LoginResponseDTO(userDetails.getUsername(), userDetails.getAuthorities(), jwtToken, refreshToken);

            return ResponseEntity.ok(response);
        }

        Map<String, Object> map = new HashMap<>();
        map.put("message", "Invalid credentials");
        map.put("status", false);
        return new ResponseEntity<Object>(map, HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> registerNewUser(@RequestBody RegisterUserDto input){
        if(userRepository.existsById(input.getUsername())){
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Username already exists");
            map.put("status", false);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(map);
        }

        if(userRepository.existsByEmail(input.getEmail())){
            Map<String, Object> map = new HashMap<>();
            map.put("message", "There is an user already registered with email: " + input.getEmail());
            map.put("status", false);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(map);
        }

        User registeredUser = authenticationService.signUp(input);

        // Authenticating the newly registered user
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(registeredUser.getUsername(), input.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = userDetailsService.loadUserByUsername(input.getUsername());
        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);
        String refreshToken = jwtUtils.generateRefreshTokenFromUsername(userDetails);

        LoginResponseDTO response = new LoginResponseDTO(userDetails.getUsername(), userDetails.getAuthorities(), jwtToken, refreshToken);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/refresh-token")
    public Optional<LoginResponseDTO> refreshToken(@RequestBody TokenRefreshDTO request){
        String requestRefreshToken = request.getRefreshToken();

        if(jwtUtils.validateRefreshToken(requestRefreshToken)){
            String username = jwtUtils.getUserNameFromRefreshToken(requestRefreshToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            String token = jwtUtils.generateTokenFromUsername(userDetails);
            String newRefreshToken = jwtUtils.generateRefreshTokenFromUsername(userDetails);

            return Optional.of(new LoginResponseDTO(userDetails.getUsername(), userDetails.getAuthorities(), token, newRefreshToken));
        }
        return Optional.empty();
    }
}
