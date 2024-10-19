package com.example.demo.controller;
import com.example.demo.entity.UserEntity;
import com.example.demo.model.ObserverDTO;
import com.example.demo.model.ProductsDTO;
import com.example.demo.service.ObserverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/observers")
@CrossOrigin("*")
public class ObserverController {
    @Autowired
    private ObserverService observerService;

    @PostMapping("/save")
    public void save(@RequestBody ObserverDTO observerDTO){
        System.out.println("body in save observers: " + observerDTO);
        observerService.addObserver( observerDTO);
    }
}
