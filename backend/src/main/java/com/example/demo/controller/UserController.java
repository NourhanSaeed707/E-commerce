package com.example.demo.controller;
import com.example.demo.entity.UserEntity;
import com.example.demo.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.UnsupportedEncodingException;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/admin/add")
    public UserEntity createAdmin(@RequestBody UserEntity user) {
        return userService.createAdmin(user);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<UserEntity> update(@PathVariable Long id, @RequestBody UserEntity userEntity) throws Exception {
        UserEntity updated = userService.update(id, userEntity);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/send-forget-password")
    public void sendResetPassword(@RequestBody UserEntity user) throws MessagingException, UnsupportedEncodingException {
        System.out.println("insiiide send forget password email: " + user.getEmail());
         userService.sendPasswordResetEmail(user.getEmail());
    }
}