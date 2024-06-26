package com.example.demo.model;
import com.example.demo.entity.Category;
import com.example.demo.entity.Color;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryColorDTO {
    private Long id;
    private Category category;
    private Color color;
    private Date createdAt;
    private Date lastModifiedAt;
    private String createdBy;
}
