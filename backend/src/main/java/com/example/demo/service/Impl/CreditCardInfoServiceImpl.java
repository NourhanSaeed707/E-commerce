package com.example.demo.service.Impl;
import com.example.demo.repository.CreditCardInfoRepository;
import com.example.demo.service.CreditCardInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreditCardInfoServiceImpl implements CreditCardInfoService {
    @Autowired
    private CreditCardInfoRepository creditCardInfoRepository;
}
