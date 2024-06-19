package com.example.demo.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_type_id")
    private CategoryType categoryType;

    @OneToMany(mappedBy = "category")
    private Set<Product> products;

    private Date createdAt;

    private Date lastModifiedAt;

    private String createdBy;

    @OneToMany(mappedBy = "category")
    private Set<CategorySize> categorySizes;

    @OneToMany(mappedBy = "category")
    private Set<CategoryColor> categoryColors;

    @OneToMany(mappedBy = "category")
    private Set<Image> images;
}
