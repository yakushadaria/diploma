package com.example.diploma.Service;

import com.example.diploma.Entity.Progress;
import com.example.diploma.Repository.ProgressRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgressService {

    private final ProgressRepository progressRepository;

    public ProgressService(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    public List<Progress> getAll() {
        return progressRepository.findAll();
    }

    public Optional<Progress> getById(Long id) {
        return progressRepository.findById(id);
    }

    public List<Progress> getByUserId(Long userId) {
        return progressRepository.findByUserId(userId);
    }

    public Progress save(Progress progress) {
        return progressRepository.save(progress);
    }

    public void delete(Long id) {
        progressRepository.deleteById(id);
    }
}
