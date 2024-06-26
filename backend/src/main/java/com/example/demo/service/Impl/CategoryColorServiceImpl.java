package com.example.demo.service.Impl;
import com.example.demo.Adapter.CategoryColorAdapter;
import com.example.demo.Exception.CategoryColor.CategoryColorNotFoundException;
import com.example.demo.entity.CategoryColor;
import com.example.demo.helper.Helper;
import com.example.demo.model.CategoryColorDTO;
import com.example.demo.repository.CategoryColorRepository;
import com.example.demo.service.CategoryColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
public class CategoryColorServiceImpl implements CategoryColorService {

    @Autowired
    private CategoryColorRepository categoryColorRepository;

    @Override
    public List<CategoryColorDTO> getAll() {
        List<CategoryColor> categoryColors = categoryColorRepository.findAll();
        return CategoryColorAdapter.convertListEntityToDTO(categoryColors);
    }

    @Override
    public CategoryColorDTO getById(Long id) throws Exception {
        Helper.validateId(id);
        CategoryColor categoryColor = categoryColorRepository.findById(id).orElseThrow( () ->  new CategoryColorNotFoundException(id));
        return CategoryColorAdapter.toDTO(categoryColor);
    }

    @Override
    public ResponseEntity<CategoryColor> save(CategoryColorDTO categoryColorDTO) {
        CategoryColor categoryColor = CategoryColorAdapter.toEntity(categoryColorDTO);
        categoryColor.setCreatedAt(Date.valueOf(LocalDate.now()));
        categoryColorRepository.save(categoryColor);
        return ResponseEntity.ok(categoryColor);
    }

    @Override
    public CategoryColor setCategoryColorFields(CategoryColor categoryColor, CategoryColorDTO categoryColorDTO) {
        categoryColor.setLastModifiedAt(Date.valueOf(LocalDate.now()));
        categoryColor.setColor(categoryColorDTO.getColor());
        categoryColor.setCategory(categoryColorDTO.getCategory());
        categoryColor.setCategory(categoryColorDTO.getCategory());
        return categoryColor;
    }

    @Override
    public ResponseEntity<CategoryColor> update(Long id, CategoryColorDTO categoryColorDTO) throws Exception {
        CategoryColorDTO categoryColorFoundDTO = getById(id);
        CategoryColor categoryColor = CategoryColorAdapter.toEntity(categoryColorFoundDTO);
        categoryColor = setCategoryColorFields(categoryColor, categoryColorDTO);
        return ResponseEntity.ok(categoryColorRepository.save(categoryColor));
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message) {
        boolean exists = categoryColorRepository.existsById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put(message, !exists);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception {
        CategoryColorDTO categorColorFoundDTO = this.getById(id);
        CategoryColor categoryColor = CategoryColorAdapter.toEntity(categorColorFoundDTO);
        categoryColorRepository.delete(categoryColor);
        return checkByIdExists(id, "deleted");
    }
}
