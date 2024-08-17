package com.example.demo.service;
import com.example.demo.model.VerifyDTO;
import jakarta.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface RegisterFacadeService {
    public void sendEmailWithCode(String email) throws MessagingException, UnsupportedEncodingException;
    public  boolean verifyRegisterUserCode(VerifyDTO verifyDTO) ;
}
