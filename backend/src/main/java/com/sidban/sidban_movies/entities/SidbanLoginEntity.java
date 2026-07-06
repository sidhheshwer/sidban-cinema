package com.sidban.sidban_movies.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("login_users")
public class SidbanLoginEntity {
   
     @Id
    private String id;
    @Indexed(unique = true)
    private String email;

}
