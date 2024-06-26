package com.example.demo.Exception.CategorySize;

public class CategorySizeNotFoundException extends CategorySizeException{
    public CategorySizeNotFoundException(Long id) {
        super("Category size not found for ID: " + id);
    }
}
