package com.example.demo.Auth;

import com.example.demo.entity.UserEntity;
import com.example.demo.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/v2/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(authenticationService.register(request, response));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate (@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(authenticationService.authenticate(request,response));
    }
    @GetMapping("/user")
    public ResponseEntity<Optional<UserEntity>> getUserInfo() {
//        System.out.println("first insiiide function of get user::");
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        UserEntity user = (UserEntity) authentication.getPrincipal();
//        System.out.println(authentication.getPrincipal());
//        return ResponseEntity.ok(user);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Optional<UserEntity> user = userRepository.findByEmail(userDetails.getUsername());
        System.out.println("useeer: " + user);
        return ResponseEntity.ok(user);

    }


}