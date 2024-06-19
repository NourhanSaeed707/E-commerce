package com.example.demo.helper;

public class Helper {

    public static void validateId(Long id) {
        if(id == null) {
            throw new IllegalArgumentException("ID not correct");
        }
    }
}
