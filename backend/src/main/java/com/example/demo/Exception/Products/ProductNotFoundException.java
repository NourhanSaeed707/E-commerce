package com.example.demo.Exception;

public class ProductNotFoundException extends ProductException{
    public ProductNotFoundException(Long id) {
        super("Product not found for ID: " + id);
    }
}
