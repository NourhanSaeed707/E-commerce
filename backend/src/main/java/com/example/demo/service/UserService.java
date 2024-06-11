package com.example.demo.service;

import com.example.demo.entity.UserEntity;

public interface UserService {
    UserEntity createAdmin(UserEntity user);
}