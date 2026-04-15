package com.example.diploma.Controller;

import com.example.diploma.Entity.Exercise;
import com.example.diploma.Service.CourseService;
import com.example.diploma.Service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin
public class ExerciseController {

    private final ExerciseService exerciseService;

    public  ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<Exercise> getAll() {
        return exerciseService.getAll();
    }

    @GetMapping("/{id}")
    public Exercise getById(@PathVariable Long id) {
        return exerciseService.getById(id).orElse(null);
    }

    @GetMapping("/lesson/{lessonId}")
    public List<Exercise> getByLesson(@PathVariable Long lessonId) {
        return exerciseService.getByLessonId(lessonId);
    }

    @PostMapping
    public Exercise create(@RequestBody Exercise exercise) {
        return exerciseService.save(exercise);
    }

    @PutMapping("/{id}")
    public Exercise update(@PathVariable Long id, @RequestBody Exercise exercise) {
        exercise.setId(id);
        return exerciseService.save(exercise);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        exerciseService.delete(id);
    }
}
