package com.example.demo.service;
import com.example.demo.entity.UserEntity;
import com.example.demo.model.ResetPasswordDTO;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;

public interface UserService {
    UserEntity createAdmin(UserEntity user);
    UserEntity update(Long id , UserEntity userEntity);
    void sendPasswordResetEmail(String email) throws MessagingException, UnsupportedEncodingException;

    UserEntity resetPassword(ResetPasswordDTO resetPasswordDTO);
}