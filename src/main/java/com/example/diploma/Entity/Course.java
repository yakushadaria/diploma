package com.example.diploma.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;


@Entity
@Data
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @ManyToOne
    @JoinColumn(name = "language_id")
    private Language language;


    private String level;


    @OneToMany(mappedBy = "course", fetch = FetchType.EAGER)
    @JsonIgnoreProperties("course")
    private List<Lesson> lessons;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private User teacher;

    public User getTeacher() { return teacher; }
    public void setTeacher(User teacher) { this.teacher = teacher; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }


    public List<Lesson> getLessons() {
        return lessons;
    }


    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }


    public Language getLanguage() { return language; }
    public void setLanguage(Language language) { this.language = language; }





    private int toggleCount = 0;
    private LocalDate toggleDate;
    private boolean active = true;


    public int getToggleCount() { return toggleCount; }
    public void setToggleCount(int toggleCount) { this.toggleCount = toggleCount; }
    public LocalDate getToggleDate() { return toggleDate; }
    public void setToggleDate(LocalDate toggleDate) { this.toggleDate = toggleDate; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

}
