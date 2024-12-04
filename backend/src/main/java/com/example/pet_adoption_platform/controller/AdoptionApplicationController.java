package com.example.pet_adoption_platform.controller;

import com.example.pet_adoption_platform.DTOs.AdoptionApplicationUpdateDTO;
import com.example.pet_adoption_platform.DTOs.CreateAdoptionApplicationDTO;
import com.example.pet_adoption_platform.entities.AdoptionApplication;
import com.example.pet_adoption_platform.entities.Pet;
import com.example.pet_adoption_platform.entities.PetAdoptionHistory;
import com.example.pet_adoption_platform.entities.User;
import com.example.pet_adoption_platform.repositories.AdoptionApplicationRepository;
import com.example.pet_adoption_platform.repositories.PetAdoptionHistoryRepository;
import com.example.pet_adoption_platform.repositories.PetsRepository;
import com.example.pet_adoption_platform.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/adoption-applications")
public class AdoptionApplicationController {
    @Autowired
    private AdoptionApplicationRepository adoptionApplicationRepository;

    @Autowired
    private PetsRepository petsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetAdoptionHistoryRepository petAdoptionHistoryRepository;

    @PostMapping
    @PreAuthorize("#username == authentication.principal.username or hasRole('ADMIN')")
    public ResponseEntity<?> createApplication(@RequestBody CreateAdoptionApplicationDTO request){
        Optional<User> userOptional = userRepository.findById(request.getUserId());
        Optional<Pet> petOptional = petsRepository.findById(String.valueOf(request.getPetId()));

        if(userOptional.isEmpty()){
            Map<String, String> response = new HashMap<>();
            response.put("message", "User with ID " + request.getUserId() + " not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        User user = userOptional.get();

        if(petOptional.isEmpty()){
            Map<String, String> response = new HashMap<>();
            response.put("message", "Pet with ID " + request.getPetId() + " not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        Optional<AdoptionApplication> alreadyApplied = adoptionApplicationRepository.findByUserAndPetId(user, request.getPetId());

        if(alreadyApplied.isPresent() && alreadyApplied.get().getStatus().equals("WITHDRAWN")){
            alreadyApplied.get().setStatus("PENDING");
            adoptionApplicationRepository.save(alreadyApplied.get());
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(alreadyApplied.get());
        } else if(alreadyApplied.isPresent()){
            Map<String, String> response = new HashMap<>();
            response.put("message", "User with ID " + request.getUserId() + " already applied for pet with ID " + request.getPetId());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        Pet pet = petOptional.get();

        AdoptionApplication application = new AdoptionApplication();
        application.setUser(user);
        application.setPet(pet);
        application.setStatus("PENDING");
        application.setCreatedAt(LocalDateTime.now());
        application.setUpdatedAt(LocalDateTime.now());

        adoptionApplicationRepository.save(application);
        return ResponseEntity.status(HttpStatus.CREATED).body(application);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<AdoptionApplication>> getAllApplications(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<AdoptionApplication> pets = adoptionApplicationRepository.findAll(pageable);

        return ResponseEntity.ok(pets);
    }

    @PutMapping("/withdraw/{id}")
    @PreAuthorize("#username == authentication.principal.username or hasRole('ADMIN')")
    public ResponseEntity<?> withdrawMyApplication(@PathVariable Long id){
        Optional<AdoptionApplication> adoptionApplicationOptional = adoptionApplicationRepository.findById(String.valueOf(id));

        if(adoptionApplicationOptional.isPresent()){
            AdoptionApplication adoptionApplication = adoptionApplicationOptional.get();

            adoptionApplication.setStatus("WITHDRAWN");
            adoptionApplicationRepository.save(adoptionApplication);

            return ResponseEntity.status(HttpStatus.OK).body(adoptionApplication);
        }

        Map<String, String> res = new HashMap<>();
        res.put("message", "Application with ID: " + id + " not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
    }

    @GetMapping("/my-applications")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<AdoptionApplication>> getMyApplications(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        User user = userOptional.get();
        Pageable pageable = PageRequest.of(page, size);
        Page<AdoptionApplication> applications = adoptionApplicationRepository.findByUser(user, pageable);

        return ResponseEntity.ok(applications);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> editApplication(@PathVariable Long id, @RequestBody AdoptionApplicationUpdateDTO input){
        Optional<AdoptionApplication> adoptionApplicationOptional = adoptionApplicationRepository.findById(String.valueOf(id));

        if(input.getStatus() == null || input.getStatus().isEmpty()){
            Map<String, String> res = new HashMap<>();
            res.put("message", "Application status is required in order to update the application");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        if(adoptionApplicationOptional.isPresent()){
            AdoptionApplication adoptionApplication = adoptionApplicationOptional.get();

            adoptionApplication.setStatus(input.getStatus());
            if(input.getStatus().equals("APPROVED")){
                PetAdoptionHistory newPetAdoptionHistory = new PetAdoptionHistory();
                newPetAdoptionHistory.setPet(adoptionApplication.getPet());
                newPetAdoptionHistory.setUser(adoptionApplication.getUser());
                newPetAdoptionHistory.setCreatedAt(LocalDateTime.now());
                newPetAdoptionHistory.setUpdatedAt(LocalDateTime.now());
                petAdoptionHistoryRepository.save(newPetAdoptionHistory);
                adoptionApplicationRepository.save(adoptionApplication);

                Map<String, String> res = new HashMap<>();
                res.put("message", "Application updated successfully and adoption history created!");
                return ResponseEntity.status(HttpStatus.CREATED).body(res);
            }
            adoptionApplicationRepository.save(adoptionApplication);
            Map<String, String> res = new HashMap<>();
            res.put("message", "Application updated successfully!");
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(res);
        }

        Map<String, String> res = new HashMap<>();
        res.put("message", "Application with ID: " + id + " not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
    }
}
