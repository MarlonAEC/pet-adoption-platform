package com.example.pet_adoption_platform.repositories;

import com.example.pet_adoption_platform.entities.PetFilterHash;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PetFilterHashRepository extends JpaRepository<PetFilterHash, Long> {
    Optional<PetFilterHash> findByHash(String hash);
}
