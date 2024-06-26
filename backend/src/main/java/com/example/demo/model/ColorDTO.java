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


//    public ColorDTO(Long id, String color, Date createdAt, String createdBy, Date lastModifiedAt, Set<CategoryColor> categoryColors) {
//         this.id = id;
//         this.color = color;
//         this.createdAt = createdAt;
//         this.createdBy = createdBy;
//         this.lastModifiedAt = lastModifiedAt;
//         this.categoryColors = categoryColors;
//    }
//
//    public ColorDTO() {
//
//    }
}
