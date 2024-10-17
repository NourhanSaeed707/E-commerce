package com.example.demo.model;
import com.example.demo.entity.Orders;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreditCardInfoDTO {
    private Long id;
    private String cardNumber;
    private String expirationDate;
    private String cvc;
    private String cardHolderName;
    private OrdersDTO order;
}
