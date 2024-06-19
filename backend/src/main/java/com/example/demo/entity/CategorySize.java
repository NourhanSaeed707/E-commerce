package com.example.demo.entity;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "category_size")
public class CategorySize {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "size_id")
    private Size size;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    private Date lastModifiedAt;

    private String createdBy;
}
