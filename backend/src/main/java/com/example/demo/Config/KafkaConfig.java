//package com.example.demo.Config;
//import org.apache.kafka.clients.admin.NewTopic;
//import org.apache.kafka.clients.producer.ProducerConfig;
//import org.apache.kafka.common.serialization.StringSerializer;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.kafka.annotation.EnableKafka;
//import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
//import org.springframework.kafka.core.*;
//import org.springframework.kafka.support.serializer.ErrorHandlingDeserializer;
//import org.springframework.kafka.support.serializer.JsonDeserializer;
//import org.springframework.kafka.support.serializer.JsonSerializer;
//import java.util.*;
//
//@EnableKafka
//@Configuration
//public class KafkaConfig {
//    private static final String topic = "order_confirmation";
//
//    @Bean
//    public ProducerFactory<String, Object> producerFactory() {
//        Map<String, Object> configProps = new HashMap<>();
//        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
//        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
//        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
//        return new DefaultKafkaProducerFactory<>(configProps);
//    }
//
//    // Kafka template for sending messages
//    @Bean
//    public KafkaTemplate<String, Object> kafkaTemplate() {
//        return new KafkaTemplate<>(producerFactory());
//    }
//
//    // Kafka consumer factory configuration
//    @Bean
//    public ConsumerFactory<String, String> consumerFactory() {
//        Map<String, Object> configProps = new HashMap<>();
//        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
//        configProps.put(ProducerConfig.KEY_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializercan i did.class);
//        configProps.put(ProducerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class);
//        return new DefaultKafkaConsumerFactory<>(configProps);
//    }
//
//    // Listener container factory for the Kafka consumer
//    @Bean
//    public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory() {
//        ConcurrentKafkaListenerContainerFactory<String, String> factory = new ConcurrentKafkaListenerContainerFactory<>();
//        factory.setConsumerFactory(consumerFactory());
//        return factory;
//    }
//
//    // Kafka topic creation
//    @Bean
//    public NewTopic orderTopic() {
//        return new NewTopic(TOPIC_NAME, 1, (short) 1);
//    }
//}
