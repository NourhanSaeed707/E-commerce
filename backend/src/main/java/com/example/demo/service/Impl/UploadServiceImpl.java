package com.example.demo.service.Impl;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.entity.Category;
import com.example.demo.entity.Image;
import com.example.demo.model.CategoryDTO;
import com.example.demo.model.ImageDTO;
import com.example.demo.repository.ImageRepository;
import com.example.demo.service.CategoryService;
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
    private CategoryService categoryService;

    @Override
    public  Map<String, Object> upload(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return uploadResult;
    }

    @Override
    public List save(CategoryDTO categoryDTO, List<String> uploadResult) {
//        String imageUrl = (String) uploadResult.get("secure_url");
        Category category = modelMapper.map(categoryDTO, Category.class);
        for(String imageUrl: uploadResult) {
            System.out.println("imaaage inside loop: ");
            System.out.println(imageUrl);
            Image imageInstance = new Image();
            imageInstance.setImageUrl(imageUrl);
            imageInstance.setCategory(category);
            imageRepository.save(imageInstance);
        }
        return uploadResult;
    }

    @Override
    public List<ImageDTO> getImageByCategoryId(Long categoryId) throws Exception{
        List<Image> images;
        images = imageRepository.findByCategoryId(categoryId);
        System.out.println("imaaaaaages with categoryId: " + images);
        return images.stream().map(image -> modelMapper.map(image, ImageDTO.class)).toList();
    }

}
