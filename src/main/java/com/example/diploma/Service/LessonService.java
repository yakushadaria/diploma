package com.example.diploma.Service;

import com.example.diploma.Entity.Lesson;
import com.example.diploma.Repository.CourseRepository;
import com.example.diploma.Repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LessonService {

    private final LessonRepository lessonRepository;

    public LessonService(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    public List<Lesson> getAll() {
        return lessonRepository.findAll();
    }

    public Optional<Lesson> getById(Long id) {
        return lessonRepository.findById(id);
    }

    public List<Lesson> getByCourseId(Long courseId) {
        return lessonRepository.findByCourseId(courseId);
    }

    public Lesson save(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    public void delete(Long id) {
        lessonRepository.deleteById(id);
    }
}
