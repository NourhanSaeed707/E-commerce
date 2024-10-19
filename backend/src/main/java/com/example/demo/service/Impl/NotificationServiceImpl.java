package com.example.demo.service.Impl;
import com.example.demo.entity.Observer;
import com.example.demo.entity.Product;
import com.example.demo.model.ProductsDTO;
import com.example.demo.repository.ObserverRepository;
import com.example.demo.service.EmailService;
import com.example.demo.service.NotificationService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.UnsupportedEncodingException;
import java.util.*;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private ObserverRepository observerRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    @Transactional
    public void notifyObservers(ProductsDTO productsDTO) throws MessagingException, UnsupportedEncodingException {
        Product product = modelMapper.map(productsDTO, Product.class);
        String subject = "Product Available: " + product.getName();
        String content = constructEmailContent(product);
        List<Observer> observers = observerRepository.findByProduct(product);
        for (Observer observer: observers) {
            emailService.sendEmail(observer.getUser().getEmail(), subject, content);
            observerRepository.delete(observer);

        }
    }

    private String constructEmailContent(Product product) {
        StringBuilder content = new StringBuilder();
        content.append("<h2>Good news!</h2>");
        content.append("<p>The product <strong>").append(product.getName()).append("</strong> is now available for purchase.</p>");
        content.append("<p>Price: $").append(product.getPrice()).append("</p>");
        content.append("<p>Stock: ").append(product.getStock()).append("</p>");
        content.append("<p>Click <a href='your-product-url-here/").append(product.getId()).append("'>here</a> to view the product.</p>");
        content.append("<p>Thank you for your interest!</p>");
        return content.toString();
    }
}
