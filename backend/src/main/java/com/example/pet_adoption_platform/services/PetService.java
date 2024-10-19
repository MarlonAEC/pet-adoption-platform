package com.example.pet_adoption_platform.services;

import com.example.pet_adoption_platform.entities.Pet;
import com.example.pet_adoption_platform.repositories.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {
    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public Pet createPet(Pet pet) {
        return petRepository.save(pet);
    }
}
