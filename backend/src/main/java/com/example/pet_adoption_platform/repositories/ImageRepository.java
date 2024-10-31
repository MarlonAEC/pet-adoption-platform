package com.example.pet_adoption_platform.repositories;

import com.example.pet_adoption_platform.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
}