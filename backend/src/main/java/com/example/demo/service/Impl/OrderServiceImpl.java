package com.example.demo.service.Impl;
import com.example.demo.entity.Orders;
import com.example.demo.model.OrdersDTO;
import com.example.demo.repository.OrdersRepository;
import com.example.demo.service.OrdersService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrdersService {
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Page<OrdersDTO> getAllByUserId(int page, int size, Long userId) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Orders> ordersPage = ordersRepository.findByUserId(pageable, userId);
        List<OrdersDTO> ordersDTOList = ordersPage.getContent()
                .stream()
                .map(order -> modelMapper.map(order, OrdersDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(ordersDTOList, pageable, ordersPage.getTotalElements());
    }

    @Override
    public OrdersDTO save(OrdersDTO ordersDTO) {
        Orders  order = modelMapper.map(ordersDTO, Orders.class);
        System.out.println("befooooore save");
        ordersRepository.save(order);
        return ordersDTO;
    }
}
