package com.example.diploma.Controller;

import com.example.diploma.Entity.User;
import com.example.diploma.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
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

}
