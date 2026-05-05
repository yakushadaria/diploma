package com.example.diploma.Repository;

import com.example.diploma.Entity.Exercise;
import com.example.diploma.Entity.ExerciseResult;
import com.example.diploma.Entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ExerciseResultRepository extends JpaRepository<ExerciseResult, Long> {
    List<ExerciseResult> findByUserAndExerciseIn(User user, List<Exercise> exercises);
    Optional<ExerciseResult> findByUserAndExercise(User user, Exercise exercise);

    @Modifying
    @Transactional
    @Query("DELETE FROM ExerciseResult r WHERE r.exercise = :exercise")
    void deleteByExercise(@Param("exercise") Exercise exercise);

}