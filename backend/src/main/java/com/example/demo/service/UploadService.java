package com.example.demo.service;
import com.example.demo.model.CategoryDTO;
import com.example.demo.model.ImageDTO;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;

public interface UploadService {
    Map<String, Object> upload(MultipartFile file) throws IOException;
    List save(CategoryDTO categoryDTO, List<ImageDTO> uploadResult);
    List<ImageDTO> getImageByCategoryId(Long categoryId) throws Exception;
}
