package com.example.demo.Exception.Size;

public class SizeNotFoundException extends SizeException {
    public SizeNotFoundException(Long id) {
        super("Category not found for ID: " + id);
    }
}
