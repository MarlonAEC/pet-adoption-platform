package com.example.pet_adoption_platform.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePetDTO {
    private String name;

    private String breed;

    private Integer age;

    private String species;

    private String description;
}
