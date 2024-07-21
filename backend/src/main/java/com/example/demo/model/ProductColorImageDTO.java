package com.example.demo.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductColorImageDTO {
    private Long productId;
    private Long colorId;
    private List<ImageDTO> images;
}
