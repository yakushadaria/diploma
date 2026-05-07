package com.example.diploma.Repository;

import com.example.diploma.Entity.Course;
import com.example.diploma.Entity.CourseRating;
import com.example.diploma.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CourseRatingRepository extends JpaRepository<CourseRating, Long> {
    Optional<CourseRating> findByUserAndCourse(User user, Course course);

    @Query("SELECT AVG(r.rating) FROM CourseRating r WHERE r.course = :course")
    Double getAverageRating(@Param("course") Course course);

    int countByCourse(Course course);
}