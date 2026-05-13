package com.example.diploma.Repository;

import com.example.diploma.Entity.Course;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.diploma.Entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CourseRepository extends JpaRepository<Course, Long> {

    List<Course> findByTeacher(User teacher);
    int countByTeacher(User teacher);


    // для удаления курса (препод только свои)
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM enrollment WHERE course_id = :id", nativeQuery = true)
    void deleteEnrollmentsByCourseId(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM lesson WHERE course_id = :id", nativeQuery = true)
    void deleteLessonsByCourseId(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM course WHERE id = :id", nativeQuery = true)
    void deleteCourseById(@Param("id") Long id);

}
