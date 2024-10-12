package com.example.demo.model;
import com.example.demo.entity.OrderStatus;
import com.example.demo.entity.Product;
import com.example.demo.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersDTO {
    private Long id;
    private UserDTO user;
    private ProductsDTO product;
    private Date orderDate;
    private Integer quantity;
    private double totalPrice;
    private OrderStatus status;
}