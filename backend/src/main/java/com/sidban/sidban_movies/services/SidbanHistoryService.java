package com.sidban.sidban_movies.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sidban.sidban_movies.dto.SidbanHistoryDto;
import com.sidban.sidban_movies.entities.SidbanHistoryEntity;
import com.sidban.sidban_movies.repository.HistoryRepo;

@Service
public class SidbanHistoryService {

    @Autowired
    HistoryRepo getHistoryRepo;

    public SidbanHistoryService(HistoryRepo getHistoryRepo){
        this.getHistoryRepo=getHistoryRepo;
    }



    public ResponseEntity<?> getSidbanHistory(String sidbanUser){
        try {
            List<SidbanHistoryEntity> existingHistory=getHistoryRepo.findByCreatedBy(sidbanUser);

             if (existingHistory.isEmpty()) {
                SidbanHistoryDto dto=new SidbanHistoryDto("","No history found");
            return new ResponseEntity<>(dto, HttpStatus.NOT_FOUND);
        }

          return new ResponseEntity<>(existingHistory, HttpStatus.OK);
            

        } catch (Exception e) {
            SidbanHistoryDto dto=new SidbanHistoryDto("","No history found");
            return new ResponseEntity<>(dto, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
   
   public ResponseEntity<SidbanHistoryDto> sidbanHistoryService(SidbanHistoryEntity data) {
    try {

        String username = data.getCreatedBy();
        String title = data.getTitle();

       

      List<SidbanHistoryEntity> history =getHistoryRepo.findByTitleAndCreatedBy(title, username);

        if (!history.isEmpty()) {
            SidbanHistoryDto historyDto = new SidbanHistoryDto("", "Content already exists in history");

            return new ResponseEntity<>(historyDto, HttpStatus.CONFLICT);
        }

        getHistoryRepo.save(data);

        SidbanHistoryDto historyDto =new SidbanHistoryDto(username, "Sidban History updated");

        return new ResponseEntity<>(historyDto, HttpStatus.CREATED);

    } catch (Exception e) {
        e.printStackTrace();

        SidbanHistoryDto historyDto = new SidbanHistoryDto("", "Sidban History error");

        return new ResponseEntity<>(historyDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}




 public ResponseEntity<?> deleteSidbanHistory(String id) {
    try {

        Optional<SidbanHistoryEntity> deleteHistory = getHistoryRepo.findById(id);

        if (deleteHistory.isEmpty()) {
            SidbanHistoryDto historyDto =new SidbanHistoryDto("", "History not found");

            return new ResponseEntity<>(historyDto, HttpStatus.NOT_FOUND);
        }

        getHistoryRepo.deleteById(id);

        SidbanHistoryDto historyDto =new SidbanHistoryDto("", "History deleted successfully");

        return new ResponseEntity<>(historyDto, HttpStatus.OK);

    } catch (Exception e) {

        SidbanHistoryDto dto = new SidbanHistoryDto("", "Cannot delete history");

        return new ResponseEntity<>(dto, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}
