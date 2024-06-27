package com.example.demo.service;
import com.example.demo.entity.CategoryColor;
import com.example.demo.model.CategoryColorDTO;
import com.example.demo.model.CategoryDTO;
import com.example.demo.model.ColorDTO;
import org.springframework.http.ResponseEntity;
import java.util.*;

public interface CategoryColorService {
    List<CategoryColorDTO> getAll();
    CategoryColorDTO getById(Long id) throws Exception ;
    ResponseEntity<CategoryColorDTO> save(CategoryColorDTO categoryColorDTO);
    CategoryColor setCategoryColorFields(CategoryColor categoryColor, CategoryColorDTO categoryColorDTO);
    void savedCategoryColor(CategoryDTO categoryDTO, ColorDTO colorDTO);
    ResponseEntity<CategoryColor> update (Long id, CategoryColorDTO categoryColorDTO) throws Exception ;
    ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message);
    ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception;
}
