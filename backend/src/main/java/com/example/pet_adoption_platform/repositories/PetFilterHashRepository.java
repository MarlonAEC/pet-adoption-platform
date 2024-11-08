package com.example.pet_adoption_platform.repositories;

import com.example.pet_adoption_platform.entities.PetFilterHash;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import java.util.Optional;

public interface PetFilterHashRepository extends JpaRepository<PetFilterHash, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<PetFilterHash> findByHash(String hash);
}
