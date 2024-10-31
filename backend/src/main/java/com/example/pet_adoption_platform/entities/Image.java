package com.example.pet_adoption_platform.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private byte[] data;

    @Column(nullable = false)
    private String url;

    @ManyToOne
    @JoinColumn(name = "pet_id")
    private Pet pet;
}
