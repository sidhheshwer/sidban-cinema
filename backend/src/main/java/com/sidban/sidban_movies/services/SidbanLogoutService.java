package com.sidban.sidban_movies.services;

import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SidbanLogoutService {

    public ResponseEntity<?> sidbanLogoutService() {

        ResponseCookie cookie = ResponseCookie.from("sidbanCinemaKey", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok().header("Set-Cookie", cookie.toString()) .body("Logout Successful");
    }
}