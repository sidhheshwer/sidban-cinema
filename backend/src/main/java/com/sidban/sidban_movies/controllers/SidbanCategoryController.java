package com.sidban.sidban_movies.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.sidban.sidban_movies.services.SidbanCategoryService;

@RestController
public class SidbanCategoryController {

    @Autowired
    private SidbanCategoryService sidbanCategoryService;


        public SidbanCategoryController( SidbanCategoryService sidbanCategoryService) {
        this.sidbanCategoryService=sidbanCategoryService;
    }

    @GetMapping("/sidban-cinema/category")
    public ResponseEntity<?> sidbanCategoryController(
            @RequestParam(defaultValue = "1") int page) {

        try {

            return sidbanCategoryService.sidbanCategoryService(page);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}