package com.example.demo.model;
import com.example.demo.entity.Orders;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShippingInfoDTO {
    private Long id;
    private String fullName;
    private String address;
    private String city;
    private String country;
    private String postalCode;
    private Orders order;
}
