package com.example.demo.service.Impl;
import com.example.demo.entity.InteractionType;
import com.example.demo.entity.Product;
import com.example.demo.entity.UserProductInteraction;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserInteractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class RecommendationService {
    @Autowired
    private UserInteractionRepository interactionRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Product> recommendedProducts(Long userId) {
        // Fetch all interactions for the user
        List<UserProductInteraction> interactions = interactionRepository.findByUserId(userId);
        // Use a set to avoid duplicate products
        Set<Product> recommendedProducts = new HashSet<>();
        //we can recommend products that are of the same category as liked or purchased
        for (UserProductInteraction interaction: interactions) {
            if(interaction.getInteractionType() == InteractionType.LIKED) {
                recommendedProducts.add(productRepository.findByCategoryType(interaction.getInteractionType()));
            }
        }
        return List.copyOf(recommendedProducts);
    }

}
