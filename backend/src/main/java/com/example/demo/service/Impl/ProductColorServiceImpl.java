package com.example.demo.service.Impl;
import com.example.demo.Exception.ProductColor.ProductColorNotFoundException;
import com.example.demo.entity.*;
import com.example.demo.helper.Helper;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.service.ProductColorService;
import com.example.demo.service.UploadService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductColorServiceImpl implements ProductColorService {
    @Autowired
    private ProductColorRepository productColorRepository;
    @Autowired
    private UploadService uploadService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ImageRepository imageRepository;

    @Override
    public List<ProductColorDTO> getAll() {
        List<ProductColor> productColors = productColorRepository.findAll();
        return productColors.stream().map(productColor -> modelMapper.map(productColor, ProductColorDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProductColorDTO getById(Long id) throws Exception {
        Helper.validateId(id);
        ProductColor productColor = productColorRepository.findById(id).orElseThrow( () ->  new ProductColorNotFoundException(id));
        return modelMapper.map(productColor, ProductColorDTO.class);
    }

    @Override
    public ProductColorDTO getOneByProductColorIds(ProductColorIdsDTO productColorIdsDTO) {
        ProductColor productColor = productColorRepository.findByProductIdAndColorId(productColorIdsDTO.getProductId(), productColorIdsDTO.getColorId());
        return modelMapper.map(productColor, ProductColorDTO.class);
    }

    @Override
    public ResponseEntity<ProductColorDTO> save(ProductColorDTO productColorDTO) {
        ProductColor productColor = modelMapper.map(productColorDTO, ProductColor.class);
        productColor.setCreatedAt(Date.valueOf(LocalDate.now()));
        productColor.setProduct(productColor.getProduct());
        productColor.setColor(productColor.getColor());
        ProductColor saved = productColorRepository.save(productColor);
        return  ResponseEntity.ok(modelMapper.map(saved, ProductColorDTO.class));
    }

    @Override
    public ProductColor setProductColorFields(ProductColor productColor, ProductColorDTO productColorDTO) {
        productColor.setLastModifiedAt(Date.valueOf(LocalDate.now()));
        ProductColor productColorEntity = modelMapper.map(productColorDTO, ProductColor.class);
        productColor.setColor(productColorEntity.getColor());
        productColor.setProduct(productColorEntity.getProduct());
        return productColor;
    }

    @Override
    public ResponseEntity<ProductColor> update(Long id, ProductColorDTO productColorDTO) throws Exception {
        ProductColorDTO productColorFoundDTO = getById(id);
        ProductColor productColor = modelMapper.map(productColorFoundDTO, ProductColor.class);
        productColor = setProductColorFields(productColor, productColorFoundDTO);
        return ResponseEntity.ok(productColorRepository.save(productColor));
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message) {
        boolean exists = productColorRepository.existsById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put(message, !exists);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception {
        ProductColorDTO productColorDTO = this.getById(id);
        ProductColor productColor = modelMapper.map(productColorDTO, ProductColor.class);
        productColorRepository.delete(productColor);
        return checkByIdExists(id, "deleted");
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
    public ProductColorDTO getByProductAndColorId(Long productId, Long colorId) {
        ProductColor productColor = productColorRepository.findByProductIdAndColorId(productId, colorId);
        System.out.println("prooooooduct color id: " + productColor.getId());
        return modelMapper.map(productColor, ProductColorDTO.class);
    }

    @Override
    public List<ImageDTO> getImages(Long productId, Long colorId) {
        ProductColorDTO productColorDTO = this.getByProductAndColorId(productId, colorId);
        List<Image> images = List.of();
        if (productColorDTO != null && productColorDTO.getId() != null) {
            images = imageRepository.findByProductColorId(productColorDTO.getId());
            System.out.println("imaaaaages by product color id: " + images);
        }
        return  images.stream().map(image -> modelMapper.map(image, ImageDTO.class) ).collect(Collectors.toList());
    }

}
