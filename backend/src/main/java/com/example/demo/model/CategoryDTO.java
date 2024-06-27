package com.example.demo.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDTO {
    private Long id;
    private CategoryTypeDTO categoryType;
    private Set<ProductsDTO> products;
    private Date createdAt;
    private Date lastModifiedAt;
    private String createdBy;
    private Set<CategorySizeDTO> categorySizes;
    private Set<CategoryColorDTO> categoryColors;
    private Set<ImageDTO> images;
}
