package com.sidban.sidban_movies.authentications;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtGen {

    @Value("${sidban.jwt.secret}")
    private String jwtSecret;

    public String generateToken(String email) {
    

        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

        return Jwts.builder()
        .subject(email)
        .claim("role", "Sidban_User")
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + 86400000))
        .signWith(key)
        .compact();
    }
}