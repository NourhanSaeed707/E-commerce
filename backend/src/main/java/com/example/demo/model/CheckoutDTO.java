package com.example.demo.model;
import lombok.*;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutDTO {
    List<OrdersDTO> ordersDTO;
    ShippingInfoDTO shippingInfoDTO;
    CreditCardInfoDTO creditCardInfoDTO;
}
