package com.example.diploma.Repository;

import com.example.diploma.Entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByLessonId(Long lessonId);

    // найти комментарий по id и userId (ключевая проверка)
    Optional<Comment> findByIdAndUserId(Long id, Long userId);
}