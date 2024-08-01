package com.example.demo.service;
import com.example.demo.entity.ProductSize;
import com.example.demo.model.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

public interface ProductSizeService {
    List<ProductSizeDTO> getAll();
    ProductSizeDTO getById(Long id) throws Exception ;
    ResponseEntity<ProductSizeDTO> save(ProductSizeDTO productSizeDTO);
    ProductSize setProductSizeFields(ProductSize productSize, ProductSizeDTO productSizeDTO);
    ResponseEntity<ProductSize> update (Long id, ProductSizeDTO productSizeDTO) throws Exception ;
    ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message);
    ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception;
    void updateProductSize( ProductsDTO updateProductDto);
}
