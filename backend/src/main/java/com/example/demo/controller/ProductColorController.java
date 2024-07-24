package com.example.demo.controller;
import com.example.demo.model.ProductColorDTO;
import com.example.demo.model.ProductColorIdsDTO;
import com.example.demo.service.ProductColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

}
