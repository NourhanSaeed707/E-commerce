package com.example.demo.model;
import com.example.demo.entity.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.Date;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = {"productColors", "productSizes", "images"})
public class MainProductsDTO {
    private Long id;
    private String name;
    private Date createdAt;
    private String createdBy;
    private String codeNumber;
    private double price;
    private Integer stock;
    private Gender gender;
    private CategoryTypeDTO categoryType;
    private Set<ProductColorDTO> productColors;
    private Set<ProductSizeDTO> productSizes;
    private Set<ImageDTO> images;
}
