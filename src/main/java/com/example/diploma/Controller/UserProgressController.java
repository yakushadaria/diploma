package com.example.diploma.Controller;

import com.example.diploma.Entity.UserProgress;
import com.example.diploma.Service.CourseService;
import com.example.diploma.Service.UserProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin
public class UserProgressController {

    private final UserProgressService progressService;

    public UserProgressController(UserProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public List<UserProgress> getAll() {
        return progressService.getAll();
    }

    @GetMapping("/{id}")
    public UserProgress getById(@PathVariable Long id) {
        return progressService.getById(id).orElse(null);
    }

    @GetMapping("/user/{userId}")
    public List<UserProgress> getByUser(@PathVariable Long userId) {
        return progressService.getByUserId(userId);
    }

    @PostMapping
    public UserProgress create(@RequestBody UserProgress progress) {
        return progressService.save(progress);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        progressService.delete(id);
    }
}
