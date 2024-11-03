package com.example.demo.service.Impl;
import com.example.demo.entity.Product;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.UserProductInteraction;
import com.example.demo.model.UserInteractionDTO;
import com.example.demo.repository.UserInteractionRepository;
import com.example.demo.service.UserInteractionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInteractionServiceImpl implements UserInteractionService {
    @Autowired
    private UserInteractionRepository userInteractionRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserInteractionDTO save(UserInteractionDTO userInteractionDTO) {
        UserProductInteraction userProductInteraction = UserProductInteraction.builder()
                .user(modelMapper.map(userInteractionDTO.getUser(), UserEntity.class))
                .product(modelMapper.map(userInteractionDTO.getProduct(), Product.class))
                .interactionType(userInteractionDTO.getInteractionType())
                .interactionDate(userInteractionDTO.getInteractionDate())
                .build();
        userInteractionRepository.save(userProductInteraction);
        return userInteractionDTO;
    }
}
