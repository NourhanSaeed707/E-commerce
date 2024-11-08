package com.example.demo.service.Impl;
import com.example.demo.model.OrderMessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {
    private static final String topic = "order_confirmation";
    @Autowired
    private KafkaTemplate<String, OrderMessageDTO> kafkaTemplate;

    public void sendMessage(OrderMessageDTO message) {
        System.out.println("insiide kafka producer");
        kafkaTemplate.send(topic, message);
    }
}
