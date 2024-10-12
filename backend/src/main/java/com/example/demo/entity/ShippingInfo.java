package com.example.demo.entity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shipping_info")
public class ShippingInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column()
    private String fullName;

    @Column()
    private String address;

    @Column()
    private String city;

    @Column()
    private String country;

    @Column(name = "postal_code")
    private String postalCode;

    @OneToOne(mappedBy = "shippingInfo", cascade = CascadeType.ALL)
    private Orders order;
}
