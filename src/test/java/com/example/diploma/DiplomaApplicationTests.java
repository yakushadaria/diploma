package com.example.diploma;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/*
@SpringBootTest
class DiplomaApplicationTests {

	@Test
	void contextLoads() {
	}

}
*/



import com.example.diploma.Entity.*;
import com.example.diploma.Repository.*;
import com.example.diploma.Service.CourseService;
import com.example.diploma.Service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DiplomaApplicationTests {

	// ===================== UserService =====================

	@Mock private UserRepository userRepository;
	@Mock private PasswordEncoder passwordEncoder;
	@Mock private CourseRepository courseRepository;
	@Mock private LessonRepository lessonRepository;
	@Mock private LanguageRepository languageRepository;

	@InjectMocks private UserService userService;
	@InjectMocks private CourseService courseService;

	private User student;
	private User teacher;
	private User admin;
	private Course course;
	private Lesson lesson;

	@BeforeEach
	void setUp() {
		student = new User();
		student.setUsername("student1");
		student.setEmail("student@test.com");
		student.setPassword("hashed");
		student.setRole("STUDENT");

		teacher = new User();
		teacher.setUsername("teacher1");
		teacher.setEmail("teacher@test.com");
		teacher.setPassword("hashed");
		teacher.setRole("TEACHER");

		admin = new User();
		admin.setUsername("admin1");
		admin.setEmail("admin@test.com");
		admin.setPassword("hashed");
		admin.setRole("ADMIN");

		course = new Course();
		course.setId(1L);
		course.setTitle("Test Course");
		course.setTeacher(teacher);
		course.setActive(true);
		course.setToggleCount(0);

		lesson = new Lesson();
		lesson.setId(1L);
		lesson.setTitle("Test Lesson");
		lesson.setContent("Content");
		lesson.setCourse(course);
	}

	// ===== REGISTER =====

	@Test
	void register_success() {
		when(userRepository.existsByUsername("newuser")).thenReturn(false);
		when(userRepository.existsByEmail("new@test.com")).thenReturn(false);
		when(passwordEncoder.encode(any())).thenReturn("hashed");

		String result = userService.register("newuser", "pass123", "new@test.com");

		assertEquals("OK", result);
		verify(userRepository).save(any(User.class));
	}

	@Test
	void register_usernameTooLong() {
		String result = userService.register("thisusernameiswaytoolong", "pass", "test@test.com");
		assertEquals("Username must be <= 15 characters", result);
	}

	@Test
	void register_usernameAlreadyExists() {
		when(userRepository.existsByUsername("student1")).thenReturn(true);
		String result = userService.register("student1", "pass", "new@test.com");
		assertEquals("Username already exists", result);
	}

	@Test
	void register_emailAlreadyExists() {
		when(userRepository.existsByUsername("newuser")).thenReturn(false);
		when(userRepository.existsByEmail("student@test.com")).thenReturn(true);
		String result = userService.register("newuser", "pass", "student@test.com");
		assertEquals("Email already exists", result);
	}

	@Test
	void register_invalidEmail() {
		when(userRepository.existsByUsername("newuser")).thenReturn(false);
		when(userRepository.existsByEmail("invalidemail")).thenReturn(false);
		String result = userService.register("newuser", "pass", "invalidemail");
		assertEquals("Invalid email", result);
	}

	// ===== LOGIN =====

	@Test
	void login_success() {
		when(userRepository.findByUsernameOrEmail("student1", "student1"))
				.thenReturn(Optional.of(student));
		when(passwordEncoder.matches("pass123", "hashed")).thenReturn(true);

		String result = userService.login("student1", "pass123");
		assertEquals("OK", result);
	}

	@Test
	void login_userNotFound() {
		when(userRepository.findByUsernameOrEmail(any(), any()))
				.thenReturn(Optional.empty());
		String result = userService.login("unknown", "pass");
		assertEquals("User not found", result);
	}

	@Test
	void login_wrongPassword() {
		when(userRepository.findByUsernameOrEmail("student1", "student1"))
				.thenReturn(Optional.of(student));
		when(passwordEncoder.matches("wrongpass", "hashed")).thenReturn(false);

		String result = userService.login("student1", "wrongpass");
		assertEquals("Wrong password", result);
	}

	// ===== UPDATE EMAIL =====

	@Test
	void updateEmail_success() {
		when(userRepository.existsByEmail("new@test.com")).thenReturn(false);
		when(userRepository.findByUsername("student1")).thenReturn(Optional.of(student));

		String result = userService.updateEmail("student1", "new@test.com");
		assertEquals("OK", result);
		verify(userRepository).save(student);
	}

	@Test
	void updateEmail_invalidEmail() {
		String result = userService.updateEmail("student1", "invalidemail");
		assertEquals("Invalid email", result);
	}

	@Test
	void updateEmail_emailAlreadyExists() {
		when(userRepository.existsByEmail("existing@test.com")).thenReturn(true);
		String result = userService.updateEmail("student1", "existing@test.com");
		assertEquals("Email already exists", result);
	}

	@Test
	void updateEmail_userNotFound() {
		when(userRepository.existsByEmail("new@test.com")).thenReturn(false);
		when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());
		String result = userService.updateEmail("unknown", "new@test.com");
		assertEquals("User not found", result);
	}

	// ===== UPDATE ROLE =====

	@Test
	void updateRole_success() {
		when(userRepository.findByUsername("student1")).thenReturn(Optional.of(student));
		String result = userService.updateRole("student1", "TEACHER");
		assertEquals("OK", result);
		assertEquals("TEACHER", student.getRole());
	}

	@Test
	void updateRole_invalidRole() {
		when(userRepository.findByUsername("student1")).thenReturn(Optional.of(student));
		String result = userService.updateRole("student1", "SUPERUSER");
		assertEquals("Invalid role", result);
	}

	@Test
	void updateRole_userNotFound() {
		when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());
		String result = userService.updateRole("unknown", "TEACHER");
		assertEquals("User not found", result);
	}

	// ===== DELETE USER =====

	@Test
	void deleteUser_success() {
		when(userRepository.findByUsername("student1")).thenReturn(Optional.of(student));
		String result = userService.deleteUser("student1");
		assertEquals("OK", result);
	}

	@Test
	void deleteUser_notFound() {
		when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());
		String result = userService.deleteUser("unknown");
		assertEquals("User not found", result);
	}

	// ===== UPDATE AVATAR =====

	@Test
	void updateAvatar_success() {
		when(userRepository.findByUsername("student1")).thenReturn(Optional.of(student));
		String result = userService.updateAvatar("student1", "/uploads/avatar.jpg");
		assertEquals("OK", result);
		assertEquals("/uploads/avatar.jpg", student.getAvatar());
	}

	@Test
	void updateAvatar_userNotFound() {
		when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());
		String result = userService.updateAvatar("unknown", "/uploads/avatar.jpg");
		assertEquals("User not found", result);
	}

	// ===== UPDATE DESCRIPTION =====

	@Test
	void updateDescription_success() {
		when(userRepository.findByUsername("teacher1")).thenReturn(Optional.of(teacher));
		String result = userService.updateDescription("teacher1", "Досвідчений викладач");
		assertEquals("OK", result);
		assertEquals("Досвідчений викладач", teacher.getDescription());
	}

	// ===== CREATE COURSE =====

	@Test
	void createCourse_success() {
		when(userRepository.findByUsername("teacher1")).thenReturn(Optional.of(teacher));
		when(courseRepository.countByTeacher(teacher)).thenReturn(0);
		when(languageRepository.findByName("Англійська")).thenReturn(Optional.empty());
		when(languageRepository.save(any())).thenAnswer(i -> i.getArgument(0));
		when(courseRepository.save(any())).thenAnswer(i -> {
			Course c = i.getArgument(0);
			c.setId(1L);
			return c;
		});

		String result = courseService.createCourse("teacher1", "English A1", "Desc", "Англійська", "A1");
		assertTrue(result.startsWith("OK:"));
	}

	@Test
	void createCourse_notTeacher() {
		when(userRepository.findByUsername("student1")).thenReturn(Optional.of(student));
		String result = courseService.createCourse("student1", "Course", "Desc", "Англійська", "A1");
		assertEquals("Access denied", result);
	}

	@Test
	void createCourse_limitReached() {
		when(userRepository.findByUsername("teacher1")).thenReturn(Optional.of(teacher));
		when(courseRepository.countByTeacher(teacher)).thenReturn(25);
		String result = courseService.createCourse("teacher1", "Course", "Desc", "Англійська", "A1");
		assertEquals("Max 25 courses allowed", result);
	}

	@Test
	void createCourse_userNotFound() {
		when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());
		String result = courseService.createCourse("unknown", "Course", "Desc", "Англійська", "A1");
		assertEquals("User not found", result);
	}

	// ===== ADD LESSON =====

	@Test
	void addLesson_success() {
		when(userRepository.findByUsername("teacher1")).thenReturn(Optional.of(teacher));
		when(courseRepository.findById(1L)).thenReturn(Optional.of(course));

		String result = courseService.addLesson("teacher1", 1L, "Lesson 1", "Content", "https://youtube.com");
		assertEquals("OK", result);
		verify(lessonRepository).save(any(Lesson.class));
	}

	@Test
	void addLesson_courseNotFound() {
		when(userRepository.findByUsername("teacher1")).thenReturn(Optional.of(teacher));
		when(courseRepository.findById(99L)).thenReturn(Optional.empty());
		String result = courseService.addLesson("teacher1", 99L, "Lesson", "Content", null);
		assertEquals("Course not found", result);
	}

	@Test
	void addLesson_accessDenied() {
		when(userRepository.findByUsername("teacher2")).thenReturn(Optional.of(admin));
		when(courseRepository.findById(1L)).thenReturn(Optional.of(course));
		String result = courseService.addLesson("teacher2", 1L, "Lesson", "Content", null);
		assertEquals("Access denied", result);
	}

	// ===== UPDATE LESSON =====

	@Test
	void updateLesson_success() {
		when(lessonRepository.findById(1L)).thenReturn(Optional.of(lesson));
		String result = courseService.updateLesson("teacher1", 1L, "New Title", "New Content", null);
		assertEquals("OK", result);
		assertEquals("New Title", lesson.getTitle());
	}

	@Test
	void updateLesson_notFound() {
		when(lessonRepository.findById(99L)).thenReturn(Optional.empty());
		String result = courseService.updateLesson("teacher1", 99L, "Title", "Content", null);
		assertEquals("Lesson not found", result);
	}

	// ===== DELETE LESSON =====

	@Test
	void deleteLesson_success() {
		when(lessonRepository.findById(1L)).thenReturn(Optional.of(lesson));
		String result = courseService.deleteLesson("teacher1", 1L);
		assertEquals("OK", result);
		verify(lessonRepository).delete(lesson);
	}

	@Test
	void deleteLesson_accessDenied() {
		when(lessonRepository.findById(1L)).thenReturn(Optional.of(lesson));
		String result = courseService.deleteLesson("other_teacher", 1L);
		assertEquals("Access denied", result);
	}

	// ===== TOGGLE COURSE =====

	@Test
	void toggleCourse_success() {
		when(userRepository.findByUsername("teacher1")).thenReturn(Optional.of(teacher));
		when(courseRepository.findById(1L)).thenReturn(Optional.of(course));

		String result = courseService.toggleCourse("teacher1", 1L);
		assertEquals("OK", result);
		assertFalse(course.isActive());
		assertEquals(1, course.getToggleCount());
	}

	@Test
	void toggleCourse_limitReached() {
		course.setToggleCount(2);
		course.setToggleDate(LocalDate.now());

		when(userRepository.findByUsername("teacher1")).thenReturn(Optional.of(teacher));
		when(courseRepository.findById(1L)).thenReturn(Optional.of(course));

		String result = courseService.toggleCourse("teacher1", 1L);
		assertEquals("Можна змінювати статус лише 2 рази на день для кожного курсу", result);
	}

	@Test
	void toggleCourse_notTeacher() {
		when(userRepository.findByUsername("student1")).thenReturn(Optional.of(student));
		String result = courseService.toggleCourse("student1", 1L);
		assertEquals("Access denied", result);
	}

	@Test
	void toggleCourse_resetCounterNextDay() {
		course.setToggleCount(2);
		course.setToggleDate(LocalDate.now().minusDays(1));

		when(userRepository.findByUsername("teacher1")).thenReturn(Optional.of(teacher));
		when(courseRepository.findById(1L)).thenReturn(Optional.of(course));

		String result = courseService.toggleCourse("teacher1", 1L);
		assertEquals("OK", result);
		assertEquals(1, course.getToggleCount());
	}

	// ===== GET TEACHER COURSES =====

	@Test
	void getTeacherCourses_success() {
		when(userRepository.findByUsername("teacher1")).thenReturn(Optional.of(teacher));
		when(courseRepository.findByTeacher(teacher)).thenReturn(List.of(course));

		List<Course> courses = courseService.getTeacherCourses("teacher1");
		assertEquals(1, courses.size());
	}

	@Test
	void getTeacherCourses_userNotFound() {
		when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());
		List<Course> courses = courseService.getTeacherCourses("unknown");
		assertTrue(courses.isEmpty());
	}
}