package com.sidban.sidban_movies.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SidbanLoginDto {
   
    
    private String email;
    private String password;

}
