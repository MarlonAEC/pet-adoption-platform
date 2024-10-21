package com.example.pet_adoption_platform.repositories;

import com.example.pet_adoption_platform.entities.AdoptionApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdoptionApplicationRepository extends JpaRepository<AdoptionApplication, String> {
}
