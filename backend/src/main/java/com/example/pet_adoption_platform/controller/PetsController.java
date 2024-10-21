package com.example.pet_adoption_platform.controller;

import com.example.pet_adoption_platform.DTOs.UpdatePetDTO;
import com.example.pet_adoption_platform.entities.Pet;
import com.example.pet_adoption_platform.repositories.PetsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/pets")
public class PetsController {

    @Autowired
    private PetsRepository petRepository;

    @GetMapping
    public ResponseEntity<Page<Pet>> getAllPets(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        Pageable pageable = (Pageable) PageRequest.of(page, size);
        Page<Pet> pets = petRepository.findAll(pageable);

        return ResponseEntity.ok(pets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPetById(@PathVariable Long id) {
        Optional<Pet> pet = petRepository.findById(String.valueOf(id));
        if (pet.isPresent()) {
            return ResponseEntity.ok(pet.get());
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Pet with ID " + id + " not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createPet(@RequestBody Pet pet) {
        if(pet.getName() == null || pet.getBreed() == null || pet.getSpecies() == null || pet.getAge() == null){
            Map<String, String> res = new HashMap<>();
            res.put("message", "Invalid pet data. Please provide valid values for all fields.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        if(pet.getAdopted() == null)
            pet.setAdopted(false);
        Pet savedPet = petRepository.save(pet);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPet);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePet(@PathVariable Long id, @RequestBody UpdatePetDTO petDetails) {
        if (!StringUtils.hasText(petDetails.getName()) || !StringUtils.hasText(petDetails.getBreed()) || !StringUtils.hasText(petDetails.getSpecies()) || !StringUtils.hasText(petDetails.getDescription())) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Please check name, breed, description and/or specie cannot be empty ");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        Optional<Pet> optionalPet = petRepository.findById(String.valueOf(id));
        if (optionalPet.isPresent()) {
            Pet pet = optionalPet.get();
            pet.setName(petDetails.getName());
            pet.setBreed(petDetails.getBreed());
            pet.setSpecies(petDetails.getSpecies());
            pet.setAge(petDetails.getAge());
            pet.setDescription(petDetails.getDescription());

            Pet updatedPet = petRepository.save(pet);
            return ResponseEntity.ok(updatedPet);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Pet with ID " + id + " not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
