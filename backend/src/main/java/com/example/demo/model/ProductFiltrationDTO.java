package com.example.demo.model;

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
}
