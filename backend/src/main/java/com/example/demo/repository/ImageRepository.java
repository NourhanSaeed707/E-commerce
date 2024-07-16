package com.example.demo.repository;
import com.example.demo.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ImageRepository extends JpaRepository<Image, Long> {
//    List<Image> findByProductId(Long categoryId);
//    void deleteByProductId(Long productId);
}
