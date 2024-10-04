package com.example.demo.controller;
import com.example.demo.entity.Product;
import com.example.demo.model.ProductColorImageDTO;
import com.example.demo.model.ProductFiltrationDTO;
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
    public ResponseEntity<Page<ProductsDTO>> getAllFiltration (
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size,
            @RequestParam(value = "categoryTypeFilter", defaultValue = "0") int categoryTypeFilter,
            @RequestParam(value = "colorFilter", defaultValue = "0") int colorFilter,
            @RequestParam(value = "sizeFilter", defaultValue = "0") int sizeFilter) {
        ProductFiltrationDTO filterRequest = new ProductFiltrationDTO();
        filterRequest.setPage(page);
        filterRequest.setSize(size);
        filterRequest.setCategoryTypeFilter(categoryTypeFilter);
        filterRequest.setColorFilter(colorFilter);
        filterRequest.setSizeFilter(sizeFilter);
        Page<ProductsDTO> products = productService.getAll(filterRequest);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<ProductsDTO> getById(@PathVariable Long id) throws Exception {
        ProductsDTO product = productService.getById(id);
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
