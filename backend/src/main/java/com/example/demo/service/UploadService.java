package com.example.demo.service;
import com.example.demo.entity.ProductColor;
import com.example.demo.model.ImageDTO;
import com.example.demo.model.ProductColorDTO;
import com.example.demo.model.ProductsDTO;
import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;

public interface UploadService {
    Map<String, Object> upload(MultipartFile file) throws IOException;
    @Transactional
    List save(ProductColorDTO productColorDTO, List<ImageDTO> uploadResult);
    List<ImageDTO> getImagesByProductColorId(Long productColorId);
    @Transactional
    void deleteImagesByProductColor(Long productColorId);
    @Transactional
    void updateImagesByProductColor(ProductColor productColor, ProductsDTO updateProductDto);
    @Transactional
    void addNewImagesWithProductColor(ProductColor productColor, ProductsDTO updateProductDto);
    List<ImageDTO> getByProductAndColorId(Long productId, Long colorId);
}
