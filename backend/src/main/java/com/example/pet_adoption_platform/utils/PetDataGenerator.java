package com.example.pet_adoption_platform.utils;

import com.example.pet_adoption_platform.entities.Pet;
import com.example.pet_adoption_platform.repositories.PetsRepository;
import com.github.javafaker.Faker;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.util.ArrayList;
import java.util.List;

@Component
public class PetDataGenerator {

    @Autowired
    private PetsRepository petsRepository;

    Faker faker = new Faker();

    @PostConstruct
    public void generateData() {
        List<Pet> pets = new ArrayList<>();

        for(int i = 0; i < 1000; i++) {
            Pet pet = new Pet();
            pet.setName(faker.name().firstName());
            pet.setAdopted(false);
            pet.setAge(faker.number().numberBetween(1, 20));
            pet.setDescription(faker.lorem().sentence());
            pet.setTemperament_how_active(faker.number().numberBetween(1, 5));
            pet.set_good_with_kids(faker.bool().bool());
            pet.set_good_with_cats(faker.bool().bool());
            pet.set_good_with_dogs(faker.bool().bool());
            pet.set_house_trained(faker.bool().bool());
            pet.set_declawed(faker.bool().bool());
            pet.set_spayed(faker.bool().bool());
            pet.set_vaccinated(faker.bool().bool());
            pet.set_wormed(faker.bool().bool());
            pet.setNeeds_experienced_owner(faker.bool().bool());
            pet.setValue((float) faker.number().randomDouble(2, 0, 1000));
            pet.setBreed(faker.dog().breed());
            pet.setSpecies(faker.animal().name());
            pet.setTemperament_how_active(faker.number().numberBetween(1, 5));
            pet.setTemperament_how_calmed(faker.number().numberBetween(1, 5));
            pet.setTemperament_how_social(faker.number().numberBetween(1, 5));
            pet.setTemperament_how_loud(faker.number().numberBetween(1, 5));
            pet.setTemperament_how_attention_seeking(faker.number().numberBetween(1, 5));
            pet.setAddress(faker.address().fullAddress());
            pet.setPostal_code(faker.address().zipCode());

            pets.add(pet);
        }
        petsRepository.saveAll(pets);
    }
}
