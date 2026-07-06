package com.sidban.sidban_movies.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SidbanCastDto {
   private String message;
   private String name;
   private String original_name;
   private String character;
   private String profile_path;
}
