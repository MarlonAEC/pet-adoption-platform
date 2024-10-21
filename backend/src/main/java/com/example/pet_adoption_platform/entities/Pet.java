package com.example.pet_adoption_platform.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

    private String description;

    @Column(nullable = false, columnDefinition = "boolean default false")
    private Boolean adopted;
}
