package com.example.demo.model;
import com.example.demo.entity.InteractionType;
import com.example.demo.entity.Product;
import com.example.demo.entity.UserEntity;
import lombok.*;
import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInteractionDTO {
    private Long id;
    private UserEntity user;
    private Product product;
    private InteractionType interactionType;
    private Date interactionDate;
}
