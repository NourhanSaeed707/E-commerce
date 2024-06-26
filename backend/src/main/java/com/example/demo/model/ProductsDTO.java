package com.example.demo.model;

import com.example.demo.entity.Category;
import com.example.demo.entity.Color;
import com.example.demo.entity.Gender;
import com.example.demo.entity.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

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
    private Gender gender;
    private Category category;
    private Size size;
    private Color color;

//    public ProductsDTO(Long id, String name, String codeNumber, Date createdAt, String createdBy, Size size, Integer stock, Gender gender, double price, Color color, Category category) {
//       this.id = id;
//       this.name = name;
//       this.createdAt = createdAt;
//       this.createdBy = createdBy;
//       this.codeNumber = codeNumber;
//       this.price = price;
//       this.stock = stock;
//       this.gender = gender;
//       this.size = size;
//       this.category = category;
//       this.color = color;
//    }
//
//    public ProductsDTO() {
//
//    }
}
