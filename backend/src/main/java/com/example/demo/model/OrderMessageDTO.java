package com.example.demo.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderMessageDTO {
    private Long orderId;
    private String userEmail;
}
