package com.example.demo.repository;
import com.example.demo.entity.InteractionType;
import com.example.demo.entity.UserProductInteraction;
import org.springframework.data.jpa.repository.*;
import java.util.*;


public interface UserInteractionRepository extends JpaRepository<UserProductInteraction, Long> {
    List<UserProductInteraction> findByUserId(Long userId);
    List<UserProductInteraction> findByUserIdAndProductIdAndInteractionType(Long userId, Long productId, InteractionType interactionType);
//    @Query("SELECT ui FROM UserProductInteraction ui " +
//            "WHERE ui.user.id != :userId AND ui.product.categoryType.id IN :categoryIds")
//    List<UserProductInteraction> findSimilarUserInteractions(Long userId, Set<Long> userLikedCategoryIds);
}
