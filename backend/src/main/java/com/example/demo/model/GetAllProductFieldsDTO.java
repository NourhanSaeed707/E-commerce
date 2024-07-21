package com.example.demo.model;

import com.example.demo.entity.Gender;

import java.util.Date;
import java.util.List;

public class GetAllProductFieldsDTO {
    private Long id;
    private String name;
    private Date createdAt;
    private String createdBy;
    private String codeNumber;
    private double price;
    private Integer stock;
    private Gender gender;
    private CategoryTypeDTO categoryType;
    private List<SizeDTO> sizes;
    private List<ColorDTO> colors;
    private List<ImageDTO> images;

}
