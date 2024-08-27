package com.example.demo.controller;
import com.example.demo.entity.Product;
import com.example.demo.model.ProductColorImageDTO;
import com.example.demo.model.ProductsDTO;
import com.example.demo.service.ProductService;
import org.springframework.data.domain.Page;
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
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Page<ProductsDTO>> getAll (
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        Page<ProductsDTO> products = productService.getAll(page, size);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ProductsDTO> getById(@PathVariable Long id) throws Exception {
        System.out.println("insiiiiide get one: " +  id);
        ProductsDTO product = productService.getById(id);
        System.out.println("proooooooducttt: " + product);
        return ResponseEntity.ok(product);
    }

    @PostMapping("/save")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ProductsDTO> save(@RequestBody ProductsDTO productsDTO) throws Exception {
        return  productService.save(productsDTO);
    }

    @PostMapping("/save/color-image")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, Object>> saveProductColorImage(@RequestBody ProductColorImageDTO productColorImageDTO) throws Exception {
        return  productService.saveProductColorImage(productColorImageDTO);
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
