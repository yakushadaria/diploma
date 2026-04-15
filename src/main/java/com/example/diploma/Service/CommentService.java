package com.example.diploma.Service;

import com.example.diploma.Entity.Comment;
import com.example.diploma.Repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getAll() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getById(Long id) {
        return commentRepository.findById(id);
    }

    public List<Comment> getByLessonId(Long lessonId) {
        return commentRepository.findByLessonId(lessonId);
    }

    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }


    // UPDATE (только свой комментарий)
    public Comment update(Long id, Long userId, String content) {

        Comment comment = commentRepository
                .findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Комментарий не найден или нет доступа"));

        comment.setContent(content);

        return commentRepository.save(comment);
    }

    // DELETE (только свой комментарий)
    public void delete(Long id, Long userId) {

        Comment comment = commentRepository
                .findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Комментарий не найден или нет доступа"));

        commentRepository.delete(comment);
    }

}
