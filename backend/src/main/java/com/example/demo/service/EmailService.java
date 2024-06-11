package com.example.demo.service;
import jakarta.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface EmailService {
    void sendEmail(String email, String subject, String body) throws MessagingException, UnsupportedEncodingException;
    void sendCode(String email) throws MessagingException, UnsupportedEncodingException;
}
