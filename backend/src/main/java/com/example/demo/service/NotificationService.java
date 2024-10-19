package com.example.demo.service;
import com.example.demo.model.ProductsDTO;
import jakarta.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface NotificationService {
    void notifyObservers(ProductsDTO productsDTO) throws MessagingException, UnsupportedEncodingException;
}
