package com.example.demo.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    @Column()
    private Integer quantity;

    @Column()
    private double totalPrice;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @OneToOne()
    @JoinColumn(name = "shipping_info_id")
    private ShippingInfo shippingInfo;

    @OneToOne(optional = true)
    @JoinColumn(name = "credit_card_info_id")
    private CreditCardInfo creditCardInfo;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private Set<OrderProduct> orderProducts;
}
