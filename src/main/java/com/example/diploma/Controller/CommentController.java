package com.example.diploma.Controller;

import com.example.diploma.Entity.Comment;
import com.example.diploma.Service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin
public class CommentController {

    @Autowired
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<Comment> getAll() {
        return commentService.getAll();
    }

    @GetMapping("/lesson/{lessonId}")
    public List<Comment> getByLesson(@PathVariable Long lessonId) {
        return commentService.getByLessonId(lessonId);
    }

    @PostMapping
    public Comment create(@RequestBody Comment comment) {
        return commentService.save(comment);
    }

    // UPDATE (только свой)
    @PutMapping("/{id}")
    public Comment update(
            @PathVariable Long id,
            @RequestParam Long userId,
            @RequestBody Comment updatedComment
    ) {
        return commentService.update(id, userId, updatedComment.getContent());
    }

    // DELETE (только свой)
    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Long id,
            @RequestParam Long userId
    ) {
        commentService.delete(id, userId);
    }
}
