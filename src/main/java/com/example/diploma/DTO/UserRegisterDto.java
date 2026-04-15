package com.example.diploma.DTO;

import com.example.diploma.Entity.Role;
import lombok.Data;

import java.util.Set;

@Data
public class UserRegisterDto {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    //SETTERS
    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
