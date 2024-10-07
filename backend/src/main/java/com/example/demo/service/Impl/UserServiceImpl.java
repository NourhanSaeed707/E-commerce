package  com.example.demo.service.Impl;
import com.example.demo.Exception.User.UserNotFound;
import com.example.demo.entity.UserEntity;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

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
}