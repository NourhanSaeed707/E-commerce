package com.example.demo.repository;
import com.example.demo.entity.ProductColor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductColorRepository extends JpaRepository<ProductColor, Long> {
    void deleteByProductId(Long productId);
    ProductColor getById(Long id);
    ProductColor findByProductIdAndColorId(Long productId, Long colorId);
    List<ProductColor> findByProductId(Long id);
}
