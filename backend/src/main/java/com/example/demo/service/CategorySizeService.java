package com.example.demo.service;
import com.example.demo.entity.Category;
import com.example.demo.entity.CategorySize;
import com.example.demo.entity.Size;
import com.example.demo.model.CategoryDTO;
import com.example.demo.model.CategorySizeDTO;
import com.example.demo.model.SizeDTO;
import org.springframework.http.ResponseEntity;
import java.util.*;

public interface CategorySizeService {
    List<CategorySizeDTO> getAll();
    CategorySizeDTO getById(Long id) throws Exception ;
    ResponseEntity<CategorySizeDTO> save(CategorySizeDTO categorySizeDTO);
    void savedCategorySize(CategoryDTO categoryDTO, SizeDTO sizeDTO);
    CategorySize setCategorySizeFields(CategorySize categorySize, CategorySizeDTO categorySizeDTO);
    ResponseEntity<CategorySize> update (Long id, CategorySizeDTO categorySizeDTO) throws Exception ;
    ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message);
    ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception;
}
