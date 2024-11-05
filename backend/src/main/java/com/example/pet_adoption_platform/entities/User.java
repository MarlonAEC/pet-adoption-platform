package com.example.pet_adoption_platform.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
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
    @JsonIgnore
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
    @JsonManagedReference
    private Set<Authority> authorities;

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
