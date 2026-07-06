package com.sidban.sidban_movies.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document("signin_users")
public class SidbanSigninEntity {
   
     @Id
    private String id;
    private String email;
    private String username;
    private String password;
    private String profile_pic;
}
