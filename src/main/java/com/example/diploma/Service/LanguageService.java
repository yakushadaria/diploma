package com.example.diploma.Service;

import com.example.diploma.Entity.Language;
import com.example.diploma.Repository.CourseRepository;
import com.example.diploma.Repository.LanguageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LanguageService {

    private final LanguageRepository languageRepository;

    public LanguageService(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }

    public List<Language> getAll() {
        return languageRepository.findAll();
    }

    public Optional<Language> getById(Long id) {
        return languageRepository.findById(id);
    }

    public Language save(Language language) {
        return languageRepository.save(language);
    }

    public void delete(Long id) {
        languageRepository.deleteById(id);
    }
}
