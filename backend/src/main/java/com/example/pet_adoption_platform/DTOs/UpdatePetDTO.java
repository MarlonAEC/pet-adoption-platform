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

    private Integer temperament_how_calmed;

    private Integer temperament_how_social;

    private Integer temperament_how_attention_seeking;

    private Integer temperament_how_active;

    private Integer temperament_how_loud;

    private boolean is_vaccinated;

    private boolean is_spayed;

    private boolean is_house_trained;

    private boolean is_wormed;

    private boolean is_good_with_kids;

    private boolean is_good_with_dogs;

    private boolean is_good_with_cats;

    private boolean is_declawed;

    private boolean needs_experienced_owner;

    private String postal_code;

    private String address;

}
