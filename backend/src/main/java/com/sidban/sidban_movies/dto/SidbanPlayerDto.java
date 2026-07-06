package com.sidban.sidban_movies.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SidbanPlayerDto {

    private List<String> urls;
    private String message;


    public List<String> getUrls() {
        return urls;
    }

    public String getMessage() {
        return message;
    }
}