package com.example.demo.Exception.ProductColor;

public class ProductColorNotFoundException extends ProductColorException{
    public ProductColorNotFoundException(Long id) {
        super("Product color not found for ID: " + id);
    }
}
