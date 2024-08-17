package com.example.demo.service;
import com.example.demo.model.ProductColorDTO;
import com.example.demo.model.ProductColorImageDTO;
import com.example.demo.model.ProductsDTO;
import org.springframework.http.ResponseEntity;
import java.util.*;

// Service acting as Facade design pattern
public interface ProductFacadeService {
    public void saveProductSize(ProductsDTO productDTO);
    public ProductsDTO saveProductRelations(ProductsDTO productDTO);
    public ProductColorDTO setProductColorFields(ProductColorImageDTO productColorImageDTO) throws Exception;
    public ResponseEntity<Map<String, Object>> saveProductColorImages(ProductColorImageDTO productColorImageDTO) throws Exception;

}
