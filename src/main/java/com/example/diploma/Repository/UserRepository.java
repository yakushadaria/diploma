package com.example.diploma.Repository;

import com.example.diploma.Entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

   // регистрация
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);


    // вход (почта + пароль || username + пароль)
    Optional<User> findByUsernameOrEmail(String username, String email);


 @Modifying
 @Transactional
 @Query("DELETE FROM User u WHERE u.username = :username")
 void deleteByUsername(@Param("username") String username);


 @Modifying
 @Transactional
 @Query(value = "DELETE FROM user_roles WHERE user_id = :userId", nativeQuery = true)
 void deleteUserRoles(@Param("userId") Long userId);

 @Modifying
 @Query(value = "DELETE FROM enrollment WHERE user_id = :userId", nativeQuery = true)
 void deleteUserEnrollments(@Param("userId") Long userId);

 @Modifying
 @Query(value = "DELETE FROM course_rating WHERE user_id = :userId", nativeQuery = true)
 void deleteUserRatings(@Param("userId") Long userId);


 @Modifying
 @Query(value = "DELETE FROM exercise_result WHERE user_id = :userId", nativeQuery = true)
 void deleteUserExerciseResults(@Param("userId") Long userId);

 @Modifying
 @Query(value = "DELETE FROM user_progress WHERE user_id = :userId", nativeQuery = true)
 void deleteUserProgress(@Param("userId") Long userId);

 @Modifying
 @Query(value = "DELETE FROM progress WHERE user_id = :userId", nativeQuery = true)
 void deleteProgress(@Param("userId") Long userId);

 @Modifying
 @Query(value = "UPDATE course SET teacher_id = NULL WHERE teacher_id = :userId", nativeQuery = true)
 void detachTeacherFromCourses(@Param("userId") Long userId);





}
