package com.sidban.sidban_movies.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sidban.sidban_movies.services.SidbanTopService;


@RestController
public class SidbanTopController {

    @Autowired
    SidbanTopService getSidbanTopService;

        public SidbanTopController(SidbanTopService getSidbanTopService) {
        this.getSidbanTopService =getSidbanTopService;
    }
    
    @GetMapping("/sidban-cinema/top-imdb")
    public ResponseEntity<?> sidbanMoviesController(@RequestParam(defaultValue = "1") int page) {
      try {
    
   
           return getSidbanTopService.sidbanTopService(page);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
   