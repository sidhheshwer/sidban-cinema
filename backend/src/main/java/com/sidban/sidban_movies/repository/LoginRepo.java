package com.sidban.sidban_movies.repository;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.sidban.sidban_movies.entities.SidbanLoginEntity;




public interface LoginRepo extends MongoRepository<SidbanLoginEntity,String> {

    SidbanLoginEntity findByEmail(String email);
} 
