package com.example.demo.service.Impl;
import io.github.bucket4j.*;
import org.springframework.stereotype.Service;
import java.time.Duration;

@Service
public class RateLimiterService {
    private final Bucket bucket;

    public RateLimiterService() {
        Bandwidth limit = Bandwidth.classic(5, Refill.intervally(10, Duration.ofMinutes(1)));
        this.bucket = Bucket4j.builder().addLimit(limit).build();
    }
    public boolean isRateLimited() {
        return !bucket.tryConsume(1);
    }
}