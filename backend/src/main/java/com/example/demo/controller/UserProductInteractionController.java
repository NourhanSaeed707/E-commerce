package com.example.demo.controller;
import com.example.demo.model.UserInteractionDTO;
import com.example.demo.service.UserInteractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interactions")
@CrossOrigin("*")
public class UserProductInteractionController {
    @Autowired
    private UserInteractionService userInteractionService;

    @PostMapping("/")
    public ResponseEntity<UserInteractionDTO> save(@RequestBody() UserInteractionDTO userInteractionDTO) {
        System.out.println("insiiiide user interaction api");
         UserInteractionDTO created = userInteractionService.save(userInteractionDTO);
         return ResponseEntity.ok(created);
    }
}
