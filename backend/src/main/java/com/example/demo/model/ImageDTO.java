package com.example.demo.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "productColorDTO")
public class ImageDTO {
    private Long id;
    private String imageUrl;
    private Date createdAt;
    private String createdBy;
//    @JsonIgnore
//    private ProductsDTO product;
    @JsonIgnore
    private ProductColorDTO productColorDTO;
}
