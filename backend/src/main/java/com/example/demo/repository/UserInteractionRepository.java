package com.example.demo.repository;
import com.example.demo.entity.UserProductInteraction;
import org.springframework.data.jpa.repository.*;
import java.util.*;


public interface UserInteractionRepository extends JpaRepository<UserProductInteraction, Long> {
    List<UserProductInteraction> findByUserId(Long userId);

//    @Query("SELECT ui FROM UserProductInteraction ui " +
//            "WHERE ui.user.id != :userId AND ui.product.categoryType.id IN :categoryIds")
//    List<UserProductInteraction> findSimilarUserInteractions(Long userId, Set<Long> userLikedCategoryIds);
}
