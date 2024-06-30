package com.example.demo.service.Impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.entity.Category;
import com.example.demo.entity.Image;
import com.example.demo.model.CategoryDTO;
import com.example.demo.repository.ImageRepository;
import com.example.demo.service.UploadService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class UploadServiceImpl implements UploadService {
    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ModelMapper modelMapper;


    @Override
    public  Map<String, Object> upload(MultipartFile file) throws IOException {
        System.out.println("insiiiide upload image service upload function");
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        System.out.println("result:");
        System.out.println(uploadResult);
//        return save(uploadResult);
        return uploadResult;
    }

//    @Override
//    public Map<String, Object> save(Map<String, Object> uploadResult) {
//        String imageUrl = (String) uploadResult.get("secure_url");
//        Image image = new Image();
//        image.setImageUrl(imageUrl);
//        System.out.println("imaaaaaaage url: ");
//        System.out.println(image.getImageUrl());
//        imageRepository.save(image);
//        return uploadResult;
//    }

    @Override
    public Map<String, Object> save(CategoryDTO categoryDTO, Map uploadResult) {
        String imageUrl = (String) uploadResult.get("secure_url");
        Category category = modelMapper.map(categoryDTO, Category.class);
        Image image = new Image();
        image.setImageUrl(imageUrl);
        image.setCategory(category);
        System.out.println("imaaaaaaage url: ");
        System.out.println(image.getImageUrl());
        imageRepository.save(image);
        return uploadResult;
    }


}
