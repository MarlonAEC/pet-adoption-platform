package com.example.pet_adoption_platform.controller;

import com.example.pet_adoption_platform.entities.Image;
import com.example.pet_adoption_platform.entities.Pet;
import com.example.pet_adoption_platform.repositories.PetsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

@RestController
@RequestMapping("/pet-images")
public class PetImageController {

    private static final String IMAGE_DIRECTORY = "src/main/resources/static/images/";

    @Autowired
    private PetsRepository petsRepository;

    @PostMapping
    public ResponseEntity<String> uploadImage(@PathVariable Long PetId, @RequestParam("image") MultipartFile file) {
        Pet pet = petsRepository.findById(String.valueOf(PetId)).orElse(null);
        if (pet == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            File directory = new File(IMAGE_DIRECTORY);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Path.of(IMAGE_DIRECTORY + filename);
            Files.write(filePath, file.getBytes());

            Image image = new Image();
            image.setUrl("/images/" + filename);
            image.setPet(pet);

            pet.getImages().add(image);
            petsRepository.save(pet);

            return ResponseEntity.ok(image.getUrl());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
