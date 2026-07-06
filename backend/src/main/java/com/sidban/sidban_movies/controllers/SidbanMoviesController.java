package com.sidban.sidban_movies.controllers;

import org.springframework.web.bind.annotation.RestController;


import com.sidban.sidban_movies.services.SidbanMovieService;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
public class SidbanMoviesController {

    @Autowired
    SidbanMovieService getSidbanMoviesService;

        public SidbanMoviesController(SidbanMovieService getSidbanMovieService) {
        this.getSidbanMoviesService= getSidbanMovieService;
    }
    
    @GetMapping("/sidban-cinema/home")
    public ResponseEntity<?> sidbanMoviesController(@CookieValue(name = "sidbanCinemaKey", required = false) String token) {
      try {

         if (token == null || token.isEmpty()) {
            return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

           
           return getSidbanMoviesService.sidbanMovieService();

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
