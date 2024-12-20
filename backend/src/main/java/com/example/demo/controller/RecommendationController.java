package com.example.demo.controller;
import com.example.demo.model.ProductsDTO;
import com.example.demo.service.Impl.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin("*")
public class RecommendationController {
    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/{userId}")
    public List<ProductsDTO> getRecommendations(@PathVariable Long userId) {
        return recommendationService.recommendedProducts(userId);
    }

}
