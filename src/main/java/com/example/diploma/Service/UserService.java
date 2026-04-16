package com.example.diploma.Service;

import com.example.diploma.DTO.UserRegisterDto;
import com.example.diploma.Entity.Role;
import com.example.diploma.Entity.User;
import com.example.diploma.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }



    // регистрация +++
    public String register(String username, String password, String email) {

        // перевірка username
        if (username.length() > 15) {
            return "Username must be <= 15 characters";
        }

        if (userRepository.existsByUsername(username)) {
            return "Username already exists";
        }

        // перевірка email
        if (userRepository.existsByEmail(email)) {
            return "Email already exists";
        }

        // перевірка email
        if (!email.contains("@")) {
            return "Invalid email";
        }


        // створення
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setRole("STUDENT");

        userRepository.save(user);

        return "OK";
    }



    // login -- вход
    public String login(String login, String password) {

        Optional<User> optionalUser =
                userRepository.findByUsernameOrEmail(login, login);

        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return "Wrong password";
        }

        return "OK";
    }







    public User changeRole(Long userId, String role) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRoles(Set.of(Role.valueOf(role)));

        return userRepository.save(user);
    }


    // Метод для получения всех пользователей
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public List<User> getAll() {
        return userRepository.findAll();
    }

    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }











}
