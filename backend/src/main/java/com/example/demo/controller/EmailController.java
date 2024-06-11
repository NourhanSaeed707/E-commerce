package com.example.demo.controller;
import com.example.demo.entity.UserEntity;
import com.example.demo.facade.RegisterFacade;
import com.example.demo.model.VerifyDTO;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/email")
@CrossOrigin("*")
public class EmailController {
    @Autowired
    private RegisterFacade registerFacade;

    @PostMapping("/send")
    public ResponseEntity<String> sendEmailForAuthentication (@RequestBody UserEntity user) {
        try {
            registerFacade.sendEmailWithCode(user.getEmail());
            return ResponseEntity.ok("Code sent successfully");
        }
        catch (MessagingException  | UnsupportedEncodingException e){
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to send code");
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyGeneratedCode(@RequestBody VerifyDTO verifyDTO) {
        try {
            boolean isValid = registerFacade.verifyRegisterUserCode(verifyDTO);
            if(isValid) {
                return ResponseEntity.ok("generated code is right");
            }
            else{
                return  ResponseEntity.status(400).body("generated code not right");
            }
        }
        catch(Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(500).body("code not right");
        }
    }
}
