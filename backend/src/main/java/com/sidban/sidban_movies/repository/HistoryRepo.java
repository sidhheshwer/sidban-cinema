package com.sidban.sidban_movies.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.sidban.sidban_movies.entities.SidbanHistoryEntity;



public interface HistoryRepo extends MongoRepository<SidbanHistoryEntity,String> {
     List<SidbanHistoryEntity> findByCreatedBy(String createdBy);
      List<SidbanHistoryEntity> findByTitleAndCreatedBy(String title, String createdBy);
     String findByTitle(String title);

}
