package com.sidban.sidban_movies.dto;

import lombok.Data;

@Data
public class SidbanAIResponseMovie {
    private String title;
    private String year;
    private String released;
    private String runtime;
    private String genre;
    private String director;
    private String writer;
    private String actors;
    private String production;
    private String awards;
    private String imdbRating;
    private String rottenTomatoesRating;
    private String plot;
    private String Poster;
}