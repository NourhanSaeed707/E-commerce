package com.example.demo.controller;
import com.example.demo.model.ImageDTO;
import com.example.demo.service.ProductColorService;
import com.example.demo.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/images")
@CrossOrigin("*")
public class ImageUploadController {
    @Autowired
    private UploadService uploadService;

    @PostMapping("/upload")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map> upload(@RequestParam("file") MultipartFile file) {
        try {
            Map uploadResult = uploadService.upload(file);
            return ResponseEntity.ok(uploadResult);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/get/images/{productColorId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public List<ImageDTO> getImagesByProductColorId(@PathVariable Long productColorId) {
        return uploadService.getImagesByProductColorId(productColorId);
    }

}
