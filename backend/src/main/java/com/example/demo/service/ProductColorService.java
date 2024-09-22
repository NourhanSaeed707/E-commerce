package com.example.demo.service;
import com.example.demo.entity.ProductColor;
import com.example.demo.model.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

public interface ProductColorService {
    List<ProductColorDTO> getAll();
    ProductColorDTO getById(Long id) throws Exception ;
    ProductColorDTO getOneByProductColorIds(ProductColorIdsDTO productColorIdsDTO);
    ResponseEntity<ProductColorDTO> save(ProductColorDTO productColorDTO);
    ProductColor setProductColorFields(ProductColor categoryColor, ProductColorDTO categoryColorDTO);
    ResponseEntity<ProductColor> update (Long id, ProductColorDTO productColorDTO) throws Exception ;
    ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message);
    ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception;
    void updateProductColorImages(ProductsDTO productFoundDTO, ProductsDTO updateProductDto);
    ProductColorDTO getByProductAndColorId(Long productId, Long colorId);
}
