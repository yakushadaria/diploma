package com.example.diploma.Repository;

import com.example.diploma.Entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

   // регистрация
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);


    // вход (почта + пароль || username + пароль)
    Optional<User> findByUsernameOrEmail(String username, String email);

 @Modifying
 @Transactional
 @Query("DELETE FROM User u WHERE u.username = :username")
 void deleteByUsername(@Param("username") String username);

}
