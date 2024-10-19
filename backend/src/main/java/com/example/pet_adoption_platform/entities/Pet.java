package com.example.pet_adoption_platform.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "pets")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String species;
    private String breed;
    private int age;
    private String description;

    @ManyToOne
    @JoinColumn(name = "adopted_by")
    private User adoptedBy;
}