package com.example.pet_adoption_platform.repositories;

import com.example.pet_adoption_platform.entities.Pet;
import com.example.pet_adoption_platform.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetsRepository  extends JpaRepository<Pet, String> {
}
