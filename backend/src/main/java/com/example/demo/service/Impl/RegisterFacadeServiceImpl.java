package com.example.demo.service.Impl;
import com.example.demo.model.VerifyDTO;
import com.example.demo.service.CodeService;
import com.example.demo.service.EmailService;
import com.example.demo.service.RegisterFacadeService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.UnsupportedEncodingException;
import java.util.Objects;

@Service
public class RegisterFacadeServiceImpl implements RegisterFacadeService {
    @Autowired
    private CodeService codeService;
    @Autowired
    private EmailService emailService;

    @Override
    public void sendEmailWithCode(String email) throws MessagingException, UnsupportedEncodingException {
        if(!Objects.equals(email, "")) {
            emailService.sendCode(email);
        }
    }

    @Override
    public  boolean verifyRegisterUserCode(VerifyDTO verifyDTO) {
        boolean isCodeValid = codeService.verifyGeneratedCode(verifyDTO);
        if(isCodeValid) {
            return true;
        }
        else {
            return false;
        }
    }
}
