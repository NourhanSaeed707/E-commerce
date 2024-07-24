package com.example.demo.repository;
import com.example.demo.entity.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ProductSizeRepository extends JpaRepository<ProductSize, Long> {
    void deleteByProductId(Long productId);
    ProductSize getById(Long id);
    List<ProductSize> findByProductId(Long id);
    ProductSize findByProductIdAndSizeId(Long productId, Long sizeId);
    void deleteByProductSizeId(Long productSizeId);
    void updateByProductSizeId(Long productSizeId);

}
