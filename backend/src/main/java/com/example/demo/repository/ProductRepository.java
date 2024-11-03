package com.example.demo.repository;
import com.example.demo.entity.InteractionType;
import com.example.demo.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Collection;
import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    Product getById(Long id);
    Page<Product> findAll(Pageable pageable);

//    Product findByCategoryType(InteractionType interactionType);
//    Collection<? extends Product> findByCategoryTypeIds(Set<Long> userLikedCategoryIds);

}
