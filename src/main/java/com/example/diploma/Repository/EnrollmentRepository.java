package com.example.diploma.Repository;

import com.example.diploma.Entity.Course;
import com.example.diploma.Entity.Enrollment;
import com.example.diploma.Entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    boolean existsByUserAndCourse(User user, Course course);
    Optional<Enrollment> findByUserAndCourse(User user, Course course);

    List<Enrollment> findByUser(User user);

    @Modifying
    @Transactional
    @Query("DELETE FROM Enrollment e WHERE e.id = :id")
    void deleteById(@Param("id") Long id);

    int countByUser(User user);

    int countByCourse(Course course);
}