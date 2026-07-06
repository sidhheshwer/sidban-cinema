package com.sidban.sidban_movies.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SidbanAuthResponseDto {
  
    private String username;
    private String message;
    private String profile_pic;
  
   
}
