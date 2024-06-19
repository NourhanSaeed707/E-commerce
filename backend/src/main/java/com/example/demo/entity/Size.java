package com.example.demo.entity;
import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.util.*;

@Getter
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "size")
public class Size {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message =  "Size is required")
    private String size;

    private Date createdAt;

    private Date lastModifiedAt;

    private String createdBy;

    @OneToMany(mappedBy = "size")
    private Set<CategorySize> categorySizes;
}
