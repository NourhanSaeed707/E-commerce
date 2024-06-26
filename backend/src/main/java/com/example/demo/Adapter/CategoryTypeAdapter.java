package com.example.demo.Adapter;
import com.example.demo.entity.CategoryType;
import com.example.demo.model.CategoryTypeDTO;
import org.springframework.beans.BeanUtils;
import java.util.*;
import java.util.stream.Collectors;

public class CategoryTypeAdapter {

    public static CategoryType toEntity (CategoryTypeDTO categoryTypeDTO) {
        CategoryType categoryType = new CategoryType();
        BeanUtils.copyProperties(categoryTypeDTO, categoryType);
        return  categoryType;
    }

    public static CategoryTypeDTO toDTO(CategoryType categoryType) {
        CategoryTypeDTO categoryTypeDTO = new CategoryTypeDTO();
        BeanUtils.copyProperties(categoryType, categoryTypeDTO);
        return categoryTypeDTO;
    }

    public static List<CategoryTypeDTO> convertListEntityToDTO(List<CategoryType> categoryTypes) {
        return categoryTypes.stream().map(
                        categoryType -> new CategoryTypeDTO(categoryType.getId(), categoryType.getName(),
                                categoryType.getCreatedAt(), categoryType.getCreatedBy(), categoryType.getLastModifiedAt(),
                                categoryType.getCategories()
                                ))
                .collect(Collectors.toList());
    }

}
