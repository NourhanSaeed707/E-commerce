package com.example.demo.service.Impl;
import com.example.demo.Exception.ProductSize.ProductSizeNotFoundException;
import com.example.demo.entity.*;
import com.example.demo.helper.Helper;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.service.ProductSizeService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductSizeServiceImpl implements ProductSizeService {

    @Autowired
    private ProductSizeRepository productSizeRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ProductSizeDTO> getAll() {
        List<ProductSize> productSizes = productSizeRepository.findAll();
        return productSizes.stream().map(productSize -> modelMapper.map(productSize, ProductSizeDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProductSizeDTO getById(Long id) throws Exception {
        Helper.validateId(id);
        ProductSize productSize = productSizeRepository.findById(id).orElseThrow( () ->  new ProductSizeNotFoundException(id));
        return modelMapper.map(productSize, ProductSizeDTO.class);
    }

    @Override
    public ResponseEntity<ProductSizeDTO> save(ProductSizeDTO productSizeDTO) {
        ProductSize productSize = modelMapper.map(productSizeDTO, ProductSize.class);
        productSize.setCreatedAt(Date.valueOf(LocalDate.now()));
        productSize.setProduct(productSize.getProduct());
        productSize.setSize(productSize.getSize());
        productSizeRepository.save(productSize);
        return ResponseEntity.ok(productSizeDTO);
    }

    @Override
    public ProductSize setProductSizeFields(ProductSize productSize, ProductSizeDTO productSizeDTO) {
        productSize.setLastModifiedAt(Date.valueOf(LocalDate.now()));
        ProductSize productSizeEntity = modelMapper.map(productSizeDTO, ProductSize.class);
        productSize.setSize(productSizeEntity.getSize());
        productSize.setProduct(productSizeEntity.getProduct());
        return productSize;
    }

    @Override
    public ResponseEntity<ProductSize> update(Long id, ProductSizeDTO productSizeDTO) throws Exception {
        ProductSize productSize = modelMapper.map(productSizeDTO, ProductSize.class);
        productSize = setProductSizeFields(productSize, productSizeDTO);
        return ResponseEntity.ok(productSizeRepository.save(productSize));
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message) {
        boolean exists = productSizeRepository.existsById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put(message, !exists);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception {
        ProductSizeDTO productSizeDTO = this.getById(id);
        ProductSize productSize = modelMapper.map(productSizeDTO, ProductSize.class);
        productSizeRepository.delete(productSize);
        return checkByIdExists(id, "deleted");
    }

    @Override
    @Transactional
    public void updateProductSize( ProductsDTO updateProductDto) {
        productSizeRepository.deleteByProductId(updateProductDto.getId());
        updateProductDto.getSize().forEach(sizeDTO -> {
            ProductSize productSize = new ProductSize();
            productSize.setProduct(modelMapper.map(updateProductDto, Product.class));
            productSize.setSize(modelMapper.map(sizeDTO, Size.class));
            productSizeRepository.save(productSize);
        });
    }
}
