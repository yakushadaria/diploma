package com.example.diploma.Controller;

import org.springframework.web.bind.annotation.GetMapping;

public class TestController {

    @GetMapping("/admin/dashboard")
    public String adminPage() {
        return "ADMIN PAGE";
    }

    @GetMapping("/teacher/dashboard")
    public String teacherPage() {
        return "TEACHER PAGE";
    }

    @GetMapping("/student/dashboard")
    public String studentPage() {
        return "STUDENT PAGE";
    }
}