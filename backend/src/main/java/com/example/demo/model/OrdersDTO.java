package com.example.demo.model;
import com.example.demo.entity.OrderStatus;
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
