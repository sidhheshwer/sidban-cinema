package com.sidban.sidban_movies.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SidbanSeasonDto {

    private int id;

    private String name;

    @JsonProperty("season_number")
    private int seasonNumber;

    @JsonProperty("episode_count")
    private int episodeCount;

    @JsonProperty("air_date")
    private String airDate;

    private String overview;

    @JsonProperty("poster_path")
    private String posterPath;

    @JsonProperty("vote_average")
    private double voteAverage;
}