package com.example.demo.Exception.Color;

public class ColorNotFoundException extends ColorException{
    public ColorNotFoundException(Long id) {
        super("Color not found for ID: " + id);
    }
}
