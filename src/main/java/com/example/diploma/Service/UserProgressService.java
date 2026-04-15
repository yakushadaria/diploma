package com.example.diploma.Service;

import com.example.diploma.Entity.UserProgress;
import com.example.diploma.Repository.CourseRepository;
import com.example.diploma.Repository.UserProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserProgressService {

    private final UserProgressRepository userProgressRepository;

    public UserProgressService(UserProgressRepository userProgressRepository) {
        this.userProgressRepository = userProgressRepository;
    }

    public List<UserProgress> getAll() {
        return userProgressRepository.findAll();
    }

    public Optional<UserProgress> getById(Long id) {
        return userProgressRepository.findById(id);
    }

    public List<UserProgress> getByUserId(Long userId) {
        return userProgressRepository.findByUserId(userId);
    }

    public UserProgress save(UserProgress progress) {
        return userProgressRepository.save(progress);
    }

    public void delete(Long id) {
        userProgressRepository.deleteById(id);
    }
}
