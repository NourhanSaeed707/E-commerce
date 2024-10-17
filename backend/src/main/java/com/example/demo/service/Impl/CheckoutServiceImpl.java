package com.example.demo.service.Impl;
import com.example.demo.entity.*;
import com.example.demo.model.CheckoutDTO;
import com.example.demo.model.CreditCardInfoDTO;
import com.example.demo.model.OrdersDTO;
import com.example.demo.model.ShippingInfoDTO;
import com.example.demo.repository.CreditCardInfoRepository;
import com.example.demo.repository.OrderProductRepository;
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
    @Autowired
    private OrderProductRepository orderProductRepository;

    @Override
    public CheckoutDTO processCheckout(CheckoutDTO checkoutDTO) {
        // save shipping info
        ShippingInfo shippingInfo = saveShippingInfo(checkoutDTO.getShippingInfo());
        System.out.println("sa");
        CreditCardInfo creditCardInfo = new CreditCardInfo();
        if(checkoutDTO.getCreditCardInfo() != null) {
            System.out.println("insiiiiiide condition");
            creditCardInfo = saveCreditCardInfo(checkoutDTO.getCreditCardInfo());
        }
        System.out.println("afteeeeeer condition");
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

    private List<Orders> saveOrder(List<OrdersDTO> ordersDTOList, ShippingInfo shippingInfo, CreditCardInfo creditCardInfo) {
        System.out.println("insiiiiiiiide save order service");
        List<Orders> savedOrders = new ArrayList<>();
        for (OrdersDTO ordersDTO : ordersDTOList) {
            Orders order = modelMapper.map(ordersDTO, Orders.class);
            order.setShippingInfo(shippingInfo);
            if (creditCardInfo != null) {
                order.setCreditCardInfo(creditCardInfo);
            }
            Orders savedOrder = ordersRepository.save(order);
            System.out.println("saaaaaved order: " + savedOrder.getId());
            savedOrders.add(savedOrder);
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setOrder(savedOrder);
            orderProduct.setProduct(modelMapper.map(ordersDTO.getProduct(), Product.class));
            orderProductRepository.save(orderProduct);
        }
        System.out.println("saved order array: " + savedOrders);
        return savedOrders;
    }
}
