package com.example.diploma.Service;

import com.example.diploma.Entity.*;
import com.example.diploma.Entity.Course;
import com.example.diploma.Repository.CourseRepository;
import com.example.diploma.Repository.LessonRepository;
import com.example.diploma.Repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;

    public CourseService(CourseRepository courseRepository,
                         LessonRepository lessonRepository,
                         UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.userRepository = userRepository;
    }



    public String createCourse(String username, String title, String description) {
        User teacher = userRepository.findByUsername(username).orElse(null);
        if (teacher == null) return "User not found";
        if (!teacher.getRole().equals("TEACHER")) return "Access denied";
        if (courseRepository.countByTeacher(teacher) >= 30) return "Max 30 courses allowed";

        Course course = new Course();
        course.setTitle(title);
        course.setDescription(description);
        course.setTeacher(teacher);
        courseRepository.save(course);
        return "OK:" + course.getId();
    }



    public String addLesson(String username, Long courseId, String title, String content) {
        User teacher = userRepository.findByUsername(username).orElse(null);
        if (teacher == null) return "User not found";

        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) return "Course not found";
        if (!course.getTeacher().getUsername().equals(username)) return "Access denied";

        Lesson lesson = new Lesson();
        lesson.setTitle(title);
        lesson.setContent(content);
        lesson.setCourse(course);
        lessonRepository.save(lesson);
        return "OK";
    }


    public String updateLesson(String username, Long lessonId, String title, String content) {
        Lesson lesson = lessonRepository.findById(lessonId).orElse(null);
        if (lesson == null) return "Lesson not found";
        if (!lesson.getCourse().getTeacher().getUsername().equals(username)) return "Access denied";

        lesson.setTitle(title);
        lesson.setContent(content);
        lessonRepository.save(lesson);
        return "OK";
    }

    public String deleteLesson(String username, Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId).orElse(null);
        if (lesson == null) return "Lesson not found";
        if (!lesson.getCourse().getTeacher().getUsername().equals(username)) return "Access denied";

        lessonRepository.delete(lesson);
        return "OK";
    }


    public List<Course> getTeacherCourses(String username) {
        User teacher = userRepository.findByUsername(username).orElse(null);
        if (teacher == null) return List.of();
        return courseRepository.findByTeacher(teacher);
    }





    public Optional<Course> getById(Long id) {
        return courseRepository.findById(id);
    }

    public Course save(Course course) {
        return courseRepository.save(course);
    }

    public void delete(Long id) {
        courseRepository.deleteById(id);
    }
}
