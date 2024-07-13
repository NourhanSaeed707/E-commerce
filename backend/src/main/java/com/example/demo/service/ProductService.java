package com.example.demo.service;
import com.example.demo.entity.Product;
import com.example.demo.model.ColorDTO;
import com.example.demo.model.ProductsDTO;
import com.example.demo.model.SizeDTO;
import org.springframework.http.ResponseEntity;
import java.util.*;

public interface ProductService {
    List<ProductsDTO> getAll();
    ProductsDTO getById(Long id) throws Exception ;
    ResponseEntity<ProductsDTO> save(ProductsDTO productDTO) throws Exception;
    Product setProductFields(Product product, ProductsDTO productsDTO);
    ColorDTO updateProductColor(ProductsDTO productFoundDTO, ProductsDTO updateProductDto);
    SizeDTO updateProductSize(ProductsDTO productFoundDTO, ProductsDTO updateProductDto);
    ProductsDTO setNonRelationFieldsDto(ProductsDTO oldProductDTO, ProductsDTO newProductDto);
    ResponseEntity<Product> update (Long id, ProductsDTO productsDTO) throws Exception ;
    ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message);
    ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception;

}
