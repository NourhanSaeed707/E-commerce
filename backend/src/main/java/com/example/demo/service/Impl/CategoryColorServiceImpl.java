package com.example.demo.service.Impl;
import com.example.demo.Adapter.CategoryColorAdapter;
import com.example.demo.Exception.CategoryColor.CategoryColorNotFoundException;
import com.example.demo.entity.CategoryColor;
import com.example.demo.helper.Helper;
import com.example.demo.model.CategoryColorDTO;
import com.example.demo.model.CategoryDTO;
import com.example.demo.model.ColorDTO;
import com.example.demo.repository.CategoryColorRepository;
import com.example.demo.service.CategoryColorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CategoryColorServiceImpl implements CategoryColorService {

    @Autowired
    private CategoryColorRepository categoryColorRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<CategoryColorDTO> getAll() {
        List<CategoryColor> categoryColors = categoryColorRepository.findAll();
        return categoryColors.stream().map(categoryColor -> modelMapper.map(categoryColor, CategoryColorDTO.class))
                .collect(Collectors.toList());
//        return CategoryColorAdapter.convertListEntityToDTO(categoryColors);
    }

    @Override
    public CategoryColorDTO getById(Long id) throws Exception {
        Helper.validateId(id);
        CategoryColor categoryColor = categoryColorRepository.findById(id).orElseThrow( () ->  new CategoryColorNotFoundException(id));
        return modelMapper.map(categoryColor, CategoryColorDTO.class);
//        return CategoryColorAdapter.toDTO(categoryColor);
    }

    @Override
    public ResponseEntity<CategoryColorDTO> save(CategoryColorDTO categoryColorDTO) {
//        CategoryColor categoryColor = CategoryColorAdapter.toEntity(categoryColorDTO);
        CategoryColor categoryColor = modelMapper.map(categoryColorDTO, CategoryColor.class);
        categoryColor.setCreatedAt(Date.valueOf(LocalDate.now()));
        CategoryColor saved = categoryColorRepository.save(categoryColor);
        return  ResponseEntity.ok(modelMapper.map(saved, CategoryColorDTO.class));
//        return ResponseEntity.ok(categoryColorDTO);
    }

    @Override
    public CategoryColor setCategoryColorFields(CategoryColor categoryColor, CategoryColorDTO categoryColorDTO) {
        categoryColor.setLastModifiedAt(Date.valueOf(LocalDate.now()));
//        CategoryColor categoryColorEntity = CategoryColorAdapter.toEntity(categoryColorDTO);
        CategoryColor categoryColorEntity = modelMapper.map(categoryColorDTO, CategoryColor.class);
        categoryColor.setColor(categoryColorEntity.getColor());
        categoryColor.setCategory(categoryColorEntity.getCategory());
        categoryColor.setCategory(categoryColorEntity.getCategory());
        return categoryColor;
    }

    @Override
    public void savedCategoryColor(CategoryDTO categoryDTO, ColorDTO colorDTO) {
        CategoryColorDTO categoryColorDTO = new CategoryColorDTO();
        categoryColorDTO.setCategory(categoryDTO);
        categoryColorDTO.setColor(colorDTO);
        save(categoryColorDTO);
    }

    @Override
    public ResponseEntity<CategoryColor> update(Long id, CategoryColorDTO categoryColorDTO) throws Exception {
        CategoryColorDTO categoryColorFoundDTO = getById(id);
//        CategoryColor categoryColor = CategoryColorAdapter.toEntity(categoryColorFoundDTO);
        CategoryColor categoryColor = modelMapper.map(categoryColorFoundDTO, CategoryColor.class);
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
        CategoryColorDTO categoryColorFoundDTO = this.getById(id);
//        CategoryColor categoryColor = CategoryColorAdapter.toEntity(categoryColorFoundDTO);
        CategoryColor categoryColor = modelMapper.map(categoryColorFoundDTO, CategoryColor.class);
        categoryColorRepository.delete(categoryColor);
        return checkByIdExists(id, "deleted");
    }
}
