package com.example.demo.service.Impl;
import com.example.demo.repository.UserInteractionRepository;
import com.example.demo.service.UserInteractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInteractionServiceImpl implements UserInteractionService {
    @Autowired
    private UserInteractionRepository userInteractionRepository;
}
