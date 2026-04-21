package com.example.diploma.Controller;

import com.example.diploma.Entity.User;
import com.example.diploma.Repository.UserRepository;
import com.example.diploma.Service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final UserService userService;


   /* public AuthController(UserService userService ) {
        this.userService = userService;
    }*/





    private final UserRepository userRepository;

    public AuthController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }






    // регистрация
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {

        String result = userService.register(
                user.getUsername(),
                user.getPassword(),
                user.getEmail()
        );

        if (result.equals("OK")) {
            return ResponseEntity.ok("Registered successfully");
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }


/*
    // login -- вход
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {

        String result = userService.login(
                user.getUsername(),
                user.getPassword()
        );

        if (result.equals("OK")) {
            return ResponseEntity.ok("Login success");
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
 */




    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse response) {
        String result = userService.login(user.getUsername(), user.getPassword());

        if (!result.equals("OK")) {
            return ResponseEntity.badRequest().body(result);
        }

        User loggedUser = userService.findByUsername(user.getUsername());

        Cookie cookie = new Cookie("user", loggedUser.getUsername());
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(cookie);

        loggedUser.setPassword(null);
        return ResponseEntity.ok(loggedUser);
    }



    // Получить текущего юзера
    @GetMapping("/me")
    public ResponseEntity<?> me(@CookieValue(name = "user", required = false) String username) {
        if (username == null) {
            return ResponseEntity.status(401).body("Not logged in");
        }

        User user = userRepository.findByUsername(username).orElse(null);

        if (user == null) {
            return ResponseEntity.status(401).body("User not found");
        }

        user.setPassword(null);
        return ResponseEntity.ok(user);
    }



    // Выход
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("user", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // удаляем куку
        response.addCookie(cookie);
        return ResponseEntity.ok("Logged out");
    }



}


