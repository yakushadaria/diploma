package com.example.diploma.Controller;

import com.example.diploma.Entity.Progress;
import com.example.diploma.Service.ProgressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin
public class UserProgressController {

    private final ProgressService progressService;

    public UserProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public List<Progress> getAll() {
        return progressService.getAll();
    }

    @GetMapping("/{id}")
    public Progress getById(@PathVariable Long id) {
        return progressService.getById(id).orElse(null);
    }

    @GetMapping("/user/{userId}")
    public List<Progress> getByUser(@PathVariable Long userId) {
        return progressService.getByUserId(userId);
    }

    @PostMapping
    public Progress create(@RequestBody Progress progress) {
        return progressService.save(progress);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        progressService.delete(id);
    }
}
