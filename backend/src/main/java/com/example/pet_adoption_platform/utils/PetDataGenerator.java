package com.example.pet_adoption_platform.utils;

import com.example.pet_adoption_platform.entities.Image;
import com.example.pet_adoption_platform.entities.Pet;
import com.example.pet_adoption_platform.jwt.AuthTokenFilter;
import com.example.pet_adoption_platform.repositories.ImageRepository;
import com.example.pet_adoption_platform.repositories.PetsRepository;
import com.github.javafaker.Faker;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@Component
public class PetDataGenerator {
    private static final String SOURCE_IMAGE_DIRECTORY = "src/main/resources/static/defaults/";
    private static final String DESTINATION_IMAGE_DIRECTORY = "uploaded_images/";
    private static final Logger logger = LoggerFactory.getLogger(PetDataGenerator.class);

    @Autowired
    private PetsRepository petsRepository;

    @Autowired
    private ImageRepository imageRepository;

    Faker faker = new Faker();

    @PostConstruct
    public void generateData() throws IOException {
        List<Pet> pets = new ArrayList<>();
        List<String> predefinedImages = new ArrayList<>(List.of(Objects.requireNonNull(new File(SOURCE_IMAGE_DIRECTORY).list())));

        try {
            File destinationDirectory = new File(DESTINATION_IMAGE_DIRECTORY);
            if (destinationDirectory.exists()) {
                deleteDirectory(destinationDirectory);
            }
            // Recreate the directory after deletion
            destinationDirectory.mkdirs();
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the error appropriately
            System.err.println("Failed to delete the images directory.");
            return; // Exit the method if unable to delete the directory
        }

        for(int i = 0; i < 1000; i++) {
            Pet pet = new Pet();
            pet.setName(faker.name().firstName());
            pet.setAdopted(faker.bool().bool());
            pet.setAge(faker.number().numberBetween(1, 20));
            pet.setDescription(faker.lorem().sentence());
            pet.setTemperament_how_active(faker.number().numberBetween(1, 5));
            pet.set_good_with_kids(faker.bool().bool());
            pet.set_good_with_cats(faker.bool().bool());
            pet.set_good_with_dogs(faker.bool().bool());
            pet.set_house_trained(faker.bool().bool());
            pet.set_declawed(faker.bool().bool());
            pet.set_spayed(faker.bool().bool());
            pet.set_vaccinated(faker.bool().bool());
            pet.set_wormed(faker.bool().bool());
            pet.setNeeds_experienced_owner(faker.bool().bool());
            pet.setValue((float) faker.number().randomDouble(2, 0, 1000));
            pet.setBreed(faker.dog().breed());
            pet.setSpecies(faker.animal().name());
            pet.setTemperament_how_active(faker.number().numberBetween(1, 5));
            pet.setTemperament_how_calmed(faker.number().numberBetween(1, 5));
            pet.setTemperament_how_social(faker.number().numberBetween(1, 5));
            pet.setTemperament_how_loud(faker.number().numberBetween(1, 5));
            pet.setTemperament_how_attention_seeking(faker.number().numberBetween(1, 5));
            pet.setAddress(faker.address().fullAddress());
            pet.setPostal_code(faker.address().zipCode());
            pet.setColor(faker.color().name());
            pet.setWeight(String.valueOf(faker.number().numberBetween(1, 15)));
            pet.setSex(faker.number().numberBetween(1,2) == 1 ? "female" : "male");
            pet.setHealth(faker.medical().symptoms());
            pet.setBackground(faker.lorem().word());
            Integer range = faker.number().numberBetween(1, 5);
            Integer range2 = faker.number().numberBetween(1, 5);
            List<String> favoriteThings = new ArrayList<>();
            List<String> requirements = new ArrayList<>();
            for(int j = 0; j < range; j++) {
                favoriteThings.add(faker.lorem().word());
            }
            for(int j = 0; j < range2; j++) {
                requirements.add(faker.lorem().word());
            }
            pet.setFavourite_things(favoriteThings);
            pet.setRequirements_for_new_home(requirements);

            petsRepository.save(pet);

            int numberOfImagesToGenerate = faker.number().numberBetween(3, 5);

            if(numberOfImagesToGenerate > predefinedImages.size()){
                numberOfImagesToGenerate = predefinedImages.size();
            }

            if(!predefinedImages.isEmpty()){
                // Creating directory if it doesn't exist
                File destinationDirectory = new File(DESTINATION_IMAGE_DIRECTORY);
                if (!destinationDirectory.exists()) {
                    destinationDirectory.mkdirs();
                }

                List<Image> images = new ArrayList<>();

                for(int j = 0; j < numberOfImagesToGenerate; j++) {
                    String randomImage = predefinedImages.get(faker.number().numberBetween(0, predefinedImages.size() - 1));
                    File sourceImageFile = new File(SOURCE_IMAGE_DIRECTORY + randomImage);

                    if (!sourceImageFile.exists()) {
                        logger.info("Source image file does not exist skipping for now: {}", sourceImageFile.getAbsolutePath());
                        continue;
                    }

                    String uniqueFileName = UUID.randomUUID() + "_" + randomImage;
                    File destinationImageFile = new File(DESTINATION_IMAGE_DIRECTORY + uniqueFileName);

                    try {
                        Files.copy(sourceImageFile.toPath(), destinationImageFile.toPath());
                        byte[] imageData = Files.readAllBytes(destinationImageFile.toPath());
                        Image image = new Image();
                        image.setPet(pet);
                        image.setUrl("/images/" + uniqueFileName);
                        image.setData(imageData);
                        imageRepository.save(image);
                        images.add(image);


                    } catch (IOException e) {
                        logger.error("Error copying image file from {} to {}: {}", sourceImageFile.getAbsolutePath(), destinationImageFile.getAbsolutePath(), e);
                    }
                }
                pet.setImages(images);
            }
            petsRepository.save(pet);
        }
        petsRepository.saveAll(pets);
    }

    // Helper method to delete a directory recursively
    private void deleteDirectory(File directory) throws IOException {
        Path directoryPath = directory.toPath();

        if (Files.exists(directoryPath)) {
            Files.walk(directoryPath)
                    .sorted(Comparator.reverseOrder())
                    .map(Path::toFile)
                    .forEach(File::delete);
        }
    }
}
