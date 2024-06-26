package com.example.demo.Exception.Catagory;

public class CategoryNotFoundException extends CategoryException{
    public CategoryNotFoundException(Long id) {
        super("Category not found for ID: " + id);
    }

}
