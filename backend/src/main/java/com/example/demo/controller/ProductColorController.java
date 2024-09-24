package com.example.demo.controller;
import com.example.demo.model.ImageDTO;
import com.example.demo.model.ProductColorDTO;
import com.example.demo.model.ProductColorIdsDTO;
import com.example.demo.service.ProductColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-color")
@CrossOrigin("*")
public class ProductColorController {
    @Autowired
    private ProductColorService productColorService;

    @PostMapping("/get-one")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ProductColorDTO getOneByProductColorIds (@RequestBody  ProductColorIdsDTO productColorDTO) {
        return productColorService.getOneByProductColorIds(productColorDTO);
    }

    @GetMapping("/get/{productId}/{colorId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ProductColorDTO getByProductAndColorId (@PathVariable  Long productId, @PathVariable  Long colorId) {
        return productColorService.getByProductAndColorId(productId, colorId);
    }

    @GetMapping("/get/images/{productId}/{colorId}")
    public List<ImageDTO> getImages(@PathVariable Long productId, @PathVariable Long colorId) {
        System.out.println("insiiiiide get imaaaaaaage for product color");
        return productColorService.getImages(productId, colorId);
    }

}
