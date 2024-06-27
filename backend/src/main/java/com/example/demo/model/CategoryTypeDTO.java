package com.example.demo.model;
import com.example.demo.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryTypeDTO {
    private Long id;
    private String name;
    private Date createdAt;
    private Date lastModifiedAt;
    private String createdBy;
    private Set<Category> categories;
}
