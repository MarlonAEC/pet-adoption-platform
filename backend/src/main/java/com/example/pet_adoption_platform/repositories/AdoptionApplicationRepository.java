package com.example.pet_adoption_platform.repositories;

import com.example.pet_adoption_platform.entities.AdoptionApplication;
import com.example.pet_adoption_platform.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdoptionApplicationRepository extends JpaRepository<AdoptionApplication, String> {
    public Optional<AdoptionApplication> findByUserAndPetId(User user, Long petId);
}
