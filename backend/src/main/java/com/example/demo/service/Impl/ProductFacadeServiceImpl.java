package com.example.demo.service.Impl;
import com.example.demo.entity.Product;
import com.example.demo.model.*;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
public class ProductFacadeServiceImpl implements ProductFacadeService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SizeService sizeService;
    @Autowired
    private ProductSizeService productSizeService;
    @Autowired
    private ColorService colorService;
    @Autowired
    private ProductColorService productColorService;
    @Autowired
    private UploadService uploadService;
    @Autowired
    private ModelMapper modelMapper;

    LocalDate today = LocalDate.now();

    @Override
    public void saveProductSize(ProductsDTO productDTO) {
        productDTO.getSize().forEach( size -> {
            ProductSizeDTO productSizeDTO = new ProductSizeDTO();
            productSizeDTO.setSize(size);
            productSizeDTO.setProduct(productDTO);
            productSizeDTO.setCreatedAt(Date.valueOf(today));
            productSizeService.save(productSizeDTO);
        });
    }

    @Override
    public ProductsDTO saveProductRelations(ProductsDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);
        product.setCreatedAt(Date.valueOf(today));
        Product savedProduct = productRepository.save(product);
        productDTO.setId(savedProduct.getId());
        saveProductSize(productDTO);
        return productDTO;
    }

    @Override
    public ProductColorDTO setProductColorFields(ProductColorImageDTO productColorImageDTO) throws Exception {
        ColorDTO colorDTO = colorService.getById(productColorImageDTO.getColorId());
        Product productEntity = productRepository.getById(productColorImageDTO.getProductId());
        ProductsDTO productsDTO = modelMapper.map(productEntity, ProductsDTO.class);
        ProductColorDTO productColorDTO = new ProductColorDTO();
        productColorDTO.setColor(colorDTO);
        productColorDTO.setProduct(productsDTO);
        productColorDTO.setCreatedAt(Date.valueOf(today));
        return productColorService.save(productColorDTO).getBody();
    }

    @Override
    public ResponseEntity<Map<String, Object>> saveProductColorImages(ProductColorImageDTO productColorImageDTO) throws Exception {
        try {
            ProductColorDTO savedProductColor = setProductColorFields(productColorImageDTO);
            uploadService.save(savedProductColor, productColorImageDTO.getImages());
            Map<String, Object> response = new HashMap<>();
            response.put("status", 200);
            response.put("data", savedProductColor);
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", 500);
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
