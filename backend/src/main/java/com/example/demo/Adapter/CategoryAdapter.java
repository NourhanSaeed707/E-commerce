package com.example.demo.Adapter;

import com.example.demo.entity.Category;
import com.example.demo.entity.CategoryType;
import com.example.demo.model.CategoryDTO;
import com.example.demo.model.CategoryTypeDTO;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

public class CategoryAdapter {
    public static Category toEntity (CategoryDTO categoryDTO) {
        Category category = new Category();
        BeanUtils.copyProperties(categoryDTO, category);
        return  category;
    }

    public static CategoryDTO toDTO(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();
        BeanUtils.copyProperties(category, categoryDTO);
        return categoryDTO;
    }

    public static List<CategoryDTO> convertListEntityToDTO(List<Category> categories) {
        return categories.stream().map(
                        category -> new CategoryDTO(category.getId(), category.getCategoryType(),
                                category.getCreatedAt(), category.getCreatedBy(), category.getLastModifiedAt(),
                                category.getProducts(), category.getCategorySizes(), category.getCategoryColors(),category.getImages()
                        ))
                .collect(Collectors.toList());
    }
}
