package com.example.demo.model;
import com.example.demo.entity.*;
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
    private CategoryType categoryType;
    private Set<Product> products;
    private Date createdAt;
    private Date lastModifiedAt;
    private String createdBy;
    private Set<CategorySize> categorySizes;
    private Set<CategoryColor> categoryColors;
    private Set<Image> images;
}
