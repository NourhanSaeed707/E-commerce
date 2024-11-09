package com.example.demo.service;
import com.example.demo.model.CheckoutDTO;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;

public interface CheckoutService {
    CheckoutDTO processCheckout(CheckoutDTO checkoutDTO) throws MessagingException, UnsupportedEncodingException;
}
