package com.example.demo.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "images")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;

    private Date createdAt;

    private String createdBy;

//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "product_id")
//    @JsonIgnore
//    private Product product;

    @ManyToOne()
    @JoinColumn(name = "product_color_id")
    @JsonIgnore
    private ProductColor productColor;
}
