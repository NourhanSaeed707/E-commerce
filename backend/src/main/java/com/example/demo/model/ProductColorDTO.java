package com.example.demo.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductColorDTO {
    private Long id;
    private ProductsDTO product;
    private ColorDTO color;
    private Date createdAt;
    private Date lastModifiedAt;
    private String createdBy;

}
