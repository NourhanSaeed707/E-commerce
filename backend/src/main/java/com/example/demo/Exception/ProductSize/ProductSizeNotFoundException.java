package com.example.demo.Exception.ProductSize;

public class ProductSizeNotFoundException extends ProductSizeException{
    public ProductSizeNotFoundException(Long id) {
        super("Product color not found for ID: " + id);
    }
}
