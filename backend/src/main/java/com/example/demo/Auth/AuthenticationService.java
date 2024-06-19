package com.example.demo.Auth;

import com.example.demo.Config.JwtService;
import com.example.demo.entity.Role;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request, HttpServletResponse response) {
        var user = UserEntity.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .mobile(request.getMobile())
                .nationality(request.getNationality())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        ResponseCookie cookie = ResponseCookie.from("token", jwtToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(86400)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

//    public AuthenticationResponse authenticate(AuthenticationRequest request) {
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getEmail(),
//                        request.getPassword()
//                )
//        );
//        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
//        var jwtToken = jwtService.generateToken(user);
//        return AuthenticationResponse.builder().token(jwtToken).build();
//    }

    // new
//    public AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getEmail(),
//                        request.getPassword()
//                )
//        );
//        System.out.println("authentiiicate");
//        System.out.println(authentication);
//        if (authentication.isAuthenticated()) {
//            System.out.println("inside if condition in authenticate service function");
//            var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
//            var accessToken = jwtService.generateToken(user);
//            ResponseCookie cookie = ResponseCookie.from("accessToken", accessToken)
//                    .httpOnly(true)
//                    .secure(false)
//                    .path("/")
//                    .maxAge(600)
//                    .build();
//
//            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
//            return AuthenticationResponse.builder().token(accessToken).build();
//        }
//
//        else {
////            throw new UsernameNotFoundException("invalid user request..!!");
//            System.out.println("noooooo useeeer");
//            return null;
//        }
//    }

    public AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            var user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            var jwtToken = jwtService.generateToken(user);
            ResponseCookie cookie = ResponseCookie.from("token", jwtToken)
                    .httpOnly(true)
                    .secure(false) // Set to true in production
                    .path("/")
                    .maxAge(86400) // 10 minutes
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            return AuthenticationResponse.builder().token(jwtToken).build();
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("User not found", e);
        }
    }
}