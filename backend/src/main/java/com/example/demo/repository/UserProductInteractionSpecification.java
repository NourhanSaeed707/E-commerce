package com.example.demo.repository;
import com.example.demo.entity.UserProductInteraction;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import java.util.*;

public class UserProductInteractionSpecification {
    public static Specification<UserProductInteraction> similarUserInteractions(Long userId, Set<Long> categoryIds) {
        return (root, query, criteriaBuilder) -> {
            // Predicate to exclude the specified user ID
            Predicate userPredicate = criteriaBuilder.notEqual(root.get("user").get("id"), userId);

            // Predicate for filtering by category IDs
            Predicate categoryPredicate = root.get("product").get("categoryType").get("id").in(categoryIds);

            // Combine the predicates
            return criteriaBuilder.and(userPredicate, categoryPredicate);
        };
    }
}
