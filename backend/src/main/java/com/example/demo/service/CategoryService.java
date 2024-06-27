package com.example.demo.service;
import com.example.demo.entity.Category;
import com.example.demo.model.CategoryDTO;
import com.example.demo.model.CategoryTypeDTO;
import org.springframework.http.ResponseEntity;
import java.util.*;

public interface CategoryService {
    List<CategoryDTO> getAll();
    CategoryDTO getById(Long id) throws Exception ;
    ResponseEntity<CategoryDTO> save(CategoryDTO categoryDTO);
    CategoryDTO returnSavedCategory(CategoryTypeDTO categoryTypeDTO);
    Category setCategoryFields(Category category, CategoryDTO categoryDTO);
    ResponseEntity<Category> update (Long id, CategoryDTO categoryDTO) throws Exception ;
    ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message);
    ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception;
}
