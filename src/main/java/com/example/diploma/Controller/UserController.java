package com.example.diploma.Controller;

import com.example.diploma.Entity.User;
import com.example.diploma.Service.CourseService;
import com.example.diploma.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    // jyjdktyyz
    @PostMapping("/update-email")
    public ResponseEntity<String> updateEmail(
            @CookieValue(name = "user", required = false) String username,
            @RequestBody Map<String, String> body
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");

        String result = userService.updateEmail(username, body.get("email"));
        if (result.equals("OK")) return ResponseEntity.ok("Email updated");
        return ResponseEntity.badRequest().body(result);
    }



    // Оновлення аватара
    @PostMapping("/update-avatar")
    public ResponseEntity<String> updateAvatar(
            @CookieValue(name = "user", required = false) String username,
            @RequestParam("file") MultipartFile file
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");
        if (file.isEmpty()) return ResponseEntity.badRequest().body("File is empty");

        try {
            // папка для сохранения
            String uploadDir = "uploads/avatars/";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            // уникальное имя файла
            String filename = username + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + filename);
            Files.write(path, file.getBytes());

            // сохраняем путь в базу
            String avatarUrl = "/uploads/avatars/" + filename;
            String result = userService.updateAvatar(username, avatarUrl);

            if (result.equals("OK")) return ResponseEntity.ok(avatarUrl);
            return ResponseEntity.badRequest().body(result);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Upload failed");
        }
    }










    @GetMapping("/admin/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


    @PutMapping("/admin/change-role/{userId}")
    public User changeRole(@PathVariable Long userId, @RequestParam String role) {

        return userService.changeRole(userId, role);
    }

    @GetMapping
    public List<User> getAll() {
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.getById(id).orElse(null);
    }




    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return userService.save(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
