package com.example.demo.service.Impl;
import com.example.demo.Adapter.ProductAdapter;
import com.example.demo.Exception.Products.ProductNotFoundException;
import com.example.demo.entity.Product;
import com.example.demo.facade.ProductFacade;
import com.example.demo.helper.Helper;
import com.example.demo.model.*;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.sql.Date;
import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductFacade productFacade;

    @Override
    public List<ProductsDTO> getAll () {
        List<Product> products = productRepository.findAll();
        return ProductAdapter.convertListEntityToDTO(products);
    }

    @Override
    public ProductsDTO getById(Long id) throws Exception {
         Helper.validateId(id);
         Product product = productRepository.findById(id).orElseThrow( () ->  new ProductNotFoundException(id));
         return ProductAdapter.toDTO(product);
    }

    @Override
    public ResponseEntity<ProductsDTO> save(ProductsDTO productDTO) {
        ProductsDTO productFacadeDTO = productFacade.saveProductRelations(productDTO);
        Product product = ProductAdapter.toEntity(productFacadeDTO);
        product.setCreatedAt(Date.valueOf(LocalDate.now()));
        productRepository.save(product);
        return ResponseEntity.ok(productDTO);
    }

    @Override
    public Product setProductFields(Product product, ProductsDTO productsDTO) {
        Product productEntity = ProductAdapter.toEntity(productsDTO);
        product.setLastModifiedAt(Date.valueOf(LocalDate.now()));
        product.setName(productEntity.getName());
        product.setCodeNumber(productEntity.getCodeNumber());
        product.setPrice(productEntity.getPrice());
        product.setSize(productEntity.getSize());
        product.setCategory(productEntity.getCategory());
        product.setGender(productEntity.getGender());
        product.setStock(productEntity.getStock());
        product.setColor(productEntity.getColor());
        return product;
    }

    @Override
    public ResponseEntity<Product> update(Long id, ProductsDTO productDTO) throws Exception {
        ProductsDTO productsDTOFound = getById(id);
        Product product = ProductAdapter.toEntity(productsDTOFound);
        product = setProductFields(product, productDTO);
        return ResponseEntity.ok(productRepository.save(product));
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message) {
        boolean exists = productRepository.existsById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put(message, !exists);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception{
        ProductsDTO productsDTOFound = this.getById(id);
        Product product = ProductAdapter.toEntity(productsDTOFound);
        productRepository.delete(product);
        return checkByIdExists(id, "deleted");
    }


}
