package com.example.demo.repository;
import com.example.demo.entity.Observer;
import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ObserverRepository extends JpaRepository<Observer, Long> {
    List<Observer> findByProduct(Product product);
}
