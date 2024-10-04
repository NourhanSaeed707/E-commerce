package com.example.demo.repository;

import com.example.demo.entity.Product;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

public class ProductWithRelationsSpecification {
    public static Specification<Product> fetchProductWithRelations() {
        return (root, query, cb) -> {
            query.distinct(true);

            // Fetch nested associations
            var productColorsFetch = root.fetch("productColors", JoinType.LEFT);
            productColorsFetch.fetch("color", JoinType.LEFT); // Fetch color inside productColor
            productColorsFetch.fetch("images", JoinType.LEFT); // Fetch images inside productColor

            // Ensure we also fetch the images linked to the ProductColor
            return cb.conjunction(); // Always true, no filtering.
        };
    }
}
