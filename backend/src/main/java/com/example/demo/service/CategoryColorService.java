package com.example.demo.service;
import com.example.demo.entity.CategoryColor;
import com.example.demo.model.CategoryColorDTO;
import org.springframework.http.ResponseEntity;
import java.util.*;

public interface CategoryColorService {
    List<CategoryColorDTO> getAll();
    CategoryColorDTO getById(Long id) throws Exception ;
    ResponseEntity<CategoryColor> save(CategoryColorDTO categoryColorDTO);
    CategoryColor setCategoryColorFields(CategoryColor categoryColor, CategoryColorDTO categoryColorDTO);
    ResponseEntity<CategoryColor> update (Long id, CategoryColorDTO categoryColorDTO) throws Exception ;
    ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message);
    ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception;
}
