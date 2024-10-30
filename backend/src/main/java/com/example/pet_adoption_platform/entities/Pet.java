package com.example.pet_adoption_platform.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "pets")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 50, nullable = false)
    private String breed;

    private String species;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private Float value;

    private Integer temperament_how_calmed;

    private Integer temperament_how_social;

    private Integer temperament_how_attention_seeking;

    private Integer temperament_how_active;

    private Integer temperament_how_loud;

    private boolean is_vaccinated;

    private boolean is_spayed;

    private boolean is_house_trained;

    private boolean is_wormed;

    private boolean is_good_with_kids;

    private boolean is_good_with_dogs;

    private boolean is_good_with_cats;

    private boolean is_declawed;

    private boolean needs_experienced_owner;

    private String postal_code;

    private String address;

    private String description;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean adopted;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
