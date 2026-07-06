package com.sidban.sidban_movies.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SidbanAIEntity {

    private String title;
    private String overview;
    private String imageUrl;
    private String type;

}