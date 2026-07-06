package com.sidban.sidban_movies.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SidbanSeriesDetailsDto {

    private int id;

    private String name;

    @JsonProperty("season_number")
    private int seasonNumber;

    @JsonProperty("air_date")
    private String airDate;

    private String overview;

    @JsonProperty("poster_path")
    private String posterPath;

    @JsonProperty("number_of_seasons")
private int numberOfSeasons;

@JsonProperty("number_of_episodes")
private int numberOfEpisodes;

   private List<SidbanSeasonDto> seasons;

    private List<SidbanEpisodeDto> episodes;
}