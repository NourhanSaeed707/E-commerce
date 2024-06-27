package com.example.demo.service;
import com.example.demo.entity.CategoryType;
import com.example.demo.model.CategoryTypeDTO;
import org.springframework.http.ResponseEntity;
import java.util.*;

public interface CategoryTypeService {
    List<CategoryTypeDTO> getAll();
    CategoryTypeDTO getById(Long id) throws Exception ;
    ResponseEntity<CategoryTypeDTO> save(CategoryTypeDTO categoryTypeDTO);
    CategoryType setCategoryTypeFields(CategoryType categoryType, CategoryTypeDTO categoryTypeDTO);
    ResponseEntity<CategoryType> update (Long id, CategoryTypeDTO categoryTypeDTO) throws Exception ;
    ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message);
    ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception;

}
