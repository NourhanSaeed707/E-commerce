package com.example.demo.model;
import com.example.demo.entity.Category;
import com.example.demo.entity.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategorySizeDTO {
    private Long id;
    private Category category;
    private Size size;
    private Date createdAt;
    private Date lastModifiedAt;
    private String createdBy;


}
