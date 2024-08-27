package com.example.demo.service.Impl;
import com.example.demo.Exception.CategoryTypes.CategoryTypeNotFoundException;
import com.example.demo.entity.CategoryType;
import com.example.demo.entity.Product;
import com.example.demo.helper.Helper;
import com.example.demo.model.CategoryTypeDTO;
import com.example.demo.model.ImageDTO;
import com.example.demo.model.ProductsDTO;
import com.example.demo.repository.CategoryTypeRepository;
import com.example.demo.service.CategoryTypeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CategoryTypeServiceImpl implements CategoryTypeService {

    @Autowired
    private CategoryTypeRepository categoryTypeRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<CategoryTypeDTO> getAll() {
        List<CategoryType> categoryTypes = categoryTypeRepository.findAll();
        return categoryTypes.stream().map(categoryType -> modelMapper.map(categoryType, CategoryTypeDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Page<CategoryTypeDTO> getAllPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<CategoryType> categoryTypesPage = categoryTypeRepository.findAll(pageable);
        Page<CategoryTypeDTO> categoryTypesDTOPage = categoryTypesPage.map( categoryType ->
                modelMapper.map(categoryType, CategoryTypeDTO.class));
        return categoryTypesDTOPage;
    }


    @Override
    public CategoryTypeDTO getById(Long id) throws Exception {
        Helper.validateId(id);
        CategoryType categoryType = categoryTypeRepository.findById(id).orElseThrow( () ->  new CategoryTypeNotFoundException(id));
        return modelMapper.map(categoryType, CategoryTypeDTO.class);
    }

    @Override
    public ResponseEntity<CategoryTypeDTO> save(CategoryTypeDTO categoryTypeDTO) {
        CategoryType categoryType = modelMapper.map(categoryTypeDTO, CategoryType.class);
        categoryType.setCreatedAt(Date.valueOf(LocalDate.now()));
        CategoryType saved = categoryTypeRepository.save(categoryType);
        return ResponseEntity.ok(modelMapper.map(saved, CategoryTypeDTO.class));
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
        CategoryType categoryType = modelMapper.map(categoryTypeFoundDTO, CategoryType.class);
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
        CategoryType categoryType = modelMapper.map(categoryTypeFoundDTO, CategoryType.class);
        categoryTypeRepository.delete(categoryType);
        return checkByIdExists(id, "deleted");
    }
}
