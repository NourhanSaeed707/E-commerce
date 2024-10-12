package com.example.demo.model;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutDTO {
    OrdersDTO ordersDTO;
    ShippingInfoDTO shippingInfoDTO;
    CreditCardInfoDTO creditCardInfoDTO;
}
