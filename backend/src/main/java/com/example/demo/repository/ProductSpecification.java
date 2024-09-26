package com.example.demo.repository;

import com.example.demo.entity.Product;
import com.example.demo.entity.ProductColor;
import com.example.demo.entity.ProductSize;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {
    public static Specification<Product> byCategoryType(Integer categoryTypeId) {
        return (root, query, criteriaBuilder) -> {
            if (categoryTypeId == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("categoryType").get("id"), categoryTypeId);
        };
    }

   public static Specification<Product> byColor(Integer colorId) {
        return (root, query, criteriaBuilder) -> {
            if (colorId == null) {
                return criteriaBuilder.conjunction();
            }
            Join<Product, ProductColor> productColorJoin = root.join("productColors", JoinType.INNER);
            return criteriaBuilder.equal(productColorJoin.get("color").get("id"), colorId);
        };
   }

   public static Specification<Product> bySize (Integer sizeId) {
        return (root, query, criteriaBuilder) -> {
            if (sizeId == null) {
                return criteriaBuilder.conjunction();
            }
            Join<Product, ProductSize> productSizeJoin = root.join("productSizes", JoinType.INNER);
            return criteriaBuilder.equal(productSizeJoin.get("size").get("id"), sizeId);
        };
   }
}
