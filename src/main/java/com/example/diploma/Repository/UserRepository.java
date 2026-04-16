package com.example.diploma.Repository;

import com.example.diploma.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

   // регистрация
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);


    // вход (почта + пароль || username + пароль)
    Optional<User> findByUsernameOrEmail(String username, String email);

    Optional<User> findByEmail(String email);
}
