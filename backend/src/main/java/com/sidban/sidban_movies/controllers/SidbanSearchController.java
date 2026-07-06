package com.sidban.sidban_movies.controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.sidban.sidban_movies.services.SidbanSearchService;

@RestController
public class SidbanSearchController {

    @Autowired
    SidbanSearchService getsidbanSearch;

        public SidbanSearchController(SidbanSearchService getSearchService) {
        this.getsidbanSearch = getSearchService;
    }
    
  
    @GetMapping("/sidban-cinema/search")
    public ResponseEntity<?> sidbanSearchController(@RequestParam String query) {
          try {
      

        return getsidbanSearch.sidbanSearchService(query);

    } catch (Exception e) {
        e.printStackTrace();

        return ResponseEntity
                .internalServerError()
                .body(e.getMessage());
    }
    }
    
}
