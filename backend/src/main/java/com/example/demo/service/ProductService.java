package com.example.demo.service;
import com.example.demo.entity.Product;
import com.example.demo.model.ProductColorImageDTO;
import com.example.demo.model.ProductFiltrationDTO;
import com.example.demo.model.ProductsDTO;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import java.util.*;

public interface ProductService {
//    Page<ProductsDTO> getAll(int page, int size);
    Page<ProductsDTO> getAll(ProductFiltrationDTO filterRequest);
    ProductsDTO getById(Long id) throws Exception ;
    ResponseEntity<ProductsDTO> save(ProductsDTO productDTO) throws Exception;
    ResponseEntity<Map<String, Object>>saveProductColorImage(ProductColorImageDTO productColorImageDTO) throws Exception;
    ProductsDTO setNonRelationFieldsDto(ProductsDTO oldProductDTO, ProductsDTO newProductDto);
    ResponseEntity<Product> update (Long id, ProductsDTO productsDTO) throws Exception ;
    ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message);
    ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception;
}
