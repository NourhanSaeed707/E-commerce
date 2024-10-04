package com.example.demo.entity;
import jakarta.persistence.*;
import lombok.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "colors")
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Color is required")
    private String color;

    private Date createdAt;

    private Date lastModifiedAt;

    private String createdBy;

    private String imageUrl;

    @OneToMany(mappedBy = "color", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProductColor> productColors;


}
