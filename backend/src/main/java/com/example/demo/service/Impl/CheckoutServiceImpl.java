package com.example.demo.service.Impl;
import com.example.demo.Config.MessageConsumer;
import com.example.demo.entity.*;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.service.CheckoutService;
import jakarta.mail.MessagingException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.UnsupportedEncodingException;
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
    @Autowired
    protected ProductRepository productRepository;

    @Autowired
    private MessageConsumer messageConsumer;

    @Override
    public CheckoutDTO processCheckout(CheckoutDTO checkoutDTO) throws MessagingException, UnsupportedEncodingException {
        // save shipping info
        ShippingInfo shippingInfo = saveShippingInfo(checkoutDTO.getShippingInfo());
        System.out.println("sa");
        CreditCardInfo creditCardInfo = null;
        if(checkoutDTO.getCreditCardInfo() != null) {
            System.out.println("insiiiiiide condition");
            creditCardInfo = saveCreditCardInfo(checkoutDTO.getCreditCardInfo());
        }
        System.out.println("afteeeeeer condition");
        List<Orders> savedOrders = saveOrder(checkoutDTO.getOrders(), shippingInfo, creditCardInfo);

        System.out.println("afteeeeer save order before send email");
        // Send Kafka message for each order
        for (Orders order : savedOrders) {
            OrderMessageDTO messageDTO = new OrderMessageDTO(order.getId(), order.getUser().getEmail());
//            kafkaProducerService.sendMessage(messageDTO);
            messageConsumer.listen(messageDTO);
        }

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
        List<Orders> savedOrders = new ArrayList<>();
        for (OrdersDTO ordersDTO : ordersDTOList) {
            Orders order = modelMapper.map(ordersDTO, Orders.class);
            Orders savedOrder = saveSingleOrder(order, shippingInfo, creditCardInfo);
            savedOrders.add(savedOrder);
            updateProduct(ordersDTO);
            saveOrderProduct(savedOrder, ordersDTO);
        }
        return savedOrders;
    }

    private Orders saveSingleOrder(Orders order,ShippingInfo shippingInfo, CreditCardInfo creditCardInfo) {
        order.setShippingInfo(shippingInfo);
        if (creditCardInfo != null) {
            order.setCreditCardInfo(creditCardInfo);
        }
        order.setStatus( OrderStatus.SHIPPED);
        return ordersRepository.save(order);
    }

    private void saveOrderProduct(Orders savedOrder, OrdersDTO ordersDTO) {
        OrderProduct orderProduct = new OrderProduct();
        orderProduct.setOrder(savedOrder);
        orderProduct.setProduct(modelMapper.map(ordersDTO.getProduct(), Product.class));
        orderProductRepository.save(orderProduct);
    }

    private void updateProduct(OrdersDTO ordersDTO) {
        Product product = productRepository.findById(ordersDTO.getProduct().getId()).get();
        product.setStock(product.getStock() - 1);
        productRepository.save(product);
    }
}
