package com.example.demo.model;

import com.example.demo.entity.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductFiltrationDTO {
    private Integer page;
    private Integer size;
    private Integer categoryTypeFilter;
    private Integer colorFilter;
    private Integer sizeFilter;
    private Gender genderFilter;
}
