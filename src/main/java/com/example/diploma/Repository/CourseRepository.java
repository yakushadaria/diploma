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

    //List<Course> findByTitleContaining(String keyword);

    List<Course> findByTeacher(User teacher);
    int countByTeacher(User teacher);


}
