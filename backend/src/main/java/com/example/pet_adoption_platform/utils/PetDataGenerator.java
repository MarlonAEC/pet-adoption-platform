package com.example.pet_adoption_platform.utils;

import com.example.pet_adoption_platform.entities.Image;
import com.example.pet_adoption_platform.entities.Pet;
import com.example.pet_adoption_platform.repositories.ImageRepository;
import com.example.pet_adoption_platform.repositories.PetsRepository;
import com.github.javafaker.Faker;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@Component
public class PetDataGenerator {

    @Autowired
    private PetsRepository petsRepository;

    @Autowired
    private ImageRepository imageRepository;

    Faker faker = new Faker();

    @PostConstruct
    public void generateData() throws IOException {
        List<Pet> pets = new ArrayList<>();

        for(int i = 0; i < 1000; i++) {
            Pet pet = new Pet();
            pet.setName(faker.name().firstName());
            pet.setAdopted(false);
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

//            petsRepository.save(pet);

//            List<String> imageUrl = new ArrayList<>();
//            imageUrl.add("static/images/1.jpg");
//            imageUrl.add("static/images/2.jpg");
//            imageUrl.add("static/images/3.jpg");
//            imageUrl.add("static/images/4.jpg");
//            imageUrl.add("static/images/5.jpg");
//            imageUrl.add("static/images/6.jpg");
//            imageUrl.add("static/images/7.jpg");
//            imageUrl.add("static/images/8.jpg");
//            imageUrl.add("static/images/9.jpg");
//            imageUrl.add("static/images/10.jpg");
//            imageUrl.add("static/images/11.jpg");
//            imageUrl.add("static/images/12.jpg");
//            imageUrl.add("static/images/13.jpg");
//
//            List<Image> selectedImages = new ArrayList<>();
//            int numberOfImages = faker.number().numberBetween(2, imageUrl.size() / 2); // Random number of images
//            List<String> imageUrlList = new ArrayList<>(imageUrl);
//            Collections.shuffle(imageUrlList);
//            for (int j = 0; j < numberOfImages; j++) {
//                String imageFile = imageUrlList.get(j);
//                Image image = new Image();
//                image.setData(Files.readAllBytes(new ClassPathResource(imageFile).getFile().toPath()));
//                String filename = UUID.randomUUID().toString() + "_" + imageFile.substring(imageFile.lastIndexOf("/") + 1);
//                image.setUrl("/images/" + filename);
//                image.setPet(pet);
//                selectedImages.add(image);
//                imageRepository.save(image);
//            }
//            pet.setImages(selectedImages);

            pets.add(pet);
        }
        petsRepository.saveAll(pets);
    }
}
