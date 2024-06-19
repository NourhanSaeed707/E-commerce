package com.example.demo.Exception.CategoryTypes;

public class CategoryTypeNotFoundException extends CategoryTypeException {
    public CategoryTypeNotFoundException(Long id) {
        super("Category type not found for ID: " + id);
    }
}
