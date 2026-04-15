package com.example.diploma.Controller;

import com.example.diploma.Entity.Language;
import com.example.diploma.Service.CourseService;
import com.example.diploma.Service.LanguageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/languages")
@CrossOrigin
public class LanguageController {

    private final LanguageService languageService;

    public LanguageController(LanguageService languageService) {
        this.languageService = languageService;
    }

    @GetMapping
    public List<Language> getAll() {
        return languageService.getAll();
    }

    @PostMapping
    public Language create(@RequestBody Language language) {
        return languageService.save(language);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        languageService.delete(id);
    }
}
