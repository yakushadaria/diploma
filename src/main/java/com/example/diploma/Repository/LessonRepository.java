package com.example.diploma.Repository;

import com.example.diploma.Entity.Lesson;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByCourseId(Long courseId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Lesson l WHERE l.course.id = :courseId")
    void deleteByCourseId(@Param("courseId") Long courseId);

}