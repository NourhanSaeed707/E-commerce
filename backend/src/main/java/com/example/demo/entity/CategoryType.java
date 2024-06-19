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
@Table(name = "category_type")
public class CategoryType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Date createdAt;

    private Date lastModifiedAt;

    private String createdBy;

    @OneToMany(mappedBy = "categoryType")
    private Set<Category> categories;
}
