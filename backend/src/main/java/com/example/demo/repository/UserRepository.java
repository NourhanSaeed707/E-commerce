package com.example.demo.repository;
import com.example.demo.entity.Role;
import com.example.demo.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long>{
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByRole(Role role);
    Optional<UserEntity> findById(Long id);

    UserEntity findByResetToken(String token);
}
