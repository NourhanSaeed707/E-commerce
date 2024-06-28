package com.example.demo.controller;
import com.example.demo.entity.Product;
import com.example.demo.model.ProductsDTO;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/product")
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/get-all")
    public ResponseEntity<List<ProductsDTO>> getAll () {
        List<ProductsDTO> products = productService.getAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ProductsDTO> getById(@PathVariable Long id) throws Exception {
        ProductsDTO product = productService.getById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/save")
    public ResponseEntity<ProductsDTO> save(@RequestBody ProductsDTO productsDTO) {
        return  productService.save(productsDTO);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody ProductsDTO productsDTO) throws Exception {
        return productService.update(id, productsDTO);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Long id) throws Exception {
        return productService.delete(id);
    }
}
