package com.example.demo.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.Date;
import java.util.Set;

@Getter
@Setter
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
    @JoinColumn(name = "category_type_id")
    @NotNull(message = "Category type is required")
    private CategoryType categoryType;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<ProductColor> productColors;
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<ProductSize> productSizes;

}
