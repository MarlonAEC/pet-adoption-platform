package com.example.pet_adoption_platform.repositories;

import com.example.pet_adoption_platform.entities.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Long> {
}