package com.example.demo.service.Impl;
import com.example.demo.model.CheckoutDTO;
import com.example.demo.repository.CreditCardInfoRepository;
import com.example.demo.repository.OrdersRepository;
import com.example.demo.repository.ShippingInfoRepository;
import com.example.demo.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;

public class CheckoutServiceImpl implements CheckoutService {
    @Autowired
    private ShippingInfoRepository shippingInfoRepository;
    @Autowired
    private CreditCardInfoRepository creditCardRepository;
    @Autowired
    private OrdersRepository ordersRepository;

    @Override
    public CheckoutDTO processCheckout(CheckoutDTO checkoutDTO) {
        return null;
    }
}
