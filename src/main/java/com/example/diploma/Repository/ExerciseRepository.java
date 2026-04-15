package com.example.diploma.Repository;

import com.example.diploma.Entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    List<Exercise> findByLessonId(Long lessonId);
}