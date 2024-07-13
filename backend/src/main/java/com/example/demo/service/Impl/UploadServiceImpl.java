package com.example.demo.service.Impl;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.Exception.Products.ProductNotFoundException;
import com.example.demo.entity.Image;
import com.example.demo.entity.Product;
import com.example.demo.model.ImageDTO;
import com.example.demo.repository.ImageRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.UploadService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UploadServiceImpl implements UploadService {
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
     private ProductRepository productRepository;

    @Override
    public  Map<String, Object> upload(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return uploadResult;
    }

    public List<ImageDTO> save(Product product, List<ImageDTO> uploadResult) {
        Product productFound = productRepository.findById(product.getId()).orElseThrow(
                () -> new ProductNotFoundException(product.getId())
        );
        for (ImageDTO image : uploadResult) {
            Image imageInstance = new Image();
            imageInstance.setImageUrl(image.getImageUrl());
            imageInstance.setProduct(productFound);
            imageRepository.save(imageInstance);
        }
        return uploadResult;
    }

    // Inside getImageByCategoryId method
    @Override
    public List<ImageDTO> getImageByProductId(Long productId) throws Exception {
        List<Image> images = imageRepository.findByProductId(productId);
        return images.stream()
                .map(image -> modelMapper.map(image, ImageDTO.class))
                .collect(Collectors.toList());
    }

}
