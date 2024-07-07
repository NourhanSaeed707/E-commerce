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
@Table(name = "category_color")
public class CategoryColor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "color_id")
    private Color color;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    private Date lastModifiedAt;

    private String createdBy;
}
