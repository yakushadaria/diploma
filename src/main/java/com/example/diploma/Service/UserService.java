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



    // login -- вход ++
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


    // для авторизации после входа логин (куки) +++
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }







    // Оновлення пошти ++
    public String updateEmail(String username, String newEmail) {
        if (!newEmail.contains("@")) return "Invalid email";
        if (userRepository.existsByEmail(newEmail)) return "Email already exists";

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return "User not found";

        user.setEmail(newEmail);
        userRepository.save(user);
        return "OK";
    }



    // Оновлення аватара ++
    public String updateAvatar(String username, String avatarUrl) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return "User not found";

        user.setAvatar(avatarUrl);
        userRepository.save(user);
        return "OK";
    }



    // Метод получения всех пользователей +++
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }



    // изменение роли (только АДМИН) +++
    public String updateRole(String username, String role) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return "User not found";

        if (!List.of("STUDENT", "TEACHER", "ADMIN").contains(role)) {
            return "Invalid role";
        }

        user.setRole(role);
        userRepository.save(user);
        return "OK";
    }



    // Удаление пользователя
    public String deleteUser(String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return "User not found";
        userRepository.deleteByUsername(username);
        return "OK";
    }




    public Optional<User> getById(Long id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }




}
