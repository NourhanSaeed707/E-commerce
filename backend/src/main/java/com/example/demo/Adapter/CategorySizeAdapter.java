package com.example.demo.Adapter;
import com.example.demo.entity.CategorySize;
import com.example.demo.model.CategorySizeDTO;
import org.springframework.beans.BeanUtils;
import java.util.List;
import java.util.stream.Collectors;

public class CategorySizeAdapter {

    public static CategorySize toEntity (CategorySizeDTO categorySizeDTO) {
        CategorySize categorySize = new CategorySize();
        BeanUtils.copyProperties(categorySizeDTO, categorySize);
        return  categorySize;
    }

    public static CategorySizeDTO toDTO(CategorySize categorySize) {
        CategorySizeDTO categorySizeDTO = new CategorySizeDTO();
        BeanUtils.copyProperties(categorySize, categorySizeDTO);
        return categorySizeDTO;
    }

    public static List<CategorySizeDTO> convertListEntityToDTO(List<CategorySize> categorySizes) {
        return categorySizes.stream().map(
                        categorySize -> {
                            CategorySizeDTO categorySizeDTO = toDTO(categorySize);
                            return new CategorySizeDTO(categorySizeDTO.getId(), categorySizeDTO.getCategory(),
                                    categorySizeDTO.getSize(), categorySizeDTO.getCreatedAt(), categorySizeDTO.getLastModifiedAt(),
                                    categorySizeDTO.getCreatedBy());
                        })
                .collect(Collectors.toList());
    }
}
