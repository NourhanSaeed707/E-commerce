package com.example.demo.model;
import lombok.*;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutDTO {
    List<OrdersDTO> orders;
    ShippingInfoDTO shippingInfo;
    CreditCardInfoDTO creditCardInfo;
}
