package com.example.demo.service;
import com.example.demo.entity.Product;
import com.example.demo.model.ImageDTO;
import com.example.demo.model.ProductColorDTO;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;

public interface UploadService {
    Map<String, Object> upload(MultipartFile file) throws IOException;
//    List save(Product product, List<ImageDTO> uploadResult);
//    List<ImageDTO> getImageByProductId(Long productId) throws Exception;
    List save(ProductColorDTO productColorDTO, List<ImageDTO> uploadResult);
}
