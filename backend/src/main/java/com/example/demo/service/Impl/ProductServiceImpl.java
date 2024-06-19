package com.example.demo.service.Impl;
import com.example.demo.Adapter.ProductAdapter;
import com.example.demo.Exception.Products.ProductNotFoundException;
import com.example.demo.entity.Product;
import com.example.demo.helper.Helper;
import com.example.demo.model.ProductsDTO;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductService;
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
    public ResponseEntity<Product> save(ProductsDTO productDTO) {
        Product product = ProductAdapter.toEntity(productDTO);
        product.setCreatedAt(Date.valueOf(LocalDate.now()));
        productRepository.save(product);
        return ResponseEntity.ok(product);
    }

    @Override
    public Product setProductFields(Product product, ProductsDTO productsDTO) {
        product.setLastModifiedAt(Date.valueOf(LocalDate.now()));
        product.setName(productsDTO.getName());
        product.setCodeNumber(productsDTO.getCodeNumber());
        product.setPrice(productsDTO.getPrice());
        product.setSize(productsDTO.getSize());
        product.setCategory(productsDTO.getCategory());
        product.setGender(productsDTO.getGender());
        product.setStock(productsDTO.getStock());
        product.setColor(productsDTO.getColor());
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
