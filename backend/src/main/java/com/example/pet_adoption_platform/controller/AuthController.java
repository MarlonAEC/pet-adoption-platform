package com.example.pet_adoption_platform.controller;

import com.example.pet_adoption_platform.entities.User;
import com.example.pet_adoption_platform.jwt.JwtUtils;
import com.example.pet_adoption_platform.DTOs.LoginRequestDTO;
import com.example.pet_adoption_platform.DTOs.LoginResponseDTO;
import com.example.pet_adoption_platform.repositories.UserRepository;
import com.example.pet_adoption_platform.services.Authentication.AuthenticationService;
import com.example.pet_adoption_platform.DTOs.RegisterUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
            return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        LoginResponseDTO response = new LoginResponseDTO(userDetails.getUsername(), roles, jwtToken);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> registerNewUser(@RequestBody RegisterUserDto input){
        if(userRepository.existsById(input.getUsername())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        User registeredUser = authenticationService.signUp(input);

        // Authenticating the newly registered user
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(registeredUser.getUsername(), input.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        LoginResponseDTO response = new LoginResponseDTO(userDetails.getUsername(), roles, jwtToken);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
