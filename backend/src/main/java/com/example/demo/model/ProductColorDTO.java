package com.example.demo.model;
import lombok.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductColorDTO {
    private Long id;
    private ProductsDTO product;
    private ColorDTO color;
    private Date createdAt;
    private Date lastModifiedAt;
    private String createdBy;
}
