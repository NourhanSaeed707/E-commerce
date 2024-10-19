package com.example.demo.model;
import com.example.demo.entity.UserEntity;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ObserverDTO {
    private Long id;
    private UserDTO user;
    private ProductsDTO product;
}
