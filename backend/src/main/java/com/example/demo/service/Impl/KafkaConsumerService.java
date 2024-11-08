package com.example.demo.service.Impl;
import com.example.demo.model.OrdersDTO;
import com.example.demo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.kafka.annotation.KafkaListener;

@Service
public class KafkaConsumerService {
    @Autowired
    private EmailService emailService;

    @KafkaListener(topics = "order_confirmation", groupId = "order-group")
    public void listenOrderConfirmation(OrdersDTO ordersDTO) {
        System.out.println("Received order confirmation message for order: " + ordersDTO.getId());
        // Send confirmation email when an order is placed
        String subject = "Order confirmation";
        String content = "<h1>Your order has been confirmed!</h1>" +
                "<p>Order ID: " + ordersDTO.getId() + "</p>" +
                "<p>Thank you for shopping with us!</p>";
        try {
            System.out.println("Sending email...");
            emailService.sendEmail(ordersDTO.getUser().getEmail(), subject, content);
        } catch (Exception error) {
            error.printStackTrace();
        }
    }
}
