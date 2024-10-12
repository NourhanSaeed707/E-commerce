package com.example.demo.service.Impl;
import com.example.demo.entity.CreditCardInfo;
import com.example.demo.entity.Orders;
import com.example.demo.entity.ShippingInfo;
import com.example.demo.model.CheckoutDTO;
import com.example.demo.model.CreditCardInfoDTO;
import com.example.demo.model.OrdersDTO;
import com.example.demo.model.ShippingInfoDTO;
import com.example.demo.repository.CreditCardInfoRepository;
import com.example.demo.repository.OrdersRepository;
import com.example.demo.repository.ShippingInfoRepository;
import com.example.demo.service.CheckoutService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CheckoutServiceImpl implements CheckoutService {
    @Autowired
    private ShippingInfoRepository shippingInfoRepository;
    @Autowired
    private CreditCardInfoRepository creditCardRepository;
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CheckoutDTO processCheckout(CheckoutDTO checkoutDTO) {
        // save shipping info
        ShippingInfo shippingInfo = saveShippingInfo(checkoutDTO.getShippingInfo());
        CreditCardInfo creditCardInfo = new CreditCardInfo();
        if(checkoutDTO.getCreditCardInfo() != null) {
            creditCardInfo = saveCreditCardInfo(checkoutDTO.getCreditCardInfo());
        }
        saveOrder(checkoutDTO.getOrders(), shippingInfo, creditCardInfo);
        return checkoutDTO;
    }

    private ShippingInfo saveShippingInfo(ShippingInfoDTO shippingInfoDTO) {
        ShippingInfo shippingInfo = modelMapper.map(shippingInfoDTO, ShippingInfo.class);
        return shippingInfoRepository.save(shippingInfo);
    }

    private CreditCardInfo saveCreditCardInfo(CreditCardInfoDTO creditCardInfoDTO) {
        CreditCardInfo creditCardInfo = modelMapper.map(creditCardInfoDTO, CreditCardInfo.class);
        return creditCardRepository.save(creditCardInfo);
    }

    private Orders saveOrder(List<OrdersDTO> ordersDTO, ShippingInfo shippingInfo , CreditCardInfo creditCardInfo) {
        System.out.println("saaaaaaaave order function:");
        System.out.println(shippingInfo);

        Orders order = modelMapper.map(ordersDTO, Orders.class);
        order.setShippingInfo(shippingInfo);
        order.setCreditCardInfo(creditCardInfo);
        return ordersRepository.save(order);
    }
}
