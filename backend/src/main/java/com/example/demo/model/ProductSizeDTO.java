package com.example.demo.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductSizeDTO {
    private Long id;
    private ProductsDTO product;
    private SizeDTO size;
    private Date createdAt;
    private Date lastModifiedAt;
    private String createdBy;
}
