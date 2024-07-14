package com.example.demo.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.Date;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "products")
public class CategoryTypeDTO {
    private Long id;
    private String name;
    private Date createdAt;
    private Date lastModifiedAt;
    private String createdBy;
    @JsonIgnore
    private List<ProductsDTO> products;
}
