package com.example.demo.model;
import com.example.demo.entity.CategoryColor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ColorDTO {
    private Long id;
    private String color;
    private Date createdAt;
    private Date lastModifiedAt;
    private String createdBy;
    private Set<CategoryColor> categoryColors;
}
