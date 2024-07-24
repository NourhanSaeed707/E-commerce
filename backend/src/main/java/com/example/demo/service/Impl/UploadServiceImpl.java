package com.example.demo.service.Impl;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.entity.Image;
import com.example.demo.entity.ProductColor;
import com.example.demo.model.ImageDTO;
import com.example.demo.model.ProductColorDTO;
import com.example.demo.repository.ImageRepository;
import com.example.demo.repository.ProductColorRepository;
import com.example.demo.service.UploadService;
import jakarta.transaction.Transactional;
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
    private ProductColorRepository productColorRepository;

    @Override
    public  Map<String, Object> upload(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return uploadResult;
    }

    public List<ImageDTO> save(ProductColorDTO productColorDTO, List<ImageDTO> uploadResult) {
        ProductColor productColor = productColorRepository.getById(productColorDTO.getId());
        for (ImageDTO image : uploadResult) {
            Image imageInstance = new Image();
            imageInstance.setImageUrl(image.getImageUrl());
            imageInstance.setProductColor(productColor);
            imageRepository.save(imageInstance);
        }
        return uploadResult;
    }

    @Override
    public List<ImageDTO> getImagesByProductColorId(Long productColorId) {
        List<Image> imageEntities = imageRepository.findByProductColorId(productColorId);
        List<ImageDTO> imageDTOS = imageEntities.stream()
                .map(image -> modelMapper.map(image, ImageDTO.class))
                .collect(Collectors.toList());
        return  imageDTOS;
    }

    @Transactional
    @Override
    public void deleteImagesByProductColor(Long productColorId) {
        imageRepository.deleteByProductColorId(productColorId);
    }

}
