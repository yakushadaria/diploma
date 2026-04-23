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
//@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }



    // Оновлення пошти ++
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



    // Оновлення аватара ++
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



    // получить всех пользователей ++
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(
            @CookieValue(name = "user", required = false) String username
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");

        User currentUser = userService.findByUsername(username);
        if (currentUser == null || !currentUser.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Access denied");
        }

        List<User> users = userService.getAllUsers();
        users.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(users);
    }



    // изменить роль ++
    @PostMapping("/update-role")
    public ResponseEntity<String> updateRole(
            @CookieValue(name = "user", required = false) String username,
            @RequestBody Map<String, String> body
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");

        User currentUser = userService.findByUsername(username);
        if (currentUser == null || !currentUser.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Access denied");
        }

        String result = userService.updateRole(body.get("username"), body.get("role"));
        if (result.equals("OK")) return ResponseEntity.ok("Role updated");
        return ResponseEntity.badRequest().body(result);
    }




    // Удаление пользователя по username (только АДМИН)
    @DeleteMapping("/delete/{username}")
    public ResponseEntity<String> deleteUser(
            @CookieValue(name = "user", required = false) String currentUsername,
            @PathVariable String username
    ) {
        if (currentUsername == null) return ResponseEntity.status(401).body("Not logged in");

        User currentUser = userService.findByUsername(currentUsername);
        if (currentUser == null || !currentUser.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Access denied");
        }

        if (currentUsername.equals(username)) {
            return ResponseEntity.badRequest().body("Не можна видалити себе");
        }

        String result = userService.deleteUser(username);
        if (result.equals("OK")) return ResponseEntity.ok("User deleted");
        return ResponseEntity.badRequest().body(result);
    }



   // Для поиска пользователей (в пошуковій строке)
    @GetMapping("/find/{username}")
    public ResponseEntity<?> findUser(
            @CookieValue(name = "user", required = false) String currentUsername,
            @PathVariable String username
    ) {
        if (currentUsername == null) return ResponseEntity.status(401).body("Not logged in");

        User currentUser = userService.findByUsername(currentUsername);
        if (currentUser == null || !currentUser.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Access denied");
        }

        User user = userService.findByUsername(username);
        if (user == null) return ResponseEntity.status(404).body("User not found");

        user.setPassword(null);
        return ResponseEntity.ok(user);
    }



    // Изменение описания у учителя
    @PostMapping("/update-description")
    public ResponseEntity<String> updateDescription(
            @CookieValue(name = "user", required = false) String username,
            @RequestBody Map<String, String> body
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");

        String result = userService.updateDescription(username, body.get("description"));
        if (result.equals("OK")) return ResponseEntity.ok("Description updated");
        return ResponseEntity.badRequest().body(result);
    }











}
