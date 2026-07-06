package com.sidban.sidban_movies.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.sidban.sidban_movies.services.SidbanTvSeasonService;

@RestController
public class SidbanTvSeasonController {

    private final SidbanTvSeasonService sidbanTvSeasonService;

    public SidbanTvSeasonController(
            SidbanTvSeasonService sidbanTvSeasonService) {

        this.sidbanTvSeasonService =
                sidbanTvSeasonService;
    }

    @GetMapping(
            "/sidban-cinema/series/{tvId}/season/{seasonNumber}")
    public ResponseEntity<?> getSeasonDetails(
            @PathVariable int tvId,
            @PathVariable int seasonNumber) {

        try {

            return sidbanTvSeasonService
                    .getSeasonDetails(
                            tvId,
                            seasonNumber);

        } catch (Exception e) {

            return new ResponseEntity<>(
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}