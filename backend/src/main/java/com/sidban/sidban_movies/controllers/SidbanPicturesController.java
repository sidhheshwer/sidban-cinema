package com.sidban.sidban_movies.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sidban.sidban_movies.services.SidbanPicturesService;


@RestController
public class SidbanPicturesController {

    @Autowired
    SidbanPicturesService getSidbanPicturesService;

        public SidbanPicturesController(SidbanPicturesService getSidbanPicturesService) {
        this.getSidbanPicturesService =getSidbanPicturesService;
    }
    
    @GetMapping("/sidban-cinema/movies")
    public ResponseEntity<?> sidbanMoviesController(@RequestParam(defaultValue = "5") int page) {
      try {
    
   
           return getSidbanPicturesService.sidbanPicturesService(page);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
   