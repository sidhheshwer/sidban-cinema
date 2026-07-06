package com.sidban.sidban_movies.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document("user_watch_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SidbanHistoryEntity {
    
    @Id
    private String id;
    private String title;
    private String overview;

    @JsonProperty("poster")
    private String poster;

    private String type;
    
    @JsonProperty("release_date")
    private String releaseDate;

    @JsonProperty("created_by")
    private String createdBy;

    @JsonProperty("movie_id")
    private String movieId;
    
}
