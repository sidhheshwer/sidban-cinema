package com.sidban.sidban_movies.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sidban.sidban_movies.services.SidbanLogoutService;

@RestController
public class SidbanLogoutController {

    @Autowired
    SidbanLogoutService sidbanLogoutService;

    public SidbanLogoutController(SidbanLogoutService sidbanLogoutService) {
        this.sidbanLogoutService = sidbanLogoutService;
    }

    @GetMapping("/sidban-cinema/logout")
    public ResponseEntity<?> sidbanLogoutController() {
        try {
          
            return sidbanLogoutService.sidbanLogoutService();
        } catch (Exception e) {
            return new ResponseEntity<>("Logout Failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}