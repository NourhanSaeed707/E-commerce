package com.example.demo.service.Impl;
import com.example.demo.repository.ShippingInfoRepository;
import com.example.demo.service.ShippingInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShippingInfoServiceImpl implements ShippingInfoService {
    @Autowired
    private ShippingInfoRepository shippingInfoRepository;

}
