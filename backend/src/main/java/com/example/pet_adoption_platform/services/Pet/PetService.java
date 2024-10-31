package com.example.pet_adoption_platform.services.Pet;

import com.example.pet_adoption_platform.DTOs.PetFilterDTO;
import com.example.pet_adoption_platform.entities.Pet;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PetService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private final ObjectMapper objectMapper;

    public PetService(EntityManager entityManager, ObjectMapper objectMapper) {
        this.entityManager = entityManager;
        this.objectMapper = objectMapper;
    }

    public Page<Pet> applyFilter(String jsonString, Pageable pageable) throws JsonProcessingException {
        Map<String, Object> filter = objectMapper.readValue(jsonString, Map.class);

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Pet> query = criteriaBuilder.createQuery(Pet.class);
        Root<Pet> pet = query.from(Pet.class);

        List<Predicate> predicates = new ArrayList<>();

        filter.forEach((key, value) -> {
            if (key.startsWith("temperament_") && value instanceof Integer) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(pet.get(key), (Integer) value));
            } else if(value instanceof String && value != "") {
                predicates.add(criteriaBuilder.equal(pet.get(key), value));
            } else if(value instanceof Boolean && Boolean.TRUE.equals(value)) {
                predicates.add(criteriaBuilder.equal(pet.get(key), true));
            }
        });

        query.where(predicates.toArray(new Predicate[0]));

        List<Pet> pets = entityManager.createQuery(query)
                .setFirstResult((int) pageable.getOffset())
                .setMaxResults(pageable.getPageSize())
                .getResultList();
        long total = entityManager.createQuery(query).getResultList().size();

        return new PageImpl<>(pets, pageable, total);
    }

    public boolean isValidFilterType(PetFilterDTO filter) {
        Map<String, Class<?>> expectedTypes = new HashMap<>();
        expectedTypes.put("species", String.class);
        expectedTypes.put("breed", String.class);
        expectedTypes.put("age", Integer.class);
        expectedTypes.put("temperament_how_calmed", Integer.class);
        expectedTypes.put("temperament_how_social", Integer.class);
        expectedTypes.put("temperament_how_attention_seeking", Integer.class);
        expectedTypes.put("temperament_how_active", Integer.class);
        expectedTypes.put("temperament_how_loud", Integer.class);
        expectedTypes.put("is_vaccinated", Boolean.class);
        expectedTypes.put("is_spayed", Boolean.class);
        expectedTypes.put("is_house_trained", Boolean.class);
        expectedTypes.put("is_wormed", Boolean.class);
        expectedTypes.put("is_good_with_kids", Boolean.class);
        expectedTypes.put("is_good_with_dogs", Boolean.class);
        expectedTypes.put("is_good_with_cats", Boolean.class);
        expectedTypes.put("is_declawed", Boolean.class);
        expectedTypes.put("needs_experienced_owner", Boolean.class);
        expectedTypes.put("postal_code", String.class);
        expectedTypes.put("address", String.class);

        for (Map.Entry<String, Class<?>> entry : expectedTypes.entrySet()) {
            String key = entry.getKey();
            Class<?> expectedType = entry.getValue();
            try {
                Field field = filter.getClass().getDeclaredField(key);
                field.setAccessible(true);
                Object value = field.get(filter);
                if (value != null && !expectedType.isInstance(value)) {
                    return false;
                }
            } catch (NoSuchFieldException | IllegalAccessException e) {
                return false;
            }
        }
        return true;
    }
}
