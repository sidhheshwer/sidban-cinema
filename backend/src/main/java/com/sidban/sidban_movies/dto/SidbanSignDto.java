package com.sidban.sidban_movies.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SidbanSignDto {
   
    
    private String email;
    private String password;
    private String username;
    private MultipartFile profile_pic;
}
