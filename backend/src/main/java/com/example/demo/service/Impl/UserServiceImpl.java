package  com.example.demo.service.Impl;
import com.example.demo.Exception.User.UserNotFound;
import com.example.demo.entity.UserEntity;
import com.example.demo.model.ResetPasswordDTO;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EmailService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.UUID;
import jakarta.mail.MessagingException;

@Service
public class UserServiceImpl implements UserService {
    private static final int EXPIRATION_TIME = 15; // Token expiration in minutes

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;


    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserEntity createAdmin(UserEntity user) {
        userRepository.save(user);
        return user;
    }

    @Override
    public UserEntity update(Long id, UserEntity userEntity) {
        UserEntity existingUser = userRepository.findById(id).orElseThrow(() -> new UserNotFound(id));
        updateUserFields(existingUser, userEntity);
        return userRepository.save(existingUser);
    }

    private void updateUserFields(UserEntity existingUser, UserEntity userEntity) {
        existingUser.setEmail(userEntity.getEmail());
        existingUser.setMobile(userEntity.getMobile());
        existingUser.setFirstName(userEntity.getFirstName());
        existingUser.setLastName(userEntity.getLastName());
    }

    @Override
    public void sendPasswordResetEmail(String email) throws MessagingException, UnsupportedEncodingException {
        UserEntity user = userRepository.findByEmail(email).orElseThrow( () -> new RuntimeException("User not found"));
        // Generate reset token
        String resetToken = UUID.randomUUID().toString();
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(EXPIRATION_TIME);
        // Store token in user entity or a separate table (you should store it and its expiration time)
        user.setResetToken(resetToken);
        user.setResetTokenExpiration(expirationTime);
        userRepository.save(user);
        // Send email with reset link
        String resetLink = "http://localhost:3000/reset-password?token=" + resetToken;
        String content = "<h1>Password Reset Request</h1>" +
                "<p>Click the link below to reset your password:</p>" +
                "<p><a href=\"" + resetLink + "\">Reset Password</a></p>";
        emailService.sendEmail(email, "Password Reset", content);
    }

    @Override
    public UserEntity resetPassword(ResetPasswordDTO resetPasswordDTO) {
        UserEntity user = userRepository.findByResetToken(resetPasswordDTO.getToken()); // Handle invalid token case
        // Check if token is expired
        if (user.getResetTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Reset token has expired");
        }
        // Reset the password and clear the reset token
        user.setPassword(passwordEncoder.encode(resetPasswordDTO.getNewPassword())); // You should hash the password here
        user.setResetToken(null);
        user.setResetTokenExpiration(null);
        return userRepository.save(user);
    }
}