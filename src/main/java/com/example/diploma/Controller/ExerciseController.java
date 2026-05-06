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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exercises")
public class ExerciseController {

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

        Exercise exercise = exerciseRepository.findById(id).orElse(null);
        if (exercise == null) return ResponseEntity.status(404).body("Not found");

        // сначала удаляем результаты
        exerciseResultRepository.deleteByExercise(exercise);
        // потом само задание
        exerciseRepository.deleteById(id);

        return ResponseEntity.ok("Deleted");
    }






    /*
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
        boolean correct;

        if (exercise.getType().equals("MATCH")) {
            Map<String, String> correctPairs = parsePairs(exercise.getCorrectAnswer());
            Map<String, String> userPairs = parsePairs(userAnswer);
            correct = correctPairs.equals(userPairs);
        } else if (exercise.getType().equals("SPEAKING")) {
            String correctClean = exercise.getCorrectAnswer().trim().toLowerCase()
                    .replaceAll("[^a-zA-Zа-яА-ЯіІїЇєЄ ]", "");
            String userClean = userAnswer.trim().toLowerCase()
                    .replaceAll("[^a-zA-Zа-яА-ЯіІїЇєЄ ]", "");
            correct = correctClean.equals(userClean);
        } else {
            correct = exercise.getCorrectAnswer().trim().equalsIgnoreCase(userAnswer.trim());
        }

        ExerciseResult result = exerciseResultRepository
                .findByUserAndExercise(user, exercise)
                .orElse(new ExerciseResult());

        result.setUser(user);
        result.setExercise(exercise);
        result.setUserAnswer(userAnswer);
        result.setCorrect(correct);

        if (exercise.getType().equals("SPEAKING")) {
            int currentAttempts = result.getAttempts();
            if (currentAttempts >= 50) {
                return ResponseEntity.badRequest().body(Map.of("error", "Максимум 50 спроб"));
            }
            result.setAttempts(currentAttempts + 1);

            String[] correctWords = exercise.getCorrectAnswer().trim().toLowerCase().split(" ");
            String[] userWords = userAnswer.trim().toLowerCase().split(" ");
            int matches = 0;
            for (String w : correctWords) {
                for (String uw : userWords) {
                    if (w.equals(uw)) { matches++; break; }
                }
            }
            int accuracy = (int) Math.round((double) matches / correctWords.length * 100);

            if (accuracy > result.getBestAccuracy()) {
                result.setBestAccuracy(accuracy);
            }
        }

        exerciseResultRepository.save(result);

        Map<String, Object> response = new HashMap<>();
        response.put("correct", correct);
        response.put("attempts", result.getAttempts());
        response.put("bestAccuracy", result.getBestAccuracy());

        return ResponseEntity.ok(response);
    }

*/


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
        boolean correct;

        ExerciseResult result = exerciseResultRepository
                .findByUserAndExercise(user, exercise)
                .orElse(new ExerciseResult());

        result.setUser(user);
        result.setExercise(exercise);
        result.setUserAnswer(userAnswer);

        if (exercise.getType().equals("MATCH")) {
            Map<String, String> correctPairs = parsePairs(exercise.getCorrectAnswer());
            Map<String, String> userPairs = parsePairs(userAnswer);
            correct = correctPairs.equals(userPairs);
            result.setCorrect(correct);

        } else if (exercise.getType().equals("SPEAKING")) {
            String correctClean = exercise.getCorrectAnswer().trim().toLowerCase()
                    .replaceAll("[^a-zA-Zа-яА-ЯіІїЇєЄ]", "");
            String userClean = userAnswer.trim().toLowerCase()
                    .replaceAll("[^a-zA-Zа-яА-ЯіІїЇєЄ]", "");

            int maxLen = Math.max(correctClean.length(), userClean.length());
            int matches = 0;
            for (int i = 0; i < Math.min(correctClean.length(), userClean.length()); i++) {
                if (correctClean.charAt(i) == userClean.charAt(i)) matches++;
            }
            int accuracy = maxLen > 0 ? (int) Math.round((double) matches / maxLen * 100) : 0;
            correct = accuracy >= 80;

            int currentAttempts = result.getAttempts();
            if (currentAttempts >= 20) {
                return ResponseEntity.badRequest().body(Map.of("error", "Максимум 20 спроб"));
            }
            result.setAttempts(currentAttempts + 1);

            if (accuracy > result.getBestAccuracy()) {
                result.setBestAccuracy(accuracy);
            }

            result.setCorrect(correct);

        } else {
            correct = exercise.getCorrectAnswer().trim().equalsIgnoreCase(userAnswer.trim());
            result.setCorrect(correct);
        }

        exerciseResultRepository.save(result);

        Map<String, Object> response = new HashMap<>();
        response.put("correct", correct);
        response.put("attempts", result.getAttempts());
        response.put("bestAccuracy", result.getBestAccuracy());

        return ResponseEntity.ok(response);
    }



    private Map<String, String> parsePairs(String input) {
        Map<String, String> map = new HashMap<>();
        if (input == null) return map;
        for (String pair : input.split(",")) {
            String[] parts = pair.trim().split("=");
            if (parts.length == 2) {
                map.put(parts[0].trim(), parts[1].trim());
            }
        }
        return map;
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
