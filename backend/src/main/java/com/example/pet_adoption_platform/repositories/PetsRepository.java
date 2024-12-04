package com.example.pet_adoption_platform.repositories;

import com.example.pet_adoption_platform.entities.Pet;
import com.example.pet_adoption_platform.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetsRepository  extends JpaRepository<Pet, String> {
    long countByAdoptedFalse();

    long countByAdoptedTrue();

    @Query("SELECT DISTINCT p.breed FROM Pet p")
    List<String> findAllUniqueBreeds();

    @Query("SELECT DISTINCT p.species FROM Pet p")
    List<String> findAllUniqueSpecies();
}
