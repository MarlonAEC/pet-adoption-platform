package com.example.pet_adoption_platform.controller;

import com.example.pet_adoption_platform.DTOs.PetFilterDTO;
import com.example.pet_adoption_platform.DTOs.UpdatePetDTO;
import com.example.pet_adoption_platform.entities.Image;
import com.example.pet_adoption_platform.entities.Pet;
import com.example.pet_adoption_platform.entities.PetFilterHash;
import com.example.pet_adoption_platform.repositories.ImageRepository;
import com.example.pet_adoption_platform.repositories.PetFilterHashRepository;
import com.example.pet_adoption_platform.repositories.PetsRepository;
import com.example.pet_adoption_platform.services.Pet.PetService;
import com.example.pet_adoption_platform.utils.NullAwareBeanUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.DigestUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/pets")
@Validated
public class PetsController {

    @Autowired
    private PetsRepository petRepository;

    @Autowired
    private PetService petService;

    @Autowired
    private PetFilterHashRepository petFilterHashRepository;

    @Autowired
    private ImageRepository imageRepository;

    @GetMapping
    public ResponseEntity<?> getAllPets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String filter
    ){
        Pageable pageable = PageRequest.of(page, size);
        if(filter != null) {
            Optional<PetFilterHash> filterEntity = petFilterHashRepository.findByHash(filter);

            if(filterEntity.isEmpty()){
                Map<String, String> response = new HashMap<>();
                response.put("message", "Filter with hash " + filter + " not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            try {
                String jsonString = filterEntity.get().getJsonString();
                Page<Pet> pets = petService.applyFilter(jsonString, pageable);
                return ResponseEntity.ok(pets);
            } catch (JsonProcessingException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing filter JSON");
            }
        } else {
            Page<Pet> pets = petRepository.findAll(pageable);

            return ResponseEntity.ok(pets);
        }
    }

    @PostMapping("/filter")
    public ResponseEntity<?> createFilter(@RequestBody PetFilterDTO filter) {
        try {
            if(!petService.isValidFilterType(filter)){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid filter type");
            }

            String jsonString = new ObjectMapper()
                    .configure(SerializationFeature.ORDER_MAP_ENTRIES_BY_KEYS, true)
                    .writeValueAsString(filter);

            String hash = DigestUtils.md5DigestAsHex(jsonString.getBytes());

            Optional<PetFilterHash> existingFilter = petFilterHashRepository.findByHash(hash);
            if(existingFilter.isPresent()){
                Map<String, String> response = new HashMap<>();
                response.put("hash", hash);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
            }

            PetFilterHash filterEntity = new PetFilterHash();
            filterEntity.setHash(hash);
            filterEntity.setJsonString(jsonString);
            petFilterHashRepository.save(filterEntity);

            Map<String, String> response = new HashMap<>();
            response.put("hash", hash);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing filter JSON");
        }
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
        if(pet.getName() == null
                || pet.getBreed() == null
                || pet.getSpecies() == null
                || pet.getAge() == null
                || pet.getValue() == null
        ){
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
        Optional<Pet> optionalPet = petRepository.findById(String.valueOf(id));
        if (optionalPet.isPresent()) {
            Pet pet = optionalPet.get();
            NullAwareBeanUtils.copyNonNullProperties(petDetails, pet);

            Pet updatedPet = petRepository.save(pet);
            return ResponseEntity.ok(updatedPet);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Pet with ID " + id + " not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping("{id/upload-image}")
    public ResponseEntity<?> uploadImage(@PathVariable Long id, @RequestParam("image") MultipartFile file) {
        Optional<Pet> optionalPet = petRepository.findById(String.valueOf(id));
        if (optionalPet.isPresent()) {
            Pet pet = optionalPet.get();
            try {
                String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
                Path imagePath = Paths.get("public/images/" + filename);
                Files.createDirectories(imagePath.getParent());
                Files.write(imagePath, file.getBytes());

                Image image = new Image();
                image.setData(file.getBytes());
                image.setUrl("/images/" + filename);
                image.setPet(pet);
                imageRepository.save(image);

                return ResponseEntity.status(HttpStatus.CREATED).body("Image uploaded successfully");
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet not found");
        }
    }
}
