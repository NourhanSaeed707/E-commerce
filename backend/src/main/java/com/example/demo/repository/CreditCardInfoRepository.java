package com.example.demo.repository;
import com.example.demo.entity.CreditCardInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditCardInfoRepository extends JpaRepository<CreditCardInfo, Long> {
}
