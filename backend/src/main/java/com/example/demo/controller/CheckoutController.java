package com.example.demo.controller;
import com.example.demo.model.CheckoutDTO;
import com.example.demo.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin("*")
public class CheckoutController {
    @Autowired
    private CheckoutService checkoutService;

    @PostMapping("/process")
    public ResponseEntity<CheckoutDTO> processCheckout(@RequestBody CheckoutDTO checkoutDTO){
        return ResponseEntity.ok(checkoutService.processCheckout(checkoutDTO));
    }
}
