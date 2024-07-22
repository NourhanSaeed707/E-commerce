package com.example.demo.controller;
import com.example.demo.model.ProductColorDTO;
import com.example.demo.model.ProductColorIdsDTO;
import com.example.demo.service.ProductColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product-color")
@CrossOrigin("*")
public class ProductColorController {

    @Autowired
    private ProductColorService productColorService;

    @GetMapping("/get-one")
    public ProductColorDTO getOneByProductColorIds (ProductColorIdsDTO productColorDTO) {
        return productColorService.getOneByProductColorIds(productColorDTO);
    }

}
