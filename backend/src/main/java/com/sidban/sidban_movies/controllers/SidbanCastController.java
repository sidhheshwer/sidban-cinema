package com.sidban.sidban_movies.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.sidban.sidban_movies.services.SidbanCastService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
public class SidbanCastController {

    @Autowired
    SidbanCastService getsidbanCastService;

    public SidbanCastController(SidbanCastService getSidbanCastService){
        this.getsidbanCastService=getSidbanCastService;
    }
   
    @GetMapping("/sidban-cinema/credits/{type}/{id}")
    public ResponseEntity<?> sidbanCastController(@PathVariable String type,@PathVariable String id) {
        try {
            return getsidbanCastService.sidbanCastService(type,id);
        } catch (Exception e) {
             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
