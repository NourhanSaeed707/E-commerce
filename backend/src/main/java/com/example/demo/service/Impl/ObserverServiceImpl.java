package com.example.demo.service.Impl;
import com.example.demo.entity.Observer;
import com.example.demo.entity.Product;
import com.example.demo.entity.UserEntity;
import com.example.demo.model.ObserverDTO;
import com.example.demo.repository.ObserverRepository;
import com.example.demo.service.ObserverService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ObserverServiceImpl implements ObserverService {
    @Autowired
    private ObserverRepository observerRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void addObserver(ObserverDTO observerDTO) {
        Product product = modelMapper.map(observerDTO.getProduct(), Product.class);
        UserEntity user = modelMapper.map(observerDTO.getUser(), UserEntity.class);
        Observer observer = Observer.builder()
                .user(user)
                .product(product)
                .build();
        observerRepository.save(observer);
    }
}
