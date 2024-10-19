package com.example.pet_adoption_platform.repositories;

import com.example.pet_adoption_platform.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}