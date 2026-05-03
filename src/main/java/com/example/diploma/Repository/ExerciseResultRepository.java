package com.example.diploma.Repository;

import com.example.diploma.Entity.Exercise;
import com.example.diploma.Entity.ExerciseResult;
import com.example.diploma.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExerciseResultRepository extends JpaRepository<ExerciseResult, Long> {
    List<ExerciseResult> findByUserAndExerciseIn(User user, List<Exercise> exercises);
    Optional<ExerciseResult> findByUserAndExercise(User user, Exercise exercise);
}