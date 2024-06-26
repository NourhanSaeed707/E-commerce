package com.example.demo.service;
import com.example.demo.model.VerifyDTO;

public interface CodeService {
    String generateCode(String key);
    boolean verifyGeneratedCode(VerifyDTO verifyDTO);
}
