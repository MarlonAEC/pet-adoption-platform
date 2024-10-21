package com.example.pet_adoption_platform.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingsController {
    @GetMapping("/")
    public String sayHello(){
        return "Hello";
    }
}
