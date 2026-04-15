package com.example.diploma.Controller;

import com.example.diploma.Entity.User;
import com.example.diploma.Service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        userService.register(user.getUsername(), user.getPassword());
        return "OK";
    }

    @PostMapping("/login")
    public String login() {
        return "OK"; // поки без JWT
    }

}
