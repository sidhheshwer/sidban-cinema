package com.sidban.sidban_movies.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SidbanCrewDto {
    private Integer id;
    private List<SidbanCastDto> cast;

  
}