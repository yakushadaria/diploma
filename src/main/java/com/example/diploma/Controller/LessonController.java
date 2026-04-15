package com.example.diploma.Controller;

import com.example.diploma.Entity.Lesson;
import com.example.diploma.Service.LessonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@CrossOrigin
public class LessonController {

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping
    public List<Lesson> getAll() {
        return lessonService.getAll();
    }

    @GetMapping("/{id}")
    public Lesson getById(@PathVariable Long id) {
        return lessonService.getById(id).orElse(null);
    }

    @GetMapping("/course/{courseId}")
    public List<Lesson> getByCourse(@PathVariable Long courseId) {
        return lessonService.getByCourseId(courseId);
    }

    @PostMapping
    public Lesson create(@RequestBody Lesson lesson) {
        return lessonService.save(lesson);
    }

    @PutMapping("/{id}")
    public Lesson update(@PathVariable Long id, @RequestBody Lesson lesson) {
        lesson.setId(id);
        return lessonService.save(lesson);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        lessonService.delete(id);
    }
}
