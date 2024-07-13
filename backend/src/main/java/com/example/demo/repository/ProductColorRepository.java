package com.example.demo.repository;
import com.example.demo.entity.ProductColor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductColorRepository extends JpaRepository<ProductColor, Long> {
    void deleteByProductId(Long productId);
}
