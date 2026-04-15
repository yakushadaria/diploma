package com.example.diploma.Service;

import com.example.diploma.Entity.Exercise;
import com.example.diploma.Repository.CourseRepository;
import com.example.diploma.Repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;

    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    public List<Exercise> getAll() {
        return exerciseRepository.findAll();
    }

    public Optional<Exercise> getById(Long id) {
        return exerciseRepository.findById(id);
    }

    public List<Exercise> getByLessonId(Long lessonId) {
        return exerciseRepository.findByLessonId(lessonId);
    }

    public Exercise save(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    public void delete(Long id) {
        exerciseRepository.deleteById(id);
    }
}
