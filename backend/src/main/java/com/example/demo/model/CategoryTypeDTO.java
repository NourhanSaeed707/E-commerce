package com.example.demo.model;
import com.example.demo.entity.Category;
import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class CategoryTypeDTO {
    private Long id;
    private String name;
    private Date createdAt;
    private Date lastModifiedAt;
    private String createdBy;
    private Set<Category> categories;

    public CategoryTypeDTO(Long id, String name, Date createdAt, String createdBy, Date lastModifiedAt, Set<Category> categories) {
       this.id = id;
       this.name = name;
       this.createdAt = createdAt;
       this.createdBy = createdBy;
       this.lastModifiedAt = lastModifiedAt;
       this.categories = categories;
    }

    public CategoryTypeDTO() {

    }
}
