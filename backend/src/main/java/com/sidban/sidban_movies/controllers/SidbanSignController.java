package com.sidban.sidban_movies.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.sidban.sidban_movies.dto.SidbanAuthResponseDto;
import com.sidban.sidban_movies.dto.SidbanSignDto;
import com.sidban.sidban_movies.services.SidbanSignService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;



@RestController
public class SidbanSignController {

    @Autowired
     SidbanSignService getSidbanSignService;

    public SidbanSignController(SidbanSignService getSidbanSignService){
        this.getSidbanSignService=getSidbanSignService;
    }

    @GetMapping("/sidban-cinema/check-auth")
    public ResponseEntity<?> checkAuth( @CookieValue(name = "sidbanCinemaKey", required = false) String token) {
       
    if (token == null || token.isEmpty()) {
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    return ResponseEntity.ok("Authenticated");
}
   


    @PostMapping(value="/sidban-cinema/signin", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    
    public ResponseEntity<SidbanAuthResponseDto> sidbanSigninController(@ModelAttribute  SidbanSignDto signinData) {
       try {
         
        return getSidbanSignService.sidbanSignService(signinData);
       } catch (Exception e) {
        SidbanAuthResponseDto authDto=new SidbanAuthResponseDto("","Signin Unsuccessfull","");
        return new ResponseEntity<>(authDto,HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
    
}
