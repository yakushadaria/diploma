package com.example.diploma.Service;

import com.example.diploma.Entity.*;
import com.example.diploma.Entity.Course;
import com.example.diploma.Repository.CourseRepository;
import com.example.diploma.Repository.LanguageRepository;
import com.example.diploma.Repository.LessonRepository;
import com.example.diploma.Repository.UserRepository;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;

    private  final LanguageRepository languageRepository;

    public CourseService(CourseRepository courseRepository,
                         LessonRepository lessonRepository,
                         UserRepository userRepository,
                         LanguageRepository languageRepository) {
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.userRepository = userRepository;
        this.languageRepository = languageRepository;
    }


    public String createCourse(String username, String title, String description, String language, String level) {
        User teacher = userRepository.findByUsername(username).orElse(null);
        if (teacher == null) return "User not found";
        if (!teacher.getRole().equals("TEACHER")) return "Access denied";
        if (courseRepository.countByTeacher(teacher) >= 25) return "Max 25 courses allowed";

        Course course = new Course();
        course.setTitle(title);
        course.setDescription(description);
        course.setLevel(level);
        course.setTeacher(teacher);

        // найти язык по названию
        if (language != null && !language.isEmpty()) {
            Language lang = languageRepository.findByName(language).orElse(null);
            if (lang == null) {
                lang = new Language();
                lang.setName(language);
                lang = languageRepository.save(lang);
            }
            course.setLanguage(lang);
        }

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



    // препод иожет удалить сам свой курс
    @Transactional
    public String deleteCourse(String username, Long courseId) {
        User teacher = userRepository.findByUsername(username).orElse(null);
        if (teacher == null) return "User not found";

        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) return "Course not found";

        if (course.getTeacher() == null || !course.getTeacher().getUsername().equals(username)) {
            return "Access denied";
        }

        courseRepository.deleteEnrollmentsByCourseId(courseId);
        courseRepository.deleteLessonsByCourseId(courseId);
        courseRepository.deleteCourseById(courseId);
        return "OK";
    }






    public String toggleCourse(String username, Long courseId) {
        User teacher = userRepository.findByUsername(username).orElse(null);
        if (teacher == null) return "User not found";
        if (!teacher.getRole().equals("TEACHER")) return "Access denied";

        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) return "Course not found";

        if (course.getTeacher() == null || !course.getTeacher().getUsername().equals(username)) {
            return "Access denied";
        }

        LocalDate today = LocalDate.now();

        // сброс счётчика если новый день
        if (course.getToggleDate() == null || !course.getToggleDate().equals(today)) {
            course.setToggleCount(0);
            course.setToggleDate(today);
        }

        if (course.getToggleCount() >= 2) {
            return "Можна змінювати статус лише 2 рази на день для кожного курсу";
        }

        course.setActive(!course.isActive());
        course.setToggleCount(course.getToggleCount() + 1);
        course.setToggleDate(today);
        courseRepository.save(course);
        return "OK";
    }




}
