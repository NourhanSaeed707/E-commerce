package com.example.demo.service.Impl;
import com.example.demo.Exception.Color.ColorNotFoundException;
import com.example.demo.Exception.Products.ProductNotFoundException;
import com.example.demo.Exception.Size.SizeNotFoundException;
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
    private ColorRepository colorRepository;
    @Autowired
    private SizeRepository sizeRepository;
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
         ProductsDTO productsDTO = modelMapper.map(product, ProductsDTO.class);
         List imageDTOS = uploadService.getImageByProductId(productsDTO.getId());
         productsDTO.setImages(imageDTOS);
         return productsDTO;
    }

    @Override
    @Transactional
    public ResponseEntity<ProductsDTO> save(ProductsDTO productDTO)  {
        ProductsDTO productFacadeDTO = productFacade.saveProductRelations(productDTO);
        return ResponseEntity.ok(productDTO);
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
    public ColorDTO updateProductColor(ProductsDTO productFoundDTO, ProductsDTO updateProductDto){
        Color color = colorRepository.findById(productFoundDTO.getColor().getId()).orElseThrow(
                () -> new ColorNotFoundException(productFoundDTO.getColor().getId()));
        color.setColor( updateProductDto.getColor().getColor());
        color.setLastModifiedAt(Date.valueOf(LocalDate.now()));
        return modelMapper.map(colorRepository.save(color), ColorDTO.class);
    }

    @Override
    public SizeDTO updateProductSize(ProductsDTO productFoundDTO, ProductsDTO updateProductDto) {
        Size size = sizeRepository.findById(productFoundDTO.getSize().getId()).orElseThrow(
                () -> new SizeNotFoundException(productFoundDTO.getSize().getId())
        );
        size.setSize(updateProductDto.getSize().getSize());
        size.setLastModifiedAt(Date.valueOf(LocalDate.now()));
        return modelMapper.map(sizeRepository.save(size), SizeDTO.class);
    }

    @Override
    public ProductsDTO setNonRelationFieldsDto(ProductsDTO oldProductDTO, ProductsDTO newProductDto) {
        oldProductDTO.setGender(newProductDto.getGender());
        oldProductDTO.setName(newProductDto.getName());
        oldProductDTO.setCodeNumber(newProductDto.getCodeNumber());
        oldProductDTO.setPrice(newProductDto.getPrice());
        oldProductDTO.setStock(newProductDto.getStock());
        return oldProductDTO;
    }

    @Override
    public ResponseEntity<Product> update(Long id, ProductsDTO productDTO) throws Exception {
        ProductsDTO productsDTOFound = getById(id);
        ColorDTO savedColor = updateProductColor(productsDTOFound, productDTO);
        SizeDTO savedSize = updateProductSize(productsDTOFound, productDTO);
        ProductsDTO oldProductDto = setNonRelationFieldsDto(productsDTOFound, productDTO);
//        oldProductDto.setCategory(savedCategory);
        oldProductDto.setSize(savedSize);
        oldProductDto.setColor(savedColor);
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
