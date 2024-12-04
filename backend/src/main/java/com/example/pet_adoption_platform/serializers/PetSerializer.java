package com.example.pet_adoption_platform.serializers;

import com.example.pet_adoption_platform.entities.AdoptionApplication;
import com.example.pet_adoption_platform.entities.Image;
import com.example.pet_adoption_platform.entities.Pet;
import com.example.pet_adoption_platform.entities.User;
import com.example.pet_adoption_platform.repositories.AdoptionApplicationRepository;
import com.example.pet_adoption_platform.repositories.UserRepository;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class PetSerializer extends JsonSerializer<Pet>
{
    private final UserRepository userRepository;
    private final AdoptionApplicationRepository adoptionApplicationRepository;

    @Autowired
    public PetSerializer(UserRepository userRepository, AdoptionApplicationRepository adoptionApplicationRepository) {
        this.userRepository = userRepository;
        this.adoptionApplicationRepository = adoptionApplicationRepository;
    }

    @Override
    public void serialize(Pet pet, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("id", String.valueOf(pet.getId()));
        gen.writeStringField("name", pet.getName());
        gen.writeStringField("breed", pet.getBreed());
        gen.writeStringField("species", pet.getSpecies());
        gen.writeNumberField("age", pet.getAge());
        gen.writeNumberField("value", pet.getValue());
        gen.writeNumberField("temperament_how_calmed", pet.getTemperament_how_calmed());
        gen.writeNumberField("temperament_how_social", pet.getTemperament_how_social());
        gen.writeNumberField("temperament_how_attention_seeking", pet.getTemperament_how_attention_seeking());
        gen.writeNumberField("temperament_how_active", pet.getTemperament_how_active());
        gen.writeNumberField("temperament_how_loud", pet.getTemperament_how_loud());
        gen.writeBooleanField("is_vaccinated", pet.is_vaccinated());
        gen.writeBooleanField("is_spayed", pet.is_spayed());
        gen.writeBooleanField("is_house_trained", pet.is_house_trained());
        gen.writeBooleanField("is_wormed", pet.is_wormed());
        gen.writeBooleanField("is_good_with_kids", pet.is_good_with_kids());
        gen.writeBooleanField("is_good_with_dogs", pet.is_good_with_dogs());
        gen.writeBooleanField("is_good_with_cats", pet.is_good_with_cats());
        gen.writeBooleanField("is_declawed", pet.is_declawed());
        gen.writeBooleanField("needs_experienced_owner", pet.isNeeds_experienced_owner());
        gen.writeStringField("postal_code", pet.getPostal_code());
        gen.writeStringField("address", pet.getAddress());
        gen.writeStringField("description", pet.getDescription());
        gen.writeStringField("background", pet.getBackground());
        gen.writeStringField("health", pet.getHealth());
        gen.writeStringField("sex", pet.getSex());
        gen.writeStringField("color", pet.getColor());
        gen.writeStringField("weight", pet.getWeight());
        gen.writeArrayFieldStart("favourite_things");
        for (String favouriteThing : pet.getFavourite_things()) {
            gen.writeString(favouriteThing);
        }
        gen.writeEndArray();
        gen.writeArrayFieldStart("requirements_for_new_home");
        for (String requirement : pet.getRequirements_for_new_home()) {
            gen.writeString(requirement);
        }
        gen.writeEndArray();
        gen.writeBooleanField("adopted", pet.getAdopted());
        gen.writeArrayFieldStart("images");
        for (Image image : pet.getImages()) {
            gen.writeString(image.getUrl());
        }
        gen.writeEndArray();
        gen.writeStringField("createdAt", pet.getCreatedAt().toString());
        gen.writeStringField("updatedAt", pet.getUpdatedAt().toString());


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            Optional<User> userOptional = userRepository.findByUsername(username);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Optional<AdoptionApplication> applicationOptional = adoptionApplicationRepository.findByUserAndPetId(user, Long.valueOf(pet.getId()));
                if (applicationOptional.isPresent()) {
                    gen.writeBooleanField("applicationSubmittedOnThisPet", true);
                    gen.writeStringField("statusOfApplication", applicationOptional.get().getStatus());
                } else {
                    gen.writeBooleanField("applicationSubmittedOnThisPet", false);
                    gen.writeStringField("statusOfApplication", "N/A");
                }
            }
        }

        gen.writeEndObject();
    }
}
