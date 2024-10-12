package com.example.demo.service;
import com.example.demo.model.OrdersDTO;
import org.springframework.data.domain.Page;

public interface OrdersService {
    Page<OrdersDTO> getAllByUserId(int page, int size, Long userId);
    OrdersDTO save(OrdersDTO ordersDTO);
}
