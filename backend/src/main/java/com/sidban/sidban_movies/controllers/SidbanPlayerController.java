package com.sidban.sidban_movies.controllers;

import org.springframework.web.bind.annotation.RestController;


import com.sidban.sidban_movies.services.SidbanPlayerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
public class SidbanPlayerController {

    @Autowired
    SidbanPlayerService sidbanPlayer;



        public SidbanPlayerController(SidbanPlayerService sidbanPlayer) {
        this.sidbanPlayer= sidbanPlayer;
    }
    
    @PostMapping("/sidban-cinema/sidban-player/{id}")
    public ResponseEntity<?> sidbanPlayerController(@PathVariable String id) {
        try {
            return sidbanPlayer.sidbanPlayerService(id);
        } catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    
}
