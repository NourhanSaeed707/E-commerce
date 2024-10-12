package com.example.demo.entity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "credit_card_info")
public class CreditCardInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "card_number", nullable = false)
    private String cardNumber;

    @Column(name = "expiration_date", nullable = false)
    private String expirationDate;

    @Column(name = "cvc", nullable = false)
    private String cvc;

    @Column(name = "cardholder_name", nullable = false)
    private String cardholderName;

    @OneToOne(mappedBy = "creditCardInfo", cascade = CascadeType.ALL)
    private Orders order;
}
