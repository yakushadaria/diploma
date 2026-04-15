package com.example.diploma.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Data
@Getter
@Setter
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @ManyToOne
    @JoinColumn(name = "language_id")
    private Language language;

    @OneToMany(mappedBy = "course")
    private List<Lesson> lessons;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

}
