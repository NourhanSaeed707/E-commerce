package com.example.demo.Exception.User;

public class UserNotFound extends UserException{
    public UserNotFound(Long id) {
        super("User with ID: " + id + " not found.");
    }
}
