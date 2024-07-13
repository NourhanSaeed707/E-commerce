package com.example.demo.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product_size")
public class ProductSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "size_id")
    private Size size;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    private Date lastModifiedAt;

    private String createdBy;
}
