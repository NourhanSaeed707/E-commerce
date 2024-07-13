package com.example.demo.facade;
import com.example.demo.model.VerifyDTO;
import com.example.demo.service.CodeService;
import com.example.demo.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.io.UnsupportedEncodingException;
import java.util.Objects;

@Component
public class RegisterFacade {

    @Autowired
    private CodeService codeService;
    @Autowired
    private EmailService emailService;

    public void sendEmailWithCode(String email) throws MessagingException, UnsupportedEncodingException {
       if(!Objects.equals(email, "")) {
           emailService.sendCode(email);
       }
    }
    public  boolean verifyRegisterUserCode(VerifyDTO verifyDTO) {
        System.out.println("veriiiiiiify register code: " + verifyDTO);
        boolean isCodeValid = codeService.verifyGeneratedCode(verifyDTO);
        System.out.println("veriiiiiiify isCodeValid: " + isCodeValid);

        if(isCodeValid) {
            return true;
        }
        else {
            return false;
        }
    }
}
