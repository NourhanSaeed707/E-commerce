package com.example.demo.service;
import com.example.demo.entity.Category;
import com.example.demo.entity.CategoryType;
import com.example.demo.entity.Product;
import com.example.demo.model.ProductsDTO;
import org.springframework.http.ResponseEntity;
import java.util.*;

public interface ProductService {
    List<ProductsDTO> getAll();
    ProductsDTO getById(Long id) throws Exception ;
    Category saveCategoryForProduct(CategoryType categoryType);
    ResponseEntity<Product> save(ProductsDTO productDTO);
    Product setProductFields(Product product, ProductsDTO productsDTO);
    ResponseEntity<Product> update (Long id, ProductsDTO productsDTO) throws Exception ;
    ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message);
    ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception;

}
