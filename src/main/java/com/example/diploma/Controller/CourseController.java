package com.example.diploma.Controller;

import com.example.diploma.Entity.Course;
import com.example.diploma.Entity.Enrollment;
import com.example.diploma.Entity.User;
import com.example.diploma.Repository.CourseRepository;
import com.example.diploma.Repository.EnrollmentRepository;
import com.example.diploma.Repository.UserRepository;
import com.example.diploma.Service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {


    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseService courseService;

    public CourseController(CourseRepository courseRepository,
                            EnrollmentRepository enrollmentRepository,
                            UserRepository userRepository,
                            CourseService courseService) {
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.courseService = courseService;
    }



    // получить все курсы
    @GetMapping
    public ResponseEntity<?> getAllCourses() {
        List<Course> courses = courseRepository.findAll()
                .stream()
                .filter(Course::isActive)
                .toList();
        return ResponseEntity.ok(courses);
    }



    // курсы студента — должен быть ПЕРЕД /{id}
    // /enrolled — возвращает список всех курсов на которые записан студент.
    // Используется на странице "Моє навчання".
    @GetMapping("/enrolled")
    public ResponseEntity<?> getEnrolledCourses(
            @CookieValue(name = "user", required = false) String username
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return ResponseEntity.status(401).body("User not found");

        List<Enrollment> enrollments = enrollmentRepository.findByUser(user);
        List<Course> courses = enrollments.stream()
                .map(Enrollment::getCourse)
                .filter(Course::isActive)
                .toList();

        return ResponseEntity.ok(courses);
    }



    // покинуть курс студент — должен быть ПЕРЕД /{id}
    @DeleteMapping("/unenroll/{courseId}")
    public ResponseEntity<String> unenroll(
            @PathVariable Long courseId,
            @CookieValue(name = "user", required = false) String username
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return ResponseEntity.status(401).body("User not found");

        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) return ResponseEntity.status(404).body("Course not found");

        Enrollment enrollment = enrollmentRepository.findByUserAndCourse(user, course).orElse(null);
        if (enrollment == null) return ResponseEntity.badRequest().body("Not enrolled");

        enrollmentRepository.deleteById(enrollment.getId());
        return ResponseEntity.ok("Unenrolled successfully");
    }




    // проверить записан ли студент на конкретный курс -- перед /{id}
    // чтобі можно біло покинуть
    // /{id}/enrolled — возвращает true/false записан ли студент на конкретный курс с этим id.
    // Используется на странице курса чтобы показать кнопку "Приєднатись" или "Покинути".
    @GetMapping("/{id}/enrolled")
    public ResponseEntity<?> isEnrolled(
            @PathVariable Long id,
            @CookieValue(name = "user", required = false) String username
    ) {
        if (username == null) return ResponseEntity.ok(false);

        User user = userRepository.findByUsername(username).orElse(null);
        Course course = courseRepository.findById(id).orElse(null);

        if (user == null || course == null) return ResponseEntity.ok(false);

        return ResponseEntity.ok(enrollmentRepository.existsByUserAndCourse(user, course));
    }


    // получить курс по id
    @GetMapping("/{id}")
    public ResponseEntity<?> getCourse(@PathVariable Long id) {
        Course course = courseRepository.findById(id).orElse(null);
        if (course == null) return ResponseEntity.status(404).body("Course not found");
        return ResponseEntity.ok(course);
    }



    // записаться на курс
    @PostMapping("/{id}/enroll")
    public ResponseEntity<String> enroll(
            @PathVariable Long id,
            @CookieValue(name = "user", required = false) String username
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) return ResponseEntity.status(401).body("User not found");

        Course course = courseRepository.findById(id).orElse(null);
        if (course == null) return ResponseEntity.status(404).body("Course not found");

        if (!course.isActive()) {
            return ResponseEntity.badRequest().body("Курс закрито");
        }

        // ← проверка лимита для студента
        if (enrollmentRepository.countByUser(user) >= 25) {
            return ResponseEntity.badRequest().body("Max 25 courses allowed");
        }

        if (enrollmentRepository.existsByUserAndCourse(user, course)) {
            return ResponseEntity.badRequest().body("Already enrolled");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollmentRepository.save(enrollment);

        return ResponseEntity.ok("Enrolled successfully");
    }



    // создать курс
    @PostMapping("/create")
    public ResponseEntity<String> createCourse(
            @CookieValue(name = "user", required = false) String username,
            @RequestBody Map<String, String> body
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");
        String result = courseService.createCourse(
                username,
                body.get("title"),
                body.get("description"),
                body.get("language"),
                body.get("level")
                );
        if (result.startsWith("OK")) return ResponseEntity.ok(result);
        return ResponseEntity.badRequest().body(result);
    }



    // добавить урок
    @PostMapping("/{id}/lessons")
    public ResponseEntity<String> addLesson(
            @PathVariable Long id,
            @CookieValue(name = "user", required = false) String username,
            @RequestBody Map<String, String> body
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");
        String result = courseService.addLesson(username, id, body.get("title"), body.get("content"));
        if (result.equals("OK")) return ResponseEntity.ok("Lesson added");
        return ResponseEntity.badRequest().body(result);
    }



    // обновить урок
    @PutMapping("/lessons/{lessonId}")
    public ResponseEntity<String> updateLesson(
            @PathVariable Long lessonId,
            @CookieValue(name = "user", required = false) String username,
            @RequestBody Map<String, String> body
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");
        String result = courseService.updateLesson(username, lessonId, body.get("title"), body.get("content"));
        if (result.equals("OK")) return ResponseEntity.ok("Lesson updated");
        return ResponseEntity.badRequest().body(result);
    }


    // удалить урок
    @DeleteMapping("/lessons/{lessonId}")
    public ResponseEntity<String> deleteLesson(
            @PathVariable Long lessonId,
            @CookieValue(name = "user", required = false) String username
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");
        String result = courseService.deleteLesson(username, lessonId);
        if (result.equals("OK")) return ResponseEntity.ok("Lesson deleted");
        return ResponseEntity.badRequest().body(result);
    }



    // курсы учителя
    @GetMapping("/my")
    public ResponseEntity<?> getMyCourses(
            @CookieValue(name = "user", required = false) String username
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");
        return ResponseEntity.ok(courseService.getTeacherCourses(username));
    }



    // учитель может удалять свои курсі
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(
            @PathVariable Long id,
            @CookieValue(name = "user", required = false) String username
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");
        String result = courseService.deleteCourse(username, id);
        if (result.equals("OK")) return ResponseEntity.ok("Course deleted");
        return ResponseEntity.badRequest().body(result);
    }



    // открытие и закрытие курсов для учителя
    @PostMapping("/{id}/toggle")
    public ResponseEntity<String> toggleCourse(
            @PathVariable Long id,
            @CookieValue(name = "user", required = false) String username
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");
        String result = courseService.toggleCourse(username, id);
        if (result.equals("OK")) return ResponseEntity.ok("OK");
        return ResponseEntity.badRequest().body(result);
    }



    // подсчет студентов на каждом курсе для учителя
    @GetMapping("/{id}/students-count")
    public ResponseEntity<?> getStudentsCount(@PathVariable Long id) {
        Course course = courseRepository.findById(id).orElse(null);
        if (course == null) return ResponseEntity.status(404).body(0);
        return ResponseEntity.ok(enrollmentRepository.countByCourse(course));
    }


}
