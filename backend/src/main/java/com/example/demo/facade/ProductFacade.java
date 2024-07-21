package com.example.demo.facade;
import com.example.demo.entity.Product;
import com.example.demo.model.*;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ProductFacade {
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

    public void saveProductSize(ProductsDTO productDTO) {
        for (int i = 0; i < productDTO.getSize().size(); i++) {
            ProductSizeDTO productSizeDTO = new ProductSizeDTO();
            productSizeDTO.setSize(productDTO.getSize().get(i));
            productSizeDTO.setProduct(productDTO);
            productSizeDTO.setCreatedAt(Date.valueOf(LocalDate.now()));
            productSizeService.save(productSizeDTO);
        }
    }
    public ProductsDTO saveProductRelations(ProductsDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);
        product.setCreatedAt(Date.valueOf(LocalDate.now()));
        Product savedProduct = productRepository.save(product);
        productDTO.setId(savedProduct.getId());
        saveProductSize(productDTO);
        return productDTO;
    }

    public ResponseEntity<Map<String, Object>> saveProductColorImages(ProductColorImageDTO productColorImageDTO) throws Exception {
        ColorDTO colorDTO = colorService.getById(productColorImageDTO.getColorId());
        Product productEntity = productRepository.getById(productColorImageDTO.getProductId());
        ProductsDTO productsDTO = modelMapper.map(productEntity, ProductsDTO.class);
        ProductColorDTO productColorDTO = new ProductColorDTO();
        productColorDTO.setColor(colorDTO);
        productColorDTO.setProduct(productsDTO);
        productColorDTO.setCreatedAt(Date.valueOf(LocalDate.now()));
        ProductColorDTO savedProductColor = productColorService.save(productColorDTO).getBody();
        uploadService.save(savedProductColor, productColorImageDTO.getImages());
        Map<String, Object> response = new HashMap<>();
        response.put("status", 200);
        response.put("data", savedProductColor);
        return ResponseEntity.ok(response);
    }
}
