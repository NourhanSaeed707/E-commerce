package com.example.demo.controller;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.demo.entity.Image;
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
    private Cloudinary cloudinary;
    @Autowired
    private UploadService uploadService;

    @PostMapping("/upload")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map> upload(@RequestParam("file") MultipartFile file) {
        System.out.println("insiiiide upload image controller");
        try {
            Map uploadResult = uploadService.upload(file);
            return ResponseEntity.ok(uploadResult);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }
}
