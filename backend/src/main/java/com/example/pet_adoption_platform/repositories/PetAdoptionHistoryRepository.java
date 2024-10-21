package com.example.pet_adoption_platform.repositories;

import com.example.pet_adoption_platform.entities.PetAdoptionHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetAdoptionHistoryRepository extends JpaRepository<PetAdoptionHistory, String> {
}
