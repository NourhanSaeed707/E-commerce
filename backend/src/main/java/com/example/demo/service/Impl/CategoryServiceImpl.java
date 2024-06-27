package com.example.demo.service.Impl;
import com.example.demo.Adapter.CategoryAdapter;
import com.example.demo.Exception.Catagory.CategoryNotFoundException;
import com.example.demo.entity.Category;
import com.example.demo.helper.Helper;
import com.example.demo.model.CategoryDTO;
import com.example.demo.model.CategoryTypeDTO;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryDTO> getAll() {
        List<Category> categories = categoryRepository.findAll();
        return CategoryAdapter.convertListEntityToDTO(categories);
    }

    @Override
    public CategoryDTO getById(Long id) throws Exception {
        Helper.validateId(id);
        Category category = categoryRepository.findById(id).orElseThrow( () ->  new CategoryNotFoundException(id));
        return CategoryAdapter.toDTO(category);
    }

    @Override
    public ResponseEntity<CategoryDTO> save(CategoryDTO categoryDTO) {
        Category category = CategoryAdapter.toEntity(categoryDTO);
        category.setCreatedAt(Date.valueOf(LocalDate.now()));
        categoryRepository.save(category);
        return ResponseEntity.ok(categoryDTO);
    }

    @Override
    public CategoryDTO returnSavedCategory(CategoryTypeDTO categoryTypeDTO) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setCategoryType(categoryTypeDTO);
        return save(categoryDTO).getBody();
    }

    @Override
    public Category setCategoryFields(Category category, CategoryDTO categoryDTO) {
        category.setLastModifiedAt(Date.valueOf(LocalDate.now()));
        Category categoryEntity = CategoryAdapter.toEntity(categoryDTO);
        category.setCategoryType(categoryEntity.getCategoryType());
        category.setCategorySizes(categoryEntity.getCategorySizes());
        category.setCategoryColors(categoryEntity.getCategoryColors());
        category.setProducts(categoryEntity.getProducts());
        category.setImages(categoryEntity.getImages());
        return category;
    }

    @Override
    public ResponseEntity<Category> update(Long id, CategoryDTO categoryDTO) throws Exception {
        CategoryDTO categoryFoundDTO = getById(id);
        Category category = CategoryAdapter.toEntity(categoryFoundDTO);
        category = setCategoryFields(category, categoryDTO);
        return ResponseEntity.ok(categoryRepository.save(category));
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message) {
        boolean exists = categoryRepository.existsById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put(message, !exists);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception {
        CategoryDTO categoryFoundDTO = this.getById(id);
        Category category = CategoryAdapter.toEntity(categoryFoundDTO);
        categoryRepository.delete(category);
        return checkByIdExists(id, "deleted");
    }
}
