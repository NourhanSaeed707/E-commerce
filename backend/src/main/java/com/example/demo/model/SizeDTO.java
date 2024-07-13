package com.example.demo.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SizeDTO {
    private Long id;
    private String size;
    private Date createdAt;
    private Date lastModifiedAt;
    private String createdBy;
    private Set<ProductSizeDTO> productSizeDTOS;
}
