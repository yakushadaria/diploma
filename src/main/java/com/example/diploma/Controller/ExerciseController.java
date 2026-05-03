package com.example.diploma.Controller;

import com.example.diploma.Entity.Exercise;
import com.example.diploma.Entity.ExerciseResult;
import com.example.diploma.Entity.Lesson;
import com.example.diploma.Entity.User;
import com.example.diploma.Repository.ExerciseRepository;
import com.example.diploma.Repository.ExerciseResultRepository;
import com.example.diploma.Repository.LessonRepository;
import com.example.diploma.Repository.UserRepository;
import com.example.diploma.Service.CourseService;
import com.example.diploma.Service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

    /*
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

    */



    private final ExerciseRepository exerciseRepository;
    private final ExerciseResultRepository exerciseResultRepository;
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;

    public ExerciseController(ExerciseRepository exerciseRepository,
                              ExerciseResultRepository exerciseResultRepository,
                              LessonRepository lessonRepository,
                              UserRepository userRepository) {
        this.exerciseRepository = exerciseRepository;
        this.exerciseResultRepository = exerciseResultRepository;
        this.lessonRepository = lessonRepository;
        this.userRepository = userRepository;
    }




    // получить задания урока
    @GetMapping("/lesson/{lessonId}")
    public ResponseEntity<?> getExercises(@PathVariable Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId).orElse(null);
        if (lesson == null) return ResponseEntity.status(404).body("Lesson not found");
        return ResponseEntity.ok(exerciseRepository.findByLesson(lesson));
    }



    // создать задание
    @PostMapping("/lesson/{lessonId}")
    public ResponseEntity<String> createExercise(
            @PathVariable Long lessonId,
            @CookieValue(name = "user", required = false) String username,
            @RequestBody Map<String, String> body
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null || !user.getRole().equals("TEACHER")) {
            return ResponseEntity.status(403).body("Access denied");
        }

        Lesson lesson = lessonRepository.findById(lessonId).orElse(null);
        if (lesson == null) return ResponseEntity.status(404).body("Lesson not found");

        Exercise exercise = new Exercise();
        exercise.setQuestion(body.get("question"));
        exercise.setCorrectAnswer(body.get("correctAnswer"));
        exercise.setType(body.get("type"));
        exercise.setOptions(body.get("options"));
        exercise.setLesson(lesson);
        exerciseRepository.save(exercise);

        return ResponseEntity.ok("Exercise created");
    }



    // удалить задание
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExercise(
            @PathVariable Long id,
            @CookieValue(name = "user", required = false) String username
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");
        exerciseRepository.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }



    // проверить ответ
    @PostMapping("/{id}/answer")
    public ResponseEntity<?> submitAnswer(
            @PathVariable Long id,
            @CookieValue(name = "user", required = false) String username,
            @RequestBody Map<String, String> body
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");

        User user = userRepository.findByUsername(username).orElse(null);
        Exercise exercise = exerciseRepository.findById(id).orElse(null);
        if (user == null || exercise == null) return ResponseEntity.status(404).body("Not found");

        String userAnswer = body.get("answer");
        boolean correct = exercise.getCorrectAnswer().trim().equalsIgnoreCase(userAnswer.trim());

        ExerciseResult result = exerciseResultRepository
                .findByUserAndExercise(user, exercise)
                .orElse(new ExerciseResult());

        result.setUser(user);
        result.setExercise(exercise);
        result.setUserAnswer(userAnswer);
        result.setCorrect(correct);
        exerciseResultRepository.save(result);

        return ResponseEntity.ok(Map.of("correct", correct));
    }



    // получить результаты студента
    @GetMapping("/lesson/{lessonId}/results")
    public ResponseEntity<?> getResults(
            @PathVariable Long lessonId,
            @CookieValue(name = "user", required = false) String username
    ) {
        if (username == null) return ResponseEntity.status(401).body("Not logged in");

        User user = userRepository.findByUsername(username).orElse(null);
        Lesson lesson = lessonRepository.findById(lessonId).orElse(null);
        if (user == null || lesson == null) return ResponseEntity.status(404).body("Not found");

        List<Exercise> exercises = exerciseRepository.findByLesson(lesson);
        List<ExerciseResult> results = exerciseResultRepository.findByUserAndExerciseIn(user, exercises);

        return ResponseEntity.ok(results);
    }

    

}
