package com.example.diploma.Repository;

import com.example.diploma.Entity.Exercise;
import com.example.diploma.Entity.Lesson;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    List<Exercise> findByLesson(Lesson lesson);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM exercise WHERE lesson_id IN (SELECT id FROM lesson WHERE course_id = :courseId)", nativeQuery = true)
    void deleteExercisesByCourseId(@Param("courseId") Long courseId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM exercise_result WHERE exercise_id IN (SELECT id FROM exercise WHERE lesson_id IN (SELECT id FROM lesson WHERE course_id = :courseId))", nativeQuery = true)
    void deleteByCourseId(@Param("courseId") Long courseId);

}