package com.example.demo.controller;
import com.example.demo.model.OrdersDTO;
import com.example.demo.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrdersController {
    @Autowired
    private OrdersService ordersService;

    @GetMapping("/get-all")
    public ResponseEntity<Page<OrdersDTO>> getAllByUserId (
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "userId") Long userId
    ){
        Page<OrdersDTO> ordersDTOList = ordersService.getAllByUserId(page, size, userId);
        return ResponseEntity.ok(ordersDTOList);
    }

    @PostMapping("/add")
    public ResponseEntity<OrdersDTO> save(@RequestBody OrdersDTO ordersDTO) {
        return ResponseEntity.ok(ordersService.save(ordersDTO));
    }
}
