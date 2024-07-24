package com.example.demo.service.Impl;
import com.example.demo.Exception.Products.ProductNotFoundException;
import com.example.demo.entity.*;
import com.example.demo.facade.ProductFacade;
import com.example.demo.helper.Helper;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.service.*;
import org.springframework.transaction.annotation.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UploadService uploadService;
    @Autowired
    private ProductFacade productFacade;
    @Autowired
    private SizeService sizeService;
    @Autowired
    private ProductSizeRepository productSizeRepository;
    @Autowired
    private  ProductColorRepository productColorRepository;
    @Autowired
    private ProductSizeService productSizeService;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ProductsDTO> getAll () {
        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> modelMapper.map(product, ProductsDTO.class))
                .collect(Collectors.toList());

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
         return productsDTO;
    }

    @Override
    @Transactional
    public ResponseEntity<ProductsDTO> save(ProductsDTO productDTO)  {
        return ResponseEntity.ok(productFacade.saveProductRelations(productDTO));
    }

    @Override
    @Transactional
    public ResponseEntity<Map<String, Object>> saveProductColorImage(ProductColorImageDTO productColorImageDTO) throws Exception {
        return productFacade.saveProductColorImages(productColorImageDTO);
    }

    @Override
    public Product setProductFields(Product product, ProductsDTO productsDTO) {
        Product productEntity = modelMapper.map(productsDTO, Product.class);
        product.setLastModifiedAt(Date.valueOf(LocalDate.now()));
        product.setName(productEntity.getName());
        product.setCodeNumber(productEntity.getCodeNumber());
        product.setPrice(productEntity.getPrice());
        product.setGender(productEntity.getGender());
        product.setStock(productEntity.getStock());
        return product;
    }

    @Override
    public void updateProductColorImages(ProductsDTO productFoundDTO, ProductsDTO updateProductDto){
        ProductColor productColor = productColorRepository.findByProductIdAndColorId(updateProductDto.getId(), updateProductDto.getColor().get(0).getId());
        if(productColor != null) {
            uploadService.updateImagesByProductColor(productColor, updateProductDto);
        }
        else{
          uploadService.addNewImagesWithProductColor(productColor, updateProductDto);
        }
    }

    @Override
    public void updateProductSize( ProductsDTO updateProductDto) {
        updateProductDto.getSize().forEach(size -> {
            if(!productSizeService.productSizeExists(updateProductDto.getId(), size.getId())) {
//                ProductSizeDTO productSizeDTO = new ProductSizeDTO();
//                productSizeDTO.setProduct(updateProductDto);
//                productSizeDTO.setSize(modelMapper.map(size, SizeDTO.class));
//                productSizeRepository.save(modelMapper.map(productSizeDTO, ProductSize.class));
                System.out.println("size in for looop: " +size);
                productSizeService.savedProductSize(updateProductDto, modelMapper.map(size, SizeDTO.class));
            }
            else{
                break;
                productSizeService.updateProductSize(updateProductDto, modelMapper.map(size, SizeDTO.class));
            }
        });
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
        updateProductColorImages(productsDTOFound, productDTO);
        updateProductSize(productDTO);
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
