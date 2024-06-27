package com.example.demo.Adapter;
import com.example.demo.entity.CategoryColor;
import com.example.demo.model.CategoryColorDTO;
import org.springframework.beans.BeanUtils;
import java.util.List;
import java.util.stream.Collectors;

public class CategoryColorAdapter {
    public static CategoryColor toEntity (CategoryColorDTO categoryColorDTO) {
        CategoryColor categoryColor = new CategoryColor();
        BeanUtils.copyProperties(categoryColorDTO, categoryColor);
        return categoryColor;
    }

    public static CategoryColorDTO toDTO(CategoryColor categoryColor) {
        CategoryColorDTO categoryColorDTO = new CategoryColorDTO();
        BeanUtils.copyProperties(categoryColor, categoryColorDTO);
        return categoryColorDTO;
    }

    public static List<CategoryColorDTO> convertListEntityToDTO(List<CategoryColor> categoryColors) {
        return categoryColors.stream().map(
                        categoryColor -> {
                            CategoryColorDTO categoryColorDTO = toDTO(categoryColor);
                            return new CategoryColorDTO(categoryColorDTO.getId(), categoryColorDTO.getCategory(),
                                    categoryColorDTO.getColor(), categoryColorDTO.getCreatedAt(), categoryColorDTO.getLastModifiedAt(),
                                    categoryColorDTO.getCreatedBy());
                        })
                .collect(Collectors.toList());
    }

}
