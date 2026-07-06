package com.sidban.sidban_movies.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sidban.sidban_movies.dto.SidbanResponseDto;

@Service
public class SidbanMovieService {

    @Value("${sidban.movies.api.key}")
    private String sidbanMoviesApi;

    private SidbanResponseDto cachedMovies;
    private long lastFetchTime = 0L;

    
    @Autowired
   private RestTemplate restTemplate;

       public SidbanMovieService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<?> sidbanMovieService() {

        long now = System.currentTimeMillis();

       
        if (cachedMovies != null &&
                (now - lastFetchTime) <1800000) {

            System.out.println("Returning cached movies...");
            return ResponseEntity.ok(cachedMovies);
        }

        String url = "https://api.themoviedb.org/3/movie/popular?api_key=" + sidbanMoviesApi;

        try {

           
            SidbanResponseDto response =
                    restTemplate.getForObject(url, SidbanResponseDto.class);

            if (response != null) {
                cachedMovies = response;
                lastFetchTime = now;
            }
            
            return ResponseEntity.ok(response);

        } catch (Exception e) {

            System.err.println("TMDB request failed: " + e.getMessage());

           
            if (cachedMovies != null) {
                
                return ResponseEntity.ok(cachedMovies);
            }

            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body("TMDB temporarily unavailable. Please try again later.");
        }
    }
}