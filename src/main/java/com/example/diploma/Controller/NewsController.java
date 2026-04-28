package com.example.diploma.Controller;

import com.example.diploma.Entity.News;
import com.example.diploma.Entity.User;
import com.example.diploma.Repository.NewsRepository;
import com.example.diploma.Repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsRepository newsRepository;
    private final UserRepository userRepository;

    public NewsController(NewsRepository newsRepository, UserRepository userRepository) {
        this.newsRepository = newsRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllNews() {
        return ResponseEntity.ok(newsRepository.findAllByOrderByCreatedAtDesc());
    }


    @PostMapping
    public ResponseEntity<String> createNews(
            @CookieValue(name = "user", required = false) String username,
            @RequestBody Map<String, String> body
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null || !user.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Access denied");
        }

        News news = new News();
        news.setTitle(body.get("title"));
        news.setContent(body.get("content"));
        news.setImageUrl(body.get("imageUrl"));
        news.setCreatedAt(LocalDateTime.now());
        newsRepository.save(news);

        return ResponseEntity.ok("News created");
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(
            @CookieValue(name = "user", required = false) String username,
            @RequestParam("file") MultipartFile file
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null || !user.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Access denied");
        }

        try {
            String uploadDir = "uploads/news/";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + filename);
            Files.write(path, file.getBytes());

            return ResponseEntity.ok("/uploads/news/" + filename);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Upload failed");
        }
    }



    @PutMapping("/{id}")
    public ResponseEntity<String> updateNews(
            @PathVariable Long id,
            @CookieValue(name = "user", required = false) String username,
            @RequestBody Map<String, String> body
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null || !user.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Access denied");
        }

        News news = newsRepository.findById(id).orElse(null);
        if (news == null) return ResponseEntity.status(404).body("News not found");

        news.setTitle(body.get("title"));
        news.setContent(body.get("content"));
        news.setImageUrl(body.get("imageUrl"));
        newsRepository.save(news);

        return ResponseEntity.ok("News updated");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNews(
            @PathVariable Long id,
            @CookieValue(name = "user", required = false) String username
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null || !user.getRole().equals("ADMIN")) {
            return ResponseEntity.status(403).body("Access denied");
        }

        newsRepository.deleteById(id);
        return ResponseEntity.ok("News deleted");
    }
}
