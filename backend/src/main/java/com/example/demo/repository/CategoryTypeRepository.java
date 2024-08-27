package com.example.demo.repository;
import com.example.demo.entity.CategoryType;
import com.example.demo.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryTypeRepository extends JpaRepository<CategoryType, Long> {
    CategoryType getById(Long id);
    Page<CategoryType> findAll(Pageable pageable);

}
