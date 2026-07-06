package com.sidban.sidban_movies.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SidbanTvSeasonDto {

    private int id;

    private String name;

    @JsonProperty("season_number")
    private int seasonNumber;

    @JsonProperty("air_date")
    private String airDate;

    private String overview;

    @JsonProperty("poster_path")
    private String posterPath;



    private List<SidbanEpisodeDto> episodes;
}