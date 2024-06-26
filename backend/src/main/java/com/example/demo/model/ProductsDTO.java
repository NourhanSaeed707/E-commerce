package com.example.demo.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductsDTO {
    private Long id;
    private String name;
    private Date createdAt;
    private String createdBy;
    private String codeNumber;
    private double price;
    private Integer stock;
    private String gender;
    private CategoryDTO category;
    private CategoryTypeDTO categoryType;
    private SizeDTO size;
    private ColorDTO color;
    private Map images;


}
