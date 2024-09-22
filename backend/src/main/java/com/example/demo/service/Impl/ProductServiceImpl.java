package com.example.demo.service.Impl;
import com.example.demo.Exception.Products.ProductNotFoundException;
import com.example.demo.entity.*;
import com.example.demo.helper.Helper;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.service.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductFacadeService productFacadeService;
    @Autowired
    private SizeService sizeService;
    @Autowired
    private ProductSizeRepository productSizeRepository;
    @Autowired
    private ProductColorRepository productColorRepository;
    @Autowired
    private ColorService colorService;
    @Autowired
    private  ProductColorService productColorService;
    @Autowired
    private ProductSizeService productSizeService;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Page<ProductsDTO> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findAll(pageable);
        return productPage.map(this::convertToDTO);
    }

    private ProductsDTO convertToDTO(Product product) {
        ProductsDTO productsDTO = modelMapper.map(product, ProductsDTO.class);
        productsDTO.setImages(
                product.getProductColors().stream()
                        .flatMap(productColor -> productColor.getImages().stream())
                        .map(image -> modelMapper.map(image, ImageDTO.class))
                        .collect(Collectors.toList())
        );
        return productsDTO;
    }

    @Override
    public ProductsDTO getById(Long id) throws Exception {
         Helper.validateId(id);
         Product product = productRepository.findById(id).orElseThrow( () ->  new ProductNotFoundException(id));
         List<ProductSize> productSizes = productSizeRepository.findByProductId(id);
         // Get Sizes
         List<Long> sizeIds = productSizes.stream().map(productSize -> productSize.getSize().getId()).toList();
         List<SizeDTO> sizeDTOS = sizeService.getSizeByListOfIds(sizeIds);
         ProductsDTO productsDTO = modelMapper.map(product, ProductsDTO.class);
         productsDTO.setSize(sizeDTOS);
         // Get Colors
        List<ProductColor> productColors = productColorRepository.findByProductId(id);
        List<Long> colorIds = productColors.stream().map(productColor -> productColor.getColor().getId()).toList();
        List<ColorDTO> colorDTOS = colorService.getColorByListOfIds(colorIds);
        productsDTO.setColor(colorDTOS);
        return productsDTO;
    }

    @Override
    @Transactional
    public ResponseEntity<ProductsDTO> save(ProductsDTO productDTO)  {
        return ResponseEntity.ok(productFacadeService.saveProductRelations(productDTO));
    }

    @Override
    @Transactional
    public ResponseEntity<Map<String, Object>> saveProductColorImage(ProductColorImageDTO productColorImageDTO) throws Exception {
        return productFacadeService.saveProductColorImages(productColorImageDTO);
    }

    @Override
    public ProductsDTO setNonRelationFieldsDto(ProductsDTO oldProductDTO, ProductsDTO newProductDto) {
        oldProductDTO.setName(newProductDto.getName());
        oldProductDTO.setCodeNumber(newProductDto.getCodeNumber());
        oldProductDTO.setPrice(newProductDto.getPrice());
        oldProductDTO.setStock(newProductDto.getStock());
        oldProductDTO.setGender(newProductDto.getGender());
        return oldProductDTO;
    }

    @Override
    public ResponseEntity<Product> update(Long id, ProductsDTO productDTO) throws Exception {
        ProductsDTO productsDTOFound = getById(id);
        productColorService.updateProductColorImages(productsDTOFound, productDTO);
        productSizeService.updateProductSize(productDTO);
        ProductsDTO oldProductDto = setNonRelationFieldsDto(productsDTOFound, productDTO);
        Product product = modelMapper.map(oldProductDto, Product.class);
        Product savedProduct = productRepository.save(product);
        return ResponseEntity.ok(savedProduct);
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
        Product product = productRepository.getById(id);
        productRepository.delete(product);
        return checkByIdExists(id, "deleted");
    }
}
