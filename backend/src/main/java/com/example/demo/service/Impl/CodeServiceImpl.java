package com.example.demo.service.Impl;
import com.example.demo.model.VerifyDTO;
import com.example.demo.service.CodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
public class CodeServiceImpl implements CodeService {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public CodeServiceImpl(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public String generateCode(String key) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 6; i++) {
            codeBuilder.append(characters.charAt(random.nextInt(characters.length())));
        }
        String code = codeBuilder.toString();
        // I make key of redis the user's email because it's unique.
        redisTemplate.opsForValue().set(key, code, 2, TimeUnit.MINUTES);
        return code;
    }

    @Override
    public boolean verifyGeneratedCode(VerifyDTO verifyDTO) {
        System.out.println("VERIIIFY: " + verifyDTO.email);
        Object cachedCode = redisTemplate.opsForValue().get(verifyDTO.email);
        System.out.println("caaache code = " + cachedCode);
//        ValueOperation s<String, Object> ops = redisTemplate.opsForValue();
//        String cachedCode = (String) ops.get(key);
        return verifyDTO.code.equals(cachedCode);
    }
}
