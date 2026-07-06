package com.sidban.sidban_movies.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.sidban.sidban_movies.services.SidbanSeriesDetailsService;
import com.sidban.sidban_movies.services.SidbanSeriesPlayerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;




@RestController
public class SidbanSeriesPlayerController {

    @Autowired
    SidbanSeriesPlayerService sidbanSeriesPlayer;

    @Autowired
    SidbanSeriesDetailsService sidbanSeriesDetails;

    

        public SidbanSeriesPlayerController(SidbanSeriesPlayerService sidbanSeriesPlayer,SidbanSeriesDetailsService sidbanSeriesDetailsService) {
        this.sidbanSeriesPlayer = sidbanSeriesPlayer;
        this.sidbanSeriesDetails=sidbanSeriesDetailsService;
    }

    @GetMapping("/sidban-cinema/series/{id}")
    public ResponseEntity<?> sidbanSeriesDetails(@PathVariable String id) {
        
       try {
       
            return sidbanSeriesDetails.getSidbanSeriesDetails(id);
        } catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @PostMapping("/sidban-cinema/sidban-player/series/{title}/{id}")
    public ResponseEntity<?> sidbanPlayerController(@PathVariable String id) {
        try {
       
            return sidbanSeriesPlayer.sidbanSeriesPlayerService(id);
        } catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

       @PostMapping("/sidban-cinema/sidban-player/series/{title}/{id}/{season}/{episode}")
    public ResponseEntity<?> sidbanSeriesPlayerController(@PathVariable String id,@PathVariable String season,@PathVariable String episode) {
        try {
            return sidbanSeriesPlayer.sidbanSeriesPlayerTwoService(id,season,episode);
        } catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
