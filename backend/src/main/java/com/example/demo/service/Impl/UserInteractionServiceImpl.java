package com.example.demo.service.Impl;
import com.example.demo.entity.UserProductInteraction;
import com.example.demo.model.UserInteractionDTO;
import com.example.demo.repository.UserInteractionRepository;
import com.example.demo.service.UserInteractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInteractionServiceImpl implements UserInteractionService {
    @Autowired
    private UserInteractionRepository userInteractionRepository;

    @Override
    public UserInteractionDTO save(UserInteractionDTO userInteractionDTO) {
        UserProductInteraction userProductInteraction = UserProductInteraction.builder()
                .user(userInteractionDTO.getUser())
                .product(userInteractionDTO.getProduct())
                .interactionType(userInteractionDTO.getInteractionType())
                .interactionDate(userInteractionDTO.getInteractionDate())
                .build();
        userInteractionRepository.save(userProductInteraction);
        return userInteractionDTO;
    }
}
