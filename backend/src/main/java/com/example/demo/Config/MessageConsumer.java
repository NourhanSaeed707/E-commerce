package com.example.demo.Config;
import com.example.demo.model.OrderMessageDTO;
import com.example.demo.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import java.io.UnsupportedEncodingException;

@Component
public class MessageConsumer {
    @Autowired
    private EmailService emailService;
    @KafkaListener(topics = "order-confirmation", groupId = "my-group-id")
    public void listen(OrderMessageDTO orderMessageDTO) throws MessagingException, UnsupportedEncodingException {
        String subject = "Order confirmation";
        String content = "<h1>Your order has been confirmed!</h1>" +
                "<p>Order ID: " + orderMessageDTO.getOrderId() + "</p>" +
                "<p>Thank you for shopping with us!</p>";
        emailService.sendEmail(orderMessageDTO.getUserEmail(), subject ,content );

    }
}
