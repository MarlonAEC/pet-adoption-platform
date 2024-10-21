package com.example.pet_adoption_platform.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Data
@Entity
@Table(name="users")
public class User {
    @Id
    @Getter
    @Column(nullable = false, length = 50)
    @Setter
    private String username;

    @Column(nullable = false, length = 500)
    @Setter
    private String password;

    @Column(length = 500)
    @Setter
    @Getter
    private String name;

    @Getter
    @Setter
    @Column(length = 500)
    private String address;

    @Getter
    @Setter
    @Column(unique = true, length = 500)
    private String email;

    @Column(nullable = false)
    @Getter
    @Setter
    private Boolean enabled;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @Getter
    @Setter
    private Set<Authority> authorities;
}
