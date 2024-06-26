package com.example.demo.service;
import com.example.demo.entity.CategorySize;
import com.example.demo.model.CategorySizeDTO;
import org.springframework.http.ResponseEntity;
import java.util.*;

public interface CategorySizeService {
    List<CategorySizeDTO> getAll();
    CategorySizeDTO getById(Long id) throws Exception ;
    ResponseEntity<CategorySize> save(CategorySizeDTO categorySizeDTO);
    CategorySize setCategorySizeFields(CategorySize categorySize, CategorySizeDTO categorySizeDTO);
    ResponseEntity<CategorySize> update (Long id, CategorySizeDTO categorySizeDTO) throws Exception ;
    ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message);
    ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception;
}
