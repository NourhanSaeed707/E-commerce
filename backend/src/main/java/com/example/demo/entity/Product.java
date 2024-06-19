package com.example.demo.entity;
import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.Date;

@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date createdAt;

    private Date lastModifiedAt;

    private String createdBy;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Code number is required")
    private String codeNumber;

    @NotNull(message = "Price is required")
    @Positive(message = "Price should be greater than zero")
    private double price;

    @NotNull(message = "Stock is required")
    private Integer stock;

    @NotNull(message = "Gender is required")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @NotNull(message = "Category is required")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "size_id")
    @NotNull(message = "Size is required")
    private Size size;

    @ManyToOne
    @JoinColumn(name = "color_id")
    @NotNull(message = "Color is required")
    private Color color;
}
