package com.example.demo.service.Impl;
import com.example.demo.entity.InteractionType;
import com.example.demo.entity.Product;
import com.example.demo.entity.UserProductInteraction;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserInteractionRepository;
import com.example.demo.repository.UserProductInteractionSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {
    @Autowired
    private UserInteractionRepository interactionRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Product> recommendedProducts(Long userId) {
        // Fetch user’s interactions to identify liked or purchased categories
        List<UserProductInteraction> userInteractions = interactionRepository.findByUserId(userId);
        Set<Long> userLikedCategoryIds = userInteractions.stream()
                .map(interaction -> interaction.getProduct().getCategoryType().getId())
                .collect(Collectors.toSet());

        // Use Specification to find similar interactions by other users in the same categories
        List<UserProductInteraction> similarInteractions = interactionRepository.findAll(
                UserProductInteractionSpecification.similarUserInteractions(userId, userLikedCategoryIds)
        );

        // Collect recommended products
        Set<Product> recommendedProducts = new HashSet<>();
        similarInteractions.forEach(interaction -> recommendedProducts.add(interaction.getProduct()));

        return List.copyOf(recommendedProducts);
    }

}
