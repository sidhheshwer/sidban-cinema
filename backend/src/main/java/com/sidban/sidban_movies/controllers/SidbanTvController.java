package com.sidban.sidban_movies.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sidban.sidban_movies.services.SidbanTvService;

@RestController
public class SidbanTvController {

    @Autowired
    SidbanTvService getSidbanTvService;

        public SidbanTvController(SidbanTvService getSidbanTvService) {
        this.getSidbanTvService= getSidbanTvService;
    }
    
    @GetMapping("/sidban-cinema/series")
    public ResponseEntity<?> sidbanMoviesController(@RequestParam(defaultValue = "1") int seriesPage) {
      try {
    
   
           return getSidbanTvService.sidbanMovieService(seriesPage);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
    