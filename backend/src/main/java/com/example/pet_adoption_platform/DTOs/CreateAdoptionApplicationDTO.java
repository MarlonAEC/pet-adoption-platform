package com.example.pet_adoption_platform.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAdoptionApplicationDTO {
    private String userId;

    private Long petId;
}
