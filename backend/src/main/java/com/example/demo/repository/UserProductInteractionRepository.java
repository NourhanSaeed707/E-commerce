package com.example.demo.repository;
import com.example.demo.entity.UserProductInteraction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProductInteractionRepository extends JpaRepository<UserProductInteraction, Long> {
    List<UserProductInteraction> findByUserId(Long userId);
}
