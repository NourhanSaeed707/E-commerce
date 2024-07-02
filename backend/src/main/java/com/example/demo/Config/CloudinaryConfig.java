package com.example.demo.Config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "nourhan",
                "api_key", "732713456181146",
                "api_secret", "GNi1s_fMEabf5dRXfJHA-O7DeSQ"
        ));
    }
}
