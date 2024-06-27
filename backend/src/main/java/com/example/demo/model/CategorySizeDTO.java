package com.example.demo.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategorySizeDTO {
    private Long id;
    private CategoryDTO category;
    private SizeDTO size;
    private Date createdAt;
    private Date lastModifiedAt;
    private String createdBy;


}
