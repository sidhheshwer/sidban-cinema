package com.sidban.sidban_movies.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.sidban.sidban_movies.dto.SidbanAuthResponseDto;
import com.sidban.sidban_movies.dto.SidbanLoginDto;
import com.sidban.sidban_movies.services.SidbanLoginService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class SidbanLoginController {

    @Autowired
     SidbanLoginService getSidbanLoginService;

    public SidbanLoginController(SidbanLoginService getSidbanLoginService){
        this.getSidbanLoginService=getSidbanLoginService;
    }
   
    @PostMapping("/sidban-cinema/login")
     
    public ResponseEntity<SidbanAuthResponseDto> sidbanSigninController(@RequestBody  SidbanLoginDto loginData) {
       try {
        return getSidbanLoginService.sidbanLoginService(loginData);
       } catch (Exception e) {
        SidbanAuthResponseDto authDto=new SidbanAuthResponseDto("","Login Unsuccessfull","");
        return new ResponseEntity<>(authDto,HttpStatus.UNAUTHORIZED);
       }
    }
    
}
