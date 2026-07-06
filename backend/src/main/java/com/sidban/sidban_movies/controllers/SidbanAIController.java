package com.sidban.sidban_movies.controllers;






import org.springframework.web.bind.annotation.*;

import com.sidban.sidban_movies.entities.SidbanAIEntity;
import com.sidban.sidban_movies.services.SidbanAIService;



@RestController
@RequestMapping("/sidban-cinema/sidbanai")
public class SidbanAIController {

    private final SidbanAIService sidbanAIService;

    public SidbanAIController( SidbanAIService sidbanAIService) {
        this.sidbanAIService = sidbanAIService;
    }

   @PostMapping("/summarize")
    public String summarizeNews( @RequestBody SidbanAIEntity request) {

    return sidbanAIService.summarizeMovie( request.getTitle(), request.getOverview(),request.getImageUrl(),request.getType());
}
}
