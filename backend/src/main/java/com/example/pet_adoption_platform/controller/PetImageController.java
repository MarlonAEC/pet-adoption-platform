package com.example.pet_adoption_platform.controller;

import com.example.pet_adoption_platform.entities.Image;
import com.example.pet_adoption_platform.entities.Pet;
import com.example.pet_adoption_platform.repositories.ImageRepository;
import com.example.pet_adoption_platform.repositories.PetsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    private static final String IMAGE_DIRECTORY = "uploaded_images/";

    @Autowired
    private PetsRepository petsRepository;

    @Autowired
    private ImageRepository imageRepository;

    @PostMapping("/{PetId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> uploadImages(@PathVariable Long PetId, @RequestParam("images") MultipartFile[] files) {
        Pet pet = petsRepository.findById(String.valueOf(PetId)).orElse(null);
        if (pet == null) {
            return ResponseEntity.notFound().build();
        }

        if(files.length == 0) {
            return ResponseEntity.badRequest().body("Please select at least one image to upload");
        }

        try {
            File directory = new File(IMAGE_DIRECTORY);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            for(MultipartFile file : files) {
                String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path filePath = Path.of(IMAGE_DIRECTORY + filename);
                Files.write(filePath, file.getBytes());

                Image image = new Image();
                image.setUrl("/images/" + filename);
                image.setData(file.getBytes());
                image.setPet(pet);

                imageRepository.save(image);
                pet.getImages().add(image);
            }

            petsRepository.save(pet);
            return ResponseEntity.ok("Images uploaded successfully");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
