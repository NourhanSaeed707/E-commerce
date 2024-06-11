package com.example.demo.service.Impl;
import com.example.demo.service.CodeService;
import com.example.demo.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import java.io.UnsupportedEncodingException;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private CodeService codeService;

    @Cacheable("myCache")
    @Override
    public void sendEmail(String email, String subject, String content) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("nourhansaeed707@gmail.com", "E-commerce");
        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }

    @Override
    public void sendCode(String email) throws MessagingException, UnsupportedEncodingException {
        String code = codeService.generateCode(email);
        String message =
                "<h1>Welcome to our website<h1>" +
                "<p> E-commerce sent you this code to continue authentication<p> " + code;
        sendEmail(email, "sign up", message);
    }
}
