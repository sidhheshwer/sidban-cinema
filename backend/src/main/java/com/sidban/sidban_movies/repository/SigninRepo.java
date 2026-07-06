package com.sidban.sidban_movies.repository;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.sidban.sidban_movies.entities.SidbanSigninEntity;




public interface SigninRepo extends MongoRepository<SidbanSigninEntity,String> {

    SidbanSigninEntity findByEmail(String email);
    SidbanSigninEntity findByUsername(String username);
} 
