package com.example.demo.Exception.CategoryColor;

public class CategoryColorNotFoundException extends CategoryColorException{
    public CategoryColorNotFoundException(Long id) {
        super("Category color not found for ID: " + id);
    }

}
