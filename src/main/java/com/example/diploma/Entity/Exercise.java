package com.example.diploma.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;
    private String correctAnswer;
    private String type;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
}
