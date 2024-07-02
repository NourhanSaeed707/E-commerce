package com.example.demo.service;
import com.example.demo.model.CategoryDTO;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;

public interface UploadService {
    Map<String, Object> upload(MultipartFile file) throws IOException;
//    Map<String, Object> save(Map<String, Object> uploadResult);
    List save(CategoryDTO categoryDTO, List<String> uploadResult);
}
