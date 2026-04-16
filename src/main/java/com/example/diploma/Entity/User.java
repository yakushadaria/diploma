package com.example.diploma.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 15)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    private String password;
    private String role;

    //
    @OneToMany(mappedBy = "user")
    private List<UserProgress> progresses;

    //
    @OneToMany(mappedBy = "user")
    private List<Comment> comments;


    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }



    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }



    public Set<Role> getRoles() {
        return roles;
    }




    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getRole() { return role; }

    public void setRole(String role) { this.role = role; }
}
