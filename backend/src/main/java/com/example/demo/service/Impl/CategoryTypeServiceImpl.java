package com.example.demo.service.Impl;
import com.example.demo.Adapter.CategoryTypeAdapter;
import com.example.demo.Exception.CategoryTypes.CategoryTypeNotFoundException;
import com.example.demo.entity.CategoryType;
import com.example.demo.helper.Helper;
import com.example.demo.model.CategoryTypeDTO;
import com.example.demo.repository.CategoryTypeRepository;
import com.example.demo.service.CategoryTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;


@Service
public class CategoryTypeServiceImpl implements CategoryTypeService {

    @Autowired
    private CategoryTypeRepository categoryTypeRepository;


    @Override
    public List<CategoryTypeDTO> getAll() {
        List<CategoryType> categoryTypes = categoryTypeRepository.findAll();
        return CategoryTypeAdapter.convertListEntityToDTO(categoryTypes);
    }

    @Override
    public CategoryTypeDTO getById(Long id) throws Exception {
        Helper.validateId(id);
        CategoryType categoryType = categoryTypeRepository.findById(id).orElseThrow( () ->  new CategoryTypeNotFoundException(id));
        return CategoryTypeAdapter.toDTO(categoryType);
    }

    @Override
    public ResponseEntity<CategoryTypeDTO> save(CategoryTypeDTO categoryTypeDTO) {
        CategoryType categoryType = CategoryTypeAdapter.toEntity(categoryTypeDTO);
        categoryType.setCreatedAt(Date.valueOf(LocalDate.now()));
        categoryTypeRepository.save(categoryType);
        return ResponseEntity.ok(categoryTypeDTO);
    }

    @Override
    public CategoryType setCategoryTypeFields(CategoryType categoryType, CategoryTypeDTO categoryTypeDTO) {
        categoryType.setLastModifiedAt(Date.valueOf(LocalDate.now()));
        categoryType.setName(categoryTypeDTO.getName());
        return categoryType;
    }

    @Override
    public ResponseEntity<CategoryType> update(Long id, CategoryTypeDTO categoryTypeDTO) throws Exception {
        CategoryTypeDTO categoryTypeFoundDTO = getById(id);
        CategoryType categoryType = CategoryTypeAdapter.toEntity(categoryTypeFoundDTO);
        categoryType = setCategoryTypeFields(categoryType, categoryTypeDTO);
        return ResponseEntity.ok(categoryTypeRepository.save(categoryType));
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message) {
        boolean exists = categoryTypeRepository.existsById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put(message, !exists);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception {
        CategoryTypeDTO categoryTypeFoundDTO = this.getById(id);
        CategoryType categoryType = CategoryTypeAdapter.toEntity(categoryTypeFoundDTO);
        categoryTypeRepository.delete(categoryType);
        return checkByIdExists(id, "deleted");
    }
}
