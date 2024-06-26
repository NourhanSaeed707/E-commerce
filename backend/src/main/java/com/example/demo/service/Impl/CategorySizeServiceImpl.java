package com.example.demo.service.Impl;
import com.example.demo.Adapter.CategorySizeAdapter;
import com.example.demo.Exception.CategorySize.CategorySizeNotFoundException;
import com.example.demo.entity.CategorySize;
import com.example.demo.helper.Helper;
import com.example.demo.model.CategorySizeDTO;
import com.example.demo.repository.CategorySizeRepository;
import com.example.demo.service.CategorySizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
public class CategorySizeServiceImpl implements CategorySizeService {

    @Autowired
    private CategorySizeRepository categorySizeRepository;

    @Override
    public List<CategorySizeDTO> getAll() {
        List<CategorySize> categorySizes = categorySizeRepository.findAll();
        return CategorySizeAdapter.convertListEntityToDTO(categorySizes);
    }

    @Override
    public CategorySizeDTO getById(Long id) throws Exception {
        Helper.validateId(id);
        CategorySize categorySize = categorySizeRepository.findById(id).orElseThrow( () ->  new CategorySizeNotFoundException(id));
        return CategorySizeAdapter.toDTO(categorySize);
    }

    @Override
    public ResponseEntity<CategorySize> save(CategorySizeDTO categorySizeDTO) {
        CategorySize categorySize = CategorySizeAdapter.toEntity(categorySizeDTO);
        categorySize.setCreatedAt(Date.valueOf(LocalDate.now()));
        categorySizeRepository.save(categorySize);
        return ResponseEntity.ok(categorySize);
    }

    @Override
    public CategorySize setCategorySizeFields(CategorySize categorySize, CategorySizeDTO categorySizeDTO) {
        categorySize.setLastModifiedAt(Date.valueOf(LocalDate.now()));
        categorySize.setSize(categorySizeDTO.getSize());
        categorySize.setCategory(categorySizeDTO.getCategory());
        return categorySize;
    }

    @Override
    public ResponseEntity<CategorySize> update(Long id, CategorySizeDTO categorySizeDTO) throws Exception {
        CategorySizeDTO categorySizeFoundDTO = getById(id);
        CategorySize categorySize = CategorySizeAdapter.toEntity(categorySizeFoundDTO);
        categorySize = setCategorySizeFields(categorySize, categorySizeDTO);
        return ResponseEntity.ok(categorySizeRepository.save(categorySize));
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message) {
        boolean exists = categorySizeRepository.existsById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put(message, !exists);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception {
        CategorySizeDTO categorySizeFoundDTO = this.getById(id);
        CategorySize categorySize = CategorySizeAdapter.toEntity(categorySizeFoundDTO);
        categorySizeRepository.delete(categorySize);
        return checkByIdExists(id, "deleted");
    }
}
