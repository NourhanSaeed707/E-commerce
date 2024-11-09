package com.example.demo.controller;
import com.example.demo.model.CheckoutDTO;
import com.example.demo.service.CheckoutService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin("*")
public class CheckoutController {
    @Autowired
    private CheckoutService checkoutService;

    @PostMapping("/process")
    @PreAuthorize("hasAuthority('USER')")
    public ResponseEntity<CheckoutDTO> processCheckout(@RequestBody CheckoutDTO checkoutDTO) throws MessagingException, UnsupportedEncodingException {
        System.out.println("save checkout controller");
        System.out.println(checkoutDTO);
        return ResponseEntity.ok(checkoutService.processCheckout(checkoutDTO));
    }
}
