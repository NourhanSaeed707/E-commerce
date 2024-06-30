package com.example.demo.controller;
import com.example.demo.entity.Product;
import com.example.demo.model.ProductsDTO;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/product")
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/get-all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<ProductsDTO>> getAll () {
        List<ProductsDTO> products = productService.getAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/get/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductsDTO> getById(@PathVariable Long id) throws Exception {
        ProductsDTO product = productService.getById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/save")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductsDTO> save(@RequestBody ProductsDTO productsDTO) throws Exception {
        System.out.println("prooooooooduct dto from save controller: " + productsDTO);
        return  productService.save(productsDTO);
    }

    @PutMapping("/edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody ProductsDTO productsDTO) throws Exception {
        return productService.update(id, productsDTO);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Long id) throws Exception {
        return productService.delete(id);
    }
}
