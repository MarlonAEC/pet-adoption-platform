package com.example.pet_adoption_platform.controller;

import com.example.pet_adoption_platform.repositories.AdoptionApplicationRepository;
import com.example.pet_adoption_platform.repositories.PetsRepository;
import com.example.pet_adoption_platform.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/metrics")
public class MetricsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetsRepository petRepository;

    @Autowired
    private AdoptionApplicationRepository adoptionApplicationRepository;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getUserCount() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalUsers", userRepository.count());
        // Total Admin users
        metrics.put("totalAdminUsers", userRepository.countUsersWithRoles("ROLE_ADMIN"));
        // Total Regular users
        metrics.put("totalRegularUsers", userRepository.countUsersWithRoles("ROLE_USER"));
        return ResponseEntity.ok(metrics);
    }

    // return metrics of Pets
    @GetMapping("/pets")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getTotalPets() {
        long totalPets = petRepository.count();
        Map<String, Long> response = new HashMap<>();
        response.put("totalPets", totalPets);
        // Pets not yet adopted
        long totalAvailablePets = petRepository.countByAdoptedFalse();
        response.put("totalAvailablePets", totalAvailablePets);
        // Pets already adopted
        long totalAdoptedPets = petRepository.countByAdoptedTrue();
        response.put("totalAdoptedPets", totalAdoptedPets);
        return ResponseEntity.ok(response);
    }

    // Metrics about applications
    @GetMapping("/applications")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getApplicationsMetrics(){
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalApplications", adoptionApplicationRepository.count());
        metrics.put("totalPendingApplications", adoptionApplicationRepository.countByStatus("PENDING"));
        metrics.put("totalApprovedApplications", adoptionApplicationRepository.countByStatus("APPROVED"));
        metrics.put("totalCanceledApplications", adoptionApplicationRepository.countByStatus("CANCELED"));
        return ResponseEntity.ok(metrics);
    }
}
