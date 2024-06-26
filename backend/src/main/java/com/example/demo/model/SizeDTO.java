package com.example.demo.model;
import com.example.demo.entity.CategorySize;
import lombok.Data;

import java.util.*;

@Data
public class SizeDTO {

    private Long id;
    private String size;
    private Date createdAt;
    private Date lastModifiedAt;
    private String createdBy;
    private Set<CategorySize> categorySizes;


    public SizeDTO(Long id, String size, Date createdAt, String createdBy, Set<CategorySize> categorySizes, Date lastModifiedAt) {
          this.id = id;
          this.createdBy = createdBy;
          this.createdAt = createdAt;
          this.size = size;
          this.categorySizes = categorySizes;
          this.lastModifiedAt = lastModifiedAt;
    }

    public SizeDTO() {

    }
}
