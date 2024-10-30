package com.example.pet_adoption_platform.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PetFilterDTO {

        private Float value;

        private String species;

        private String breed;

        private Integer age;

        private Integer temperament_how_calmed;

        private Integer temperament_how_social;

        private Integer temperament_how_attention_seeking;

        private Integer temperament_how_active;

        private Integer temperament_how_loud;

        private Boolean is_vaccinated;

        private Boolean is_spayed;

        private Boolean is_house_trained;

        private Boolean is_wormed;

        private Boolean is_good_with_kids;

        private Boolean is_good_with_dogs;

        private Boolean is_good_with_cats;

        private Boolean is_declawed;

        private Boolean needs_experienced_owner;

        private String postal_code;

        private String address;
}
