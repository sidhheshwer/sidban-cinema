package com.sidban.sidban_movies.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.sidban.sidban_movies.dto.SidbanHistoryDto;
import com.sidban.sidban_movies.entities.SidbanHistoryEntity;
import com.sidban.sidban_movies.services.SidbanHistoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
public class SidbanHistoryController {

    @Autowired
    SidbanHistoryService getsidbanHistoryService;

   

    public SidbanHistoryController(SidbanHistoryService getSidbanHistoryService){
        this.getsidbanHistoryService=getSidbanHistoryService;
    }

    @GetMapping("/sidban-cinema/history/{sidbanUser}")
    public ResponseEntity<?> getSidbanHistory(@PathVariable String sidbanUser) {
        try {

             return getsidbanHistoryService.getSidbanHistory(sidbanUser);
            
        } catch (Exception e) {
             SidbanHistoryDto historyDto=new SidbanHistoryDto("","Sidban History error");
        
        return new ResponseEntity<>(historyDto,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    
    @PostMapping("/sidban-cinema/history")
    public ResponseEntity<SidbanHistoryDto> sidbanHistoryContoller(@RequestBody SidbanHistoryEntity data) {
    
     try {
       
        
        return getsidbanHistoryService.sidbanHistoryService(data);
        
     } catch (Exception e) {
          SidbanHistoryDto historyDto=new SidbanHistoryDto("","Sidban History error");
        
        return new ResponseEntity<>(historyDto,HttpStatus.INTERNAL_SERVER_ERROR);
     }
    }
    

        @DeleteMapping("/sidban-cinema/history/{id}")
    public ResponseEntity<?> deleteSidbanHistory(@PathVariable String id) {
        try {

             return getsidbanHistoryService.deleteSidbanHistory(id);
            
        } catch (Exception e) {
             SidbanHistoryDto historyDto=new SidbanHistoryDto("","Cannot delete history");
        
        return new ResponseEntity<>(historyDto,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
